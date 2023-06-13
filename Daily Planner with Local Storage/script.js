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
const data = [];
const savedData = JSON.parse(window.localStorage.getItem('data'));

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

const crossCheckboxes = (e, checkbox) => {
    const textAreas = e.target.parentNode.parentNode.querySelectorAll(`input[type="text"]`);
    const index = checkbox.id.slice(checkbox.id.length - 1);
    if (checkbox.checked) {
        textAreas[index].style.textDecoration = "line-through";
    } else {
        textAreas[index].style.textDecoration = "none";
    }
}

const chooseSomeCheckboxes = (e, checkboxes) => {
    if (e.shiftKey && e.target.checked) {
        checkboxes.forEach((checkbox) => {
            if (checkbox.id >= lastChecked.id && checkbox.id <= e.target.id) {
                checkbox.checked = true;
                crossCheckboxes(e, checkbox);
            }
        });
    }
    lastChecked = e.target;
}

const createCheckbox = (items) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `input-${items.length}`;
    return input;
}

const createTextInput = (div) => {
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.maxLength = "15";
    textInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addCheckbox(div);
        } else if (e.key === "Backspace" && textInput.value.length === 0 && document.querySelectorAll(".item").length > 1) {
            e.target.parentNode.remove();
        }
    });
    return textInput;
}

const createItem = (div, savedItem) => {
    const items = document.getElementById(div.id).querySelectorAll(".item");
    const item = document.createElement("div");
    const input = createCheckbox(items, savedItem);
    const textInput = createTextInput(div);

    item.classList.add("item");
    item.id = `item-${items.length}`;
    textInput.value = savedItem ? savedItem[0] : "";
    textInput.style.textDecoration = savedItem[1];
    if (savedItem[1] !== "none") {
        input.checked = true;
    }
    item.append(input, textInput);
    div.append(item);
    textInput.focus();
}

const addCheckbox = (div, data = []) => {
    if (data && data.items && data.items.length > 0) {
        data.items.forEach((savedItem) => {
            createItem(div, savedItem);
        });
    } else {
        createItem(div);
    }

    const checkboxes = div.querySelectorAll(`input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => checkbox.addEventListener("click", (e) => chooseSomeCheckboxes(e, checkboxes)));
    checkboxes.forEach((checkbox) => checkbox.addEventListener("click", (e) => crossCheckboxes(e, checkbox)));
}

const addTask = (data) => {
    const tasks = document.querySelectorAll(".task");
    const div = document.createElement("div");
    div.id = `task-${tasks.length}`;
    div.classList.add("task");
    taskList.insertBefore(div, addBtn);

    const selectedDate = document.querySelector(".selected").textContent;
    const title = document.createElement("p");
    title.textContent = data.date || selectedDate;

    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("delete_btn");
    deleteBtn.addEventListener("click", (e) => deleteTask(e));

    div.append(title, deleteBtn);
    addCheckbox(div, data);
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

const saveData = () => {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
        const items = task.querySelectorAll(`input[type="text"]`);
        const itemsContent = [];
        items.forEach((item) => itemsContent.push([item.value, item.style.textDecoration]));
        const date = task.querySelector("p").textContent;
        data.push({ date: date, items: itemsContent });
    })
    window.localStorage.setItem('data', JSON.stringify(data));
}
window.addEventListener("beforeunload", saveData);

if (savedData.length) {
    savedData.forEach((data) => addTask(data));
} 