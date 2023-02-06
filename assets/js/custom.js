// exhibitions.html
async function getExhibitionsById() {
    let url = 'http://localhost:8080/api/v1/exhibitions?size=10&sort=id';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderExhibitionsById() {
    let exhibitions = await getExhibitionsById();
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
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
    let url = 'http://localhost:8080/api/v1/exhibitions?size=10&sort=endAt';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderExhibitionsByEndAt() {
    let exhibitions = await getExhibitionsByEndAt();
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
        let htmlSegment = 
        `<div class="swiper-slide">
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
    let url = 'http://localhost:8080/api/v1/gatherings?size=10';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function renderGatheringsById() {
    let exhibitions = await getGatheringsById();
    let exhibition = exhibitions.result.content;
    let html = '';
    exhibition.forEach(element => {
        let htmlSegment = 
        `<div class="swiper-slide">
        <div class="pricing-horizontal row col-11 m-auto d-flex shadow rounded overflow-hidden bg-white">
            <div class="pricing-horizontal-icon col-md-3 text-center bg-secondary text-light py-4">
                <img src=${element.exhibitionMainUrl} class="together-img" alt="">
            </div>
            <div
                class="pricing-horizontal-body offset-lg-1 col-md-6 col-lg-4 d-flex align-items-center pl-5 pt-lg-0 pt-4">
                <ul class="text-left px-4 list-unstyled mb-0 light-300">
                    <h2>${element.title}</h2>
                    <p><i class="bx bx-map"></i>${element.meetLocation}</p><br>
                    <h5>${element.content}</h5>
                </ul>
            </div>
            <div class="pricing-horizontal-tag col-md-2 text-center pt-3 d-flex align-items-center">
                <div class="w-100 light-300">
                    <p><i class="bx bx-group">${element.currentPeople}/${element.maxPeople}</i></p>
                    <a href="#" class="btn rounded-pill px-4 btn-outline-primary mb-3">참여하기</a>
                </div>
            </div>
        </div>
    </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('#swiper-wrapper3');
    container.innerHTML = html;
}


