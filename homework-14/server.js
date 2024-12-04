import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const port = 3000;
const filePath = path.join(process.cwd(), "expenses.json");

app.use(express.json());

const authorizationMiddleware = (req, res, next) => {
  const key = req.headers["api-key"];
  if (!key) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

async function readExpenses() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeExpenses(expenses) {
  await fs.writeFile(filePath, JSON.stringify(expenses, null, 2));
}

app.post("/expenses", async (req, res) => {
  try {
    const { category, price, currency } = req.body;
    if (!category || !price || !currency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

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
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/expenses", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const expenses = await readExpenses();
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
});

app.put("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, price, currency } = req.body;

    if (!category || !price || !currency) {
      return res
        .status(400)
        .json({ error: "Missing required fields for updating" });
    }

    const expenses = await readExpenses();
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
    await writeExpenses(expenses);
    res.json(expenses[expenseIndex]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/expenses/:id", authorizationMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await readExpenses();
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== parseInt(id)
    );

    if (updatedExpenses.length === expenses.length) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await writeExpenses(updatedExpenses);
    res.json({ message: `Deleted expense with ID: ${id}` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await readExpenses();
    const expense = expenses.find((expense) => expense.id === parseInt(id));

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
