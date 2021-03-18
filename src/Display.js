import React, { Component } from "react";

export default class Display extends Component {
    render() {
        return(
            <div>{this.props.displayStatus.listItems.map(item => item.val.toString())}</div>
        )
    }
}