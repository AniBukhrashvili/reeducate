const fs = require("fs");

const [, , carModel, carReleaseDate, carColor] = process.argv;

const car = {
  id: Date.now(),
  carModel: carModel,
  carColor: carColor,
  carReleaseDate: carReleaseDate,
};

fs.readFile("cars.json", "utf8", (err, data) => {
  let cars = [];

  if (!err && data) {
    cars = JSON.parse(data);
  }

  cars.push(car);

  fs.writeFile("cars.json", JSON.stringify(cars), (err) => {
    if (err) {
      console.error("Error: ", err);
    } else {
      console.log("Car added to cars.json");
    }
  });
});
