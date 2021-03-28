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
    '^' : buttonTypes.BINOP.REG,
    '.' : buttonTypes.BINOP.DEC,
    'sin' : buttonTypes.UNIOP,
    'cos' : buttonTypes.UNIOP,
    'tan' : buttonTypes.UNIOP,
    'log10' : buttonTypes.UNIOP,
    'ln' : buttonTypes.UNIOP,
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
        this.val = char
    }
}

export {buttonTypes, StateItem}
