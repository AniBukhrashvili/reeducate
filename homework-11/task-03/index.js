const fs = require("fs");

const randomText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

fs.writeFile("text.txt", randomText, (err) => {
  if (err) {
    return console.log("Error: ", err);
  }

  console.log("Random text written to text.txt");

  fs.readFile("text.txt", "utf8", (err, data) => {
    if (err) {
      return console.log("Error reading from file", err);
    }

    const vowelCount = (data.match(/[aeiouAEIOU]/g) || []).length;
    console.log(`Number of vowels: ${vowelCount}`);
  });
});
