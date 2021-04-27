(function () {
	function uploadData(txt, completed = false) {
		let tasks = document.querySelector(".tasks");
		tasks.appendChild(createLiElement(txt, completed));
		function createLiElement(txt, completed) {
			let li = document.createElement("li");
			let text = document.createTextNode(txt);
			li.appendChild(text);
			li.appendChild(createCloseBtn());
			return li;

			function createCloseBtn() {
				let span = document.createElement("SPAN");
				let txt = document.createTextNode("\u00D7");
				span.className = "close";
				span.appendChild(txt);
				span.onclick = closeEventHandler;
				function closeEventHandler() {
					const li = this.parentElement;
					const liText = li.innerText;
					const key = liText.substring(0, liText.length - 2);
					localStorage.removeItem(key);
					li.style.display = "none";
				}
				return span;
			}
		}
	}

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		let objectData = JSON.parse(localStorage.getItem(key));
		let task = objectData.task;
		let completed = objectData.completed;
		uploadData(task, completed);
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
		alert("You must write something!!!");
	} else {
		let tmpData = {
			task: inputValue,
			completed: false
		};
		localStorage.setItem(inputValue, JSON.stringify(tmpData));
		location.reload();
	}
}

addBtn.addEventListener("click", newTask);
document.addEventListener('keypress',function(event){
	if(event.key == "Enter"){
		newTask()
	}
})
