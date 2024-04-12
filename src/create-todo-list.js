import { projectList } from "./app";

const todoListContainer = document.createElement('div');
//might have to add a class for styling

projectList.getCurrentProject().getItemList().forEach((item) => {
    const itemContainer = document.createElement('div');
    //might have to add a class for styling the div as a whole
    itemContainer.classList.add = item.priority.toLowerCase();
    // check this
    const title = document.createElement('div');
    title.textContent = item.title;
    const dueDate = document.createElement('div');
    dueDate.textContent = item.dueDate;
    itemContainer.append(title, dueDate);
    todoListContainer.append(itemContainer);
})

export { todoListContainer }