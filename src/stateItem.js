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
    'NaN' : buttonTypes.NUMBER
}

class StateItem {
    constructor(char) {
        this.buttonType = buttons[char]
        this.val = (this.buttonType===buttonTypes.NUMBER) ? parseInt(char) : char
    }

    /*splitOnDecimal() {
        let newItem = new StateItem('0')
        if (this.buttonType === buttonTypes.NUMBER) {
            let valueList = this.val.toString().split('.')
            if (valueList.length>1) {
                this.val = parseInt(valueList[0])
                newItem = parseInt(valueList[2])
            }
        }
        return newItem
    }*/
}

export {buttonTypes, StateItem}
