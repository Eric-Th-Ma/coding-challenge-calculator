const operationOrder = [['.'],['(',')'],['x','÷'],['+','-']]
const binOps = ['.','x','÷','+','-']

function evalSingular(status, index) {
    let left = status[index-1]
    let op = status[index]
    let right = status[index+1]
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
                // if this is a binary operation we will evaluate it and overwrite three terms with the result
                if (binOps.includes(status[i])) {
                    status[i+1] = evalSingular(status, i)
                    status.splice(i-1, 2)
                    i-=2
                // if this is a parenthetical we will evaluate the whole thing and then enter the result in its place
                } else if (status[i]==='(') {
                    let noClose = true
                    for (let j = i; j < status.length; j++) {
                        if (status[j]===')') {
                            noClose = false
                            let result = evaluateState(status.slice(i+1,j))
                            status.splice(i,j-i)
                            status[i]=result
                        }
                    }
                    // if we could not find a closing paren we return NaN
                    if (noClose) {
                        status = [NaN]
                    }
                }
            }
        }
    }
    // round early enough to avoid floating point errors
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