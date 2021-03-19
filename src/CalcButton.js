export default function CalcButton(props) {
    // render a button with the correct character and action on a click
    if (props.char==='') {
        // spacers take up the space of button but are not buttons
        return <div className="spacer"></div>
    } else if (props.char==='=') {
        // the equals button is special. It is red, and wide
        return <button onClick = {props.action} key = {props.char} className="equals">
                    {props.char}
                </button>
    } else if (props.char==='=2') {
        // following or preceding the extra wide equals button must be a '=2' which takes up no space
        return null
    }
    return (
        <button onClick = {props.action} key = {props.char}>
            {props.char}
        </button>
    )
}