const taskList = [];

taskList.push(
	{
		text: 'Купить хлеб',
		date: '2022-12-02',
		time: '12:35',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Купить хлеб2',
		date: '2022-12-03',
		time: '12:43',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Купить хлеб1',
		date: '2022-12-02',
		time: '12:42',
		complete: false,
		id: Date.now(),
	},
	{
		text: 'Купить хлеб',
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
	return dateList;
}

function renderDays() {
	let tasksList = document.querySelector('#task-list');
	getDateList().forEach(item => {
		let taskDay = document.createElement('div');
		taskDay.classList.add('task-day');
		taskDay.dataset.id = item;
		let taskDayTitle = document.createElement('h1');

		let dateNow = new Date();
		dateNow.setHours(7, 0, 0, 0);
		let taskDate = new Date(item);

		if (dateNow.getTime() == taskDate.getTime()) {
			taskDayTitle.textContent = 'Today';
		} else if (dateNow.getTime() == taskDate.getTime() - 24 * 60 * 60 * 1000) {
			taskDayTitle.textContent = 'Tomorrow';
		} else {
			taskDayTitle.textContent = item;
		}

		taskDayTitle.classList.add('task-day__date');
		taskDay.append(taskDayTitle);
		tasksList.append(taskDay);
	});
}

renderDays();
