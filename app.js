const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/contact.html");
});

app.get("/write-exhibition", (req, res) => {
    res.sendFile(__dirname + "/write-exhibition-form.html");
});

app.get("/pricing", (req, res) => {
    res.sendFile(__dirname + "/pricing.html");
});

// '전시 함께 가요'기능 전체 리스트 조회 페이지
app.get("/gathering", (req, res) => {
    res.sendFile(__dirname + "/gathering.html");
});

app.use((req, res) => {
    res.sendFile(__dirname + "/error.html");
});

app.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000");
});