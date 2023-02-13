/* header */
var header = document.querySelector('header');

fetch('/header.html')
  .then((res) => res.text())
  .then((data) => (header.innerHTML = data));

// footer
var footer = document.querySelector('footer');

fetch('/footer.html')
  .then((res) => res.text())
  .then((data) => (footer.innerHTML = data));

// exhibitions.html ---------------------------------------------------------------------------------------------------------

async function getExhibitionsById() {
  let url = `${BASE_URL}/api/v1/exhibitions?size=10&sort=id`;
  try {
    let res = await fetch(url,{
        credentials: 'include'
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    alert('Request Error!');
    location.href="#";
  }
}

async function renderExhibitionsById() {
  let exhibitions = await getExhibitionsById();
  let exhibition = exhibitions.result.content;
  let html = '';
  exhibition.forEach((element) => {
    let htmlSegment = `
        <div class="swiper-slide">
            <a href="/work-single">
                <div class="testimonial-item">
                    <img src=${element.mainImgUrl} class="testimonial-img" alt="">
                    <h3>${element.name}</h3>
                    <h4>${element.galleryLocation}</h4>
                </div>
            </a>
        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#swiper-wrapper1');
  container.innerHTML = html;
}

async function getExhibitionsByEndAt() {
  let url = `${BASE_URL}/api/v1/exhibitions?size=10&sort=endAt`;
  try {
    let res = await fetch(url,{
        credentials: 'include'
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    alert('Request Error!');
    location.href="#";
  }
}

async function renderExhibitionsByEndAt() {
  let exhibitions = await getExhibitionsByEndAt();
  let exhibition = exhibitions.result.content;
  let html = '';
  exhibition.forEach((element) => {
    let htmlSegment = `<div class="swiper-slide">
            <a href="/work-single">
                <div class="testimonial-item">
                    <img src=${element.mainImgUrl} class="testimonial-img" alt="">
                    <h3>${element.name}</h3>
                  <h4>${element.galleryLocation}</h4>
              </div>
            </a>
        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#swiper-wrapper2');
  container.innerHTML = html;
}

async function getGatheringsById() {
  let url = `${BASE_URL}/api/v1/gatherings?size=10`;
  try {
    let res = await fetch(url,{
        credentials: 'include'
    });
    return await res.json();
  } catch (error) {
    console.log(error)
    alert('Request Error!');
    location.href="#";
  }
}

async function renderGatheringsById() {
  let exhibitions = await getGatheringsById();
  let exhibition = exhibitions.result.content;
  let html = '';
  exhibition.forEach((element) => {
    let htmlSegment = `<div class="swiper-slide">
            <div class="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden my-5 bg-white">
                <div class="pricing-horizontal-icon col-md-3 text-center bg-secondary text-light py-4">
                    <img src = "${element.exhibitionMainUrl}" class = "exhibition_poster_image g-2 img-thumbnail"/>
                    <h5 class="h5 semi-bold-600 card-footer g-2 pb-4 light-300"> ${element.exhibitionName}</h5> 
                </div>

                <!-- 파티 정보 넣기 -->
                <div class="pricing-horizontal-body offset-lg-1 col-auto col-md-5 col-lg-4 d-flex align-items-center pl-5 pt-lg-0 pt-4">
                    <ul class="text-left px-4 list-unstyled mb-0 light-300">
                        <h5 class = "p"> 🗣 ${element.title} </h5>
                        <li><i class="bx bxs-circle me-2"></i> 이 때 만나요: ${element.meetDateTime} </li>
                        <li><i class="bx bxs-circle me-2"></i> 여기서 만나요: ${element.meetLocation} </li>
                        <li><i class="bx bxs-circle me-2"></i> 모임장: ${element.userName} </li>
                    </ul>
                    <div>
                        
                    </div>   
                </div>

                <!-- 파티 참석 인원 동그라미 넣기 -->
                <div class="pricing-horizontal-tag col-md-4 text-center pt-3 d-flex align-items-center">
                    <div class="w-100 light-300">
                        <!-- 현재 참석 인원 -->
                        <h6>  현재 참석자 수: ${element.currentPeople} / 최대인원: ${element.maxPeople}</h6>
                        <!-- 버튼 -->
                        <div class = "">
                            <a onclick="submitSinglePage(this, '${element.id}')" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 더 알아보기 </a>
                            <a href="#" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 신청하기!🎉 </a>
                        </div>
                    </div>
                </div>
            </div> 
        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#swiper-wrapper3');
  container.innerHTML = html;
}

// fetch header 토큰 부분 수정 필요 ---------------------------------------------------------------------------------------------------------
function postGathering(payload) {
  const data = {};
  payload.forEach((value, key) => (data[key] = value));
  console.log(data);

  fetch(`${BASE_URL}/api/v1/gatherings/posts`, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRqbTA0MjEyQGdtYWlsLmNvbSIsImlhdCI6MTY3NTk1NzU5OCwiZXhwIjoxNjc1OTU3ODk4fQ.TbtnLwef3bMHPW98khLcuRPx0pdp4Mp-C07ulqcq2dU',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then((response) => console.log(response));
}

// 함께가요 전체조회 -> 함께가요 상세조회 이동 --------------------------------------------------------------------------------------------
function submitSinglePage(e, id) {
    console.log(e);
    
    var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "GET");
    form.setAttribute("action", "/gathering-single");

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "id");
    hiddenField.setAttribute("value", id);
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
}

// 
async function getEnrolls(gatheringId) {
    let url = 'http://localhost:8080/api/v1/gatherings/%27+gatheringId+%27/enroll/list';
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

// ---------------------------------------------------------------------------------------------------------

async function renderExhibisionForwork() {
    let exhibitions = await getExhibitionsById();
    let exhibition = exhibitions.result.content;
    let html = '';
  
    exhibition.forEach(element => {
      html += `
      <a href="work-single.html" class="col-sm-6 col-lg-4 text-decoration-none exhibition freeExhibition">
          <div class="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
              <img class="card-img-top" src=${element.mainImgUrl} alt="...">
              <div class="card-body">
                  <h5 class="card-title light-300 text-dark">${element.title}</h5>
                  <p class="card-text light-300 text-dark">
                      ${element.description}
                  </p>
                  <span class="text-decoration-none text-primary light-300">
                        Read more <i class='bx bxs-hand-right ms-1'></i>
                    </span>
              </div>
          </div>
      </a>
      `;
    });
  
    const div = document.getElementById('exhibision_container');
    div.innerHTML = html;
  }


  // 전시회 검색 기능
  function searchExhibition() {
    if (searchInput.value !== "") {
      newArr = exhitibionArray.filter((el) =>
        el.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
  
      searchResult.innerHTML = "";
  
      newArr.map((contents) => {
        let result = document.createElement("div");
        searchResult.appendChild(result);
        result.innerHTML = `<div><img src="${contents.mainImgUrl}"/></div><div>${contents.name}<div>${contents.description}</div></div>`;
      });
    } else {
      searchResult.innerHTML = "";
    }
  }

  //알람 기능
async function getAlarms() {
  let url = 'http://127.0.0.1:8080/api/v1/my/alarms';
  var cookie = getCookie("accessToken")
  if( !cookie ){
      console.log("쿠키가 비어 있음")
  }
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
async function renderAlarms() {
  let alarms = await getAlarms();
  let alarm = alarms.result.content;

  if(alarms.resultCode=="ERROR"){
      console.log(alarms.result.message);
      alert(alarms.result.message);
  }
  let html = '';
  
  Array.from(alarm).forEach(element => {
      let htmlSegment = `
      <li><a class="dropdown-item" ><b>
      ${element.exhibitionName}<br>${element.alarmMessage}</b></a></li>`;
      html += htmlSegment;
  });

  let container = document.querySelector('.alarmscontainer');
  container.innerHTML = html;
}

function clickAlarm() {
  let click = document.querySelector(".click");
  click.addEventListener('click', function() {
      renderAlarms();
  })
}

// 헤더 로그인 로그아웃
function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  location.reload(true);
};

function getCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  location.reload(true);
  alert("로그아웃 완료");
}

