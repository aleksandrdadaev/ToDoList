window.addEventListener('DOMContentLoaded', loadPage);
window.addEventListener('unload', closePage);
let taskList = [];

function loadPage() {
	if (localStorage.getItem('taskList')) {
		taskList = localStorage.getItem('taskList');
		taskList = JSON.parse(taskList);
	}
	render();
}

function closePage() {
	localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getDateList() {
	let dateList = taskList.map(item => item.date);
	dateList = Array.from(new Set(dateList));
	dateList.sort();
	return dateList;
}

function renderDays() {
	let tasksList = document.querySelector('#task-list');
	Array.from(tasksList.children).forEach(item => item.remove());
	getDateList().forEach(date => {
		let taskDay = document.createElement('div');
		taskDay.classList.add('task-day');
		taskDay.dataset.id = date;
		let taskDayTitle = document.createElement('h1');
		taskDayTitle.classList.add('task-day__date');
		taskDayTitle.textContent = getDayTitle(date);
		taskDay.append(taskDayTitle);
		tasksList.append(taskDay);
	});
}

function getDayTitle(date) {
	let dateNow = new Date();
	dateNow.setHours(7, 0, 0, 0);
	let dateTask = new Date(date);

	if (dateNow.getTime() == dateTask.getTime()) {
		return 'Today';
	} else if (dateNow.getTime() == dateTask.getTime() - 24 * 60 * 60 * 1000) {
		return 'Tomorrow';
	} else return date;
}

function renderTasks() {
	getDateList().forEach(date => {
		let taskDay = document.querySelector(`[data-id="${date}"]`);
		let tasks = document.createElement('div');
		tasks.classList.add('tasks');
		let taskDayList = getTaskListOnDay(date);
		taskDayList.forEach(task => {
			tasks.append(createTask(task));
		});
		taskDay.append(tasks);
	});
}

function createTask(task) {
	let taskWrapper = document.createElement('div');
	taskWrapper.classList.add('task');
	taskWrapper.dataset.id = task.id;
	let taskMarker = document.createElement('div');
	taskMarker.classList.add('task__marker');
	let taskInfo = document.createElement('div');
	taskInfo.classList.add('task__info');
	let taskDelete = document.createElement('button');
	taskDelete.classList.add('task__delete');
	taskDelete.dataset.id = task.id;
	taskDelete.addEventListener('click', deleteTask);
	if (dateCheck(task) && task.complete)
		taskInfo.classList.add('task__info--complete');
	let taskText = document.createElement('p');
	taskText.classList.add('task__text');
	taskText.textContent = task.text;
	let taskTime = document.createElement('span');
	taskTime.classList.add('task__time');
	taskTime.textContent = task.time;
	taskMarker.append(createTaskMarker(task));
	taskInfo.append(taskText);
	taskInfo.append(taskTime);
	taskWrapper.append(taskMarker);
	taskWrapper.append(taskInfo);
	taskWrapper.append(taskDelete);
	return taskWrapper;
}

function createTaskMarker(task) {
	if (dateCheck(task)) {
		let taskMarkerButton = document.createElement('button');
		taskMarkerButton.classList.add('task__button');
		if (task.complete) taskMarkerButton.classList.add('task__button--complete');
		taskMarkerButton.dataset.id = task.id;
		taskMarkerButton.addEventListener('click', taskClick);
		return taskMarkerButton;
	} else {
		let taskMarkerDot = document.createElement('span');
		taskMarkerDot.classList.add('task__marker-dot');
		return taskMarkerDot;
	}
}

function deleteTask(e) {
	let deleteIndex = taskList.findIndex(item => item.id == e.target.dataset.id);
	taskList.splice(deleteIndex, 1);
	render();
}

function dateCheck(task) {
	let dateNow = new Date();
	dateNow.setHours(7, 0, 0, 0);
	let dateTask = new Date(task.date);
	if (dateNow.getTime() == dateTask.getTime()) {
		return true;
	} else return false;
}

function getTaskListOnDay(taskDay) {
	return taskList
		.filter(task => task.date == taskDay)
		.sort((a, b) => (a.time > b.time ? 1 : -1));
}

function clearPastTasks() {
	let dateNow = new Date();
	dateNow.setHours(7, 0, 0, 0);
	taskList = taskList.filter(
		task => dateNow.getTime() <= new Date(task.date).getTime()
	);
}

function taskClick() {
	this.classList.toggle('task__button--complete');
	this.parentElement.nextElementSibling.classList.toggle(
		'task__info--complete'
	);
	let task = taskList.find(task => task.id == this.dataset.id);
	task.complete = !task.complete;
}

function render() {
	let tasksList = document.querySelector('#task-list');
	tasksList.innerHTML = '';
	if (taskList.length == 0) {
		let epmpty = document.createElement('p');
		epmpty.textContent = '???????????? ?????????? ????????.';
		epmpty.classList.add('task-list__empty');
		tasksList.append(epmpty);
		return;
	}
	clearPastTasks();
	renderDays();
	renderTasks();
}

const openButton = document.querySelector('#open-button');
const closeButton = document.querySelector('#close-button');
const addSection = document.querySelector('#add-section');
openButton.addEventListener('click', openAddSection);
closeButton.addEventListener('click', closeAddSection);

function openAddSection() {
	addSection.style.bottom = 0;

	timeSlider('hours');
	timeSlider('minutes');
	setMinDate();
	textInput.value = '';
}

function setMinDate() {
	let yearNow = new Date().getFullYear();
	let monthNow = new Date().getMonth() + 1;
	let dayNow = new Date().getDate();
	if (String(dayNow).length < 2) dayNow = '0' + String(dayNow);
	dateInput.setAttribute('min', `${yearNow}-${monthNow}-${dayNow}`);
	dateInput.value = `${yearNow}-${monthNow}-${dayNow}`;
}

function closeAddSection() {
	addSection.style.bottom = '-100%';
	if (addTaskButton.childNodes.length > 1)
		document.querySelector('#error').remove();
}

let hours = document.querySelector('#hours');
let minutes = document.querySelector('#minutes');

function addTimeItems(time, amount) {
	for (let i = 0; i < amount; i++) {
		let timeValue = `${i}`;
		if (timeValue.length < 2) timeValue = '0' + timeValue;
		let timeItem = document.createElement('span');
		timeItem.textContent = timeValue;
		timeItem.classList.add('input-time__time-value');
		time.append(timeItem);
	}
}

addTimeItems(hours, 24);
addTimeItems(minutes, 60);
