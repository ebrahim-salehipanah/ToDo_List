(function (window) {
	var todoList = document.querySelector(".todo-list");
	var addTask = window.Task.addTask;

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		let objectData = JSON.parse(localStorage.getItem(key));
		let taskTitle = objectData.title;
		let completed = objectData.completed;
		addTask(todoList, taskTitle, completed);
	}
})(window);

let list = document.querySelector("ul");
let addBtn = document.querySelector(".addBtn");

list.addEventListener("click", function (event) {
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("checked");
	}
});

function newTask() {
	var inputValue = document.getElementById("taskInput").value;
	if (!inputValue) {
		swal("Error!", "You must write something!", "error");
	} else {
		let tmpData = {
			title: inputValue,
			completed: false
		};
		localStorage.setItem(inputValue, JSON.stringify(tmpData));
		location.reload();
	}
}

addBtn.addEventListener("click", newTask);
document.addEventListener("keypress", function (event) {
	if (event.key == "Enter") {
		newTask();
	}
});
