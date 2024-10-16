//1
function randomPromise() {
  return new Promise((resolve, reject) => {
    const isResolved = Math.random() > 0.5;
    setTimeout(() => {
      if (isResolved) {
        resolve("Promise resolved!");
      } else {
        reject("Promise rejected!");
      }
    }, 1000);
  });
}

randomPromise()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

//2
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
}

getUsers().then((users) => console.log(users));

//3
async function fetchWithRetries(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw new Error("All attempts failed");
      }
    }
  }
}

fetchWithRetries("https://jsonplaceholde.typicode.com")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

//4
async function fetchFaster() {
  const urls = [
    "https://dummyjson.com/users",
    "https://jsonplaceholder.typicode.com/users",
  ];

  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
  );

  try {
    const result = await Promise.race(fetchPromises);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

fetchFaster().then((data) => console.log(data));

//5
function delayedResolve(array, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (array.length > 0) {
        resolve(array);
      } else {
        reject("Array is empty!");
      }
    }, delay);
  });
}

const promise1 = delayedResolve([1, 2, 3], 1000);
const promise2 = delayedResolve([4, 4], 2000);
const promise3 = delayedResolve([4, 5, 6], 3000);

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  const fulfilledArrays = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const mergedArray = [].concat(...fulfilledArrays);
  console.log("Merged fulfilled arrays:", mergedArray);
});
