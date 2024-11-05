#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs/promises";
import path from "path";

const program = new Command();
const filePath = path.join(process.cwd(), "cars.json");

async function readCars() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeCars(cars) {
  await fs.writeFile(filePath, JSON.stringify(cars));
}

program
  .command("add")
  .argument("<name>")
  .argument("<price>")
  .argument("<color>")
  .description("Add a new car")
  .action(async (name, price, color) => {
    const cars = await readCars();
    const newCar = {
      id: cars.length ? cars[cars.length - 1].id + 1 : 1,
      name,
      price: parseFloat(price),
      color,
    };
    cars.push(newCar);
    await writeCars(cars);
    console.log(`Added car: ${JSON.stringify(newCar)}`);
  });

program
  .command("delete")
  .argument("<id>")
  .description("Delete a car by ID")
  .action(async (id) => {
    const cars = await readCars();
    const updatedCars = cars.filter((car) => car.id !== parseInt(id));
    await writeCars(updatedCars);
    console.log(`Deleted car with ID: ${id}`);
  });

program
  .command("show")
  .description("Show all cars")
  .action(async () => {
    const cars = await readCars();
    console.log("All Cars:");
    cars.forEach((car) => {
      console.log(
        `${car.id}: ${car.name}, Price: ${car.price}, Color: ${car.color}`
      );
    });
  });

program
  .command("update")
  .argument("<id>")
  .argument("<name>")
  .argument("<price>")
  .argument("<color>")
  .description("Update a car by ID")
  .action(async (id, name, price, color) => {
    const cars = await readCars();
    const carIndex = cars.findIndex((car) => car.id === parseInt(id));
    if (carIndex !== -1) {
      cars[carIndex] = {
        id: parseInt(id),
        name,
        price: parseFloat(price),
        color,
      };
      await writeCars(cars);
      console.log(`Updated car: ${JSON.stringify(cars[carIndex])}`);
    } else {
      console.error(`Car with ID ${id} not found.`);
    }
  });

program
  .command("get")
  .argument("<id>")
  .description("Get a car by ID")
  .action(async (id) => {
    const cars = await readCars();
    const car = cars.find((car) => car.id === parseInt(id));
    if (car) {
      console.log(`Car found: ${JSON.stringify(car)}`);
    } else {
      console.error(`Car with ID ${id} not found.`);
    }
  });

program.parse();
