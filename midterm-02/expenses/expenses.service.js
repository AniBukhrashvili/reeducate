import readFile from "../utils/readFile.js";
import writeFile from "../utils/writeFile.js";
import path from "path";

const filePath = path.join(process.cwd(), "expenses.json");

export const createExpense = async (req, res) => {
  try {
    const { category, price, currency } = req.body;
    const expenses = await readFile(filePath);
    const newExpense = {
      id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
      category,
      price: parseFloat(price),
      date: new Date().toISOString(),
      currency,
    };
    expenses.push(newExpense);
    await writeFile(filePath, expenses);
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const renderAddExpensePage = async (req, res) => {
  try {
    res.render("pages/addExpense.ejs");
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExpensesWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const expenses = await readFile(filePath);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedExpenses = expenses.slice(start, end);
    res.render("pages/home", {
      page: parseInt(page),
      limit: parseInt(limit),
      total: expenses.length,
      expenses: paginatedExpenses,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExpensesById = async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await readFile(filePath);
    const expense = expenses.find((expense) => expense.id === parseInt(id));

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.render("pages/expense", { expense });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteExpensesById = async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await readFile(filePath);
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== parseInt(id)
    );
    await writeFile(filePath, updatedExpenses);
    window.location.href = "/";
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
