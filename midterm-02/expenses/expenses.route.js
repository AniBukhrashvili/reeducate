import { Router } from "express";
import {
  createExpense,
  getExpensesWithPagination,
  updateExpensesById,
  deleteExpensesById,
  getExpensesById,
} from "./expenses.service.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { requiredFieldsMiddleware } from "../middlewares/requiredFields.middleware.js";

const expensesRouter = Router();

// expensesRouter.post("/", requiredFieldsMiddleware, createExpense);

expensesRouter.get("/", getExpensesWithPagination);

expensesRouter.get("/expenses/:id", getExpensesById);

expensesRouter.put("/expenses/:id", updateExpensesById);

expensesRouter.delete(
  "/expenses/:id",
  authorizationMiddleware,
  deleteExpensesById
);

export default expensesRouter;
