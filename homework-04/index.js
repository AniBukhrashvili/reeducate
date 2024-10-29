//1
function mergeObjects(...objects) {
  return Object.assign({}, ...objects);
}

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const res1 = mergeObjects(obj1, obj2);
console.log(res1);

//2
function deleteKeyFromObject(obj, key) {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
}

const car = { make: "Toyota", model: "Camry", year: 2020 };
const res2 = deleteKeyFromObject(car, "year");
console.log(res2);

//3
const car2 = {
  make: "Tesla",
  model: "Model S",
  year: 2022,
  getDescription() {
    return `${this.year} ${this.make} ${this.model}`;
  },
};

console.log(car2.getDescription());

//4
const shoppingCart = {
  items: [],
  addItem(item, price) {
    this.items.push({ item, price });
  },
  removeItem(itemName) {
    this.items = this.items.filter((item) => item.item !== itemName);
  },
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  },
};

shoppingCart.addItem("Item1", 150);
shoppingCart.addItem("Item2", 20);
shoppingCart.addItem("Item3", 10);
shoppingCart.removeItem("Item1");
console.log(shoppingCart.calculateTotal());
