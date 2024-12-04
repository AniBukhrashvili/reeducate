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
    res.status(201).json(newExpense);
  } catch (error) {
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
    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: expenses.length,
      expenses: paginatedExpenses,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateExpensesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, price, currency } = req.body;

    if (!category || !price || !currency) {
      return res
        .status(400)
        .json({ error: "Missing required fields for updating" });
    }

    const expenses = await readFile(filePath);
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === parseInt(id)
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ error: "Expense not found" });
    }

    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      category,
      price: parseFloat(price),
      currency,
      date: new Date().toISOString(),
    };
    await writeFile(filePath, expenses);
    res.json(expenses[expenseIndex]);
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

    res.json(expense);
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

    if (updatedExpenses.length === expenses.length) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await writeFile(filePath, updatedExpenses);
    res.json({ message: `Deleted expense with ID: ${id}` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
