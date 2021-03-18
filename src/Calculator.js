import React, { Component } from "react";
import CalcButton from './CalcButton.js'
import Display from './Display.js';
import evaluateState from './evaluateState.js';

const rowLength = 5

export default class Calculator extends Component {
    constructor(props) {

        super(props);

        this.state = {displayStatus: [0], memory: []}

        this.updateNum = this.updateNum.bind(this)
        this.op = this.op.bind(this)
        this.evaluate = this.evaluate.bind(this)

        this.buttonsList = [{char: 'AC', action: () => this.setState({displayStatus: [0]})},
                            {char: '(', action: () => this.paren(true)},
                            {char: ')', action: () => this.paren(false)},
                            {char: 'Copy', action: () => this.setState({memory: this.state.displayStatus})},
                            {char: 'Paste', action: () => this.setState({displayStatus: this.state.displayStatus.concat(this.state.memory)})},
                            {char: '1', action: () => this.updateNum(1)},
                            {char: '2', action: () => this.updateNum(2)},
                            {char: '3', action: () => this.updateNum(3)},
                            {char: '+', action: () => this.op('+')},
                            {char: '-', action: () => this.op('-')},
                            {char: '4', action: () => this.updateNum(4)},
                            {char: '5', action: () => this.updateNum(5)},
                            {char: '6', action: () => this.updateNum(6)},
                            {char: 'x', action: () => this.op('x')},
                            {char: '÷', action: () => this.op('÷')},
                            {char: '7', action: () => this.updateNum(7)},
                            {char: '8', action: () => this.updateNum(8)},
                            {char: '9', action: () => this.updateNum(9)},
                            {char: '.', action: () => this.op('.')},
                            {char: '=', action: this.evaluate},
                            {char: '0', action: () => this.updateNum(0)}];
    }

    updateNum(val) {
        let newStatus = this.state.displayStatus
        if (typeof newStatus[newStatus.length-1] == 'number') {
            newStatus[newStatus.length-1]=newStatus[newStatus.length-1]*10+val
        } else {
            newStatus.push(val)
        }
        this.setState({displayStatus: newStatus})
    }

    op(operator) {
        let newStatus = this.state.displayStatus
        let numLast = typeof newStatus[newStatus.length-1] == 'number'
        let closeParen = newStatus[newStatus.length-1] === ')'
        let decimalAllowed = (operator !== '.' || (newStatus[newStatus.length-2] !== '.' && newStatus[newStatus.length-1] !== ')'))
        if ((numLast || closeParen) && decimalAllowed) {
            newStatus.push(operator)
            this.setState({displayStatus: newStatus})
        }
    }

    evaluate() {
        if (typeof this.state.displayStatus[this.state.displayStatus.length-1] == 'number') { 
            let result = evaluateState(this.state.displayStatus)
            this.setState({displayStatus: result})
        }
    }

    paren(open) {
        let newStatus = this.state.displayStatus
        if (typeof newStatus[newStatus.length-1] == 'number') {
            if (!open) {
                newStatus.push(')')
            }
        } else if (open && newStatus[newStatus.length-1] !== '.') {
            newStatus.push('(')
        } else if (open && newStatus === [0]) {
            newStatus = ['(',0]
        }
        this.setState({displayStatus: newStatus})
    }

    render() {
        let rows = new Array(Math.ceil(this.buttonsList.length / rowLength))
        for (let i = 0, j = this.buttonsList.length; i < j; i+=rowLength) {
            rows[i] = this.buttonsList.slice(i, i+rowLength);
        }
        return(
            <div>
                <div><Display displayStatus = {this.state.displayStatus}/></div>
                {rows.map(row => (
                    <div key = {"row of " + row[0].char}>
                        {row.map(buttonInfo => (
                            <CalcButton
                                char = {buttonInfo.char}
                                action = {buttonInfo.action}
                                key = {buttonInfo.char}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}