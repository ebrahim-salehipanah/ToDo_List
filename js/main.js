(function (window) {
	let todoList = document.querySelector(".todo-list");
	let addTask = window.Task.addTask;
	//localstorage is not empty
	if (localStorage.getItem("todo")) {
		let dataList = JSON.parse(localStorage.getItem("todo"));
		for (let i = 0; i < dataList.length; i++) {
			let taskTitle = dataList[i].title;
			let completed = dataList[i].completed;
			addTask(todoList, taskTitle, completed);
		}
	}
})(window);

let list = document.querySelector("ul");
let addBtn = document.querySelector(".addBtn");

list.addEventListener("click", function (event) {
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("checked");

		let taskTitle = event.target.getAttribute("data-target");

		let tasksData = JSON.parse(localStorage.getItem("todo"));
		for (let i = 0; i < tasksData.length; i++) {
			if (taskTitle == tasksData[i].title) {
				tasksData[i].completed = event.target.classList.contains("checked")
					? true
					: false;
			}
		}
		localStorage.setItem("todo", JSON.stringify(tasksData));
	}
});

function inputHandler() {
	let inputVal = document.getElementById("taskInput").value;
	let todoList = document.querySelector(".todo-list");
	let data = localStorage.getItem("todo");
	let list = [];
	if (!inputVal) {
		swal("Error!", "You must write something!", "error");
		let timer = setTimeout(() => {
			sweetAlert.close();
		}, 1000);
	} else {
		//save on localStorage new Task
		function TaskObj(title) {
			this.title = title;
			this.completed = false;
		}

		let task = new TaskObj(inputVal);

		//update data
		if (data) {
			list = JSON.parse(data);
		}
		list.push(task);
		localStorage.setItem("todo", JSON.stringify(list));

		//create new task element in html
		window.Task.addTask(todoList, inputVal);
		document.getElementById("taskInput").value = "";
	}
}

addBtn.addEventListener("click", inputHandler);
document.addEventListener("keypress", (event) =>
	event.key == "Enter" ? inputHandler() : null
);
