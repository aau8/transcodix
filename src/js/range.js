import NoUiSlider from 'nouislider'

const rangeBlockElems = document.querySelectorAll('.calc-range__block')

rangeBlockElems.forEach(rangeBlock => {
	const range = rangeBlock.querySelector('.calc-range')

	const noUiSlider = NoUiSlider.create(range, {
		start: 0,
		connect: [ true, false ],
		range: {
			'min': 0,
			'max': 100
		}
	})
})