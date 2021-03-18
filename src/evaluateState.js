function evalSingular(left, op, right) {
    
}

export default function evaluateState(status) {
    for (operations of operationOrder) {
        for (let i = 0; i < status.length; i++) {
            if (operations.includes(status[i])) {
                status[i] = evalSingular(status[i-1], status[i], status[i+1])
            }
        }
    }
}