import { projectList } from "./app-components";

function createTodoList() {
    const todoListContainer = document.createElement('div');
    //might have to add a class for styling

    projectList.getCurrentProject().getItemList().forEach((item) => {
        const todo = item.item;
        const itemContainer = document.createElement('div');
        //might have to add a class for styling the div as a whole
        itemContainer.classList.add = todo.priority.toLowerCase();
        // check this
        itemContainer.classList.add = "todo-item"
        itemContainer.setAttribute('data-todo-id', item.id);


        const title = document.createElement('div');
        title.textContent = todo.title;
        const dueDate = document.createElement('div');
        dueDate.textContent = todo.dueDate;

        const viewButton = document.createElement('button');
        viewButton.textContent = "View";
        console.log(viewButton.parentElement)

        itemContainer.append(title, dueDate, viewButton);
        todoListContainer.append(itemContainer);
    })

    return todoListContainer;
}

export { createTodoList }