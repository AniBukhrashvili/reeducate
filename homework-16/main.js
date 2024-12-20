const express = require("express");
const { isValidObjectId } = require("mongoose");
const connectDB = require("./db/db");
const productModel = require("./models/product");

connectDB();
const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, price, desc, category } = req.body;
  if (!name || !category) {
    res.status(400).json({ message: "bad request" });
    return;
  }
  const user = await productModel.create({ name, price, desc, category });
  res.status(201).json({ message: "create successfully", data: user });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId) {
    res.status(400).json({ message: "wrong mongodb id is provided" });
    return;
  }

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404).json({ message: "not found" });
    return;
  }
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId) {
    res.status(400).json({ message: "wrong mongodb id is provided" });
    return;
  }

  const deletedProduct = await productModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    res.status(404).json({ message: "product cant be deleted" });
    return;
  }
  res.json(deletedProduct);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId) {
    res.status(400).json({ message: "wrong mongodb id is provided" });
    return;
  }

  const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedProduct) {
    res.status(404).json({ message: "product cant be updated" });
    return;
  }
  res.status(201).json(updatedProduct);
});

app.listen(3000, () => {
  console.log("server running");
});
