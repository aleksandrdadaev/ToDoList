const taskList = [];

taskList.push(
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-05',
		time: '11:35',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-04',
		time: '12:35',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-03',
		time: '12:43',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-03',
		time: '12:42',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		date: '2022-12-04',
		time: '11:35',
		complete: false,
		id: Date.now(),
	}
);
console.log(taskList);

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
			let taskWrapper = document.createElement('div');
			taskWrapper.classList.add('task');
			let taskMarker = document.createElement('div');
			taskMarker.classList.add('task__marker');
			let taskMarkerDot = document.createElement('span');
			taskMarkerDot.classList.add('task__marker-dot');
			let taskInfo = document.createElement('div');
			taskInfo.classList.add('task__info');
			let taskText = document.createElement('p');
			taskText.classList.add('task__text');
			taskText.textContent = task.text;
			let taskTime = document.createElement('span');
			taskTime.classList.add('task__time');
			taskTime.textContent = task.time;
			taskMarker.append(taskMarkerDot);
			taskInfo.append(taskText);
			taskInfo.append(taskTime);
			taskWrapper.append(taskMarker);
			taskWrapper.append(taskInfo);
			tasks.append(taskWrapper);
			taskDay.append(tasks);
		});
		console.log(date);
		console.log(taskDayList);
	});
}

function getTaskListOnDay(taskDay) {
	return taskList.filter(task => task.date == taskDay);
}

renderDays();
renderTasks();
