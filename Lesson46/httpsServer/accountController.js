const jwt = require('jsonwebtoken');
const { createAccount, getAccounts, getAccountByName, updateAccount, deleteAccount } = require('./accountModel');

function createAccountHandler(req, res) {
  const { name, password } = req.body;
  const account = createAccount(name, password);
  res.status(201).send(account);
}

function getAccountsHandler(req, res) {
  res.send(getAccounts());
}

function getAccountByNameHandler(req, res) {
  const { name } = req.params;
  const account = getAccountByName(name);
  if (!account) return res.status(404).send('Account not found');
  res.send(account);
}

function updateAccountHandler(req, res) {
  const { name } = req.params;
  const { password } = req.body;
  const account = updateAccount(name, password);
  if (!account) return res.status(404).send('Account not found');
  res.send(account);
}

function deleteAccountHandler(req, res) {
  const { name } = req.params;
  const { role, login, password } = req.query;
  if (role !== 'Admin') return res.status(403).send('Only Admin can delete records');
  if (login !== 'Admin' || password !== 'password') return res.status(401).send('Invalid credentials');
  const success = deleteAccount(name);
  if (!success) return res.status(404).send('Account not found');
  res.send('Account deleted');
}

function generateTokenHandler(req, res) {
  const { name, password } = req.body;
  const account = getAccountByName(name);
  if (!account || account.password !== password) return res.status(401).send('Invalid credentials');
  const token = jwt.sign({ name }, 'secretkey');
  res.send({ token });
}

module.exports = { createAccountHandler, getAccountsHandler, getAccountByNameHandler, updateAccountHandler, deleteAccountHandler, generateTokenHandler };