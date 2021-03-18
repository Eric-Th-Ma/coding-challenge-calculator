export default function CalcButton(props) {
    return (
        <button onClick = {props.action} key = {props.char}>
            {props.char}
        </button>
    )
}