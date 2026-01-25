const endpoint = "https://api.hgbrasil.com/weather";
const apiKey = "b94f2b54";

const els = {
  form: document.getElementById("searchForm"),
  input: document.getElementById("inputLocal"),
  button: document.getElementById("searchButton"),

  temperatura: document.getElementById("temperatura"),
  city: document.getElementById("city"),
  dateTime: document.getElementById("dateTime"),
  descricao: document.getElementById("descricao"),

  umidade: document.getElementById("umidade"),
  ventos: document.getElementById("ventos"),
  nascerDoSol: document.getElementById("nascerDoSol"),
  porDoSol: document.getElementById("porDoSol"),
  chanceDeChuva: document.getElementById("chanceDeChuva"),
};

function setLoading(isLoading) {
  els.button.disabled = isLoading;
  els.button.textContent = isLoading ? "Carregando..." : "Pesquisar";
}

function renderWeather(results) {
  els.temperatura.textContent = `${results.temp} °C`;
  els.city.textContent = results.city;
  els.dateTime.textContent = results.date;
  els.descricao.textContent = results.description;

  els.umidade.textContent = results.humidity;
  els.ventos.textContent = results.wind_speedy;
  els.nascerDoSol.textContent = results.sunrise;
  els.porDoSol.textContent = results.sunset;

  const rain = results?.forecast?.[0]?.rain ?? 0;
  els.chanceDeChuva.textContent = `${rain}%`;
}

async function fetchWeather(cityName) {
  const params = new URLSearchParams({
    format: "json-cors",
    key: apiKey,
    city_name: cityName,
  });

  const url = `${endpoint}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Falha ao buscar dados da API.");

  const data = await response.json();
  if (!data?.results) throw new Error("Resposta inválida da API.");

  return data.results;
}

els.form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityName = els.input.value.trim();
  if (!cityName) {
    els.input.focus();
    return;
  }

  try {
    setLoading(true);
    const results = await fetchWeather(cityName);
    renderWeather(results);
  } catch (err) {
    console.error(err);
    els.descricao.textContent = "Não consegui buscar a previsão. Tente novamente.";
  } finally {
    setLoading(false);
  }
});
