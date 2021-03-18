import {buttonTypes, StateItem} from './stateItem.js'

const operationOrder = [['.'],
                        ['(', ')'],
                        ['x', '÷'],
                        ['+', '-']]

export default class StateList {
    constructor() {
        this.listItems = [new StateItem('0')]
    }

    tryAddItem(itemChar) {
        let newItem = new StateItem(itemChar)
        let canAdd = false
        let lastType = this.listItems[this.listItems.length-1].buttonType
        switch (newItem.buttonType) {
            case buttonTypes.NUMBER:
                if (lastType === buttonTypes.NUMBER) {
                    this.listItems[this.listItems.length-1].val = this.listItems[this.listItems.length-1].val*10 + newItem.val
                } else {
                    canAdd = (Object.values(buttonTypes.BINOP).includes(lastType) || lastType === buttonTypes.PAREN.O)
                }
                break
            case buttonTypes.BINOP.REG:
                canAdd = (lastType === buttonTypes.NUMBER || lastType === buttonTypes.PAREN.C)
                break
            case buttonTypes.BINOP.DEC:
                canAdd = true
                if (this.listItems.length>1) {
                    canAdd = (this.listItems[this.listItems.length-2].buttonType !== buttonTypes.BINOP.DEC)
                }
                canAdd = (canAdd && lastType === buttonTypes.NUMBER)
                break
            case buttonTypes.PAREN.O:
                if (this.listItems[0].val === 0 && this.listItems.length === 1) {
                    this.listItems = [newItem]
                } else {
                    canAdd = (Object.values(buttonTypes.BINOP).includes(lastType) || lastType === buttonTypes.PAREN.O)
                }
                break
            case buttonTypes.PAREN.C:
                let openCount = 0
                for (let item of this.listItems) {
                    if (item.buttonType === buttonTypes.PAREN.O) {
                        openCount += 1
                    } else if (item.buttonType === buttonTypes.PAREN.C) {
                        openCount -= 1
                    }
                }
                canAdd = (lastType === buttonTypes.NUMBER && openCount > 0)
                break
            default:
                canAdd = false
                break
        }
        if (canAdd) {
            this.listItems.push(newItem)
        }
    }

    evaluate() {
        for (let operations of operationOrder) {
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
                    }
                }
            }
        }
        // round early enough to avoid floating point errors
        this.listItems[0].val = Math.round(this.listItems[0].val*1000000000)/1000000000
        /*let splitRight = this.listItems[0].splitOnDecimal()
        if (splitRight !== new StateItem('0')) {
            this.listItems.push(new StateItem('.'))
            this.listItems.push(splitRight)
        }*/
    }

    evalBinOp(index) {
        let left = this.listItems[index-1].val
        let op = this.listItems[index].val
        let right = this.listItems[index+1].val
        let result = new StateItem('0')
        switch(op) {
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
                let decimalValue = (left > 0) ? right / 10**right.toString().length : 0 - right / 10**right.toString().length
                result.val = left + decimalValue
                break
            default:
                result.val = 0
                break
        }
        this.listItems.splice(index-1, 3, result)
    }

    evalParen(i) {
        for (let j = i; j < this.listItems.length; j++) {
            if (this.listItems[j].val===')') {
                let innerState = new StateList()
                innerState.listItems = this.listItems.slice(i+1,j)
                innerState.evaluate()
                this.listItems.splice(i,j-i+1,innerState.listItems[0])
                return true
            }
        }
        // if we could not find a closing paren we return false
        return false
    }
}