const mainScreen = document.querySelector(".main-screen");
const temporaryScreen = document.querySelector(".temporary-screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const decimal = document.querySelector(".decimal");
const allClear = document.querySelector(".all-clear");

let fullOperation = [];
let count = -1;
let currentNumber = "0";
let prevNumber = "";
let currentOperator = "";
let prevOperator = "";
let result = "";
let prevResult = "0";
let blankResult = "";

const displayMainScreen = (number) => {
	mainScreen.value = number;
};
const displayTemporaryScreen = (number) => {
	temporaryScreen.value = number;
};

// click Numbers
const inputNumber = (number) => {
	count++;
	// start new calculation by clicking number after clicking equalSign
	if (result && !currentOperator && prevResult) {
		clear();
	}
	if (!prevOperator) {
		prevOperator = currentOperator;
	}
	currentOperator = "";
	// if input 0 is the first number, dont input
	if (currentNumber == "0" || currentNumber == prevResult) {
		currentNumber = number;
		fullOperation.push(number);
		// to delete 0 if you input two or more 0 after operator input
		if (fullOperation[count - 1] == "0" && currentNumber == "0") {
			fullOperation.splice(count);
			count--;
			if (
				fullOperation[count - 2] == "+" ||
				fullOperation[count - 2] == "-" ||
				fullOperation[count - 2] == "*" ||
				fullOperation[count - 2] == "/"
			) {
				fullOperation.splice(count);
			}
			// if you input other than 0 after inputting 0
		} else if (
			fullOperation[count - 1] == "0" &&
			currentNumber != "0"
		) {
			fullOperation.splice(count - 1, 1);
		}
	} else {
		currentNumber += number;
		fullOperation.push(number);
	}
};
numbers.forEach((number) => {
	number.addEventListener("click", (event) => {
		inputNumber(event.target.value);
		displayMainScreen(currentNumber);
		displayTemporaryScreen(fullOperation.join(""));
	});
});

// click Operators
const inputOperator = (operator) => {
	// to delete comma if theres no number after it
	if (fullOperation[count] == ".") {
		fullOperation.splice(count);
		count--;
		/*
		let temporarySplit = currentNumber.split("");
		temporarySplit.splice(count);
		currentNumber = temporarySplit.join("");
		displayMainScreen(currentNumber);
		*/
	}
	// to calculate previous number if you input another operator
	if (
		prevOperator == "+" ||
		prevOperator == "-" ||
		prevOperator == "*" ||
		prevOperator == "/"
	) {
		calculate();
		currentNumber = prevResult;
		prevResult = "";
		prevOperator = "";
	}
	// if Click the operator more than once (to change operator)
	if (
		currentOperator == "+" ||
		currentOperator == "-" ||
		currentOperator == "*" ||
		currentOperator == "/"
	) {
		switch (operator) {
			case "+":
				currentOperator = "+";
				fullOperation.splice(count);
				fullOperation.push(currentOperator);
				displayTemporaryScreen(fullOperation.join(""));
				break;
			case "-":
				currentOperator = "-";
				fullOperation.splice(count);
				fullOperation.push(currentOperator);
				displayTemporaryScreen(fullOperation.join(""));
				break;
			case "*":
				currentOperator = "*";
				fullOperation.splice(count);
				fullOperation.push(currentOperator);
				displayTemporaryScreen(fullOperation.join(""));
				break;
			case "/":
				currentOperator = "/";
				fullOperation.splice(count);
				fullOperation.push(currentOperator);
				displayTemporaryScreen(fullOperation.join(""));
				break;
			default:
				break;
		}
		//if theres no current number, dont display the operator
	} else if (currentNumber != "0") {
		count++;
		fullOperation.push(operator);
		currentOperator = operator;
		prevNumber = currentNumber;
		currentNumber = "0";
		displayTemporaryScreen(fullOperation.join(""));
	}
};
operators.forEach((operator) => {
	operator.addEventListener("click", (event) => {
		inputOperator(event.target.value);
	});
});
// click Decimal
const inputDot = (dot) => {
	if (currentNumber.includes(".")) {
		return;
		// add 0 in front of the dot if only input dot
	} else if (currentNumber == "0" && fullOperation[count] != "0") {
		currentNumber += dot;
		fullOperation.push("0", dot);
		count += 2;
	} else {
		currentNumber += dot;
		fullOperation.push(dot);
		count++;
	}
};
decimal.addEventListener("click", (event) => {
	inputDot(event.target.value);
	displayMainScreen(currentNumber);
	displayTemporaryScreen(fullOperation.join(""));
});

// click Equal Sign
const calculate = () => {
	switch (prevOperator) {
		case "+":
			prevResult =
				parseFloat(prevNumber) + parseFloat(currentNumber);
			break;
		case "-":
			prevResult =
				parseFloat(prevNumber) - parseFloat(currentNumber);
			break;
		case "*":
			prevResult =
				parseFloat(prevNumber) * parseFloat(currentNumber);
			break;
		case "/":
			prevResult =
				parseFloat(prevNumber) / parseFloat(currentNumber);
			break;
	}
};
equalSign.addEventListener("click", () => {
	calculate();
	// if clicking operator and then click result, ex: 1 + =
	if (currentOperator && prevNumber) {
		displayMainScreen(prevNumber);
		// after inputting number, operator, number; and then click result
	} else if (prevResult && prevNumber) {
		displayMainScreen(prevResult);
		result = prevResult;
		currentOperator = "";
		// if clicking number and then click result , ex: 1 =
	} else if (currentNumber) {
		displayMainScreen(currentNumber);
	}
});

// click AC / Clear Sign
const clear = () => {
	fullOperation = [];
	count = -1;
	currentNumber = "0";
	prevNumbers = "";
	currentOperator = "";
	prevOperator = "";
	result = "";
	prevResult = "0";
	temporaryResult = "";
};
allClear.addEventListener("click", () => {
	clear();
	displayMainScreen(currentNumber);
	displayTemporaryScreen(blankResult);
});