//1
function calculateDaysToWithdraw(amount, dayLimit, weekLimit) {
  let totalWithdrawn = 0;
  let days = 0;

  while (totalWithdrawn < amount) {
    days++;
    const weeklyWithdrawn = Math.min(weekLimit, amount - totalWithdrawn);
    const dailyWithdrawn = Math.min(dayLimit, weeklyWithdrawn);

    totalWithdrawn += dailyWithdrawn;

    if (days % 7 === 0) {
      if (totalWithdrawn >= amount) {
        break;
      }
    }
  }

  return days;
}

const amount = 4000;
const dayLimit = 200;
const weekLimit = 1000;

const daysNeeded = calculateDaysToWithdraw(amount, dayLimit, weekLimit);
console.log(daysNeeded);

//2
function foo(text, userAnswer) {
  const regex = /What is (\d+) (plus|minus) (\d+)\?/;
  const match = text.match(regex);

  if (!match) {
    return;
  }

  const a = parseInt(match[1]);
  const operator = match[2];
  const b = parseInt(match[3]);
  let correctAnswer;

  if (operator === "plus") {
    correctAnswer = a + b;
  } else if (operator === "minus") {
    correctAnswer = a - b;
  } else {
    return;
  }

  if (parseInt(userAnswer) === correctAnswer) {
    console.log("You're human");
  } else {
    console.log("You're a robot");
  }
}

foo("What is 5 plus 3?", "8");
foo("What is 5 minus 2?", "1");

//3
function drawRectangle(height, width) {
  for (let i = 0; i < height; i++) {
    let row = "";
    for (let j = 0; j < width; j++) {
      row += "#";
    }
    console.log(row);
  }
}

drawRectangle(3, 4);

//4
function isWideNumber(num) {
  const numStr = num.toString();
  const digitCount = numStr.length;

  const digitSum = numStr
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);

  return digitCount > digitSum;
}

console.log(isWideNumber(123));
console.log(isWideNumber(1000));
