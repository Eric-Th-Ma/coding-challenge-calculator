export default function Display(props) {
    return(
        <div className="display">
            {props.displayStatus.listItems.map(
                item => item.val.toString()
            )}
        </div>
    )
}