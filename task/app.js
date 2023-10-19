document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements for task input, category, priority, due date, add button, and task list
    const taskInput = document.getElementById("task-input");
    const taskCategory = document.getElementById("task-category");
    const taskPriority = document.getElementById("task-priority");
    const dueDate = document.getElementById("due-date");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Event listener for the add task button click
    addTaskBtn.addEventListener("click", function () {
        // Get values from input fields and select dropdowns
        const taskText = taskInput.value.trim();
        const category = taskCategory.value;
        const priority = taskPriority.value;
        const date = dueDate.value;
        // Check if the task text is not empty
        if (taskText !== "") {
            // Create a new list item with task details and delete button
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${taskText}</span>
                <span>Category: ${category}</span>
                <span>Priority: ${priority}</span>
                <span>Due Date: ${date}</span>
                <button class="delete-btn">Delete</button>
            `;
            // Add the list item to the task list
            taskList.appendChild(listItem);
            // Clear input fields and dropdowns
            taskInput.value = "";
            taskCategory.value = "work";
            taskPriority.value = "high";
            dueDate.value = "";
            // Event listener for the delete button click within the list item
            listItem.querySelector(".delete-btn").addEventListener("click", function () {
                // Remove the list item from the task list
                taskList.removeChild(listItem);
            });
        }
    });
});
