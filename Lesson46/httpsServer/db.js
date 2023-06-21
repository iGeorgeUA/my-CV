const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'test', 'test', {
  host: 'localhost',
  dialect: 'mysql'
});

const Account = sequelize.define('test', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { Account, connectDB };

// accountModel.js
const { Account } = require('./db');

async function createAccount(name, password) {
  const account = await Account.create({ name, password });
  return account;
}

async function getAccounts() {
  const accounts = await Account.findAll();
  return accounts;
}

async function getAccountByName(name) {
  const account = await Account.findOne({ where: { name } });
  return account;
}

async function updateAccount(name, password) {
  const account = await getAccountByName(name);
  if (!account) return null;
  await account.update({ password });
  return account;
}

async function deleteAccount(name) {
  const account = await getAccountByName(name);
  if (!account) return false;
  await account.destroy();
  return true;
}

module.exports = { createAccount, getAccounts, getAccountByName, updateAccount, deleteAccount };