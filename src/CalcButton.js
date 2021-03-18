export default function CalcButton(props) {
    // render a button with the correct character and action on a click
    return (
        <button onClick = {props.action} key = {props.char}>
            {props.char}
        </button>
    )
}