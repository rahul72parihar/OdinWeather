const submitButton = document.getElementById("submit-btn");
const displayResult = document.getElementById("display-result");
const locationInput = document.getElementById("location-input");

const key = "c7e92242bb16d357d12aab3eb76e6d3e";

submitButton.addEventListener("click", handleSearch);
function handleSearch() {
  renderLoading();
  getData(locationInput.value);
}
locationInput.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});

async function getData(cityName) {
  let textToRender = "";
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.main) {
        const tempCelcius = kelvinToCelsius(data.main.temp);
        textToRender = `${cityName.toUpperCase()} Temp : ${tempCelcius} C`;
      } else {
        textToRender = "CITY NOT FOUND";
      }
    })
    .catch((error) => {
      console.log(error);
    });

  renderTemp(textToRender);
}
function renderLoading() {
  const loadingImage = document.createElement("img");
  loadingImage.classList.add("loding-img");
  loadingImage.src = "loading.svg";
  displayResult.replaceChildren(loadingImage);
}
function renderTemp(textToRender) {
  const text = document.createElement("h2");
  text.textContent = textToRender;
  displayResult.replaceChildren(text);
}
function kelvinToCelsius(tempKelvin) {
  return (tempKelvin - 273.15).toFixed(2);
}
