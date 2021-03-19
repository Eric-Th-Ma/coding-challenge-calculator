export default function CalcButton(props) {
    // render a button with the correct character and action on a click
    if (props.char==='') {
        return <div className="spacer"></div>
    } else if (props.char==='=') {
        return <button onClick = {props.action} key = {props.char} className="equals">
                    {props.char}
                </button>
    } else if (props.char==='=2') {
        return null
    }
    return (
        <button onClick = {props.action} key = {props.char}>
            {props.char}
        </button>
    )
}