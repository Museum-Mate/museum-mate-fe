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

app.get("/gathering-new", (req, res) => {
    // res.sendFile(__dirname + "/gathering-new.html");
    res.redirect(__dirname + "/work.html");
});

app.use((req, res) => {
    res.sendFile(__dirname + "/error.html");
});

app.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000");
});

/*
// 전시 상세조회 페이지 -> 함께 전시가요 글 등록
// 전시 정보 전달을 위한 setting

var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var router = express.Router();

app.use('/public', express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// view 세팅 설정 
app.set('views', path.join(__dirname, './public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

router.route("/exhibition-single").get((req, res)=>{
    res.render("exhibition-single.html");
});

router.route("/gathering-new").post((req, res)=>{
    res.render("gathering-new.html");
});

app.use("/", router);

// 넘어온 정보를 받아서 뿌려주기
// router.route("/gathering-new").post((req, res)=>{
//     console.log("data immigrated")
//     var exhibitionInfo = {id:req.body.}
// })

*/