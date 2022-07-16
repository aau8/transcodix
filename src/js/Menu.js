import { bodyLock, bodyUnlock } from './utils/functions.js'

class Menu {

	constructor(selector) {
		this.menu = document.querySelector(selector)
		this.menuIsOpen = false
		this._init()
	}

	_init() {
		document.addEventListener('click', e => {

			if (e.target.classList.contains('[data-menu-close]') || e.target.closest('[data-menu-close]')) {
				this.close()
			}

			if (e.target.classList.contains('menu') && this.menuIsOpen) {
				this.close()
			}

			if (e.target.classList.contains('[data-menu-open]') || e.target.closest('[data-menu-open]')) {
				this.open()
			}
		})
	}

	open() {
		this.menu.classList.add('is-show')
		bodyLock()

		this.menuIsOpen = true
	}

	close() {
		this.menu.classList.remove('is-show')
		bodyUnlock()

		this.menuIsOpen = false
	}
}

const menu = new Menu('.menu')