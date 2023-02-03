// exhibitions.html
async function getExhibitionsById() {
    let url = 'http://localhost:8080/api/v1/exhibitions?sort=id';
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
        let htmlSegment = `<div class="swiper-slide">
        <div class="testimonial-item">
            <img src=${element.mainImgUrl} class="testimonial-img" alt="">
            <h3>${element.name}</h3>
            <h4>${element.galleryLocation}</h4>
        </div>
    </div><!-- End testimonial item -->`;

        html += htmlSegment;
    });

    let container = document.querySelector('#swiper-wrapper1');
    container.innerHTML = html;
}

async function getExhibitionsByEndAt() {
    let url = 'http://localhost:8080/api/v1/exhibitions?sort=endAt';
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
        let htmlSegment = `<div class="swiper-slide">
        <div class="testimonial-item">
            <img src=${element.mainImgUrl} class="testimonial-img" alt="">
            <h3>${element.name}</h3>
            <h4>${element.galleryLocation}</h4>
        </div>
    </div><!-- End testimonial item -->`;

        html += htmlSegment;
    });

    let container = document.querySelector('#swiper-wrapper2');
    container.innerHTML = html;
}