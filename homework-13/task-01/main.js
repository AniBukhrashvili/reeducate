#!/usr/bin/env node
import fetch from "node-fetch";
import { Command } from "commander";

const program = new Command();
const apiKey = "895284fb2d2c50a520ea537456963d9c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

program
  .command("find")
  .description("Get the exact temperature for a specified city")
  .argument("<cityName>")
  .action(async (cityName) => {
    try {
      const response = await fetch(
        `${apiUrl}?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const temperature = data.main.temp;
      console.log(`The temperature in ${cityName} is ${temperature}°C.`);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse();
