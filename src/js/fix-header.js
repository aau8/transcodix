const headerArea = document.querySelector('.header-area')
const header = headerArea.querySelector('.header')
const main = document.querySelector('.main')
let elY = 0;
let scrollY = 0;

headerArea.style.height = header.clientHeight + 'px'

fixedMenu()
window.addEventListener('scroll', fixedMenu)

function fixedMenu() {
    const el = document.querySelector('.header');
    const height = el.offsetHeight;
    const pos = window.pageYOffset;
    const diff = scrollY - pos;

    elY = Math.min(0, Math.max(-height, elY + diff));

	if (elY < 0) {
		header.classList.remove('is-show')
	}
	else {
		header.classList.add('is-show')
	}

    scrollY = pos;

	if (window.scrollY > 200) {
		if (!header.classList.contains('is-fixed')) {
			header.classList.add('is-fixed')
			header.classList.remove('is-blur')
			header.classList.add('is-fill')

			header.style.top = -header.clientHeight + 'px'
		}
	}
	else if (window.scrollY === 0) {

		if (header.classList.contains('is-fixed')) {
			header.classList.remove('is-show')
			header.classList.remove('is-fixed')
			header.classList.remove('is-fill')
			header.style.top = 0
		}
	}

	if (main) {

		if (window.scrollY + header.clientHeight <= main.clientHeight) {
			header.classList.add('is-blur')
			header.classList.remove('is-fill')
		}
		else {
			header.classList.add('is-fill')
			header.classList.remove('is-blur')
		}
	}
}