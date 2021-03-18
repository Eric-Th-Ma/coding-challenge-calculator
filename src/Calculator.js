import React, { Component } from "react";
import CalcButton from './CalcButton.js'

const rowLength = 5

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {calculatorState: (0)}
        this.updateNum = this.updateNum.bind(this)
        this.buttonsList = [{char: '1', action: () => this.updateNum(1)},
                             {char: '2', action: () => this.updateNum(2)},
                             {char: '3', action: () => this.updateNum(3)},
                             {char: '+', action: ()=>null},
                             {char: '-', action: ()=>null},
                             {char: '4', action: ()=>null},
                             {char: '5', action: ()=>null},
                             {char: '6', action: ()=>null},
                             {char: 'x', action: ()=>null},
                             {char: '÷', action: ()=>null},
                             {char: '7', action: ()=>null},
                             {char: '8', action: ()=>null},
                             {char: '9', action: ()=>null},
                             {char: '=', action: ()=>null}];
    }

    updateNum(val) {
        this.setState({calculatorState: val.toString()})
    }

    render() {
        let rows = new Array(Math.ceil(this.buttonsList.length / rowLength))
        for (let i = 0, j = this.buttonsList.length; i < j; i+=rowLength) {
            rows[i] = this.buttonsList.slice(i, i+rowLength);
        }
        return(
            <div>
                <div>{this.state.textDisplay}</div>
                {rows.map(row => (
                    <div>
                        {row.map(buttonInfo => (
                            <CalcButton
                                char = {buttonInfo.char}
                                action = {buttonInfo.action}
                                parentComp = {this}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}