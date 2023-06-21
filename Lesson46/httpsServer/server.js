const express = require('express');
const app = express();
app.use(express.json());

const { createAccountHandler, getAccountsHandler, getAccountByNameHandler, updateAccountHandler, deleteAccountHandler, generateTokenHandler } = require('./accountController');

app.post('/accounts', createAccountHandler);

app.get('/accounts', getAccountsHandler);

app.get('/accounts/:name', getAccountByNameHandler);

app.put('/accounts/:name', updateAccountHandler);

app.delete('/accounts/:name', deleteAccountHandler);

app.post('/token', generateTokenHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));