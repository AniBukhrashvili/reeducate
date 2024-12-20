import { Router } from "express";
import {
  createExpense,
  getExpensesWithPagination,
  deleteExpensesById,
  getExpensesById,
  renderAddExpensePage,
} from "./expenses.service.js";

const expensesRouter = Router();

expensesRouter.get("/", getExpensesWithPagination);
expensesRouter.get("/expenses/:id", getExpensesById);

expensesRouter.get("/add-expense", renderAddExpensePage);
expensesRouter.post("/add-expense", createExpense);

expensesRouter.delete("/expenses/:id", deleteExpensesById);

export default expensesRouter;
