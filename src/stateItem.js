// types of state items can be numbers, binary operations or parentheses
const buttonTypes = {
    NUMBER: 'number',
    BINOP: {REG: "binop.regular",
            DEC: "binop.decimal"},
    PAREN: {C: "paren.close",
            O: "paren.open"},
    UNIOP: 'uniop',
    CONST: 'constant'
}

// for lookup of types of nonumeric symbols
const buttons = {
    '(' : buttonTypes.PAREN.O,
    ')' : buttonTypes.PAREN.C,
    '+' : buttonTypes.BINOP.REG,
    '-' : buttonTypes.BINOP.REG,
    'x' : buttonTypes.BINOP.REG,
    '÷' : buttonTypes.BINOP.REG,
    '.' : buttonTypes.BINOP.DEC,
    'sin' : buttonTypes.UNIOP,
    'cos' : buttonTypes.UNIOP,
    'tan' : buttonTypes.UNIOP,
    'π': buttonTypes.CONST,
    'e': buttonTypes.CONST
}

class StateItem {
    constructor(char) {
        // take char or string representing a state item and find its type and value

        if (char in buttons) {
            this.buttonType = buttons[char]
        } else {
            this.buttonType = buttonTypes.NUMBER
        }
        this.val = (this.buttonType===buttonTypes.NUMBER) ? parseInt(char) : char
    }

    splitOnDecimal() {
        // once evaluated any decimal value will need to converted back into its whole part, 
        // the decimal operation, and its decimal part. This prevents adding a decimal point
        // to an already fractional number

        let newItem = new StateItem('0')
        if (this.buttonType === buttonTypes.NUMBER) {
            // convert to string and split on the decimal point
            let valueList = this.val.toString().split('.')

            // if split did anything record this by returning the decimal part and truncating this item
            if (valueList.length>1) {
                this.val = parseInt(valueList[0])
                newItem.val = parseInt(valueList[1])
            }
        }
        return newItem
    }
}

export {buttonTypes, StateItem}
