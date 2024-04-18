import { projectList } from "./app-components";

function createTodoList() {
    const todoListContainer = document.createElement('div');
    //might have to add a class for styling

    projectList.getCurrentProject().getItemList().forEach((item) => {
        const todo = item.item;
        const itemContainer = document.createElement('div');
        //might have to add a class for styling the div as a whole
        itemContainer.classList.add(todo.priority.toLowerCase());
        // check this
        itemContainer.classList.add("todo-item");
        console.log(itemContainer)
        itemContainer.setAttribute('data-todo-id', item.id);
        console.log(itemContainer)

        if(projectList.getCurrentProject().collectionName !== "Completed") {
            const completeButton = document.createElement('input');
            completeButton.setAttribute('type', "checkbox");
            itemContainer.append(completeButton);
        }

        const title = document.createElement('div');
        title.textContent = todo.title;
        const dueDate = document.createElement('div');
        dueDate.textContent = todo.dueDate;

        const viewButton = document.createElement('button');
        viewButton.textContent = "View";

        itemContainer.append(title, dueDate, viewButton);
        todoListContainer.append(itemContainer);
    })

    return todoListContainer;
}

export { createTodoList }