// header
const header = document.querySelector('header');

fetch('/header.html')
.then(res => res.text())
.then(data => header.innerHTML = data);

// footer
const footer = document.querySelector('footer');

fetch('/footer.html')
.then(res => res.text())
.then(data => footer.innerHTML = data);

// fetch header 토큰 부분 수정 필요 
function postGathering(payload) {
    const data = {};
    payload.forEach((value, key) => (data[key] = value));
    console.log(data);

    fetch("http://localhost:8080/api/v1/gatherings/posts", {
        method: "POST",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRqbTA0MjEyQGdtYWlsLmNvbSIsImlhdCI6MTY3NTk1NzU5OCwiZXhwIjoxNjc1OTU3ODk4fQ.TbtnLwef3bMHPW98khLcuRPx0pdp4Mp-C07ulqcq2dU",
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    }).then((response) => console.log(response));
}
