const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(bodyParser.json());

let accounts = [];
let tokens = [];

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HTTP server with CRUD for accounts and generation of tokens in "name-token" format',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['app.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     responses:
 *       200:
 *         description: An array of accounts
 */
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     parameters:
 *       - in: body
 *         name: account
 *         description: The account to create
 *     responses:
 *       200:
 *         description: The created account
 */
app.post('/accounts', (req, res) => {
  const account = req.body;
  accounts.push(account);
  res.json(account);
});

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an existing account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the account to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: account
 *         description: The account to update
 *     responses:
 *       200:
 *         description: The updated account
 */
app.put('/accounts/:id', (req, res) => {
  const id = req.params.id;
  const account = req.body;
  accounts[id] = account;
  res.json(account);
});

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an existing account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the account to delete
 *         required: true
 *         type: integer
 *       - in: query
 *         name: role
 *         description: The role of the user making the request
 *         required: true
 *         type: string
 *       - in: query
 *         name: password
 *         description: The password of the user making the request
 *         required: true
 *         type: string
 *       - in: query
 *         name: login
 *         description: The login of the user making the request
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 */
app.delete('/accounts/:id', (req, res) => {
  if (req.query.role === 'Admin' && req.query.password === 'your-admin-password' && req.query.login === 'your-admin-login') {
    const id = req.params.id;
    accounts.splice(id, 1);
    res.json({ message: 'Account deleted' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

/**
 * @swagger
 * /accounts/{id}/tokens:
 *   get:
 *     summary: Get all tokens for an account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the account to get tokens for
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of tokens for the account
 */
app.get('/accounts/:id/tokens', (req, res) => {
  const id = req.params.id;
  const accountTokens = tokens.filter(token => token.accountId === id);
  res.json(accountTokens);
});

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Get all tokens
 *     responses:
 *       200:
 *         description: An array of tokens
 */
app.get('/tokens', (req, res) => {
  res.json(tokens);
});

/**
 * @swagger
 * /tokens:
 *   post:
 *     summary: Create a new token
 *     parameters:
 *       - in: body
 *         name: tokenData
 *         description: The data to create the token with
 *         schema:
 *           $ref: '#/definitions/TokenData'
 *     responses:
 *       200:
 *         description: The created token
 */
app.post('/tokens', (req, res) => {
  const tokenData = req.body;
  const token = jwt.sign(tokenData, secret);
  tokens.push({
    accountId: tokenData.accountId,
    token
  });
  res.json({ token });
});

/**
 * @swagger
 * /tokens/{id}:
 *   put:
 *     summary: Update an existing token by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the token to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: tokenData
 *         description: The data to update the token with
 *     responses:
 *       200:
 *         description: The updated token
 */
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

/**
 * @swagger
 * /tokens/{id}:
 *   delete:
 *     summary: Delete an existing token by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the token to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Token deleted successfully
 */
app.delete('/tokens/:id', (req, res) => {
  const id = req.params.id;
  tokens.splice(id, 1);
  res.json({ message: 'Token deleted' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));