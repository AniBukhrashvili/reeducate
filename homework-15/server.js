import express from "express";
import expensesRouter from "./expenses/expenses.route.js";
import randomRouter from "./random/random.route.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/expenses", expensesRouter);
app.use("/random", randomRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
