const horoscopes = [
  "Horoscope 1",
  "Horoscope 2",
  "Horoscope 3",
  "Horoscope 4",
  "Horoscope 5",
  "Horoscope 6",
  "Horoscope 7",
  "Horoscope 8",
  "Horoscope 9",
  "Horoscope 10",
];

if (!localStorage.getItem("horoscopes")) {
  localStorage.setItem("horoscopes", JSON.stringify(horoscopes));
  localStorage.setItem("lastVisit", new Date().toISOString());
}

function displayDailyHoroscope() {
  const savedHoroscopes = JSON.parse(localStorage.getItem("horoscopes"));
  const lastVisit = new Date(localStorage.getItem("lastVisit"));
  const today = new Date();

  const dayDifference = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
  const horoscopeIndex = dayDifference % savedHoroscopes.length;

  const todaysHoroscope = savedHoroscopes[horoscopeIndex];
  document.getElementById("horoscope").innerText = todaysHoroscope;

  localStorage.setItem("lastVisit", today.toISOString());
}

window.onload = displayDailyHoroscope;
