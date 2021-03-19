export default function Display(props) {
    // Simply render the display status a sequence of strings
    return(
        <div className="display">
            <div className="expressionDisplay">
                {(props.displayStatus.listItems.map(
                    (item, idx, listItems) => 
                        // under these conditions don't space seperate items
                        (item.val==='.' || 
                        item.val==='('  || 
                        listItems[(idx+1)%listItems.length].val === ')' ||
                        listItems[(idx+1)%listItems.length].val === '.') ? 
                            item.val.toString() : 
                            // otherwise do
                            item.val.toString()+' '
                )).join('')}
            </div>
            <div className="degDisplay">
                {props.degrees ? "deg" : "rad"}
            </div>
        </div>
    )
}