let toDoList = JSON.parse(localStorage.getItem('toDoList')) || []; // Load saved list or initialize as empty
displayItems();

function addToDo() {
    let inputElement = document.querySelector('#todo_input');
    let dateElement = document.querySelector('#todo_date');
    let toDoItem = inputElement.value;
    let todoDate = dateElement.value;
    
    if (toDoItem && todoDate) {  // Only add if both fields have values
        toDoList.push({ item: toDoItem, dueDate: todoDate });
        inputElement.value = '';
        dateElement.value = '';
        saveToDoList();  // Save updated list
        displayItems();
    }
}

function displayItems() {
    let containerElement = document.querySelector('.todo_container');
    let newHtml = '';

    if (toDoList.length > 0) {  // Only display if there are items in the list
        for (let i = 0; i < toDoList.length; i++) {
            let { item, dueDate } = toDoList[i];
            newHtml += `
                <span>${item}</span>
                <span>${dueDate}</span>
                <button class="btn_delete" onclick="deleteItem(${i});">Delete</button>
            `;
        }
    }

    containerElement.innerHTML = newHtml;
}

function deleteItem(index) {
    toDoList.splice(index, 1); // Remove item from list
    saveToDoList();  // Save updated list
    displayItems();
}

function saveToDoList() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList)); // Save list to localStorage
}
