document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const taskCategory = document.getElementById("task-category");
    const taskPriority = document.getElementById("task-priority");
    const dueDateInput = document.getElementById("due-date");
    const addTaskBtn = document.getElementById("add-task-btn");
    const sortBtn = document.getElementById("sort-btn");
    const clearBtn = document.getElementById("clear-btn");
    const taskList = document.getElementById("task-list");

    // Event listener for the add task button click
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const category = taskCategory.value;
        const priority = taskPriority.value;
        const dueDate = dueDateInput.value;
        if (taskText !== "") {
            const currentDate = new Date();
            const taskDueDate = new Date(dueDate);
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${taskText}</span>
                <span>Category: ${category}</span>
                <span>Priority: ${priority}</span>
                <span>Due Date: ${dueDate}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            if (taskDueDate < currentDate) {
                listItem.classList.add("overdue");
            }
            taskList.appendChild(listItem);
            taskInput.value = "";
            taskCategory.value = "work";
            taskPriority.value = "high";
            dueDateInput.value = "";
        }
    });

    // Event listener for the sort button click
    sortBtn.addEventListener("click", function () {
        const tasks = Array.from(taskList.children);
        const sortedTasks = tasks.sort(function (a, b) {
            const dateA = new Date(a.querySelector("span:nth-child(4)").textContent.split(": ")[1]);
            const dateB = new Date(b.querySelector("span:nth-child(4)").textContent.split(": ")[1]);
            return dateA - dateB;
        });
        taskList.innerHTML = "";
        sortedTasks.forEach(function (task) {
            taskList.appendChild(task);
        });
    });

    // Event listener for the clear button click
    clearBtn.addEventListener("click", function () {
        taskList.innerHTML = "";
    });

    // Event delegation for the delete and edit buttons using the taskList as the parent element
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const listItem = event.target.parentElement;
            taskList.removeChild(listItem);
        }
        if (event.target.classList.contains("edit-btn")) {
            const listItem = event.target.parentElement;
            const taskText = listItem.querySelector("span:first-child");
            const category = listItem.querySelector("span:nth-child(2)").textContent.split(": ")[1];
            const priority = listItem.querySelector("span:nth-child(3)").textContent.split(": ")[1];
            const dueDate = listItem.querySelector("span:nth-child(4)").textContent.split(": ")[1];
            taskInput.value = taskText.textContent;
            taskCategory.value = category;
            taskPriority.value = priority;
            dueDateInput.value = dueDate;
            // Remove the edited task from the task list
            taskList.removeChild(listItem);
        }
    });
});
