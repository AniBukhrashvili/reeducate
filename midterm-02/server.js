import express from "express";
import expensesRouter from "./expenses/expenses.route.js";
import randomRouter from "./random/random.route.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());

app.use("/", expensesRouter);
app.use("/random", randomRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
