import React, { Component } from "react";
import CalcButton from './CalcButton.js'
import Display from './Display.js';
import evaluateState from './evaluateState,js';

const rowLength = 5

const operationOrder = [['x','÷'],['+','-']]

export default class Calculator extends Component {
    constructor(props) {

        super(props);

        this.state = {displayStatus: [0]}

        this.updateNum = this.updateNum.bind(this)
        this.op = this.op.bind(this)
        this.evaluate = this.evaluate.bind(this)

        this.buttonsList = [{char: '1', action: () => this.updateNum(1)},
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
                            {char: '=', action: this.evaluate}];
    }

    updateNum(val) {
        let newStatus = this.state.displayStatus
        if (typeof newStatus[newStatus.length-1] == 'number') {
            newStatus[newStatus.length-1]=newStatus[newStatus.length-1]*10+val
        } else {
            newStatus.push(val)
        }
        this.setState({calculatorState: newStatus})
    }

    op(operator) {
        let newStatus = this.state.displayStatus
        if (typeof newStatus[newStatus.length-1] == 'number') {
            newStatus.push(operator)
            this.setState({calculatorState: newStatus})
        }
    }

    evaluate() {
        if (typeof this.state.displayStatus[this.state.displayStatus.length-1] == 'number') { 
            this.setState({calculatorState: evaluateState(this.state.displayStatus)})
        }
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
                    <div>
                        {row.map(buttonInfo => (
                            <CalcButton
                                char = {buttonInfo.char}
                                action = {buttonInfo.action}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}