const https = require("https");
const fs = require("fs");

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk));

      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject("Error parsing JSON");
        }
      });
    });
  });
}

fetchData("https://jsonplaceholder.typicode.com/users")
  .then((users) => {
    const filteredUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));

    fs.writeFile("users.json", JSON.stringify(filteredUsers), (err) => {
      if (err) {
        console.error("Error: ", err);
      } else {
        console.log("Data written to users.json");
      }
    });
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
