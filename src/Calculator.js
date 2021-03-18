import React, { Component } from "react";
import CalcButton from './CalcButton.js'
import Display from './Display.js';
import StateList from './stateList.js';

const rowLength = 5

const allButtons = ['AC','(',')','Copy','Paste','1','2','3','+','-','4','5','6','x','÷','7','8','9','.','=','0']
const addToStateButtons = ['(',')','Copy','Paste','1','2','3','+','-','4','5','6','x','÷','7','8','9','.','0']

export default class Calculator extends Component {
    constructor(props) {

        super(props);

        this.state = {displayStatus: new StateList(), memory: []}

        this.addToState = this.addToState.bind(this)
    }

    evaluate() {
        let newState = this.state.displayStatus
        newState.evaluate()
        this.setState({displayStatus: newState})
    }

    addToState(char) {
        let newStatus = this.state.displayStatus
        newStatus.tryAddItem(char)
        this.setState({displayStatus: newStatus})
    }

    render() {
        let otherButtonFunctions = {
            'AC': () => this.setState({displayStatus: new StateList()}),
            '=' : () => {
                let newState = this.state.displayStatus
                newState.evaluate()
                this.setState({displayStatus: newState})
            }
        }
        let rows = new Array(Math.ceil(allButtons.length / rowLength))
        for (let i = 0, j = allButtons.length; i < j; i+=rowLength) {
            rows[i] = allButtons.slice(i, i+rowLength);
        }
        return(
            <div>
                <div><Display displayStatus = {this.state.displayStatus}/></div>
                {rows.map(row => (
                    <div key = {"row of " + row[0]}>
                        {row.map(buttonChar => (
                            addToStateButtons.includes(buttonChar) ?
                                <CalcButton
                                    char = {buttonChar}
                                    action = {()=>this.addToState(buttonChar)}
                                    key = {buttonChar}
                                />
                            :
                                <CalcButton
                                    char = {buttonChar}
                                    action = {otherButtonFunctions[buttonChar]}
                                    key = {buttonChar}
                                />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}