const buttonTypes = {
    NUMBER: 'number',
    BINOP: {REG: "binop.regular",
            DEC: "binop.decimal"},
    PAREN: {C: "paren.close",
            O: "paren.open"},
}

const buttons = {
    '(' : buttonTypes.PAREN.O,
    ')' : buttonTypes.PAREN.C,
    '+' : buttonTypes.BINOP.REG,
    '-' : buttonTypes.BINOP.REG,
    'x' : buttonTypes.BINOP.REG,
    '÷' : buttonTypes.BINOP.REG,
    '.' : buttonTypes.BINOP.DEC,
}

class StateItem {
    constructor(char) {
        if (char in buttons) {
            this.buttonType = buttons[char]
        } else {
            this.buttonType = buttonTypes.NUMBER
        }
        this.val = (this.buttonType===buttonTypes.NUMBER) ? parseInt(char) : char
    }

    splitOnDecimal() {
        let newItem = new StateItem('0')
        if (this.buttonType === buttonTypes.NUMBER) {
            console.log(this.val.toString())
            let valueList = this.val.toString().split('.')
            if (valueList.length>1) {
                this.val = parseInt(valueList[0])
                newItem = parseInt(valueList[2])
            }
        }
        return newItem
    }
}

export {buttonTypes, StateItem}
