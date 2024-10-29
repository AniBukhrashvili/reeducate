function saveToLocalStorage(event) {
  const fieldName = event.target.id;
  const fieldValue = event.target.value;
  localStorage.setItem(fieldName, fieldValue);
}

function loadFromLocalStorage() {
  document.getElementById("name").value = localStorage.getItem("name") || "";
  document.getElementById("email").value = localStorage.getItem("email") || "";
  document.getElementById("phone").value = localStorage.getItem("phone") || "";
}

document.getElementById("name").addEventListener("input", saveToLocalStorage);
document.getElementById("email").addEventListener("input", saveToLocalStorage);
document.getElementById("phone").addEventListener("input", saveToLocalStorage);

window.onload = loadFromLocalStorage;
