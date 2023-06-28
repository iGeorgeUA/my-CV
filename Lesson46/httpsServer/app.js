const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';
const Sequelize = require('sequelize');

app.use(bodyParser.json());

const sequelize = new Sequelize('database', 'test', 'test', {
  host: 'localhost',
  dialect: 'mysql'
});

const Account = sequelize.define('account', {
  name: Sequelize.STRING,
  role: Sequelize.STRING
});

const Token = sequelize.define('token', {
  token: Sequelize.STRING,
  accountId: Sequelize.INTEGER
});

sequelize.sync();
const getAccounts = (req, res) => {
  Account.findAll().then(accounts => res.json(accounts));
};

const createAccount = (req, res) => {
  const accountData = req.body;
  Account.create(accountData).then(account => res.json(account));
};

const updateAccount = (req, res) => {
  const id = req.params.id;
  const accountData = req.body;
  Account.update(accountData, { where: { id } }).then(() => res.json({ message: 'Account updated' }));
};

const deleteAccount = (req, res) => {
  if (req.query.role === 'Admin' && req.query.password === 'your-admin-password' && req.query.login === 'your-admin-login') {
    const id = req.params.id;
    Account.destroy({ where: { id } }).then(() => res.json({ message: 'Account deleted' }));
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const getAccountTokens = (req, res) => {
  const accountId = req.params.id;
  Token.findAll({ where: { accountId } }).then(tokens => res.json(tokens));
};

const getTokens = (req, res) => {
  Token.findAll().then(tokens => res.json(tokens));
};

const createToken = (req, res) => {
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  Token.create({
    accountId: tokenData.accountId,
    token
  }).then(token => res.json(token));
};

const updateToken = (req, res) => {
  const id = req.params.id;
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  Token.update({ token }, { where: { id } }).then(() => res.json({ message: 'Token updated' }));
};

const deleteToken = (req, res) => {
  const id = req.params.id;
  Token.destroy({ where: { id } }).then(() => res.json({ message: 'Token deleted' }));
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