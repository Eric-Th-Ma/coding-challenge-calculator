import React, { Component } from "react";

export default class Display extends Component {
    render() {
        return(
            <div>{this.props.displayStatus.map(statusElement => statusElement.toString())}</div>
        )
    }
}