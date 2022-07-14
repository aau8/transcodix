import Swiper, { EffectFade, Autoplay } from 'swiper'

const streamSwiper = new Swiper(".stream__slider", {
	modules: [ EffectFade, Autoplay ],

	effect: 'fade',
	fadeEffect: {
	  crossFade: true
	},


	autoplay: {
		delay: 4000,
	},

	allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
});