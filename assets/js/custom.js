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

// about cookies
function setCookie(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

// security.html
async function getSecurity() {
    let url = 'http://localhost:8080/api/v1/example/security';
    try {
        let res = await fetch(url,{
            headers: {
                "Authorization": 'Bearer '+ getCookie("accessToken")
            }
        });
        return await res.text();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderSecurity() {
    let security = await getSecurity();
    let html = `<div class="user">
        <h2>${security} </h2>
        </div>`;

    let container = document.querySelector('.securitycontainer');
    container.innerHTML = html;
}

// login.html
async function postLogin() {
    let url = 'http://localhost:8080/api/v1/users/login';
    let e = document.getElementById('loginemail').value
    let p = document.getElementById('loginpassword').value

    try {
        let res = await fetch(url,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: e,
                password: p,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function saveToken() {
    let tokens = await postLogin();
    let html = `<div class="user">
        <h2> Access Token: ${tokens.result.accessToken} </h2>
        <h2> Refresh Token: ${tokens.result.refreshToken}</h2>
        </div>`;
    let container = document.querySelector('.logincontainer');
    container.innerHTML = html;

    setCookie('accessToken',tokens.result.accessToken,1)
    let c = getCookie("accessToken");
    console.log("cookie: "+ c )
}

// exhibitions.html
async function getExhibitions() {
    let url = 'http://localhost:8080/api/v1/exhibitions';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderExhibitions() {
    let exhibitions = await getExhibitions();
    console.log(exhibitions)
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
        let htmlSegment = `<div class="exhibition">
        <h1>전시 아이디 ${element.id}</h1>
        <h2>전시명 ${element.name} 전시 상세 정보${element.detailInfo}</h2>
        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.exhibitionscontainer');
    container.innerHTML = html;
}

// enrollList
async function getEnrolls(gatheringId) {
    let url = 'http://localhost:8080/api/v1/gatherings/'+gatheringId+'/enroll/list';
    try {
        let res = await fetch(url,{
            headers: {
                "Authorization": 'Bearer '+ getCookie("accessToken")
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderEnrolls(gatheringId) {
    let enrolls = await getEnrolls(gatheringId);
    let enroll = enrolls.result;
    console.log(enrolls.resultCode)
    if(enrolls.resultCode=="ERROR"){
        console.log(enrolls.result.message);
        alert(enrolls.result.message);
    }
    let html = '';
    html+= `                <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
    <div class="row p-0">
        <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
        </div>
        <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
            <ul class="list-unstyled text-center light-300">
                <li class="h5 semi-bold-600 mb-0 mt-3">신청자 목록</li>
            </ul>
        </div>
        <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
        </div>
    </div>
</div> `
    enroll.forEach(element => {
        let htmlSegment = `<div class="pricing-list shadow-sm py-sm-0 py-5">
        <div class="row p-2">
            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                <i class="display-3 bx bx-user"></i>
            </div>
            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                <ul class="list-unstyled text-center light-300">
                    <li class="h5 semi-bold-600 mb-0 mt-3">${element.userName}</li>
                    <li>${element.createdAt}</li>
                </ul>
            </div>
            <div class="pricing-list-footer col-sm-4 col-5 text-center m-auto align-items-center">
                <a href="#" class="btn rounded-pill px-4 btn-primary light-300" onclick="renderApproveUser(${gatheringId},${element.participantId})"> 승인</a>
            </div>
        </div>
        </div>`;
        html += htmlSegment;
    });

    let container = document.querySelector('.enrollscontainer');
    container.innerHTML = html;
}

//신청자 목록 팝업 창 띄우기
function newTabClick() {
    var nWidth = "900";
    var nHeight = "768";

    // 듀얼 모니터 고려한 윈도우 띄우기
    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;
    
    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    var strOption = "";
    strOption += "left=" + nLeft + "px,";
    strOption += "top=" + nTop + "px,";
    strOption += "width=" + nWidth + "px,";
    strOption += "height=" + nHeight + "px,";
    strOption += "toolbar=no,menubar=no,location=no,";
    strOption += "resizable=yes,status=yes";

    window.open("enroll-list", "",strOption);
}

// approve
async function approveUser(gatheringId,pId) {
    
    let url = 'http://localhost:8080/api/v1/gatherings/'+gatheringId+'/enroll/'+pId;
    console.log(url);
    try {
        let res = await fetch(url,{
            headers: {
                "Authorization": 'Bearer '+ getCookie("accessToken")
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderApproveUser(gatheringId,pId) {
    let approve = await approveUser(gatheringId,pId);

    if(approve.resultCode=="ERROR"){
        console.log(approve.result.message);
        alert(approve.result.message);
    }
    location.reload(true);
}

async function postLogin() {
    let url = 'http://localhost:8080/api/v1/users/login';
    let e = document.getElementById('loginemail').value
    let p = document.getElementById('loginpassword').value

    try {
        let res = await fetch(url,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: e,
                password: p,
            })
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}