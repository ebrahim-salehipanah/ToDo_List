(function (window) {
	/* Task Object */
	var Task = {
		createTask: function (taskTitle, completed) {
			function createLiElem(title, completed) {
				let li = document.createElement("li");
				let taskTitle = document.createTextNode(title);
				li.appendChild(taskTitle);
				li.dataset.target = title;
				li.appendChild(Task.CloseBtn.createCloseBtn());
				if (completed) li.classList.add("checked");
				return li;
			}
			return createLiElem(taskTitle, completed);

			
		},
		addTask: function (todoList, taskTitle, completed = false) {
			todoList.appendChild(Task.createTask(taskTitle, completed));
		},
		CloseBtn : {
			createCloseBtn: function () {
				let span = document.createElement("SPAN");
				let txt = document.createTextNode("\u00D7");
				span.className = "close";
				span.appendChild(txt);
				span.addEventListener("click", Task.CloseBtn.closeClickHandler);
	
				return span;
			},
			closeClickHandler: function () {
				const li = this.parentElement;
				const taskTitle = li.getAttribute("data-target");
				//romove from localStorage
				let tasksData = JSON.parse(localStorage.getItem("todo"));
				// TODO : create a function for this and main.js:25 that return index very fast
				for (let i = 0; i < tasksData.length; i++) {
					if (taskTitle == tasksData[i].title) {
						//todo create function delete task 
						//delete task from aray and store array
						let lastIndex = tasksData.length - 1;
						tasksData[i] = tasksData[lastIndex];
						tasksData.pop();
						localStorage.setItem("todo", JSON.stringify(tasksData));
						break;
					}
				}
	
				li.style.display = "none";
				swal("Done!", "Your Task Deleted!", "success");
				let timer = setTimeout(() => {
					sweetAlert.close();
				}, 1000);
			}
		}
	};

	window.Task = Task;
})(window);
