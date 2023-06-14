let display = document.getElementById('display');
let answer = '';

function appendToDisplay(value) {
  display.value += value;
}

function calculate() {
  try {
    let result = eval(display.value);
    display.value = result;
    answer = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function calculateModulo() {
  try {
    let expression = display.value.split('%');
    if (expression.length === 2) {
      let dividend = parseFloat(expression[0]);
      let divisor = parseFloat(expression[1]);
      let result = dividend % divisor;
      display.value = result;
      answer = result;
    } else {
      display.value = 'Error';
    }
  } catch (error) {
    display.value = 'Error';
  }
}


function calculateSquareRoot() {
  try {
    let result = Math.sqrt(eval(display.value));
    display.value = result;
    answer = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteLastCharacter() {
  display.value = display.value.slice(0, -1);
}

function useAnswer() {
  display.value += answer;
}


