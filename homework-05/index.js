//1
function logRandomUntilMatch(argumentNumber) {
  if (argumentNumber < 0 || argumentNumber > 10) {
    console.log("Argument number should be between 0 and 10");
    return;
  }

  const randomNumber = Math.floor(Math.random() * 11);
  console.log(randomNumber);

  if (randomNumber === argumentNumber) {
    console.log("argument number and random number are equal");
  }
}

logRandomUntilMatch(5);

//2
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sleepExample() {
  console.log("first");
  await sleep(2000);
  console.log("second");
}

sleepExample();
