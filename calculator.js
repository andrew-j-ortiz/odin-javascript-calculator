// Operators 
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

// Operate
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
const domCalculatorButtons = document.getElementById("calculatorButtonsColumn");
const domClearButton = document.getElementById("buttonClear");

// Event listeners
domCalculatorButtons.addEventListener("click", (event)=>{handleCalculatorLogic(event)});
domClearButton.addEventListener("click", ()=>{clearCalculator()});

// Global variables
let firstNumberArray = [];
let secondNumberArray = [];
let intCurrentNumber = 1;
let strOperator = "";
let operation = []
let boolOperationEnded = false;

// Handle calculator logic 
function handleCalculatorLogic(e) {
    const event = whatIsEvent(e.target.textContent);

    // Handle event
    switch (event) {
        case "number":
            placeDigit(intCurrentNumber, Number(e.target.textContent));
            break;
        case "decimal":
            placeDecimal();
            break;
        case "operator":
            setOperator(e.target.textContent);
            break;
        case "equals":
            calculateOperation(operation);
            break;
    }

    // Change to second number
    if (firstNumberArray.length > 0 && secondNumberArray.length === 0 && strOperator !== "") {
        intCurrentNumber = 2;
        boolDecimalInputed = false;
    }

    // Calculate operation if user clicks on an operator
    // Set operator to clicked operator 
    if (
        firstNumberArray.length > 0 && secondNumberArray.length > 0 && 
        boolOperatorSet && event === "operator"
    ) {
        calculateOperation(operation);
        intCurrentNumber = 2;
        strOperator = e.target.textContent;
    }

    // Clear calculator if operation ended and user clicks on a number
    if (boolOperationEnded && event === "number" && strOperator === ""){
        clearCalculator();
        placeDigit(intCurrentNumber, Number(e.target.textContent));
        boolOperationEnded = false;
    }

    // Clear calculator if user attempted to divide by zero and clicks on a number
    if (boolDivideByZero && event === "number") {
        clearCalculator();
        placeDigit(intCurrentNumber, Number(e.target.textContent));
    }

    operation = [firstNumberArray.join(""), strOperator, secondNumberArray.join("")];
    domCalculatorScreen.innerHTML = operation.join("");
}

// Check what the event is
function whatIsEvent(event) {
    if (!Number.isNaN(Number(event))) {
        return "number";
    } else if (event === "+" || event === "-" || event === "x" || event === "÷") {
        return "operator";
    } else if (event === ".") {
        return "decimal";
    } else if (event === "=") {
        return "equals";
    } else {
        return "unkown";
    }
}

// Place digit on current number
function placeDigit(intCurrentNumber, intEventNumber) {
    if (intCurrentNumber === 1) {
        firstNumberArray.push(intEventNumber);
    } else if (intCurrentNumber === 2) {
        secondNumberArray.push(intEventNumber);
    }
}

// Place decmial on current number
let boolDecimalInputed = false;
function placeDecimal() {
    if (intCurrentNumber === 1){
        firstNumberArray.forEach(item =>{
            if (item === ".") {
                boolDecimalInputed = true;
            }
        })
    } else if (intCurrentNumber === 2) {
        secondNumberArray.forEach(item =>{
            if (item === "."){
                boolDecimalInputed = true;
            }
        })
    }

    if (!boolDecimalInputed && !boolDivideByZero){
        if (intCurrentNumber === 1){
            firstNumberArray.push(".");
            boolDecimalInputed = true;
            boolOperationEnded = false
        } else if (intCurrentNumber === 2){
            secondNumberArray.push(".");
            boolDecimalInputed = true;
            boolOperationEnded = false;
        }
    }
}

// Set operator
let boolOperatorSet = false;
function setOperator(operator) {
    if (operation[1] !== "" && secondNumberArray.length > 0) {
        boolOperatorSet = true;
    }

    if (!boolOperatorSet) {
        strOperator = operator;
    } 
}

// Give a funny message if user attempts to divide by zero
// Not the most elegant solution... but it works...
let boolDivideByZero = false;
function dividedByZero() {
    if (boolDivideByZero){
        firstNumberArray = [];
        secondNumberArray = [];
        strOperator = "";
        firstNumberArray.push("Are you trying to kill us all?");
    }
}

// Calculate operation
// Make sure user is not attempting to divide by zero
function calculateOperation(operation) {
    if (
        operation[0] === "0" && operation[1] === "÷" ||
        operation[2] === "0" && operation[1] === "÷"
    ) {
        boolDivideByZero = true;
        dividedByZero();
    } else if (operation[0].length > 0 && operation[2].length > 0 && !boolDivideByZero) {
        const intFirstNumber = Number(operation[0]);
        const intSecondNumber = Number(operation[2]);
        const intAnswer = operate(intFirstNumber, intSecondNumber, strOperator);
        strOperator = "";
        boolOperatorSet = false;
        intCurrentNumber = 1;
        firstNumberArray = String(intAnswer).split("");
        secondNumberArray = [];
        boolOperationEnded = true;
    }
}

// Clear
function clearCalculator() {
    firstNumberArray = [];
    secondNumberArray = [];
    intCurrentNumber = 1;
    strOperator = "";
    operation = [];
    boolDecimalInputed = false;
    boolOperatorSet = false;
    boolOperationEnded = false;
    boolDivideByZero = false;
    domCalculatorScreen.innerHTML = 0;
}