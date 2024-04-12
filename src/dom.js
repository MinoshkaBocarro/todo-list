import { setDefault } from "./app";
import { form } from "./create-form";
import { createTodoList, todoListContainer } from "./create-todo-list";

let currentProject;

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
    todoArea.append(createTodoList());
}

function clearTodoArea() {
    todoArea.replaceChildren();
}

const projectNameHolder = document.querySelector('.project-heading > h1');

function renderCurrentProjectName() {
    projectNameHolder.textContent = currentProject.projectName;
}

function loadProject() {
    renderCurrentProjectName();
    renderTodoList();
}

currentProject = setDefault();
loadProject();
console.log(currentProject)
//remember to check how this works with storage