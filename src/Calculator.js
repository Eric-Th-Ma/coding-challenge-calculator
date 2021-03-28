import React, { Component } from "react";
import CalcButton from './CalcButton.js'
import Display from './Display.js';
import StateList from './stateList.js';

// Number of buttons in each row of calculator buttons
const rowLength = 5

// List of all buttons on calculator
const allButtons = ['AC','(',')','Copy','Paste',
                    'DEL','e','log10','ln','^',
                    'rad/deg','π','sin','cos','tan',
                    '1','2','3','+','x',
                    '4','5','6','-','÷',
                    '7','8','9','=','=2',
                    '.','0','','','']

// List of buttons that only require a call to addToState
const addToStateButtons = ['e','log10','ln','^','sin','cos','tan','(',')','1','2','3','+','-','4','5','6','x','÷','7','8','9','.','0','π']

export default class Calculator extends Component {
    constructor(props) {

        super(props);

        // function bindings
        this.evaluate = this.evaluate.bind(this)
        this.addToState = this.addToState.bind(this)

        // Initialize the state
        this.state = {displayStatus: new StateList(), memory: new StateList(), degrees: true}
    }

    evaluate() {
        // Call the state objects evaluate function to reduce expression to a single value

        let newState = this.state.displayStatus
        newState.evaluate()
        this.setState({displayStatus: newState})
    }

    addToState(char) {
        // Request addition to display to reflect button press

        let newStatus = this.state.displayStatus
        newStatus.tryAddItem(char)
        this.setState({displayStatus: newStatus})
    }

    render() {
        
        // Create object mapping some buttons to their functionality
        let otherButtonFunctions = {
            'rad/deg': () => this.setState({degrees: !this.state.degrees}),
            'AC': () => this.setState({displayStatus: new StateList()}),
            '=' : () => {
                let newState = this.state.displayStatus
                newState.evaluate(this.state.degrees)
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
            },
            'DEL': () => {
                if (this.state.displayStatus.listItems.length > 1) {
                    let newState = this.state.displayStatus
                    newState.listItems.splice(newState.listItems.length-1)
                    this.setState({displayStatus: newState})
                } else {
                    this.setState({displayStatus: new StateList()})
                }
            }
        }

        // Break up list of buttons into list of rows
        let rows = new Array(Math.ceil(allButtons.length / rowLength))
        for (let i = 0, j = allButtons.length; i < j; i+=rowLength) {
            rows[i] = allButtons.slice(i, i+rowLength);
        }

        return(
            <div className = "calculator">

                <Display displayStatus = {this.state.displayStatus} degrees={this.state.degrees}/>

                {// map each row to a row object filled with buttons
                 rows.map(row => (
                    <div key = {"row of " + row[0]}>
                        {// map each row of button texts to button objects
                         row.map((buttonChar, idx) => (
                            <CalcButton
                                char = {buttonChar}
                                action = {// check if the button requires an addToState call or a function lookup
                                          addToStateButtons.includes(buttonChar) ?
                                          ()=>this.addToState(buttonChar) :
                                          otherButtonFunctions[buttonChar]
                                }
                                key = {buttonChar + idx.toString()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}