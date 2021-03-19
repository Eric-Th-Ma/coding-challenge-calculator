import {buttonTypes, StateItem} from './stateItem.js'

const constVals =  {'π' : Math.PI,
                    'e' : Math.E}
// order of operations turning decimals into 1 number first and then following PMDAS
const operationOrder = [['π','e'],
                        ['.'],
                        ['(', ')'],
                        ['sin','cos','tan'],
                        ['x', '÷'],
                        ['+', '-']]

export default class StateList {
    constructor() {
        // a default state will simply contain a 0
        this.listItems = [new StateItem('0')]
    }

    tryAddItem(itemChar) {
        console.log(this.listItems.map(x=>x))
        // create a state item out of the character pressed and attempt to add it to the state list

        let newItem = new StateItem(itemChar)
        let canAdd = false
        let lastType = this.listItems[this.listItems.length-1].buttonType
        
        switch (newItem.buttonType) {

            case buttonTypes.NUMBER:
                // numbers can be added into a number object or follow binary operations or open parentheses as a new state item

                if (lastType === buttonTypes.NUMBER) {
                    this.listItems[this.listItems.length-1].val *= 10
                    let adder = this.listItems[this.listItems.length-1].val<0 ? 0 - newItem.val : newItem.val
                    this.listItems[this.listItems.length-1].val += adder
                } else {
                    canAdd = (Object.values(buttonTypes.BINOP).includes(lastType) || lastType === buttonTypes.PAREN.O || lastType === buttonTypes.UNIOP)
                }
                break

            case buttonTypes.BINOP.REG:
                // Regular binary operations can follow any number or closing paren

                canAdd = (lastType === buttonTypes.NUMBER || lastType === buttonTypes.PAREN.C || buttonTypes.CONST)
                break

            case buttonTypes.BINOP.DEC:
                // Decimal points are binary operations but can only follow numbers if that number was not preceded by another decimal point

                canAdd = true
                if (this.listItems.length>1) {
                    canAdd = (this.listItems[this.listItems.length-2].buttonType !== buttonTypes.BINOP.DEC)
                }
                canAdd = (canAdd && lastType === buttonTypes.NUMBER)
                break

            case buttonTypes.PAREN.O:
                // Opening parentheses can follow a regular binary operation single variable op or another open paren

                if (this.listItems[0].val === 0 && this.listItems.length === 1) {
                    // They can also replace the opening 0 IF that is all that is in the state list
                    this.listItems = [newItem]
                } else {
                    canAdd = (lastType === buttonTypes.BINOP.REG || lastType === buttonTypes.PAREN.O || lastType === buttonTypes.UNIOP)
                }
                break

            case buttonTypes.PAREN.C:
                // Closing parentheses can follow numbers or other closing parentheses if there have
                // been more opening parentheses than closing parentheses so far

                let openCount = 0
                for (let item of this.listItems) {
                    if (item.buttonType === buttonTypes.PAREN.O) {
                        openCount += 1
                    } else if (item.buttonType === buttonTypes.PAREN.C) {
                        openCount -= 1
                    }
                }
                canAdd = ((lastType === buttonTypes.NUMBER || lastType === buttonTypes.PAREN.C || lastType === buttonTypes.CONST) && openCount > 0)
                break

            case buttonTypes.UNIOP:
                // operations on a singular value can replace a starting 0, or follow any regular binop, open paren, or other UNIOP

                if (this.listItems[0].val === 0 && this.listItems.length === 1) {
                    this.listItems = [newItem]
                } else {
                    canAdd = (lastType === buttonTypes.BINOP.REG || lastType === buttonTypes.PAREN.O || lastType === buttonTypes.UNIOP)
                }
                break

            case buttonTypes.CONST:
                // constants can replace a starting 0, or follow any regular binop, open paren, or other UNIOP

                if (this.listItems[0].val === 0 && this.listItems.length === 1) {
                    this.listItems = [newItem]
                } else {
                    canAdd = (lastType === buttonTypes.BINOP.REG || lastType === buttonTypes.PAREN.O || lastType === buttonTypes.UNIOP)
                }
                break

            default:
                canAdd = false
                break
        }
        if (canAdd) {
            this.listItems.push(newItem)
        }
        console.log(this.listItems.map(x=>x))
        return canAdd
    }

    evaluate(inDegrees) {
        console.log(this.listItems.map(x=>x))
        // only evaluate if the final entry is a number, or close paren, and all open parentheses are closed
        let lastType = this.listItems[this.listItems.length-1].buttonType
        let openCount = 0
        for (let item of this.listItems) {
            if (item.buttonType === buttonTypes.PAREN.O) {
                openCount += 1
            } else if (item.buttonType === buttonTypes.PAREN.C) {
                openCount -= 1
            }
        }
        if ((lastType === buttonTypes.NUMBER || lastType === buttonTypes.PAREN.C || lastType === buttonTypes.CONST) && openCount === 0) {
            for (let operations of operationOrder) {
                // in each layer of the order of operations check from left to right for the operation and evaluate it

                for (let i = 0; i < this.listItems.length; i++) {
                    if (operations.includes(this.listItems[i].val)) {

                        let currentItem = this.listItems[i]
                        // if this is a binary operation we will evaluate it and overwrite three terms with the result
                        if (Object.values(buttonTypes.BINOP).includes(currentItem.buttonType)) {
                            this.evalBinOp(i)
                            i-=1
                            
                        // if this is a parenthetical we will evaluate the whole thing and then enter the result in its place
                        } else if (this.listItems[i].val==='(') {
                            let evaluationSuccess = this.evalParen(i)
                            if (!evaluationSuccess) {
                                this.listItems = [new StateItem('NaN')]
                            }
                        } else if (currentItem.buttonType === buttonTypes.UNIOP) {
                            this.evalUniOp(i, inDegrees)
                        } else if (currentItem.buttonType === buttonTypes.CONST) {
                            let constItem = new StateItem('0')
                            console.log(constVals[currentItem.val])
                            constItem.val = constVals[currentItem.val]
                            this.listItems[i] = constItem
                        }
                    }
                }
            }
            // round early enough to avoid floating point errors
            this.listItems[0].val = Math.round(this.listItems[0].val*1000000000)/1000000000

            // split decimal numbers to avoid adding decimal points to already decimal numbers
            let splitRight = this.listItems[0].splitOnDecimal()
            if (splitRight.val !== 0) {
                this.listItems.push(new StateItem('.'))
                this.listItems.push(splitRight)
            }
        }
    }

    evalBinOp(index) {
        // evaluate and replace binary operation located at index in listItems

        let left = this.listItems[index-1].val
        let op = this.listItems[index].val
        let right = this.listItems[index+1].val

        let result = new StateItem('0')
        switch(op) {

            // basic arithmetic operations
            case '+':
                result.val = left+right
                break
            case '-':
                result.val = left-right
                break
            case 'x':
                result.val = left*right
                break
            case '÷':
                result.val = left/right
                break

            case '.':
                // decimal value must agree with the sign of the whole value
                let decimalValue = (left > 0) ? right / 10**right.toString().length : 0 - right / 10**right.toString().length

                result.val = left + decimalValue
                break
            default:
                result.val = 0
                break
        }
        // replace left hand side, right hand side and binary operation with their evaluation
        this.listItems.splice(index-1, 3, result)
    }

    evalUniOp(index, inDegrees) {
        // evaluate and replace a single operation located at index in listItems
        
        let op = this.listItems[index].val
        let number = this.listItems[index+1].val
        if (inDegrees) {
            number = number * Math.PI / 180
        }

        let result = new StateItem('0')
        switch(op) {

            // basic trig operations
            case 'sin':
                result.val = Math.sin(number)
                break
            case 'cos':
                result.val = Math.cos(number)
                break
            case 'tan':
                result.val = Math.tan(number)
                break
            default:
                result.val = 0
                break
        }
        // replace the operation and operand with their evaluation
        this.listItems.splice(index, 2, result)
    }

    evalParen(i) {
        // evaluate inside of parentheses starting at i and insert the evaluation in its place in listItems

        // count open parens to find close paren that closes off i
        let openParens = 0
        for (let j = i; j < this.listItems.length; j++) {
            // begining at i search for the correct close paren

            if (this.listItems[j].val==='(') {
                openParens += 1
            }

            if (this.listItems[j].val===')') {
                if (openParens === 1) {
                    // once found, copy the section with the parentheses and evaluate it
                    let innerState = new StateList()
                    innerState.listItems = this.listItems.slice(i+1,j)
                    innerState.evaluate()

                    // insert the result in place of the entire parenthetical
                    this.listItems.splice(i, j-i+1, ...innerState.listItems)
                    return true
                } else {
                    openParens -= 1
                }
            }
        }
        // if we could not find the closing paren we return false
        return false
    }

    joinWith(otherStateList) {
        // Copy our list items so we can see if joing will work without modifying our state
        let selfCopy = new StateList()
        selfCopy.listItems = this.listItems.map(x=>x)
        // If one join works then join all, otherwise do nothing
        if (selfCopy.tryAddItem(otherStateList.listItems[0].val.toString())) {
            for (let item of otherStateList.listItems) {
                this.tryAddItem(item.val.toString())
            }
        }
    }
}