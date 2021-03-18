import React, { Component } from "react";
import CalcButton from './CalcButton.js'
import Display from './Display.js';
import {StateList} from './stateList.js';

const rowLength = 5

const addToStateButtons = ['AC','(',')','Copy','Paste','1','2','3','+','-','4','5','6','x','÷','7','8','9','.','=','0']

export default class Calculator extends Component {
    constructor(props) {

        super(props);

        this.state = {displayStatus: new StateList(), memory: []}
    }

    addToState(char) {
        let newStatus = this.state.displayStatus
        newStatus.tryAddItem(char)
        this.setState({displayStatus: newStatus})
    }

    render() {
        let rows = new Array(Math.ceil(addToStateButtons.length / rowLength))
        for (let i = 0, j = addToStateButtons.length; i < j; i+=rowLength) {
            rows[i] = addToStateButtons.slice(i, i+rowLength);
        }
        console.log(this.state.displayStatus)
        return(
            <div>
                <div><Display displayStatus = {this.state.displayStatus}/></div>
                {rows.map(row => (
                    <div key = {"row of " + row[0]}>
                        {row.map(buttonChar => (
                            <CalcButton
                                char = {buttonChar}
                                action = {()=>this.addToState(buttonChar)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}