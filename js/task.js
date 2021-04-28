(function (window) {
	/* Task Object */
	var Task = {};

	Task.addTask = function (todoList, taskTitle, completed) {
		todoList.appendChild(Task.createTask(taskTitle, completed));
	};

	Task.createTask = function (taskTitle, completed) {
		function createLiElem(title) {
			let li = document.createElement("li");
			let taskTitle = document.createTextNode(title);
			li.appendChild(taskTitle);
			li.appendChild(Task.CloseBtn.createCloseBtn());
			return li;
		}

		return createLiElem(taskTitle, completed);
	};

	/* Close Button Object  */
	let CloseBtn = {};

	CloseBtn.createCloseBtn = function () {
		let span = document.createElement("SPAN");
		let txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		span.addEventListener("click", Task.CloseBtn.closeClickHandler);

		return span;
	};
	CloseBtn.closeClickHandler = function () {
		const li = this.parentElement;
		const liText = li.innerText;
		const key = liText.substring(0, liText.length - 2);
		localStorage.removeItem(key);
		li.style.display = "none";
		swal("Done!", "Your Task Deleted!", "success");
	};

	Task.CloseBtn = CloseBtn;

	window.Task = Task;
})(window);
