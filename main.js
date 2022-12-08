let taskList = [];

taskList.push(
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-10',
		time: '11:35',
		complete: false,
		id: 1,
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-09',
		time: '12:35',
		complete: true,
		id: 2,
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-08',
		time: '12:43',
		complete: false,
		id: 3,
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-08',
		time: '12:43',
		complete: false,
		id: 33,
	},

	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-08',
		time: '12:42',
		complete: true,
		id: 4,
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-09',
		time: '11:35',
		complete: false,
		id: Date.now(),
	}
);

function getDateList() {
	let dateList = taskList.map(item => item.date);
	dateList = Array.from(new Set(dateList));
	dateList.sort();
	return dateList;
}

function renderDays() {
	let tasksList = document.querySelector('#task-list');
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
	clearPastTasks();
	renderDays();
	renderTasks();
}

render();

const openButton = document.querySelector('#open-button');
const closeButton = document.querySelector('#close-button');
const addSection = document.querySelector('#add-section');
openButton.addEventListener('click', openAddSection);
closeButton.addEventListener('click', closeAddSection);

function openAddSection() {
	addSection.style.bottom = 0;

	timeSlider('hours');
	timeSlider('minutes');
}

function closeAddSection() {
	addSection.style.bottom = '-100%';
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
