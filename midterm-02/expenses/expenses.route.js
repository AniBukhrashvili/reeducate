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

expensesRouter.post("/", requiredFieldsMiddleware, createExpense);

expensesRouter.get("/", getExpensesWithPagination);

expensesRouter.put("/:id", updateExpensesById);

expensesRouter.delete("/:id", authorizationMiddleware, deleteExpensesById);

expensesRouter.get("/:id", getExpensesById);

export default expensesRouter;
