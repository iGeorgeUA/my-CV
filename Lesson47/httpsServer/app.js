const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';
const Sequelize = require('sequelize');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const sequelize = new Sequelize('database', 'test', 'test', {
  host: 'localhost',
  dialect: 'mysql'
});

mongoose.connect('mongodb://test:test@localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const SQLAccount = sequelize.define('account', {
  name: Sequelize.STRING,
  role: Sequelize.STRING
});

const SQLToken = sequelize.define('token', {
  token: Sequelize.STRING,
  accountId: Sequelize.INTEGER
});

const accountSchema = new mongoose.Schema({
  name: String,
  role: String
});
const Account = mongoose.model('Account', accountSchema);

const tokenSchema = new mongoose.Schema({
  token: String,
  accountId: Number
});
const Token = mongoose.model('Token', tokenSchema);

sequelize.sync();

const getAccounts = (req, res) => {
  if (req.query.db === 'sql') {
    SQLAccount.findAll().then(accounts => res.json(accounts));
  } else {
    Account.find().then(accounts => res.json(accounts));
  }
};

const createAccount = (req, res) => {
  const accountData = req.body;
  if (req.query.db === 'sql') {
    SQLAccount.create(accountData).then(account => res.json(account));
  } else {
    Account.create(accountData).then(account => res.json(account));
  }
};

const updateAccount = (req, res) => {
  const id = req.params.id;
  const accountData = req.body;
  if (req.query.db === 'sql') {
    SQLAccount.update(accountData, { where: { id } }).then(() => res.json({ message: 'Account updated' }));
  } else {
    Account.findByIdAndUpdate(id, accountData).then(() => res.json({ message: 'Account updated' }));
  }
};

const deleteAccount = (req, res) => {
  if (req.query.role === 'Admin' && req.query.password === 'your-admin-password' && req.query.login === 'your-admin-login') {
    const id = req.params.id;
    if (req.query.db === 'sql') {
      SQLAccount.destroy({ where: { id } }).then(() => res.json({ message: 'Account deleted' }));
    } else {
      Account.findByIdAndDelete(id).then(() => res.json({ message: 'Account deleted' }));
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const getAccountTokens = (req, res) => {
  const accountId = req.params.id;
  if (req.query.db === 'sql') {
    SQLToken.findAll({ where: { accountId } }).then(tokens => res.json(tokens));
  } else {
    Token.find({ accountId }).then(tokens => res.json(tokens));
  }
};

const getTokens = (req, res) => {
  if (req.query.db === 'sql') {
    SQLToken.findAll().then(tokens => res.json(tokens));
  } else {
    Token.find().then(tokens => res.json(tokens));
  }
};

const createToken = (req, res) => {
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  if (req.query.db === 'sql') {
    SQLToken.create({
      accountId: tokenData.accountId,
      token
    }).then(token => res.json(token));
  } else {
    Token.create({
      accountId: tokenData.accountId,
      token
    }).then(token => res.json(token));
  }
};

const updateToken = (req, res) => {
  const id = req.params.id;
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  if (req.query.db === 'sql') {
    SQLToken.update({ token }, { where: { id } }).then(() => res.json({ message: 'Token updated' }));
  } else {
    Token.findByIdAndUpdate(id, { token }).then(() => res.json({ message: 'Token updated' }));
  }
};

const deleteToken = (req, res) => {
  const id = req.params.id;
  if (req.query.db === 'sql') {
    SQLToken.destroy({ where: { id } }).then(() => res.json({ message: 'Token deleted' }));
  } else {
    Token.findByIdAndDelete(id).then(() => res.json({ message: 'Token deleted' }));
  }
};

app.get('/accounts', getAccounts);
app.post('/accounts', createAccount);
app.put('/accounts/:id', updateAccount);
app.delete('/accounts/:id', deleteAccount);
app.get('/accounts/:id/tokens', getAccountTokens);
app.get('/tokens', getTokens);
app.post('/tokens', createToken);
app.put('/tokens/:id', updateToken);
app.delete('/tokens/:id', deleteToken);

app.listen(3000, () => console.log('Server listening on port 3000'));