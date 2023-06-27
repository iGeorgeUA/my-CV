const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let accounts = [];
let tokens = [];

app.get('/accounts', (req, res) => {
  res.json(accounts);
});

app.post('/accounts', (req, res) => {
  const account = req.body;
  accounts.push(account);
  res.status(201).json(account);
});

app.put('/accounts/:name', (req, res) => {
  const name = req.params.name;
  const account = req.body;
  const index = accounts.findIndex(a => a.name === name);
  if (index === -1) {
    res.status(404).json({ message: 'Account not found' });
  } else {
    accounts[index] = account;
    res.json(account);
  }
});

app.delete('/accounts/:name', (req, res) => {
  if (req.query.role !== 'Admin') {
    res.status(403).json({ message: 'Only an Admin can delete accounts' });
    return;
  }
  const name = req.params.name;
  const index = accounts.findIndex(a => a.name === name);
  if (index === -1) {
    res.status(404).json({ message: 'Account not found' });
  } else {
    accounts.splice(index, 1);
    res.status(204).end();
  }
});

app.get('/accounts/:name/tokens', (req, res) => {
  const name = req.params.name;
  const accountTokens = tokens.filter(t => t.name === name);
  res.json(accountTokens);
});

app.get('/tokens', (req, res) => {
  res.json(tokens);
});

app.post('/tokens', (req, res) => {
  const token = req.body;
  tokens.push(token);
  res.status(201).json(token);
});

app.put('/tokens/:id', (req, res) => {
  const id = req.params.id;
  const token = req.body;
  const index = tokens.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Token not found' });
  } else {
    tokens[index] = token;
    res.json(token);
  }
});

app.delete('/tokens/:id', (req, res) => {
  if (req.query.role !== 'Admin') {
    res.status(403).json({ message: 'Only an Admin can delete tokens' });
    return;
  }
  const id = req.params.id;
  const index = tokens.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Token not found' });
  } else {
    tokens.splice(index, 1);
    res.status(204).end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));