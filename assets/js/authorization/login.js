$(document).ready(function () {
  let signup = $('.links').find('li').find('#signup');
  let signin = $('.links').find('li').find('#signin');
  let reset = $('.links').find('li').find('#reset');
  let first_input = $('section').find('.first-input');
  let hidden_input = $('section').find('.input__block').find('#repeat__password');
  let hidden_input2 = $('section').find('.input__block').find('#name');
  let hidden_input3 = $('section').find('.input__block').find('#nickname');
  let hidden_input4 = $('section').find('.input__block').find('#sample6_postcode');
  let hidden_button = $('section').find('.address__btn');
  let hidden_input5 = $('section').find('.input__block').find('#sample6_address');
  let hidden_input6 = $('section').find('.input__block').find('#sample6_extraAddress');
  let hidden_input7 = $('section').find('.input__block').find('#sample6_detailAddress');
  let hidden_input8 = $('section').find('.input__block').find('#birth');
  let hidden_input9 = $('section').find('.input__block').find('#phoneNumber');
  let signin_btn = $('section').find('.signin__btn');

  //----------- sign up ---------------------
  signup.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('h1').text('SIGN UP');
    $(this).parent().css('opacity', '1');
    $(this).parent().siblings().css('opacity', '.6');
    first_input.removeClass('first-input__block').addClass('signup-input__block');

    let container = document.querySelector('#sign-btn');
    container.innerHTML = 
    `
    <button class="signin__btn" onclick=join()>
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
        Sign up
    </button>
    `;
    hidden_input.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input2.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input3.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input4.css({
      opacity: '1',
      display: 'block',
    });
    hidden_button.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input5.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input6.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input7.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input8.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input9.css({
      opacity: '1',
      display: 'block',
    });
    // signin_btn.text('Sign up');
  });

  //----------- sign in ---------------------
  signin.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('h1').text('SIGN IN');
    $(this).parent().css('opacity', '1');
    $(this).parent().siblings().css('opacity', '.6');
    first_input.addClass('first-input__block').removeClass('signup-input__block');

    let container = document.querySelector('#sign-btn');
    container.innerHTML = 
    `
    <div id="sign-btn">
        <button class="signin__btn" onclick=login()>
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            Sign in
        </button>
    </div>  
    `;

    hidden_input.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input2.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input3.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input4.css({
      opacity: '0',
      display: 'none',
    });
    hidden_button.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input5.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input6.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input7.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input8.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input9.css({
      opacity: '0',
      display: 'none',
    });
    // signin_btn.text('Sign in');
  });

  //----------- reset ---------------------
  reset.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('section').find('.input__block').find('.input').val('');
  });
});

// -------------------  Login  ---------------------------------------------------------------------------------------------------------

function login() {
  const url = `${BASE_URL}/api/v1/users/login`;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('url:', url);
  console.log('email:', email);
  console.log('password:', password);

  if (email === '') {
    alert('???????????? ??????????????????.');
    return;
  }

  if (!email.includes('@')) {
    alert('????????? ????????? ???????????? ????????????.');
    return;
  }

  if (password === '') {
    alert('??????????????? ??????????????????.');
    return;
  }

  // if (document.getElementById('password').value.length < 8) {
  //     alert('??????????????? 8??? ??????????????? ?????????.');
  //     return;
  // }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.resultCode === 'SUCCESS') {
        console.log(res);
        Swal.fire('??????????????? ????', '?????? ????????? ???????????? ???????? !!!', 'success').then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/index.html';
          }
        });
      } else if (res.result.errorCode === "INVALID_PASSWORD") {
        // console.log(res.json());
        Swal.fire('????????? ?????? ????', '????????? ?????? ??????????????? ?????? ??? ??? ??????????????????...???', 'error');
      } else if (res.result.errorCode === "EMAIL_NOT_FOUND") {
        Swal.fire('????????? ?????? ????', '???????????? ?????? ??????????????????. ??????????????? ????????????', 'error')
        .then( result => {
          if (result.isConfirmed) { 
            document.getElementById('signup').click();
          }
        });
      } else if (res.result.errorCode === "INVALID_MAIL") {
        // console.log(res.json());
        Swal.fire('????????? ?????? ????', '????????? ????????? ???????????? ???????????????.', 'error');
      }
    });
}

// ------------------------------ Join -------------------------------------------------------------
async function join() {
  // ?????? ??????
  const url = `${BASE_URL}/api/v1/users/join`;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordCheck = document.getElementById('repeat__password').value;
  const name = document.getElementById('name').value;
  const userName = document.getElementById('nickname').value;
  const birth = document.getElementById('birth').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const postcode = document.getElementById('sample6_postcode').value;
  const extraAddress = document.getElementById('sample6_extraAddress').value;
  const detailAddress = document.getElementById('sample6_detailAddress').value;
  const address = document.getElementById('sample6_address').value;
  // const fullAddress = document.getElementById('address').value;

  if (email === '') {
    alert('???????????? ??????????????????.');
    return;
  }

  if (password === '') {
    alert('??????????????? ??????????????????.');
    return;
  }

  if (document.getElementById('password').value.length < 8) {
    alert('??????????????? 8??? ??????????????? ?????????.');
    return;
  }

  if (passwordCheck === '' || password != passwordCheck) {
    alert('??????????????? ??????????????????.');
    return;
  }

  if (postcode== '' || address == '' || detailAddress == ''){
    alert('????????? ??????????????????.')
    return
  }

  if(birth.length!=6){
    alert('???????????? 6????????? ??????????????????.');
    return;
  }

  let fullAddress = '';
  if(extraAddress == ''){
    fullAddress = "[" + postcode + "] " + `${address} ${detailAddress}`;
  } else{
    fullAddress = "[" + postcode + "] " + `${address} ${extraAddress} ${detailAddress}`;
  }

  try {
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        userName: userName,
        birth: birth,
        phoneNumber: phoneNumber,
        address: fullAddress
      }),
    });
    console.log(res.status);
    if(res.status == 200){
      Swal.fire({
        title: '???????????? ???????????? ?????? ????????? ????????????????????????! ????',
        text: '????????? ???????????? ?????? ?????? ??? ????????? ????????????',
        icon: 'success',
      }).then( result => {
        if (result.isConfirmed) { 
        window.location.href = "/login"
        }
      });
    }
    if(res.status == 409){
        jsonResponse = await res.json();
        if(jsonResponse.result.errorCode == "DUPLICATE_EMAIL"){
          Swal.fire({
            title: '???????????? ?????? ????',
            text: '?????? ???????????? ?????? ???????????? ??????????????????!',
            icon: 'error',
            confirmButtonText: '??????'
          }).then(result => {
            if (result.isConfirmed) { 
            window.location.href = "/login"
            }
          });
        }
        else if(jsonResponse.result.errorCode == "DUPLICATE_USERNAME"){
          Swal.fire({
            title: '???????????? ??????????????? ????',
            text: '?????? ???????????? ??????????????????',
            icon: 'error',
          });
        }
    }
} catch (error) {
    console.log(error);
    alert("Request Error!");
}

}

function checkPostParams() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = '';
      var extraAddr = '';
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[???|???|???]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        document.getElementById('sample6_extraAddress').value = extraAddr;
      } else {
        document.getElementById('sample6_extraAddress').value = '';
      }
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById('sample6_address').value = addr;
      document.getElementById('sample6_detailAddress').focus();
    },
  }).open();
}