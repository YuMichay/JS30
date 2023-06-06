const startBtn = document.querySelector(".start__btn");
const addBtn = document.querySelector(".tasks__add-btn");
const startPage = document.querySelector(".start");
const wrapper = document.querySelector(".wrapper");
const daysArea = document.querySelector(".days");
const tasksArea = document.querySelector(".tasks");
const overlay = document.querySelector(".overlay");
const daysList = document.querySelector(".days__list");
const taskList = document.querySelector(".tasks__list");
const sortBtn = document.querySelector(".sort_btn");

const date = new Date();
const today = date.getDate();
const thisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
const daysAmount = Math.round((nextMonth - thisMonth) / 1000 / 3600 / 24);
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let lastChecked;

startBtn.addEventListener("click", () => {
    startPage.style.display = "none";
    wrapper.style.display = "flex";
});

const addDays = () => {
    for(let i = 0; i < daysAmount; i++) {
        const li = document.createElement("li");
        const day = i < 9 ? `0${i + 1}` : i + 1;
        const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
        const weekday = weekdays[new Date(date.getFullYear(), date.getMonth(), day).getDay()];
        li.textContent = `${day}.${month} (${weekday})`;
        li.classList.add("date");
        if (today === i + 1) {
            li.classList.add("today");
            li.classList.add("selected");
        } 
        daysList.append(li);
    }
}
addDays();

const dates = document.querySelectorAll(".date");
const selectDay = (e) => {
    dates.forEach((date) => date.classList.remove("selected"));
    e.target.classList.add("selected");
}
dates.forEach((date) => date.addEventListener("click", (e) => selectDay(e)));

const deleteTask = (e) => {
    const elem = e.target.parentElement;
    elem.remove();
}

const chooseSomeCheckboxes = (e, checkboxes) => {
    if (e.shiftKey && e.target.checked) {
        checkboxes.forEach((checkbox) => {
            if (checkbox.id >= lastChecked.id && checkbox.id <= e.target.id) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = e.target;
    const textAreas = document.querySelectorAll(`input[type="text"]`);
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            textAreas[index].style.textDecoration = "line-through";
        } else {
            textAreas[index].style.textDecoration = "none";
        }
    })
}

const addCheckbox = (div) => {
    const selectedDate = document.querySelector(".selected").textContent;
    const items = document.querySelectorAll(".item");
    const item = document.createElement("div");
    item.classList.add("item");
    item.id = `item-${items.length}`;

    const title = document.createElement("p");
    title.textContent = selectedDate;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `input-${items.length}`;

    const textArea = document.createElement("input");
    textArea.type = "text";
    textArea.maxLength = "15";
    textArea.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addCheckbox(div);
        } else if (e.key === "Backspace" && textArea.value.length === 0 && document.querySelectorAll(".item").length > 1) {
            item.remove();
        }
    });

    item.append(input, textArea);
    div.append(title, item);

    const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => checkbox.addEventListener("click", (e) => chooseSomeCheckboxes(e, checkboxes)));
}

const addTask = () => {
    const tasks = document.querySelectorAll(".task");
    const div = document.createElement("div");
    div.id = `task-${tasks.length}`;
    div.classList.add("task");
    taskList.insertBefore(div, addBtn);

    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("delete_btn");
    deleteBtn.addEventListener("click", (e) => deleteTask(e));

    div.append(deleteBtn);
    addCheckbox(div);
}
addBtn.addEventListener("click", addTask);

const sortTasks = () => {
    const tasks = document.querySelectorAll(".task");
    const tasksArray = [];
    const parentTask = tasks[0].parentNode;
    for (let i = 0; i < tasks.length; i++) {    
        tasksArray.push(parentTask.removeChild(tasks[i]));
    }
    tasksArray.sort((nodeA, nodeB) => {
        const textA = nodeA.querySelector("p").textContent;
        const textB = nodeB.querySelector("p").textContent;
        if (textA < textB) return -1;
        if (textA > textB) return 1;
        return 0;
      })
      .forEach((node) => {
        parentTask.insertBefore(node, addBtn);
      });
}
sortBtn.addEventListener("click", sortTasks);