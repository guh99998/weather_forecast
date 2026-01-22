export default async function handler(req, res) {
  const city = req.query.city || "";
  const apiKey = process.env.HG_API_KEY;

  const url =
    `https://api.hgbrasil.com/weather?format=json&key=${apiKey}` +
    (city ? `&city_name=${encodeURIComponent(city)}` : "");

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}