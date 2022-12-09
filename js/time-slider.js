function timeSlider(id) {
	const slider = document.querySelector(`#${id}`);
	const sliderElements = Array.from(slider.children);
	const sliderLength = sliderElements.length;
	let slideWidth = +getComputedStyle(sliderElements[0]).height.slice(0, -2);
	let sliderWidth = slideWidth * sliderLength;
	let direction = false;
	let transformSlider = 11;
	let activeIndex = 0;
	let y1 = null;
	let y2 = null;

	sliderElements.forEach((item, index) => {
		item.dataset.index = index;
		item.dataset.order = index;
		item.dataset.translate = 0;
	});

	function changeOrder() {
		let newArray = sliderElements.map(item => +item.dataset.order);
		if (direction) {
			let elem = sliderElements.find(
				item => item.dataset.order == Math.min(...newArray)
			);
			elem.dataset.order = +elem.dataset.order + sliderLength;
		}
		if (!direction) {
			let elem = sliderElements.find(
				item => item.dataset.order == Math.max(...newArray)
			);
			elem.dataset.order = +elem.dataset.order - sliderLength;
		}
	}

	function changeTranslate() {
		sliderElements.forEach(item => {
			item.dataset.translate =
				Math.floor(+item.dataset.order / sliderLength) * sliderWidth;
		});
	}

	function moveSlider() {
		slider.style.transform = `translateY(${transformSlider}px)`;
		slider.dataset.value =
			String(activeIndex).length > 1 ? activeIndex : '0' + String(activeIndex);
	}

	function moveSlides() {
		sliderElements.forEach(item => {
			item.style.transform = `translateY(${item.dataset.translate}px)`;
		});
	}

	function changeActivity() {
		let nextActiveIndex = 0;

		if (direction) {
			nextActiveIndex = activeIndex + 1;
			if (activeIndex == sliderLength - 1) {
				nextActiveIndex -= sliderLength;
			}
		} else {
			nextActiveIndex = activeIndex - 1;
			if (activeIndex == 0) {
				nextActiveIndex += sliderLength;
			}
		}
		sliderElements[activeIndex].classList.remove(
			'input-time__time-value--active'
		);
		sliderElements[nextActiveIndex].classList.add(
			'input-time__time-value--active'
		);
		activeIndex = nextActiveIndex;
	}

	//	Движение влево
	function moveDown() {
		direction = false;
		changeActivity();
		changeOrder();
		changeTranslate();
		setTimeout(moveSlides, 200);
		transformSlider += slideWidth;
		moveSlider();
	}
	//	Движение вправо
	function moveTop() {
		direction = true;
		changeActivity();
		changeOrder();
		changeTranslate();
		setTimeout(moveSlides, 200);
		transformSlider -= slideWidth;
		moveSlider();
	}

	function resetTime() {
		let timeNow = new Date();
		if (id == 'hours') {
			for (let i = 0; i < timeNow.getHours(); i++) {
				setTimeout(moveTop(), 500);
			}
		}
		if (id == 'minutes') {
			for (let i = 0; i < timeNow.getMinutes(); i++) {
				setTimeout(moveTop(), 500);
			}
		}
	}

	changeOrder();
	changeTranslate();
	moveSlides();
	sliderElements[activeIndex].classList.add('input-time__time-value--active');
	resetTime();

	slider.addEventListener('touchstart', handleTouchStart, false);
	slider.addEventListener('touchmove', handleTouchMove, false);
	slider.addEventListener('touchend', handleTouchEnd, false);

	//	Функция, которая обрабатывает касание слайдера
	function handleTouchStart(event) {
		y1 = event.touches[0].clientY;
	}

	function handleTouchMove(event) {
		if (!y1) {
			return false;
		}
		y2 = event.touches[0].clientY;
	}

	function handleTouchEnd(event) {
		if (y2 - y1 > 0) {
			for (let i = 0; i < Math.round((y2 - y1) / 10); i++) {
				setTimeout(moveDown(), 500);
			}
		} else {
			for (let i = 0; i < Math.round((y1 - y2) / 10); i++) {
				setTimeout(moveTop(), 500);
			}
		}
	}
}
