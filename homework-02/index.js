//1
function countDigits(arr) {
  return arr.map((num) => String(num).length);
}

const array1 = [123, 45, 6];
const res1 = countDigits(array1);
console.log(res1);

//2
function reverseArray(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

const array2 = [11, 2, 3];
const res2 = reverseArray(array2);
console.log(res2);

//3
function sumOfSquares(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i] * arr[i];
  }
  return sum;
}

const array3 = [1, 1, 1];
const res3 = sumOfSquares(array3);
console.log(res3);

//4
function countTotalCharacters(arr) {
  let totalCount = 0;
  for (let i = 0; i < arr.length; i++) {
    totalCount += arr[i].length;
  }
  return totalCount;
}

const array4 = ["a", "ab", "abc"];
const res4 = countTotalCharacters(array4);
console.log(res4);

//5
function isPalindrome(word) {
  const reversedWord = word.split("").reverse().join("");
  return word === reversedWord;
}

function findPalindromes(arr) {
  const palindromes = [];
  for (let i = 0; i < arr.length; i++) {
    if (isPalindrome(arr[i])) {
      palindromes.push(arr[i]);
    }
  }
  return palindromes;
}

const array5 = ["level", "giga", "ana", "button", "abba"];
const res5 = findPalindromes(array5);
console.log(res5);

//6
function filterSpecialCharacters(arr) {
  const filteredArray = [];
  const removedWords = [];

  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  for (let i = 0; i < arr.length; i++) {
    if (specialCharRegex.test(arr[i])) {
      removedWords.push(arr[i]);
    } else {
      filteredArray.push(arr[i]);
    }
  }

  return {
    filteredArray,
    removedWords,
  };
}

const array6 = ["hello", "world!", "good#morning", "test", "example@"];
const res6 = filterSpecialCharacters(array6);
console.log("Filtered Array:", res6.filteredArray);
console.log("Removed Words:", res6.removedWords);
