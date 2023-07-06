const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Validator = require('fastest-validator');
const v = new Validator();
// const jwt = require('jsonwebtoken');
// const secretKey = 'SecretKey';
const app = express();
const port = 3001;

app.use(express.static('public'));

app.use(cors({
  origin: '*'
}));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather app',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3001',
      }
    ]
  },
  apis: ['./server.js'],
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  icon: String
});
const Weather = mongoose.model('Weather', weatherSchema);

mongoose.connect('mongodb+srv://User:Password@cluster0.siqgdj6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const citySchema = {
  city: { type: 'string', min: 1 }
};

// /**
//  * @swagger
//  * /login:
//  *    post:
//  *      tags:
//  *      - Login
//  *      description: Login
//  *      responses:
//  *      200:
//  *        description: Successful login
//  *      401:
//  *        description: Invalid username or password
//  *      500:
//  *        description: An error occurred
//  */
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'user' && password === 'password') {
//     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     res.json({ token });
//   } else {
//     res.status(401).send('Invalid username or password');
//   }
// });

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         return res.status(403).send('Invalid or expired token');
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).send('Missing authorization header');
//   }
// };

/**
 * @swagger
 * /current-weather/:city:
 *    get:
 *      tags:
 *      - Weather
 *      description: Get current weather data for the given city
 *      parameters:
 *      - in: path
 *        name: city
 *        required: true
 *        description: City
 *      responses:
 *        200:
 *          description: Current weather data
 *        500:
 *          description: An error occurred
 */
app.get('/current-weather/:city', async (req, res) => {
  const city = req.params.city;
  const validation = v.validate({ city }, citySchema);
  if (validation !== true) {
    res.status(400).send(validation);
    return;
  }
  const apiKey = '8309d212157373cab7ae2f1f119d9dae';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weatherData = new Weather({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].main,
      icon: data.weather[0].icon
    });
    await weatherData.save();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching current weather data');
  }
});

/**
 * @swagger
 * /weather/:city:
 *    get:
 *      tags:
 *      - Weather
 *      description: Get weather forecast data for the given city
 *      parameters:
 *      - in: path
 *        name: city
 *        required: true
 *        description: City
 *      responses:
 *        200:
 *          description: Weather forecast data
 *        500:
 *          description: An error occurred
 */
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const validation = v.validate({ city }, citySchema);
  if (validation !== true) {
    res.status(400).send(validation);
    return;
  }
  const apiKey = '8309d212157373cab7ae2f1f119d9dae';
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching weather forcast data');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});