function postExhibitionInfo() {
  var form = document.getElementById('write-exhibition');
  form.addEventListener(
    'submit',
    function (e) {
      // auto submission of te form
      e.preventDefault();

      let name = document.getElementById('exhibitionName').value;
      let galleryLocation =
        document.getElementById('gallery_address').value + document.getElementById('gallery_address_detail').value;
      let galleryName = document.getElementById('gallery_name').value;
      let startDate = document.getElementById('current-date').value;
      let endDate = document.getElementById('end-date').value;
      let price = document.getElementById('exhibitionTicketPrice').value;
      let ageLimit = document.getElementById('ageLimit').value;
      let exhibitionDetailInfo = document.getElementById('exhibitionDetailInfo').value;
      let exhibitionNotice = document.getElementById('exhibitionNotice').value;
      const mainImgUrl = document.getElementById('MainImgframe').getAttribute('src');
      const detailInfoImgUrl = document.getElementById('DetailInfoImgframe').getAttribute('src');
      const noticeImgUrl = document.getElementById('NoticeImgframe').getAttribute('src');
      let detailInfoUrl = document.getElementById('detail_info_url').value;

      async function createFile() {
        let response = await fetch (mainImgUrl);
        let data = await response.blob();
        let metadata = {type: 'image/jpeg'};
        let file = new File([data], "mainImage.jpg", metadata);
      }

      let mainImgfile = createFile();
      console.log(mainImgfile);

      // fetch(mainImgUrl)
      // .then(res => res.blob())
      // .then(blob => fetch(`${BASE_URL}/api/v1/exhibitions/images/x/main/upload`, {
      //     method: 'POST',
      //     headers: {
      //     },
      //     body: {
      //       blob  
      //     },
      //     credentials:'include',
      //     redirect: 'follow',
      //   })
      //   .then(function (response) {
      //       return response.json();
      //     })
      //   .then(function (data) {
      //     console.log(data);
      //     console.log("image 등록 완료 ");
      //     const resultCode = data.resultCode;
      //     console.log(resultCode);
      //   }));

      // const form = new FormData();
      
      // form.append("file", {name: "mainImg", type: "image/jpg", uri: mainImgUrl});

      // // image to s3 
      // fetch(`${BASE_URL}/api/v1/exhibitions/images/x/main/upload`, {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   body: {
      //     form  
      //   },
      //   credentials:'include',
      //   redirect: 'follow',
      // })
      // .then(function (response) {
      //     return response.json();
      //   })
      // .then(function (data) {
      //   console.log(data);
      //   console.log("image 등록 완료 ");
      //   const resultCode = data.resultCode;
      //   console.log(resultCode);
      // });
      
      // string to db 
      fetch(`${BASE_URL}/api/v1/exhibitions/new`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          startAt: startDate,
          endAt: endDate,
          price: price,
          ageLimit: ageLimit,
          detailInfo: exhibitionDetailInfo,
          notice: exhibitionNotice,
          galleryName: galleryName,
          galleryLocation: galleryLocation,
          // mainImgUrl: mainImgUrl,
          noticeImgUrl: noticeImgUrl,
          detailInfoImgUrl: detailInfoImgUrl,
          detailInfoUrl: detailInfoUrl
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials:'include',
        redirect: 'follow',
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          const resultCode = data.resultCode;
          if (resultCode === 'SUCCESS') {
            alert('등록 완료');
            window.location.replace(`/write-exhibition`);
          }
        });
      // .then(success => {
      // 	console.log(success)
      // 	window.location.reload;
      // })
      // .catch(error => console.log(error));
    },
    true,
  );
}

// <!-- 카카오 주소 찾기 API -->

function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      // console.log(data);

      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var jibunAddr = data.jibunAddress; // 지번 주소 변수

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      // document.getElementById('gallery_address').value = data.zonecode;
      if (roadAddr !== '') {
        document.getElementById('gallery_address').value = roadAddr;
      } else if (jibunAddr !== '') {
        document.getElementById('gallery_address').value = jibunAddr;
      }
    },
  }).open();
}

// <!-- 파일 첨부 미리보기 -->
function previewMainImg() {
  MainImgframe.src = URL.createObjectURL(event.target.files[0]);
}
function clearMainImage() {
  document.getElementById('MainImgformFile').value = null;
  MainImgframe.src = '';
}

function previewDetailInfoImg() {
  DetailInfoImgframe.src = URL.createObjectURL(event.target.files[0]);
}
function clearDetailInfoImage() {
  document.getElementById('DetailInfoImgformFile').value = null;
  DetailInfoImgframe.src = '';
}

function previewNoticeImg() {
  NoticeImgframe.src = URL.createObjectURL(event.target.files[0]);
}
function clearNoticeImage() {
  document.getElementById('NoticeImgformFile').value = null;
  NoticeImgframe.src = '';
}

// <!-- date는 현재 날짜로 표시 -->
var date = new Date();

var day = date.getDate(),
  month = date.getMonth() + 1,
  year = date.getFullYear();

month = (month < 10 ? '0' : '') + month;
day = (day < 10 ? '0' : '') + day;

var today = year + '-' + month + '-' + day;

document.getElementById('current-date').value = today;
document.getElementById('end-date').value = today;
