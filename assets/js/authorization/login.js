$(document).ready(function () {
  let signup = $('.links').find('li').find('#signup');
  let signin = $('.links').find('li').find('#signin');
  let reset = $('.links').find('li').find('#reset');
  let first_input = $('section').find('.first-input');
  let hidden_input = $('section').find('.input__block').find('#repeat__password');
  let signin_btn = $('section').find('.signin__btn');

  //----------- sign up ---------------------
  signup.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('h1').text('SIGN UP');
    $(this).parent().css('opacity', '1');
    $(this).parent().siblings().css('opacity', '.6');
    first_input.removeClass('first-input__block').addClass('signup-input__block');
    hidden_input.css({
      opacity: '1',
      display: 'block',
    });
    signin_btn.text('Sign up');
  });

  //----------- sign in ---------------------
  signin.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('h1').text('SIGN IN');
    $(this).parent().css('opacity', '1');
    $(this).parent().siblings().css('opacity', '.6');
    first_input.addClass('first-input__block').removeClass('signup-input__block');
    hidden_input.css({
      opacity: '0',
      display: 'none',
    });
    signin_btn.text('Sign in');
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
    alert('이메일을 입력해주세요.');
    return;
  }

  if (!email.includes('@')) {
    alert('이메일 형식이 올바르지 않습니다.');
    return;
  }

  if (password === '') {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  // if (document.getElementById('password').value.length < 8) {
  //     alert('비밀번호는 8자 이상이어야 합니다.');
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
        Swal.fire('환영합니다 🥳', '다시 만나서 반가워요 🫰🏻 !!!', 'success').then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/index.html';
          }
        });
      } else if (res.resultCode === 'ERROR') {
        console.log(res.json());
        Swal.fire('로그인 실패 😭', '이메일 또는 비밀번호를 다시 한 번 확인해주세요...ㅠ', 'error');
      }
    });
}
