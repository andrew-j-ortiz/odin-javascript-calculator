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
        case "x":
            return multiply(intFirstNumber, intSecondNumber)
        case "÷":
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
let intFirstNumber = 0;
let intSecondNumber = 0;

let operator = "";
let firstNumberInputed = false;

function handleCalculatorLogic(event) {
    const intEventNumber = Number(event.target.textContent);
    const eventIsNotNumber = Number.isNaN(intEventNumber);

    // Get first number
    if (!eventIsNotNumber && !firstNumberInputed) {
        firstNumberArray.push(intEventNumber) 
        intFirstNumber = Number(firstNumberArray.join(""));
        domCalculatorScreen.innerHTML = intFirstNumber;
    } 
    
    // Get operator
    if (eventIsNotNumber && event.target.textContent !== "C" &&
        event.target.textContent !== "=" && operator === "" &&
        secondNumberArray.length === 0
    ) {
        firstNumberInputed = true;
        operator = event.target.textContent;
        domCalculatorScreen.innerHTML += operator;
    }

    // Get second number
    if (!eventIsNotNumber && firstNumberInputed) {
        secondNumberArray.push(intEventNumber);
        intSecondNumber = Number(secondNumberArray.join(""));
        domCalculatorScreen.innerHTML += intEventNumber;
    } 

    // Get operation result
    if (
        intFirstNumber === 0 && operator === "÷" && event.target.textContent === "=" || 
        intSecondNumber === 0 && operator === "÷" && event.target.textContent == "="
    ){
        domCalculatorScreen.innerHTML = "Are you trying to kill us all?"
        firstNumberArray = [];
        secondNumberArray = [];
        operator = "";
        intEventNumber = 0;
        intSecondNumber = 0;
        firstNumberInputed = false;
    } else if (
        firstNumberInputed && secondNumberArray.length > 0 && event.target.textContent === "="
    ) {
        const intAnswer = operate(intFirstNumber, intSecondNumber, operator);
        domCalculatorScreen.innerHTML = intAnswer;
        operator = "";
        secondNumberArray = [];
        intFirstNumber = intAnswer;
    } else if (
        firstNumberInputed && secondNumberArray.length > 0 && event.target.textContent === "+" ||
        firstNumberInputed && secondNumberArray.length > 0 && event.target.textContent === "-" ||
        firstNumberInputed && secondNumberArray.length > 0 && event.target.textContent === "x" ||
        firstNumberInputed && secondNumberArray.length > 0 && event.target.textContent === "÷"
    ){
        const intAnswer = operate(intFirstNumber, intSecondNumber, operator);
        domCalculatorScreen.innerHTML = intAnswer;
        operator = event.target.textContent;
        secondNumberArray = [];
        intFirstNumber = intAnswer;
        domCalculatorScreen.innerHTML += event.target.textContent
    }

    // Clear
    if (event.target.textContent === "C") {
        firstNumberArray = [];
        secondNumberArray = [];
        operator = "";
        intFirstNumber = 0;
        intSecondNumber = 0;
        domCalculatorScreen.innerHTML = intFirstNumber;
        firstNumberInputed = false;
    }
}
