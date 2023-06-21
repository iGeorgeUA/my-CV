const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const sequelize = new Sequelize('database', 'test', 'test', {
  host: 'localhost',
  dialect: 'mysql'
});

const AccountSQL = sequelize.define('test', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

async function connectSQL() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('SQL database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the SQL database:', error);
  }
}

async function connectMongo() {
  try {
    await mongoose.connect('mongodb://test:test@localhost/database', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the MongoDB database:', error);
  }
}

const AccountMongo = mongoose.model('test', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));

module.exports = { AccountSQL, AccountMongo, connectSQL, connectMongo };