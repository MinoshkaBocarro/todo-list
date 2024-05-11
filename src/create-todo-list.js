import { projectList } from "./app-components";

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
            itemContainer.append(completeButton);
        }

        const title = document.createElement('div');
        title.textContent = todo.title;
        const dueDate = document.createElement('div');
        dueDate.textContent = todo.dueDate;

        const viewButton = document.createElement('button');
        viewButton.textContent = "View";

        itemContainer.append(title, dueDate, viewButton)

        // make sure doesn't pop up when checklist is 0
        console.log(todo.checklistFormatted[0] !== "")
        if (todo.checklistFormatted[0] !== "") {
            const checklist = document.createElement('div');
            const checklistName = document.createElement('div');
            checklistName.textContent = "Checklist";
            checklist.append(checklistName);
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
                checklist.append(li);
            }
    
            itemContainer.append(checklist);
        }

        todoListContainer.append(itemContainer);
    })

    return todoListContainer;
}

export { createTodoList }