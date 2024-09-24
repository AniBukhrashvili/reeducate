//1
function findDivisibleByFive(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 5 === 0) {
      return i;
    }
  }
  return -1;
}

const array1 = [3, 6, 10, 12];
const res1 = findDivisibleByFive(array1);
console.log(res1);

//2
function filterNegativeNumbers(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] >= 0) {
        result.push(arr[i][j]);
      }
    }
  }

  return result;
}

const array2 = [[1, -2], [3, -4], [5]];
const res2 = filterNegativeNumbers(array2);
console.log(res2);

//3
function checkNestingArrays(arr) {
  const filteredArrays = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      filteredArrays.push(arr[i]);
    }
  }

  return filteredArrays.length > 0;
}

const array3 = [1, [2, 3], "hello", [4]];
const res3 = checkNestingArrays(array3);
console.log(res3);

//4
function sumOfElements(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      sum += arr[i][j];
    }
  }

  return sum;
}

const array4 = [
  [2, 4],
  [6, 8],
];
const res4 = sumOfElements(array4);
console.log(res4);

//5
function squareAndSumOfElements(arr) {
  let sumOfSquares = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = arr[i][j];
      sumOfSquares += number * number;
    }
  }

  return sumOfSquares;
}

const array5 = [
  [2, 4],
  [6, 8],
];
const res5 = squareAndSumOfElements(array5);
console.log(res5);

//6
const characters = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    eye_color: "blue",
    gender: "male",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    eye_color: "yellow",
    gender: "male",
  },
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    eye_color: "brown",
    gender: "female",
  },
  {
    name: "Anakin Skywalker",
    height: "188",
    mass: "84",
    eye_color: "blue",
    gender: "male",
  },
];

function countByEyeColor(characters) {
  const eyeColorCount = {};

  for (let i = 0; i < characters.length; i++) {
    let eyeColor = characters[i].eye_color;

    if (eyeColorCount[eyeColor]) {
      eyeColorCount[eyeColor]++;
    } else {
      eyeColorCount[eyeColor] = 1;
    }
  }

  return eyeColorCount;
}

const res6 = countByEyeColor(characters);
console.log(res6);
