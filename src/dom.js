import { moveIntoProject, projectCreator, setDefault, todoCreator, todoEditor, updateCurrentProject } from "./app";
import { createTodoForm } from "./create-form";
import { createProjectList } from "./create-project-list";
import { createTodoList } from "./create-todo-list";

let currentProject;

const newTodoItemButton = document.querySelector('.project-heading > button');
const todoArea = document.querySelector('.todo-area');

newTodoItemButton.addEventListener("click", () => {
    renderTodoForm("new");
})

function getTodoInfo(e) {
    const data = e.formData;
    const todoItemInfo = [];
    for(let value of data.values()) {
        todoItemInfo.push(value);
    }
    return todoItemInfo
}

function renderTodoForm(type, id) {
    clearTodoArea();
    todoArea.append(createTodoForm(type, id));

    let form;

    if (type === "new") {
        form = todoArea.querySelector('form');
        form.addEventListener("formdata", e => {
            const todoItemInfo = getTodoInfo(e);
            todoCreator(currentProject, undefined, ...todoItemInfo);
        });
    } else if (type === "edit") {
        form = todoArea.querySelector('form')
        form.addEventListener("formdata", e => {
            const todoId = e.target.getAttribute('data-form-id');
            console.log(currentProject.getItem(todoId))
            if (currentProject.getItem(todoId) !== undefined) {
                const todoItemInfo = getTodoInfo(e);
                todoEditor(currentProject, todoId, ...todoItemInfo);
            }
        });

        const deleteButton = document.querySelector('button.delete');

        deleteButton.addEventListener('click', e => {
            e.preventDefault();
            const todoId = e.target.parentNode.getAttribute('data-form-id');
            currentProject.deleteItem(todoId);
            //might put pop up "do you want to delete" here
            renderTodoList();
        })
    }

    const cancelButton = todoArea.querySelector('.cancel');
    const confirmButton = todoArea.querySelector('.confirm');

    cancelButton.addEventListener("click", e => {
        todoFormReset(e);
    })
        
    confirmButton.addEventListener("click", e => {
        new FormData(form);
        todoFormReset(e);
    })

    function todoFormReset(e) {
        e.preventDefault();
        form.reset();
        renderTodoList();
    }
}

function renderTodoList() {
    clearTodoArea();
    todoArea.append(createTodoList());

    const todoViewButtons = todoArea.querySelectorAll('button');

    todoViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const todoId = e.target.parentNode.getAttribute('data-todo-id');
            //check this
            renderTodoForm("edit", todoId);
        });
    });

    const todoCompleteButtons = todoArea.querySelectorAll('[type="checkbox"]');

    todoCompleteButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.target.parentNode.classList.toggle('completed');
        })
    });
}

function checkForCompleted() {
    const completedTodos = todoArea.querySelectorAll('.completed');

    completedTodos.forEach(todo => {
        const todoId = todo.getAttribute('data-todo-id');
        moveIntoProject(currentProject, todoId, "00000000-0000-0000-0000-000000000000");
    });
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
        project.addEventListener('click', projectCallback);
    })
}

const completedProject = document.querySelector('.completed');

completedProject.addEventListener('click', projectCallback);

function projectCallback(e) {
    checkForCompleted();
    currentProject = updateCurrentProject(e.target.getAttribute('data-project-id'));
    loadProject();
}

const newProjectButton = document.querySelector('nav button');
const newProjectFormDialog = document.querySelector("dialog.form");
const newProjectForm = document.querySelector('dialog form');
const confirmNewProjectButton = newProjectForm.querySelector('.confirm');

newProjectButton.addEventListener('click', () => {
    newProjectFormDialog.showModal();
});

newProjectForm.addEventListener('formdata', e => {
    const newProjectName = e.formData.get("project-name");
    projectCreator(newProjectName);
});

confirmNewProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    new FormData(newProjectForm);
    newProjectFormDialog.close();
    newProjectForm.reset();
    renderProjectList();
});


currentProject = setDefault();
loadProject();
renderProjectList();
//remember to check how this works with storage