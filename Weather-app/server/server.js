const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.static('public'));

app.use(cors({
  origin: '*'
}));

app.get('/weather/:city/:date_start/:date_end', async (req, res) => {
  const city = req.params.city;
  const date_start = req.params.date_start;
  const date_end = req.params.date_end;
  const coords_response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
  const coords_data = await coords_response.json();
  let lat = coords_data.results[0].latitude;
  let lon = coords_data.results[0].longitude;
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${date_start}&end_date=${date_end}`);
  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});