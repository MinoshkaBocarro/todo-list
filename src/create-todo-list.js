import { projectList } from "./app-components";
import arrowImage from "./images/arrow.svg";

function createTodoList() {
    const todoListContainer = document.createElement('div');
    //might have to add a class for styling

    projectList.getCurrentProject().getItemList().forEach((item) => {
        const todo = item.item;
        const itemContainer = document.createElement('div');
        itemContainer.classList.add(todo.priority.toLowerCase());
        // check this
        itemContainer.classList.add('todo-item');
        itemContainer.setAttribute('data-todo-id', item.id);
        itemContainer.setAttribute('draggable', 'true')

        if(projectList.getCurrentProject().collectionName !== "Completed") {
            const completeButton = document.createElement('input');
            completeButton.setAttribute('type', 'checkbox');
            completeButton.classList.add('complete-button')
            itemContainer.append(completeButton);
        }
        // make sure to check it if it is a completed project

        const info = document.createElement('div');
        info.classList.add('info')

        const title = document.createElement('div');
        title.classList.add('title')
        title.textContent = todo.title;
        const dueDate = document.createElement('div');
        dueDate.classList.add('due-date')
        dueDate.textContent = todo.dueDate;

        const viewButton = document.createElement('button');
        viewButton.classList.add('view-button')
        viewButton.textContent = "View";

        info.append(title, dueDate)

        const separator = document.createElement('div');
        separator.classList.add('separator');

        itemContainer.append(info, separator)

        if (todo.checklistFormatted[0] !== "") {
            if(todo.checklistFormatted.length > 2) {
                const arrow = document.createElement('img');
                arrow.setAttribute('src', arrowImage)
                arrow.style.height = '20px'
                arrow.style.width = '18px'
                itemContainer.append(arrow)
            }
    
            const checklist = document.createElement('div');
            checklist.classList.add('checklist-section')
            const checklistUl = document.createElement('ul');
            for (let i = 0; i < todo.checklistFormatted.length; i++) {
                const li = document.createElement('li');
                const input = document.createElement('input');
                input.setAttribute('type', "checkbox");
                input.setAttribute('id', i);
                input.setAttribute('data-checklist-index', i);
                input.classList.add('todo-checklist')
                if (todo.checklistCompleted[i] === "checked") {
                    input.setAttribute('checked', 'checked');
                }
                const label = document.createElement('label');
                label.setAttribute('for', i);
                label.textContent = todo.checklistFormatted[i];
                li.append(input, label);
                checklistUl.append(li);
            }
            checklist.append(checklistUl);

            itemContainer.append(checklist, viewButton);

        }
        // if there are no checklists then set height to different height

        todoListContainer.append(itemContainer);
    })

    return todoListContainer;
}

export { createTodoList }