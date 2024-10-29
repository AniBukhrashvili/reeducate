//1
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, batteryLevel) {
    super(make, model, year);
    this.batteryLevel = batteryLevel;
  }

  getElectricCarInfo() {
    return `${super.getCarInfo()}, Battery - ${this.batteryLevel}%`;
  }
}

const myElectricCar = new ElectricCar("Tesla", "Model", 2024, 100);
console.log(myElectricCar.getElectricCarInfo());

//2
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const index = this.books.indexOf(book);
    this.books.splice(index, 1);
  }

  listBooks() {
    if (this.books.length === 0) {
      console.log("The library has no books.");
    } else {
      this.books.forEach((book, index) => {
        console.log(`${index + 1}. ${book}`);
      });
    }
  }
}

const myLibrary = new Library();

myLibrary.addBook("1984");
myLibrary.addBook("The Great Gatsby");
myLibrary.listBooks();
myLibrary.removeBook("1984");
myLibrary.listBooks();

//3
class Employee {
  constructor(hourlyRate) {
    this.hourlyRate = hourlyRate;
  }

  calculateSalary(hoursWorked) {
    const salary = hoursWorked * this.hourlyRate;
    return `${salary}`;
  }
}

const employee1 = new Employee(20);
console.log(employee1.calculateSalary(40));

//4
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem({ name, price }) {
    this.items.push({ name, price });
  }

  deleteItem(identifier) {
    const index = this.items.findIndex((item) => item.name === identifier);
    this.items.splice(index, 1);
  }

  updateItem(identifier, updatedProperties) {
    const item = this.items.find((item) => item.name === identifier);
    if (item) {
      Object.assign(item, updatedProperties);
    }
  }

  calculateTotal() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    return total;
  }
}

const cart = new ShoppingCart();
cart.addItem({ name: "Apple", price: 0.99 });
cart.addItem({ name: "Banana", price: 0.59 });
cart.addItem({ name: "Orange", price: 1.29 });
cart.updateItem("Banana", { price: 0.79 });
cart.deleteItem("Orange");
cart.calculateTotal();
console.log(cart.items);

//5
class CarFactory {
  constructor() {
    this.cars = [];
    this.nextId = 1;
  }

  addCar({ make, model, year }) {
    const car = {
      id: this.nextId++,
      make,
      model,
      year,
    };
    this.cars.push(car);
  }

  deleteCar(id) {
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars.splice(index, 1)[0];
  }

  updateCar(id, updatedProperties) {
    const car = this.cars.find((car) => car.id === id);
    if (car) {
      Object.assign(car, updatedProperties);
    }
  }

  getAllCars() {
    console.log(this.cars);
  }
}

const factory = new CarFactory();
factory.addCar({ make: "Toyota", model: "model1", year: 2024 });
factory.addCar({ make: "Honda", model: "model2", year: 2019 });
factory.addCar({ make: "Ford", model: "model3", year: 2021 });
factory.getAllCars();
factory.updateCar(2, { model: "model4", year: 2022 });
factory.deleteCar(1);
factory.getAllCars();
