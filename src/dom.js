import { setDefault, todoCreator } from "./app";
import { form } from "./create-form";
import { createTodoList } from "./create-todo-list";

let currentProject;

const newTodoItemButton = document.querySelector('.project-heading > button')
const todoArea = document.querySelector('.todo-area');

const blank = document.createElement('div');
blank.textContent = "Blank";

newTodoItemButton.addEventListener("click", () => {
    renderTodoForm();
})

const cancelButton = form.querySelector('.cancel');
const confirmButton = form.querySelector('.confirm');

cancelButton.addEventListener("click", e => {
    formReset(e)
})
    
confirmButton.addEventListener("click", e => {
    new FormData(form);
    formReset(e);
})

form.addEventListener("formdata", e => {
    const data = e.formData;
    const newTodoItemInfo = [];
    for(let value of data.values()) {
        newTodoItemInfo.push(value);
    }
    todoCreator(currentProject, undefined, ...newTodoItemInfo)
})

function formReset(e) {
    e.preventDefault();
    form.reset();
    renderTodoList();
}

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
    projectNameHolder.textContent = currentProject.collectionName;
}

function loadProject() {
    renderCurrentProjectName();
    renderTodoList();
}

currentProject = setDefault();
loadProject();
//remember to check how this works with storage