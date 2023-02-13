import { getCookie } from '../utils/cookie.js';

/**
 * 인허가 관련 매서드
 */

// security
async function getSecurity() {
  let url = 'http://localhost:8080/api/v1/example/security';
  try {
    let res = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    });
    return await res.text();
  } catch (error) {
    console.log(error);
    alert('Request Error!');
  }
}

function getAccessToken() {
  getCookie('accessToken');
}
