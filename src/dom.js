import { setDefault, todoCreator, updateCurrentProject } from "./app";
import { form } from "./create-form";
import { createProjectList } from "./create-project-list";
import { createTodoList } from "./create-todo-list";

let currentProject;

const newTodoItemButton = document.querySelector('.project-heading > button')
const todoArea = document.querySelector('.todo-area');

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

const projectListHolder = document.querySelector('nav .start');

function renderProjectList() {
    projectListHolder.replaceChildren();
    projectListHolder.append(createProjectList());

    const projects = projectListHolder.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('click', projectCallback)
    })
}

const completedProject = document.querySelector('.completed');

completedProject.addEventListener('click', projectCallback)

function projectCallback(e) {
    currentProject = updateCurrentProject(e.target.getAttribute('data-project-id'));
    loadProject();
}

currentProject = setDefault();
loadProject();
renderProjectList();
//remember to check how this works with storage