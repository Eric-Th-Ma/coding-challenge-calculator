export default function Display(props) {
    // Simply render the display status a sequence of strings
    return(
        <div className="display">
            {props.displayStatus.listItems.map(
                item => item.val.toString()
            )}
        </div>
    )
}