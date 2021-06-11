
// init Swiper:
const swiper = new Swiper('.swiper-container', {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        loop: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768 : {
            slidesPerView: 1,
            spaceBetween: 20
          }
        },
        breakpoints: {
          1124 : {
            slidesPerView: 3,
            spaceBetween: 5
          }
        }
});
