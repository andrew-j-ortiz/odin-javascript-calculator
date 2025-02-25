// operator functions
// take two numbers and either add, substract, multiply, or divide

function add(intFirstNumber, intSecondNumber) {
    return intFirstNumber + intSecondNumber;
}

function substract(intFirstNumber, intSecondNumber) {
    return intFirstNumber - intSecondNumber
}

function multiply(intFirstNumber, intSecondNumber) {
    return intFirstNumber * intSecondNumber
}

function divide(intFirstNumber, intSecondNumber) {
    return intFirstNumber / intSecondNumber
}

// operate function
// takes three inputs, two numbers and an operator, depending on the operator it will either return an addition, substraction, multiplication, or division

function operate(intFirstNumber, intSecondNumber, operator) {
    switch (operator) {
        case "+":
            return add(intFirstNumber, intSecondNumber)
        case "-":
            return substract(intFirstNumber, intSecondNumber)
        case "*":
            return multiply(intFirstNumber, intSecondNumber)
        case "/":
            return divide(intFirstNumber, intSecondNumber)
        default:
            return "Error: incorrect inputs!"
    }
}