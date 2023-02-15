async function postExhibitionInfo() {
  var form = document.getElementById('write-exhibition');
  form.addEventListener(
    'submit',
    function (e) {
      // auto submission of the form
      e.preventDefault();

      let exhibitionName = document.getElementById('exhibitionName').value;
      let galleryLocation =
        document.getElementById('gallery_address').value + document.getElementById('gallery_address_detail').value;
      let galleryName = document.getElementById('gallery_name').value;
      let startDate = document.getElementById('current-date').value;
      let endDate = document.getElementById('end-date').value;
      let price = document.getElementById('exhibitionTicketPrice').value;
      let ageLimit = document.getElementById('ageLimit').value;
      let exhibitionDetailInfo = document.getElementById('exhibitionDetailInfo').value;
      let exhibitionNotice = document.getElementById('exhibitionNotice').value;
      let detailInfoUrl = document.getElementById('detail_info_url').value;
      
      const mainImg = document.getElementById('hiddenMainImgUrl').value; //mainImg
      const detailInfoImg = document.getElementById('hiddenDetailInfoImgUrl').value; //detailInfoImg
      const noticeImg = document.getElementById('hiddenNoticeImgUrl').value; //noticeImg

      postExhibitionTextInfo();
      // - 1. 메인이미지 -------------------------------------------------
      // let S3MainImgUrlString = 
      // async function getS3MainImgUrl() {
      //   const mainImageInput = await document.getElementById('MainImgformFile');
      //     let selectedMainImg = mainImageInput.files[0];
      //     console.log("메인 이미지: ", selectedMainImg);
      //     let url = `${BASE_URL}/api/v1/exhibitions/images/main`; // url 확인
      //     let mainImage = new FormData();
      //     mainImage.append("mainImg", selectedMainImg);
      //     let result = await fetch (url, {
      //       method: 'POST',
      //       body: mainImage,
      //       headers: {
      //         // 'Content-Type': 'multipart/form-data'
      //       },
      //       credentials:'include',
      //       // redirect: 'follow',
      //     }).then (
      //       (response) => {
      //         return response.json();
      //       }
      //     ).then (
      //       (data) => {
      //       console.log(data);
      //       const url = data.result; //url
      //       console.log(url);
      //     });
      // }

      // - 2. 상세정보 이미지 -------------------------------------------------
      // let S3detailInfoImgUrlString = 
      // async function getS3detailInfoImgUrl() {
      //   const detailInfoImgInput = await document.getElementById('DetailInfoImgformFile');
        
      //     let selectedDetailInfoImg = detailInfoImgInput.files[0];
      //     let url = `${BASE_URL}/api/v1/exhibitions/images/detailInfo` // url 확인 
      //     console.log("메인 이미지: ", selectedDetailInfoImg);

      //     let detailInfoImage = new FormData();
      //     detailInfoImage.append("detailInfoImg", selectedDetailInfoImg);

      //       let result = await fetch (url, {
      //         method: 'POST',
      //         body: detailInfoImage,
      //         headers: {
      //           // 'Content-Type': 'multipart/form-data'
      //         },
      //         credentials:'include',
      //         // redirect: 'follow',
      //       }).then(
      //         (response) => {
      //           return response.json();
      //         }  
      //       ).then(
      //         (data) => {
      //           console.log(data);
      //           const url = data.result; //url
      //           console.log(url);
      //         });
      // }

      // - 3. 안내사항 이미지 (notice image) -------------------------------------------------
      // let S3noticeImgUrlString = 
      // async function getS3noticeImgUrl() {
      //   const noticeImageInput = await document.getElementById('NoticeImgformFile');
        
      //   let selectedNoticeImg = noticeImageInput.files[0];
      //   let url = `${BASE_URL}/api/v1/exhibitions/images/notice`
      //   console.log("메인 이미지: ", selectedNoticeImg);
      //   let noticeImage = new FormData();
      //   noticeImage.append("noticeImg", selectedNoticeImg);

      //   let result = await fetch (url, {
      //     method: 'POST',
      //     body: noticeImage,
      //     headers: {
      //       // 'Content-Type': 'multipart/form-data'
      //     },
      //     credentials:'include',
      //     // redirect: 'follow',
      //   }).then(
      //     (response) => {
      //       return response.json();
      //     }
      //   ).then(
      //     (data) => {
      //       console.log(data);
      //       const url = data.result; //url
      //       console.log(url);
      //     }
      //   );
      // }      


      // ============================================================================================
      // Nested Fetch
      async function postExhibitionTextInfo() {
        let url = `${BASE_URL}/api/v1/exhibitions/new`;
        try {

          let result = await fetch (url, {
            method: 'POST',
            body: JSON.stringify({
              name: exhibitionName,
              startAt: startDate,
              endAt: endDate,
              price: price,
              ageLimit: ageLimit,
              detailInfo: exhibitionDetailInfo,
              notice: exhibitionNotice,
              galleryName: galleryName,
              galleryLocation: galleryLocation,
              mainImgUrl: mainImg,
              detailInfoImgUrl: detailInfoImg,
              noticeImgUrl: noticeImg,
              detailInfoUrl: detailInfoUrl
            }),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials:'include',
            redirect: 'follow',
          });
          return await result.json();

        } catch(error) {

          console.log(error);

        }
      }
    
      // let mainImgResult = postExhibitionMainImage();
      // let noticeImgResult = postExhibitionNoticeImage();
      // let detailInfoImgResult = postExhibitionDetailInfoImage();
      
      // const resultCode = data.resultCode;
      // const mainImgResultCode = mainImgResult.resultCode;
      // const noticeImgResultCode = noticeImgResult.resultCode;
      // const detailInfoImgResultCode = detailInfoImgResult.resultCode;
      
      // if (resultCode === 'SUCCESS' &&
      // mainImgResultCode === 'SUCCESS' &&
      // noticeImgResultCode === 'SUCCESS' &&
      // detailInfoImgResultCode === 'SUCCESS') {
      //   alert('등록 완료');
      //   window.location.replace(`/write-exhibition`);
      // } else {
      //   alert('모든 정보를 입력했는지 확인해주세요!');
      // }
    }
  )
};


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
const mainImgUrl = document.getElementById('MainImgframe').getAttribute('src');
const detailInfoImgUrl = document.getElementById('DetailInfoImgframe').getAttribute('src');
const noticeImgUrl = document.getElementById('NoticeImgframe').getAttribute('src');

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

// 이미지 onchange 함수
// - 1. 메인이미지 -------------------------------------------------
async function getS3MainImgUrl() {
  const mainImageInput = await document.getElementById('MainImgformFile');
    let selectedMainImg = mainImageInput.files[0];
    console.log("메인 이미지: ", selectedMainImg);
    let url = `${BASE_URL}/api/v1/exhibitions/images/main`; // url 확인
    let mainImage = new FormData();
    mainImage.append("mainImg", selectedMainImg);
    let result = await fetch (url, {
      method: 'POST',
      body: mainImage,
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      credentials:'include',
      // redirect: 'follow',
    }).then (
      (response) => {
        return response.json();
      }
    ).then (
      (data) => {
      console.log(data);
      const url = data.result; //url
      console.log(url);
      document.getElementById('hiddenMainImgUrl').value = url;
    });
}

// - 2. 상세정보 이미지 -------------------------------------------------
async function getS3detailInfoImgUrl() {
  const detailInfoImgInput = await document.getElementById('DetailInfoImgformFile');
  
    let selectedDetailInfoImg = detailInfoImgInput.files[0];
    let url = `${BASE_URL}/api/v1/exhibitions/images/detailInfo` // url 확인 
    console.log("메인 이미지: ", selectedDetailInfoImg);

    let detailInfoImage = new FormData();
    detailInfoImage.append("detailInfoImg", selectedDetailInfoImg);

      let result = await fetch (url, {
        method: 'POST',
        body: detailInfoImage,
        headers: {
          // 'Content-Type': 'multipart/form-data'
        },
        credentials:'include',
        // redirect: 'follow',
      }).then(
        (response) => {
          return response.json();
        }  
      ).then(
        (data) => {
          console.log(data);
          const url = data.result; //url
          console.log(url);
          document.getElementById('hiddenDetailInfoImgUrl').value = url;
        });
}

// - 3. 안내사항 이미지 (notice image) -------------------------------------------------
async function getS3noticeImgUrl() {
  const noticeImageInput = await document.getElementById('NoticeImgformFile');
  
  let selectedNoticeImg = noticeImageInput.files[0];
  let url = `${BASE_URL}/api/v1/exhibitions/images/notice`
  console.log("메인 이미지: ", selectedNoticeImg);
  let noticeImage = new FormData();
  noticeImage.append("noticeImg", selectedNoticeImg);

  let result = await fetch (url, {
    method: 'POST',
    body: noticeImage,
    headers: {
      // 'Content-Type': 'multipart/form-data'
    },
    credentials:'include',
    // redirect: 'follow',
  }).then(
    (response) => {
      return response.json();
    }
  ).then(
    (data) => {
      console.log(data);
      const url = data.result; //url
      console.log(url);
      document.getElementById('hiddenNoticeImgUrl').value = url;
    }
  );
}