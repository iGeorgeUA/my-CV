const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.static('public'));

app.use(cors({
  origin: '*'
}));

app.get('/weather/:city/:date', async (req, res) => {
  const city = req.params.city;
  const date = req.params.date;
  const coords_response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
  const coords_data = await coords_response.json();
  let lat = coords_data.results[0].latitude;
  let lon = coords_data.results[0].longitude;
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&date=${date}&timezone=GMT`);
  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});