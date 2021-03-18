const operationOrder = [['.'],['x','÷'],['+','-']]

function evalSingular(left, op, right) {
    switch(op) {
        case '+':
            return left+right
        case '-':
            return left-right
        case 'x':
            return left*right
        case '÷':
            return left/right
        case '.':
            return left + right / 10**right.toString().length
        default:
            return 0
    }
}

export default function evaluateState(status) {
    for (let operations of operationOrder) {
        for (let i = 0; i < status.length; i++) {
            if (operations.includes(status[i])) {
                status[i+1] = evalSingular(status[i-1], status[i], status[i+1])
                status.splice(i-1, 2)
                i-=2
            }
        }
    }
    status = [[Math.round(status[0]*1000000000)]/1000000000]
    status = status[0].toString().split('.')
    if (status.length>1) {
        status.push(status[status.length-1])
        status[1] = '.'
        status[2]=parseInt(status[2])
    }
    status[0]=parseInt(status[0])
    return status
}