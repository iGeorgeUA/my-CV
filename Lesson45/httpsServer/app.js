const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const accounts = [];

app.post('/accounts', (req, res) => {
  const { name, password } = req.body;
  const account = { name, password };
  accounts.push(account);
  res.status(201).send(account);
});

app.get('/accounts', (req, res) => {
  res.send(accounts);
});

app.get('/accounts/:name', (req, res) => {
  const { name } = req.params;
  const account = accounts.find(acc => acc.name === name);
  if (!account) return res.status(404).send('Account not found');
  res.send(account);
});

app.put('/accounts/:name', (req, res) => {
  const { name } = req.params;
  const { password } = req.body;
  const account = accounts.find(acc => acc.name === name);
  if (!account) return res.status(404).send('Account not found');
  account.password = password;
  res.send(account);
});

app.delete('/accounts/:name', (req, res) => {
  const { name } = req.params;
  const { role, login, password } = req.query;
  if (role !== 'Admin') return res.status(403).send('Only Admin can delete records');
  if (login !== 'Admin' || password !== 'password') return res.status(401).send('Invalid credentials');
  const index = accounts.findIndex(acc => acc.name === name);
  if (index === -1) return res.status(404).send('Account not found');
  accounts.splice(index, 1);
  res.send('Account deleted');
});

app.post('/token', (req, res) => {
  const { name, password } = req.body;
  const account = accounts.find(acc => acc.name === name && acc.password === password);
  if (!account) return res.status(401).send('Invalid credentials');
  const token = jwt.sign({ name }, 'secretkey');
  res.send({ token });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));