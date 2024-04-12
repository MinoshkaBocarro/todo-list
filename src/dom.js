import { form } from "./create-form";
import { todoListContainer } from "./create-todo-list";

const newTodoItemButton = document.querySelector('.project-heading > button')
const todoArea = document.querySelector('.todo-area');

const blank = document.createElement('div');
blank.textContent = "Blank";

newTodoItemButton.addEventListener("click", () => {
    renderTodoForm();

    const cancelButton = document.querySelector('.cancel');
    const confirmButton = document.querySelector('.confirm');

    //check if these event listeners are working properly after form is closed

    cancelButton.addEventListener("click", e => {
        e.preventDefault();
        renderTodoList();
        //double check if this name is correct
        //should i get this to render?
    })
    
    confirmButton.addEventListener("click", e => {
        e.preventDefault();
        new FormData(form);
        renderTodoList();
    })
})

function renderTodoForm() {
    clearTodoArea();
    todoArea.append(form);
}

function renderTodoList() {
    clearTodoArea();
    todoArea.append(todoListContainer);
}

function clearTodoArea() {
    todoArea.replaceChildren();
}