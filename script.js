const numericButtons = document.querySelectorAll('.number');
const display = document.getElementById('display');
let operand1;
let operand2;
let operator;
let resetDisplay = false;

/*
    The display will be in a start state when a 0 is on the screen. 
    The display wil be in a computing state in which there is one operand and operator is set,
    so the display will reset to display the new number being entered.
*/
numericButtons.forEach((elem) => 
    elem.addEventListener("click",() => {
        if(display.textContent.length === 25) return;
        if(display.textContent === "0" || resetDisplay){
            display.textContent = elem.value;
            resetDisplay = false;
        }   
        else
            display.textContent = display.textContent + elem.value;

    }));

const operatorButtons = document.querySelectorAll('.operator');

function add(num1, num2) {
    return num1+num2;
}

function subtract(num1, num2) {
    return num1-num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

const mathFunctions = {
    add,
    subtract,
    divide,
    multiply
}

operatorButtons.forEach((elem) => 
    elem.addEventListener("click", () => {
        switch(elem.value) {
            case "add":
            case "subtract":
            case "multiply":
            case "divide":
            case "equal":
                //if there is already an operator1 and operand, evaluate the expression
                if(operand1 !== undefined && operator !== undefined) {
                    operand2 = +display.textContent;
                    operand1 = mathFunctions[operator](operand1,operand2);
                    operator = elem.value.includes("equal") || elem.value.includes(".") ? operator : elem.value;
                    operand2 = undefined;
                    display.textContent = operand1;
                    
                } else if(elem.value !== "equal"){
                    operator = elem.value;
                    operand1 = +display.textContent;
                }
                resetDisplay = true;

                break;
            case "clear":
                operand1 = undefined;
                operand2 = undefined;
                operator = undefined;
                display.textContent = '0';
                break;
            case "percent":
                display.textContent = +display.textContent * .10;
                break;
            case ".":
                if(!display.textContent.includes(".")) display.textContent = display.textContent.concat(".");
            case "toggle":
                display.textContent = +display.textContent * -1;
        }
    }));