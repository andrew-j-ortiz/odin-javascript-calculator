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

// Handle calculator logic 
function handleCalculatorLogic(e) {
    const event = whatIsEvent(e.target.textContent);

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

    if (!boolDecimalInputed){
        if (intCurrentNumber === 1){
            firstNumberArray.push(".");
            boolDecimalInputed = true;
        } else if (intCurrentNumber === 2){
            secondNumberArray.push(".");
            boolDecimalInputed = true;
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

// Calculate operation
function calculateOperation(operation) {
    if (operation[0].length > 0 && operation[2].length > 0) {
        const intFirstNumber = Number(operation[0]);
        const intSecondNumber = Number(operation[2]);
        const intAnswer = operate(intFirstNumber, intSecondNumber, strOperator);
        strOperator = "";
        boolOperatorSet = false;
        intCurrentNumber = 1;
        firstNumberArray = String(intAnswer).split("");
        secondNumberArray = [];
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
    domCalculatorScreen.innerHTML = 0;
}

/*function handleCalculatorLogic(event) {
    const intEventNumber = Number(event.target.textContent);
    const eventIsNotNumber = Number.isNaN(intEventNumber);

    // Get first number
    if (!eventIsNotNumber && !firstNumberInputed &&
        domCalculatorScreen.innerHTML === "0" &&
        event.target.id !== "calculatorScreen" ||
        !eventIsNotNumber && !firstNumberInputed &&
        domCalculatorScreen.innerHTML === "Are you trying to kill us all?" &&
        event.target.id !== "calculatorScreen"
    ) {
        firstNumberArray.push(intEventNumber) 
        intFirstNumber = Number(firstNumberArray.join(""));
        domCalculatorScreen.innerHTML = intFirstNumber;
    } else if (
        !eventIsNotNumber && !firstNumberInputed &&
        event.target.id !== "calculatorScreen"
    ) {
        firstNumberArray.push(intEventNumber) 
        intFirstNumber = Number(firstNumberArray.join(""));
        domCalculatorScreen.innerHTML += intEventNumber;
    } else if (event.target.textContent === "." && !firstNumberInputed && !decimalInputed
    ) {
        firstNumberArray.push(".");
        domCalculatorScreen.innerHTML += event.target.textContent;
        decimalInputed = true;
    }
    
    // Get operator
    if (eventIsNotNumber && 
        event.target.textContent !== "C" &&
        event.target.textContent !== "." && 
        event.target.textContent !== "=" &&
        operator === "" && 
        secondNumberArray.length === 0
    ) {
        firstNumberInputed = true;
        operator = event.target.textContent;
        domCalculatorScreen.innerHTML += operator;
        decimalInputed = false;
    }

    // Get second number
    if (!eventIsNotNumber && firstNumberInputed) {
        secondNumberArray.push(intEventNumber);
        intSecondNumber = Number(secondNumberArray.join(""));
        domCalculatorScreen.innerHTML += intEventNumber;
    } else if (
        event.target.textContent === "." && firstNumberInputed && !decimalInputed
    ) {
        secondNumberArray.push(".");
        domCalculatorScreen.innerHTML += event.target.textContent;
        decimalInputed = true;
    } 

    // Get operation result
    if (
        intFirstNumber === 0 && operator === "÷" && event.target.textContent === "=" || 
        intSecondNumber === 0 && operator === "÷" && event.target.textContent == "="
    ) {
        domCalculatorScreen.innerHTML = "Are you trying to kill us all?"
        clearCalculator();
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
    ) {
        const intAnswer = operate(intFirstNumber, intSecondNumber, operator);
        domCalculatorScreen.innerHTML = intAnswer;
        operator = event.target.textContent;
        secondNumberArray = [];
        intFirstNumber = intAnswer;
        domCalculatorScreen.innerHTML += event.target.textContent
    }

    // Clear
    if (event.target.textContent === "C") {
        clearCalculator();
        domCalculatorScreen.innerHTML = intFirstNumber;
   }
}

function clearCalculator() {
    firstNumberArray = [];
    secondNumberArray = [];
    operator = "";
    intFirstNumber = 0;
    intSecondNumber = 0;
    firstNumberInputed = false;
    decimalInputed = false;
}*/