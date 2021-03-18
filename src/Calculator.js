import React, { Component } from "react";
import CalcButton from './CalcButton.js'
import Display from './Display.js';
import StateList from './stateList.js';

const rowLength = 5

const allButtons = ['AC','(',')','Copy','Paste','1','2','3','+','-','4','5','6','x','÷','7','8','9','.','=','0']
const addToStateButtons = ['(',')','1','2','3','+','-','4','5','6','x','÷','7','8','9','.','0']

export default class Calculator extends Component {
    constructor(props) {

        super(props);

        this.state = {displayStatus: new StateList(), memory: new StateList()}

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
            },
            'Copy': () => {
                let stateCopy = new StateList()
                // deep copy the current status to memory
                stateCopy.listItems = this.state.displayStatus.listItems.map(x=>x)
                this.setState({memory: stateCopy})},
            'Paste': () => {
                let newState = this.state.displayStatus
                newState.joinWith(this.state.memory)
                this.setState({displayStatus: newState})
            }
        }
        console.log(this.state)
        let rows = new Array(Math.ceil(allButtons.length / rowLength))
        for (let i = 0, j = allButtons.length; i < j; i+=rowLength) {
            rows[i] = allButtons.slice(i, i+rowLength);
        }
        return(
            <div className = "calculator">
                <div>
                    <Display displayStatus = {this.state.displayStatus}/>
                </div>
                {rows.map(row => (
                    <div key = {"row of " + row[0]}>
                        {row.map(buttonChar => (
                            <CalcButton
                                char = {buttonChar}
                                action = {addToStateButtons.includes(buttonChar) ?
                                          ()=>this.addToState(buttonChar) :
                                          otherButtonFunctions[buttonChar]
                                }
                                key = {buttonChar}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}