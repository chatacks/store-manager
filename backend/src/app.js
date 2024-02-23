const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  res.status(200).json({});
});

app.get('/products/:id', async (req, res) => {
  res.status(200).json({});
});

module.exports = app;
