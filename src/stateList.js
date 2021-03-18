const buttonTypes = {
    NUMBER: 'number',
    BINOP: {REG: "binop.regular",
            DEC: "binop.decimal"},
    PAREN: {C: "paren.close",
            O: "paren.open"},
}

const buttons = {
    'AC': null,
    '(' : buttonTypes.PAREN.O,
    ')' : buttonTypes.PAREN.C,
    'Copy': null,
    'Paste': null,
    '1' : buttonTypes.NUMBER,
    '2' : buttonTypes.NUMBER,
    '3' : buttonTypes.NUMBER,
    '+' : buttonTypes.BINOP.REG,
    '-' : buttonTypes.BINOP.REG,
    '4' : buttonTypes.NUMBER,
    '5' : buttonTypes.NUMBER,
    '6' : buttonTypes.NUMBER,
    'x' : buttonTypes.BINOP.REG,
    '÷' : buttonTypes.BINOP.REG,
    '7' : buttonTypes.NUMBER,
    '8' : buttonTypes.NUMBER,
    '9' : buttonTypes.NUMBER,
    '.' : buttonTypes.BINOP.DEC,
    '=' : null,
    '0' : buttonTypes.NUMBER,
}

class StateList {
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
                if (this === new StateList('0')) {
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
}

class StateItem {
    constructor(char) {
        console.log(char)
        this.buttonType = buttons[char]
        this.val = (this.buttonType===buttonTypes.NUMBER) ? parseInt(char) : char
        console.log(this.val)
    }
}

export {buttonTypes, StateItem, StateList}