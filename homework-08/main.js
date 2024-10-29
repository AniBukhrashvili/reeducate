//1
function startsWithUpperCase(str) {
  return /^[A-Z]/.test(str);
}

console.log(startsWithUpperCase("Hello"));
console.log(startsWithUpperCase("hello"));

//2
function isValidDate(dateString) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

console.log(isValidDate("31/12/2023"));
console.log(isValidDate("31/02/2023"));

//3
function isValidPhoneNumber(phoneNumber) {
  const regex = /^598-\d{2}-\d{2}-\d{2}$/;
  return regex.test(phoneNumber);
}

console.log(isValidPhoneNumber("598-12-34-56"));
console.log(isValidPhoneNumber("598-123-45-67"));

//4
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@example\.com$/;
  return regex.test(email);
}

console.log(isValidEmail("test@example.com"));
console.log(isValidEmail("test@gmail.com"));
