const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.get('/pricing', (req, res) => {
    res.sendFile(__dirname + '/pricing.html');
});

app.use((req, res) => {
    res.sendFile(__dirname + '/error.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/join.html');
});

app.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log('The server is listening on port 3000');
});
