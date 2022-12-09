const addTaskButton = document.querySelector('#addTaskButton');
const textInput = document.querySelector('#text');
const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');
const dateInput = document.querySelector('#date');
addTaskButton.addEventListener('click', addTask);

function addTask() {
	if (textInput.value == '' || dateInput.value == '') {
		let error = document.createElement('span');
		error.textContent = 'Заполните все поля!';
		error.classList.add('add-task__error');
		error.setAttribute('id', 'error');
		addTaskButton.append(error);
		return;
	}

	let task = {
		text: textInput.value,
		date: dateInput.value,
		time: `${hoursInput.dataset.value}:${minutesInput.dataset.value}`,
		complete: false,
		id: Date.now(),
	};
	taskList.push(task);
	render();
	closeAddSection();
}
