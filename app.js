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

app.get("/pricing", (req, res) => {
    res.sendFile(__dirname + "/pricing.html");
});

app.get("/myinfo", (req, res) => {
    res.sendFile(__dirname + "/my-info.html");
});

app.get("/mycalendar", (req, res) => {
    res.sendFile(__dirname + "/my-calendar.html");
});

app.get("/myreviews", (req, res) => {
    res.sendFile(__dirname + "/my-reviews.html");
});

app.get("/mygatherings", (req, res) => {
    res.sendFile(__dirname + "/my-gatherings.html");
});

app.get("/myparticipations", (req, res) => {
    res.sendFile(__dirname + "/my-participations.html");
});


app.use((req, res) => {
    res.sendFile(__dirname + "/error.html");
});

app.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000");
});