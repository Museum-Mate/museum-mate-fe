const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'pricing.html'));
});

app.get('/write-exhibition', (req, res) => {
  res.sendFile(path.join(__dirname, 'write-exhibition.html'));
});

app.get('/gathering', (req, res) => {
  res.sendFile(path.join(__dirname, 'gathering.html'));
});

app.get("/exhibitions", (req, res) => {
  res.sendFile(__dirname + "/exhibition.html");
});

app.get('/gathering-new', (req, res) => {
  res.redirect(path.join(__dirname, '/work.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'error.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log('The server is listening on port 3000');
});
