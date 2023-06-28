const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';

app.use(bodyParser.json());

let accounts = [];
let tokens = [];

app.get('/accounts', (req, res) => {
  res.json(accounts);
});

app.post('/accounts', (req, res) => {
  const account = req.body;
  accounts.push(account);
  res.json(account);
});

app.put('/accounts/:id', (req, res) => {
  const id = req.params.id;
  const account = req.body;
  accounts[id] = account;
  res.json(account);
});

app.delete('/accounts/:id', (req, res) => {
  if (req.query.role === 'Admin' && req.query.password === 'your-admin-password' && req.query.login === 'your-admin-login') {
    const id = req.params.id;
    accounts.splice(id, 1);
    res.json({ message: 'Account deleted' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/accounts/:id/tokens', (req, res) => {
  const id = req.params.id;
  const accountTokens = tokens.filter(token => token.accountId === id);
  res.json(accountTokens);
});

app.get('/tokens', (req, res) => {
  res.json(tokens);
});

app.post('/tokens', (req, res) => {
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  tokens.push({
    accountId: tokenData.accountId,
    token
  });
  res.json({ token });
});

app.put('/tokens/:id', (req, res) => {
  const id = req.params.id;
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  tokens[id] = {
    accountId: tokenData.accountId,
    token
  };
  res.json({ token });
});

app.delete('/tokens/:id', (req, res) => {
  const id = req.params.id;
  tokens.splice(id, 1);
  res.json({ message: 'Token deleted' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));