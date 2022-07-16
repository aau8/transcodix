import NoUiSlider from 'nouislider'
import wNumb from 'wnumb'

class CalcTrans {
	constructor() {
		this.calcEl = document.querySelector('.calc__block.is-trans')
		this.totalElems = this.calcEl.querySelectorAll('.calc__total-text span')

		this.originEl = this.calcEl.querySelector('.calc-setting.is-origin')
		this.originInputArr = Array.from(this.originEl.querySelectorAll('input'))
		this.transEl = this.calcEl.querySelector('.calc-setting.is-trans')
		this.transInputArr = Array.from(this.transEl.querySelectorAll('input'))
		this.fpsEl = this.calcEl.querySelector('.calc-setting.is-fps')
		this.fpsInputArr = Array.from(this.fpsEl.querySelectorAll('input'))

		this.changeOrigin()
		this.init()
		this.calc()
	}

	init() {
		this.inputArr = Array.from(this.calcEl.querySelectorAll('input'))
		this.inputCheckedArr = this.calcEl.querySelectorAll('input:checked')

		// Если остался один чекбокс, то его нельзя будет сделать неактивным
		this.inputArr.forEach(input => {
			const list = input.closest('.calc-setting__list')

			input.addEventListener('change', e => {
				if (list.querySelectorAll('input:checked').length < 1) {
					input.checked = true
				}

				const lastCheckedInputTrans = this.transInputArr[Math.max(...this.transInputArr.map((e, i) => [ e, i ]).filter(e => e[0].checked === true).map(e => e[1]))]
				const lastCheckedInputFps = this.fpsInputArr[Math.max(...this.fpsInputArr.map((e, i) => [ e, i ]).filter(e => e[0].checked === true).map(e => e[1]))]
				const transValue = lastCheckedInputTrans.value
				const fpsValue = lastCheckedInputFps.value
				const bitrateRangeEl = this.calcEl.querySelector('.calc-range__block.is-bitrate .calc-range')
				let bitrateRange = [ 0, 100000 ]


				if (transValue.toLowerCase() === '360p') {

					if (fpsValue.toLowerCase() === '<30') {
						bitrateRange = [ 400, 1000 ]
					}
				}
				else if (transValue.toLowerCase() === '720p') {

					if (fpsValue.toLowerCase() === '<30') {
						bitrateRange = [ 1500, 4000 ]
					}
					else if (fpsValue.toLowerCase() === '30-60') {
						bitrateRange = [ 2250, 6000 ]
					}
				}
				else if (transValue.toLowerCase() === '1080p') {

					if (fpsValue.toLowerCase() === '<30') {
						bitrateRange = [ 1500, 6000 ]
					}
					else if (fpsValue.toLowerCase() === '30-60') {
						bitrateRange = [ 4500, 9000 ]
					}
				}
				else if (transValue.toLowerCase() === '4k') {

					if (fpsValue.toLowerCase() === '<30') {
						bitrateRange = [ 13000, 34000 ]
					}
					else if (fpsValue.toLowerCase() === '30-60') {
						bitrateRange = [ 20000, 51000 ]
					}
					else if (fpsValue.toLowerCase() === '60-90') {
						bitrateRange = [ 25000, 55000 ]
					}
					else if (fpsValue.toLowerCase() === '90-120') {
						bitrateRange = [ 30000, 60000 ]
					}
				}
				else if (transValue.toLowerCase() === '8k') {

					if (fpsValue.toLowerCase() === '<30') {
						bitrateRange = [ 20000, 51000 ]
					}
					else if (fpsValue.toLowerCase() === '30-60') {
						bitrateRange = [ 25000, 59000 ]
					}
					else if (fpsValue.toLowerCase() === '60-90') {
						bitrateRange = [ 30000, 65000 ]
					}
					else if (fpsValue.toLowerCase() === '90-120') {
						bitrateRange = [ 35000, 70000 ]
					}
				}

				const rangeValueMinEl = bitrateRangeEl.parentElement.querySelector('.calc-range__value.is-min')
				const rangeValueMaxEl = bitrateRangeEl.parentElement.querySelector('.calc-range__value.is-max')

				bitrateRangeEl.noUiSlider.updateOptions({
					start: bitrateRange[0] + (bitrateRange[1] - bitrateRange[0]) / 2,
					range: {
						'min': bitrateRange[0],
						'max': bitrateRange[1],
					},
				})

				rangeValueMinEl.textContent = String(bitrateRange[0]).replace(/0{3}$/, 'k')
				rangeValueMaxEl.textContent = String(bitrateRange[1]).replace(/0{3}$/, 'k')

				bitrateRangeEl.dataset.valueRec = bitrateRange
			})
		})

		Array().concat(...this.transInputArr, ...this.originInputArr).forEach(input => {
			input.addEventListener('change', e => {
				const lastCheckedInput = Math.max(...this.transInputArr.map((e, i) => [ e, i ]).filter(e => e[0].checked === true).map(e => e[1]))
				const priceElems = Array.from(this.calcEl.querySelectorAll('.calc-table__ceil.is-price .calc-table__list li'))

				priceElems.forEach(e => {
					e.classList.remove('is-active')
				})

				const priceActive = priceElems.find(e => e.dataset.transMax === this.transInputArr[lastCheckedInput].value)

				if (priceActive) {
					priceActive.classList.add('is-active')
				}
				else {
					priceElems[0].classList.add('is-active')
				}

				this.calc()
			})
		})

		this.fpsInputArr.forEach(input => {
			input.addEventListener('change', e => {
				const lastCheckedInput = Math.max(...this.fpsInputArr.map((e, i) => [ e, i ]).filter(e => e[0].checked === true).map(e => e[1]))
				const coefElems = Array.from(this.calcEl.querySelectorAll('.calc-table__ceil.is-coef .calc-table__list li'))

				coefElems.forEach(e => {
					e.classList.remove('is-active')
				})

				const coefActive = coefElems.find(e => e.dataset.coefMax === this.fpsInputArr[lastCheckedInput].value)

				if (coefActive) {
					coefActive.classList.add('is-active')
				}
				else {
					coefElems[0].classList.add('is-active')
				}

				this.calc()
			})
		})
	}

	changeOrigin() {

		this.originInputArr.forEach( input => {

			input.addEventListener('change', e => {
				let transInput = this.transEl.querySelector(`input[value="${input.value}"]`).parentElement.nextElementSibling

				this.transInputArr.forEach(input => input.disabled = false)

				let i = 0
				while (transInput && i < 10) {

					transInput.querySelector('input').disabled = true
					transInput.querySelector('input').checked = false
					transInput = transInput.nextElementSibling
					i++
				}

				this.transInputArr.filter(e => e.disabled === false).forEach(e => e.checked = true)

				this.calc()
			})
		} )
	}

	calc() {
		const time = parseInt(this.calcEl.querySelector('.calc-range__block.is-time .tf__field').dataset.value.replace(/\s/g, ''))
		const price = parseFloat(this.calcEl.querySelector('.calc-table__ceil.is-price li.is-active').innerText.replace('$', ''))
		const coef = parseInt(this.calcEl.querySelector('.calc-table__ceil.is-coef li.is-active').innerText)

		this.totalElems.forEach(total => {
			total.innerHTML = Math.round(time * price * coef * 100) / 100 + '$'
		})
	}
}

if (document.querySelector('.calc')) {
	const calcTrans = new CalcTrans()
	const rangeBlockElems = document.querySelectorAll('.calc-range__block')

	rangeBlockElems.forEach(rangeBlock => {
		const range = rangeBlock.querySelector('.calc-range')
		const tf = rangeBlock.querySelector('.calc-range__tf input')
		const valueMin = rangeBlock.querySelector('.calc-range__value.is-min')
		const valueMax = rangeBlock.querySelector('.calc-range__value.is-max')

		const noUiSlider = NoUiSlider.create(range, {
			// start: transConfig['hours-video']['value'],
			start: tf.value,
			step: 1,
			connect: [ true, false ],
			range: {
				// 'min': transConfig['hours-video']['range'][0],
				// 'max': transConfig['hours-video']['range'][1],
				'min': Number(tf.min),
				'max': Number(tf.max)
			},
			format: wNumb({
				decimals: 0,
				thousand: ' ',
			})
		})

		// range.NoUiSlider = noUiSlider

		// valueMin.innerText = tf.min
		// valueMax.innerText = tf.max

		noUiSlider.on('update', arr => {

			tf.value = arr[0]
			tf.parentElement.dataset.value = arr[0]

			calcTrans.calc()
		})

		tf.addEventListener('input', e => {
			// console.log(tf.value)
			noUiSlider.set(tf.value)

		})
	})

	calcDeliv()
	function calcDeliv() {
		const calc = document.querySelector('.calc__block.is-deliv')
		const totalElems = calc.querySelectorAll('.calc__total-text span')
		const range = calc.querySelector('.calc-range__block.is-deliv .calc-range')
		const price = calc.querySelector('.calc-deliv-price-gb')

		range.noUiSlider.on('update', rangeVal => {
			totalElems.forEach( total => {
				total.innerHTML = Math.round(parseInt(rangeVal[0].replace(/\s/g, '')) * parseFloat(price.innerText) * 100) / 100 + '$'
			} )
		})
	}
}