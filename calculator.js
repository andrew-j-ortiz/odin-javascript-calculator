// operator functions
// take two numbers and either add, substract, multiply, or divide

function add(intFirstNumber, intSecondNumber) {
    return intFirstNumber + intSecondNumber
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

// DOM elements
const domCalculator = document.getElementById("calculator");
const domCalculatorScreen = document.getElementById("calculatorScreen");

// Event listeners
domCalculator.addEventListener("click", (event)=>{
    handleCalculatorLogic(event);
})

// Handle calculator logic and update UI

// Variables
let firstNumberArray = [];
let secondNumberArray = [];
let operator = "";
let intFirstNumber = 0;
let intSecondNumber = 0;

function handleCalculatorLogic(event) {
    // Get first number
    if (!Number.isNaN(Number(event.target.textContent)) && operator === "") {
        firstNumberArray.push(Number(event.target.textContent)) 
        intFirstNumber = Number(firstNumberArray.join(""));
        domCalculatorScreen.innerHTML = intFirstNumber;
    } 
    
    // Get operator
    if (Number.isNaN(Number(event.target.textContent)) &&
        event.target.textContent !== "C" &&
        event.target.textContent !== "=") {
            operator = event.target.textContent;
            domCalculatorScreen.innerHTML = operator;
    }

    // Get second number
    if (!Number.isNaN(Number(event.target.textContent)) && operator !== "") {
        secondNumberArray.push(Number(event.target.textContent));
        intSecondNumber = Number(secondNumberArray.join(""));
        domCalculatorScreen.innerHTML = intSecondNumber;
    }

    if (event.target.textContent === "=" &&
        firstNumberArray.length !== 0 && 
        secondNumberArray.length !== 0) {
            const intAnswer = operate(intFirstNumber, intSecondNumber, operator);
            domCalculatorScreen.innerHTML = intAnswer;
    }

    if (event.target.textContent === "C") {
        firstNumberArray = [];
        secondNumberArray = [];
        operator = "";
        intFirstNumber = 0;
        intSecondNumber = 0;
        domCalculatorScreen.innerHTML = intFirstNumber;
    }
}
