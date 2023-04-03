let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";
let afterOperation = false
var secScreenInput = "";
let screenText = document.querySelector('.screen-text');


const calculatorScreen = document.querySelector(".calculator-screen");

const updateScreen = (number) => {
    calculatorScreen.value = number;

    if (calculatorScreen.value.length > 10 && calculatorScreen.value.length <= 14) {
        calculatorScreen.style.fontSize = "2em";
    } else if (calculatorScreen.value.length > 14) {
        calculatorScreen.style.fontSize = "1.8em";
    } else {
        calculatorScreen.style.fontSize = "2.5em";
    }
};

function updateSecScreenText(input) {
    secScreenInput += input;
    console.log(secScreenInput);
    screenText.textContent = secScreenInput;
}

const numbers = document.querySelectorAll(".number");

const inputNumber = (number) => {
    if (currentNumber === "0" || afterOperation) {
        currentNumber = number;
        afterOperation = false;
    } else {
        currentNumber += number;

    }
};



numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        //console.log(event.target.value)
        inputNumber(event.target.value);
        updateSecScreenText(event.target.value);

        updateScreen(currentNumber);
    });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
        if (event.target.value === "%") {
            calculate();
            updateScreen(currentNumber);
        }
        updateSecScreenText(event.target.value);

    });
});

const inputOperator = (operator) => {
    if (!calculationOperator) {
        prevNumber = currentNumber;
        calculationOperator = operator;
        afterOperation = true;
    } else if (!afterOperation) {
        calculate();
        prevNumber = currentNumber;
        calculationOperator = operator;
        afterOperation = true;
        updateScreen(currentNumber);
    } else {
        calculationOperator = operator;
    }
};

const equalSign = document.querySelector(".equal-sign");

equalSign.addEventListener("click", () => {
    calculate();
    updateScreen(currentNumber);
    screenText.textContent = currentNumber;
    secScreenInput = "";
});

const calculate = () => {
    if (!afterOperation) {
        let result = "";
        switch (calculationOperator) {
            case "*":
                result = parseFloat(prevNumber) * parseFloat(currentNumber);
                break;
            case "/":
                result = parseFloat(prevNumber) / parseFloat(currentNumber);
                break;
            case "%":
                result = parseFloat(prevNumber) / parseFloat(100);
                break;
            case "+":
                result = parseFloat(prevNumber) + parseFloat(currentNumber);
                break;
            case "-":
                result = parseFloat(prevNumber) - parseFloat(currentNumber);
                break;
            default:
                return;
        }
        currentNumber = result;
    }
    afterOperation = true;
    calculationOperator = "";

};
const clearBtn = document.querySelector(".all-clear");

clearBtn.addEventListener("click", (event) => {
    // console.log(event.target.value);
    claerAll();
    updateScreen(currentNumber);
});

const claerAll = () => {
    prevNumber = "";
    calculationOperator = "";
    currentNumber = "0";
    screenText.textContent = "";
    secScreenInput = "";
};

const decimal = document.querySelector(".decimal");

decimal.addEventListener("click", (event) => {
    //console.log(event.target.value)
    inputDecimal(event.target.value);
    updateSecScreenText(event.target.value);

    updateScreen(currentNumber);
});

inputDecimal = (dot) => {
    if (currentNumber.includes(".")) {
        return;
    }
    currentNumber += dot;
};


// keyword enter:
    let btns = document.querySelectorAll('button');

    document.addEventListener("keyup", function (event) {
        if (event.keyCode != 13) {
            for (var i = 0; i < btns.length; i++) {
                var id = btns[i].getAttribute("data-id");
                if (id == event.key) {
                    btns[i].click();
                    btns[i].classList.toggle('button-clicked');
                }else{
                    btns[i].classList.remove('button-clicked');
                }
            }
        } else {
            document.getElementById("equal").click();
        }
    }, false);
