const translations = {
  en: "This is some random text.",
  ka: "ეს არის შემთხვევითი ტექსტი.",
};

function switchLanguage(language) {
  localStorage.setItem("selectedLanguage", language);
  document.getElementById("randomText").innerText = translations[language];
}

function loadLanguage() {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  switchLanguage(savedLanguage);
}

document
  .getElementById("en")
  .addEventListener("click", () => switchLanguage("en"));
document
  .getElementById("ka")
  .addEventListener("click", () => switchLanguage("ka"));

window.onload = loadLanguage;
