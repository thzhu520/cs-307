// module.js
function sum(a, b) {
    return a + b;
}

function div(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

function containsNumbers(text) {
    for (let i = 0; i < text.length; i++) {
        //the bug in containsNumbers is 'isNaN', it checks if the value is "not a number," 
        //but it doesn't handle number-like characters properly, 
        //so we swap to Number.isNaN after converting the character to a number to ensure correct detection.
        if (!Number.isNaN(Number(text.charAt(i)))) {
            return true;
        }
    }
    return false;
}

export default { sum, div, containsNumbers };
