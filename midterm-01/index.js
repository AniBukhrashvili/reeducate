#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs/promises";
import path from "path";

const program = new Command();
const filePath = path.join(process.cwd(), "expenses.json");

async function readExpenses() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeExpenses(expenses) {
  await fs.writeFile(filePath, JSON.stringify(expenses));
}

const validatePrice = (price, currency) => {
  if (parseFloat(price) < 10) {
    throw new Error("Price must be at least 10");
  }
};

program
  .command("create")
  .argument("<category>")
  .argument("<price>")
  .argument("<currency>")
  .description("Create new expense")
  .action(async (category, price, currency) => {
    try {
      validatePrice(price);

      const expenses = await readExpenses();
      const newExpense = {
        id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
        category,
        price: parseFloat(price),
        date: new Date().toISOString(),
        currency,
      };
      expenses.push(newExpense);
      await writeExpenses(expenses);
      console.log(`Created expense: ${JSON.stringify(newExpense)}`);
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command("read")
  .option("--asc")
  .option("--desc")
  .description("Read all expenses")
  .action(async (options) => {
    const expenses = await readExpenses();
    if (expenses.length === 0) {
      console.log("No expenses available.");
      return;
    }

    let sortedExpenses;

    if (options.asc) {
      sortedExpenses = expenses.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (options.desc) {
      sortedExpenses = expenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else {
      sortedExpenses = expenses;
    }

    if (options.asc || options.desc) {
      console.log(
        `Expenses sorted by date ${options.asc ? "ascending" : "descending"}`
      );
    }
    sortedExpenses.forEach((expense) => {
      console.log(
        `ID: ${expense.id}, Category: ${expense.category}, Price: ${expense.price}, Date: ${expense.date}, Currency: ${expense.currency}`
      );
    });
  });

program
  .command("update")
  .argument("<id>", "ID of the expense to update")
  .argument("<category>", "Updated category")
  .argument("<price>", "Updated price")
  .argument("<currency>", "Updated currency")
  .description("Update an expense by ID")
  .action(async (id, category, price, currency) => {
    try {
      validatePrice(price);

      const expenses = await readExpenses();
      const expenseIndex = expenses.findIndex(
        (expense) => expense.id === parseInt(id)
      );

      if (expenseIndex !== -1) {
        expenses[expenseIndex] = {
          ...expenses[expenseIndex],
          category,
          price: parseFloat(price),
          currency,
          date: new Date().toISOString(),
        };
        await writeExpenses(expenses);
        console.log(
          `Updated expense: ${JSON.stringify(expenses[expenseIndex])}`
        );
      } else {
        console.error(`Expense with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command("delete")
  .argument("<id>")
  .description("Delete a expense by ID")
  .action(async (id) => {
    const expenses = await readExpenses();
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== parseInt(id)
    );
    await writeExpenses(updatedExpenses);
    console.log(`Deleted expense with ID: ${id}`);
  });

program
  .command("getById")
  .argument("<id>")
  .description("Get expense by ID")
  .action(async (id) => {
    const expenses = await readExpenses();
    const expense = expenses.find((expense) => expense.id === parseInt(id));
    if (expense) {
      console.log(`Expense found: ${JSON.stringify(expense)}`);
    } else {
      console.error(`Expense with ID ${id} not found.`);
    }
  });

program
  .command("price")
  .option("--asc")
  .option("--desc")
  .description("Sort expenses by price")
  .action(async (options) => {
    const expenses = await readExpenses();

    if (expenses.length === 0) {
      console.log("No expenses available.");
      return;
    }

    let sortedExpenses;

    if (options.asc) {
      sortedExpenses = expenses.sort((a, b) => a.price - b.price);
    } else if (options.desc) {
      sortedExpenses = expenses.sort((a, b) => b.price - a.price);
    } else {
      console.log("Please specify --asc or --desc to sort the expenses");
      return;
    }

    console.log(
      `Expenses sorted by price ${options.asc ? "ascending" : "descending"}:`
    );
    sortedExpenses.forEach((expense) => {
      console.log(
        `ID: ${expense.id}, Category: ${expense.category}, Price: ${expense.price}, Date: ${expense.date}, Currency: ${expense.currency}`
      );
    });
  });

program.parse();
