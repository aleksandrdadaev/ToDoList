function timeSlider(id) {
	const slider = document.querySelector(`#${id}`);
	const sliderElements = Array.from(slider.children);
	const sliderLength = sliderElements.length;
	console.log(sliderLength);
}

timeSlider('hours');
timeSlider('minutes');
