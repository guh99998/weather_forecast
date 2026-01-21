const endpoint = "https://api.hgbrasil.com/weather?key=";
const apiKey = "b94f2b54";

const input = document.getElementById("inputLocal");
const button = document.getElementById("searchButton");


button.addEventListener("click", () => {
  let cityName = input.value;

  let url = endpoint + apiKey + "&city_name="+ cityName;

})
