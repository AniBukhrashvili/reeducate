//1
const reverseWords = (str) => {
  return str.split(" ").reverse().join(" ");
};

const str = "Hello World";
const reversed = reverseWords(str);
console.log(reversed);

//2
function cleanNumbers(string) {
  return string.replace(/[0-9]/g, "");
}

const str2 = "This looks5 grea8t!";
const cleaned = cleanNumbers(str2);
console.log(cleaned);

//3
function doubleChars(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str[i] + str[i];
  }
  return result;
}

const str3 = "String";
console.log(doubleChars(str3));

//4
function abbreviations(name) {
  let result = "";
  const words = name.split(" ");

  for (let i = 0; i < words.length; i++) {
    result += words[i][0].toUpperCase();
    if (i < words.length - 1) {
      result += ".";
    }
  }

  return result;
}

const str4 = "Ani Bukhra";
console.log(abbreviations(str4));

//5
function getRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

console.log(getRandomString(4));
