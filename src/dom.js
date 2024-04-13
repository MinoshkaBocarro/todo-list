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

    const cancelButton = document.querySelector('.cancel');
    const confirmButton = document.querySelector('.confirm');

    //check if these event listeners are working properly after form is closed

    cancelButton.addEventListener("click", cancelButtonCallback /*e => {
        e.preventDefault();
        renderTodoList();
        form.reset();
    }*/)
    
    confirmButton.addEventListener("click", confirmButtonCallback /*e => {
        e.preventDefault();
        new FormData(form);
        form.reset();
        renderTodoList();
    }*/)

    form.addEventListener("formdata", formdataCallback /*e => {
        const data = e.formData;
        const newTodoItemInfo = [];
        for(let value of data.values()) {
            newTodoItemInfo.push(value);
        }
        todoCreator(currentProject, ...newTodoItemInfo)
    }*/)
})

function formReset(e) {
    e.preventDefault();
    form.reset();
    renderTodoList();
}

function cancelButtonCallback(e) {
    formReset(e)
}

function confirmButtonCallback(e) {
    new FormData(form);
    formReset(e);
}

function formdataCallback(e) {
    const data = e.formData;
    const newTodoItemInfo = [];
    for(let value of data.values()) {
        newTodoItemInfo.push(value);
    }
    todoCreator(currentProject, ...newTodoItemInfo)
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
    projectNameHolder.textContent = currentProject.projectName;
}

function loadProject() {
    renderCurrentProjectName();
    renderTodoList();
}

currentProject = setDefault();
loadProject();
//remember to check how this works with storage