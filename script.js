const endpoint = "https://api.hgbrasil.com/weather?format=json-cors&key=";
const apiKey = "b94f2b54";

const umidade = document.getElementById("umidade");
const ventos = document.getElementById("ventos");
const nascerDoSOl = document.getElementById("nascerDoSol");
const porDoSol = document.getElementById("porDoSol");
const chanceDeChuva = document.getElementById("chanceDeChuva");
const temperatura = document.getElementById("temperatura");

const city = document.getElementById("city");
const dateTime = document.getElementById("dateTime"); 
const descricao = document.getElementById("descricao");

const input = document.getElementById("inputLocal");
const button = document.getElementById("searchButton");


button.addEventListener("click", () => {
  let cityName = input.value;

  let url = endpoint + apiKey + "&city_name="+ cityName;

  fetch(url)
  .then(response => response.json())
  .then(dados => {
    temperatura.textContent = dados.results.temp + " °C";

    city.textContent = dados.results.city;

    dateTime.textContent = dados.results.date;

    descricao.textContent = dados.results.description;

    umidade.textContent = dados.results.humidity;

    ventos.textContent = dados.results.wind_speedy;

    nascerDoSOl.textContent = dados.results.sunrise;

    porDoSol.textContent = dados.results.sunset;

    chanceDeChuva.textContent = dados.results.forecast[0].rain + "%";
  })
})