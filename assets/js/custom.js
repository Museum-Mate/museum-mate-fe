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


const token = ""
const base_url = ""

/* ******************** FETCH ******************** */

/* GET - 인증 필요*/
async function getWithAuth(detail_url) {
    let url = base_url + detail_url;
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": 'Bearer '+ token
            }
        });
        if(res.status == 401){
            alert("로그인을 해주세요.")
            window.location.href="/myinfo";
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function getWithAuthPage(detail_url, page) {
    let url = base_url + detail_url + `?page=${page}`;
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": 'Bearer '+ token
            }
        });
        if(res.status == 401){
            alert("로그인을 해주세요.")
            window.location.href="/myinfo";
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}


/* GET - 인증 불필요 */
async function get(detail_url) {
    let url = base_url + detail_url;
    try {
        let res = await fetch(url);
        if(res.status != 200){
            alert("서버와의 통신에 실패했습니다.")
            window.location.href="/#"
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

/* POST - 인증 필요 */
async function postWithAuth(detail_url, jsonData, alertMessage) {
    let url = base_url + detail_url;
    try {
        let res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer '+ token
            },
            body: jsonData
        });
        if(res.status!=200){
            alert(alertMessage)
        }
        return await res.status;
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

/* PUT 인증 필요 */
async function put(detail_url, jsonData) {
    let url = base_url + detail_url;
    try {
        let res = await fetch(url, {
            method: 'put',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer '+ token
            },
            body: jsonData
        });
        if(res.status != 200){
            alert("문제가 발생했습니다")
        }
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

/* DELETE 인증 필요 */
async function deleteWithAuth(detail_url) {
    let url = base_url + detail_url;
    try {
        let res = await fetch(url, {
            method: 'delete',
            headers: {
                "Authorization": 'Bearer '+ token
            }
        });
        if(res.status != 200){
            alert("문제가 발생했습니다")
        }
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}
/* ******************** MY-INFO ******************** */

/* 회원 정보 페이지 렌더링 */
async function renderMyInfo() {
    let myinfo = await getWithAuth("/my");
    myinfo = myinfo.result;
    let html = 
        `<div class="row">
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>이름</p>
            </div>
            <div class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details">${myinfo.name}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>닉네임</p>
            </div>
            <div id="my-username" class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details" id="my-username-detail">${myinfo.userName}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>이메일</p>
            </div>
            <div class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details">${myinfo.email}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>전화번호</p>
            </div>
            <div id="my-phone-number" class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details" id="my-phone-number-detail">${myinfo.phoneNumber}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>생년월일</p>
            </div>
            <div class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details">${myinfo.birth}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>주소</p>
            </div>
            <div id="my-address" class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details" id="my-address-detail">${myinfo.address}</p>
            </div>
            <div id="my-button" class="col-md-12 col-12 m-auto text-end">
                <button type="button" onclick="renderMyInfoModify()"
                    class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 me-2 radius-0 text-light">수정하기</button>
            </div>
        </div>`;


    let container = document.querySelector('.my-info');
    container.innerHTML = html;
}

function parseAddress(address){
    return address.replace("[","").split("] ");
}

/* 수정하기 버튼 눌렀을 때 */
async function renderMyInfoModify() {
    /* 해당 칸에 있는 정보 불러오기 */
    let myUserNameValue = document.getElementById("my-username-detail").innerText;
    let myPhoneNumberValue = document.getElementById("my-phone-number-detail").innerText;
    let myAddressValue = document.getElementById("my-address-detail").innerText;

    let addressDetail = parseAddress(myAddressValue);
    
    if(addressDetail.length < 2){
        var postcode = "";
        var address = addressDetail[0];
    }else{
        postcode = addressDetail[0];
        address = addressDetail[1];
    }
    
    /* 해당 블록에 다음의 html로 바꿔서 뿌리기 */
    let myUserName = document.querySelector('#my-username')
    myUserName.innerHTML = `<p class="form_list_input ps-3"><input type="text" id="my-username-detail" style="width: 130px" value="${myUserNameValue}"></p>`;

    let myPhoneNum = document.querySelector('#my-phone-number')
    myPhoneNum.innerHTML = `<p class="form_list_input ps-3"><input type="text" id="my-phone-number-detail" pattern="\d*" required style="width: 130px" value="${myPhoneNumberValue}"></p>`;

    let myAddress = document.querySelector("#my-address")
    myAddress.innerHTML = `<p class="form_list_input ps-3">
    <input type="text" id="my-postcode-detail" class="mb-3 me-2" style="width: 150px" value="${postcode}">
    <input type="button" onclick="sample6_execDaumPostcode()" class="mb-3" value="우편번호 찾기"><br>
    <input type="text" id="my-address-detail" style="width: 95%" value="${address}">
    </p>`;

    let submitButton = document.querySelector('#my-button')
    submitButton.innerHTML = 
        `<button type="button" onclick="renderMyInfo()" class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 me-2 radius-0 text-light ">취소</button>
        <button type="button" onclick="modifyMyInfo()" class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 me-2 radius-0 text-light ">수정 완료</button>`;
}

/* 수정 제출 했을 때 먼저 이름 중복 체크 */
async function checkUserName(){
    let myUserNameValue = document.getElementById("my-username-detail").value;

    let jsonData = JSON.stringify({
        userName: myUserNameValue
        })
    let status = await postWithAuth("/users/check", jsonData, "아이디가 중복됩니다!")

    if(status==200){
        modifyMyInfo();
    }
}

/* 이름 중복 체크 후 수정(PUT) */
async function modifyMyInfo(){
    /* 해당 칸에 있는 정보 불러오기 */
    let myUserNameValue = document.getElementById("my-username-detail").value;
    let myPhoneNumberValue = document.getElementById("my-phone-number-detail").value;
    let myPostCodeValue = document.getElementById("my-postcode-detail").value;
    let myAddressValue = document.getElementById("my-address-detail").value;

    let finalMyAddressValue = '['+ myPostCodeValue + '] ' + myAddressValue;

    let jsonData = JSON.stringify({
        phoneNumber: myPhoneNumberValue,
        address: finalMyAddressValue,
        userName: myUserNameValue
    })

    /* 수정 요청 보내기*/
    await put("/users/modify",jsonData);
    
    /*다시 렌더링*/
    renderMyInfo();
}

/* 주소 API */
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                addr += extraAddr
            } 

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('my-postcode-detail').value = data.zonecode;
            document.getElementById("my-address-detail").value = addr;
        }
    }).open();
}

/* ******************** MY-CALENDAR ******************** */

/* 캘린더 Date Format */
function calendarDateFormatter(date){
    return date.split('.', 3).join('-');
}

/* 마이 캘린더 정보 조회*/
async function parseMyCalendar() {
    let eventsResponse = await getWithAuth("/my/calendars");
    let events = eventsResponse.result;
    var eventArr = [];
    events.forEach(element => {
        eventArr.push({
            title: `${element.name}`,
            start: calendarDateFormatter(`${element.startAt}`),
            end: calendarDateFormatter(`${element.endAt}`),
            url: '/exhibitions?id='+ `${element.id}`,
            backgroundColor: '#dbddebb0',
            borderColor:'#dbddebb0',
            textColor:'black'
        });
    });

    return eventArr
}

/* ******************** MY-REVIEWS ******************** */

/* Date 파싱 */
function getDate(dateTime){
    return dateTime.split('T')[0];
}

/* 마이 리뷰 페이지 렌더링*/
async function renderMyReviews(page) {
    let reviews = await getWithAuthPage("/my/reviews", page);
    let review = reviews.result.content;
    
    let html = '';

    review.forEach(element => {

        let createdAt = getDate(element.createdAt);
        let vistedDate = getDate(element.visitedDate);
        let htmlSegment = 
        `
        <div class="update-post" id="review-${element.id}">
            <div class="row">
                <div class="col-lg-10 col-md-12 col-sm-12 col-xs-10 ps-4">
                    <div id="star-${element.id}">`
        let rate = element.star;
        for(let i=0; i < rate; i++){
            htmlSegment+=`<i class='bx bx-star star-rate'></i>`
        }
        for(let j=0; j < 5-rate; j++){
            htmlSegment+=`<i class='bx bx-star'></i>`
        }
        console.log("OK");
        htmlSegment += `
                        <span class="ps-1 star-int" id="rate-number-${element.id}">${element.star}</span>
                    </div>
                    <span class="update-date">${element.exhibitionName}, <span
                            id="review-visited-at-${element.id}">${vistedDate}</span> 방문</span>
                    <h5 class="update-title" id="review-title-${element.id}">${element.title}</h5>
                    <p id="review-content-${element.id}">${element.content}</p>
                </div>
                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-2 pt-2">
                    <p class="update-date text-end">작성일: ${createdAt}</p>
                    <div class="text-end simple-btn" id="review-btns-${element.id}">
                        <button type="button" onclick="renderReviewModify(${element.id})" class="text-decoration-none text-primary ">
                            수정
                        </button>
                        <button type="button" onclick="deleteAReview(${element.id})" class="text-decoration-none text-primary ">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-reviews');
    container.innerHTML = html;

    let previous = "";
    if(reviews.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(reviews.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-reviews-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyReviews(${reviews.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyReviews(${reviews.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}

/* 리뷰 수정 - 별점 값 가져오는 함수*/
function getRate(event,id){
    document.getElementById(`rate-number-${id}`).innerText = event.target.value;
}

/* 리뷰 수정 페이지 렌더링 */
async function renderReviewModify(id){
    /* 해당 칸에 있는 정보 불러오기 */
    var rateNumber = document.getElementById(`rate-number-${id}`).innerText;
    var reviewVisitedAtValue = document.getElementById(`review-visited-at-${id}`).innerText;
    var reviewTitleValue = document.getElementById(`review-title-${id}`).innerText;
    var reviewContentValue = document.getElementById(`review-content-${id}`).innerText;
    
     /* 해당 블록에 다음의 html로 바꿔서 뿌리기 */
     let star = document.querySelector(`#star-${id}`)
     star.innerHTML = `
     <div class="review-form mb-2" style="width:135px">
        <div id="star-icon-${id}">
            <input type="radio" name="rating-${id}" value="5" id="rate5-${id}" onclick="getRate(event,${id})"><label for="rate5-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="4" id="rate4-${id}" onclick="getRate(event,${id})"><label for="rate4-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="3" id="rate3-${id}" onclick="getRate(event,${id})"><label for="rate3-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="2" id="rate2-${id}" onclick="getRate(event,${id})"><label for="rate2-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="1" id="rate1-${id}" onclick="getRate(event,${id})"><label for="rate1-${id}"><i class='bx bx-star'></i></label>
        </div>
        <span class="ps-1 star-int" id="rate-number-${id}"></span>
    </div>`;
    
    document.getElementById(`rate${rateNumber}-${id}`).click();

    let reviewVisitedAt = document.querySelector(`#review-visited-at-${id}`)
    reviewVisitedAt.innerHTML = `
        <input class="review-form mx-1"
            type="date"
            style="width: 100px; font-size: 12px; height:20px" id="review-visited-at-value-${id}" value="${reviewVisitedAtValue}">`;
    
    let reviewTitle = document.querySelector(`#review-title-${id}`)
    reviewTitle.innerHTML = `<input
    class="review-form mt-1" type="text" id="review-title-value-${id}" 
    style="width: 100%; height:30px" value="${reviewTitleValue}">`;

    let reviewContent = document.querySelector(`#review-content-${id}`)
    reviewContent.innerHTML = `<textarea class="review-form mt-1" type="text" id="review-content-value-${id}" 
    style="width: 100%; height:150px">${reviewContentValue}</textarea>`;

    let modifyButtons = document.querySelector(`#review-btns-${id}`);
    modifyButtons.innerHTML = `
    <button type="button" onclick="renderAReview(${id})" class="text-decoration-none text-primary">뒤로</button>
    <button type="button" onclick="modifyAReview(${id})" class="text-decoration-none text-primary">저장</button>`;
}

/* 리뷰 수정 내용 PUT */
async function modifyAReview(id){
    var modifiedRateNumber = document.getElementById(`rate-number-${id}`).innerText;
    var modifiedVisitedDate = document.getElementById(`review-visited-at-value-${id}`).value;
    var modifiedReviewTitle = document.getElementById(`review-title-value-${id}`).value;
    var modifiedReviewContent = document.getElementById(`review-content-value-${id}`).value;


    let jsonData = JSON.stringify({
        newTitle: modifiedReviewTitle,
        newContent: modifiedReviewContent,
        newStar: modifiedRateNumber,
        newVisitedDate: modifiedVisitedDate
    })

    /* 수정 요청 보내기*/
    await put(`/reviews/${id}`,jsonData);
    
    /*다시 렌더링*/
    renderAReview(id);
}

/* 리뷰 하나 렌더링 */
async function renderAReview(id){
    let review = await get(`/reviews/${id}/details`)
    review = review.result;
    
        let createdAt = getDate(review.createdAt);
        let vistedDate = getDate(review.visitedDate);
        let htmlSegment = 
        `
            <div class="row">
                <div class="col-lg-10 col-md-12 col-sm-12 col-xs-10 ps-4">
                    <div id="star-${review.id}">`
        let rate = review.star;
        for(let i=0; i < rate; i++){
            htmlSegment+=`<i class='bx bx-star star-rate'></i>`
        }
        for(let j=0; j < 5-rate; j++){
            htmlSegment+=`<i class='bx bx-star'></i>`
        }
        htmlSegment += `
                        <span class="ps-1 star-int" id="rate-number-${review.id}">${review.star}</span>
                    </div>
                    <span class="update-date">${review.exhibitionName}, <span
                            id="review-visited-at-${review.id}">${vistedDate}</span> 방문</span>
                    <h5 class="update-title" id="review-title-${review.id}">${review.title}</h5>
                    <p id="review-content-${review.id}">${review.content}</p>
                </div>
                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-2 pt-2">
                    <p class="update-date text-end">작성일: ${createdAt}</p>
                    <div class="text-end simple-btn" id="review-btns-${review.id}">
                        <button type="button" onclick="renderReviewModify(${review.id})" class="text-decoration-none text-primary ">
                            수정
                        </button>
                        <button type="button" onclick="deleteAReview(${id})" class="text-decoration-none text-primary ">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        `;

    let container = document.querySelector(`#review-${review.id}`);
    container.innerHTML = htmlSegment;
}

async function deleteAReview(id){
    if(confirm("리뷰를 삭제하시겠습니까?")){
        await deleteWithAuth(`/reviews/${id}`);
    }
    renderMyReviews();
}

/* ******************** MY-GATHERINGS ******************** */

/* 마이 모집글 */
async function renderMyGatherings(page) {
    let gatherings = await getWithAuthPage("/my/gatherings",page);
    let gathering = gatherings.result.content;
    let html = '';
    gathering.forEach(element => {
        let createdAt = getDate(element.createdAt);
        let htmlSegment = 
        `
        <div class="update-post">
            <div class="row">
                <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 px-4">
                    <span class="update-date">${element.exhibitionName}</span>
                    <h5 class="update-title"><i class="bx bx-group"></i>${element.title}</h5>
                    <p>${element.content}</p>
                    <p><span style="color:#4346a2">모집 현황:</span> ${element.currentPeople}/${element.maxPeople}<button type="button" onclick="renderMyInfo()" class="btn btn-secondary px-1 py-1 ms-3 radius-0 text-light" style="font-size: 13px">신청자 보기</button></p>
                    <p><span style="color:#4346a2">만나는 날짜:</span> ${element.meetDateTime}</p>
                    <p><span style="color:#4346a2">만나는 장소:</span> ${element.meetLocation}</p>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 pt-2">
                    <p class="update-date text-end">작성일: ${createdAt}</p>
                    <div class="text-end simple-btn">
                        <button type="button" onclick="" class="text-decoration-none text-primary">
                            더보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-gatherings');
    container.innerHTML = html;

    let previous = "";
    if(gatherings.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(gatherings.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-gatherings-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyGatherings(${gatherings.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyGatherings(${gatherings.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}


/* 마이 참여 신청한 모집글 */
async function renderMyParticipations(page) {
    let participations = await getWithAuthPage("/my/gatherings/enrolls",page);
    let participation = participations.result.content;
    let html = '';
    participation.forEach(element => {
        let createdAt = getDate(element.createdAt);
        let htmlSegment = 
        `
        <div class="update-post">
            <div class="row">
                <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 px-4">
                    <span class="update-date">${element.exhibitionName}</span>
                    <h5 class="update-title"><i class="bx bx-group"></i> ${element.title}</h5>
                    <p>${element.content}</p>
                    <p><span style="color:#4346a2">주최자:</span> ${element.userName}</p>
                    <p><span style="color:#4346a2">모집 현황:</span> ${element.currentPeople}/${element.maxPeople}</p>
                    <p><span style="color:#4346a2">만나는 날짜:</span> ${element.meetDateTime}</p>
                    <p><span style="color:#4346a2">만나는 장소:</span> ${element.meetLocation}</p>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 pt-2">
                    <div class="text-end simple-btn">
                        <button type="button" onclick="" class="text-decoration-none text-primary">
                            더보기
                        </button>
                    </div>
                </div>
                <div id="my-button" class="col-md-12 col-12 m-auto text-end">
                    <button type="button" onclick=""
                        class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 radius-0 text-light">신청 취소하기</button>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-participations');
    container.innerHTML = html;

    let previous = "";
    if(participations.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(participations.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-participations-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyParticipations(${participations.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyParticipations(${participations.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}