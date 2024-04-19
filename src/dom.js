import { moveIntoProject, projectCreator, projectEditor, setDefault, todoCreator, todoEditor, updateCurrentProject } from "./app";
import { createTodoForm } from "./create-todo-form";
import { createProjectList } from "./create-project-list";
import { createTodoList } from "./create-todo-list";
import { createProjectForm } from "./edit-project-name-form";
import { createMoveMenu } from "./create-move-menu";

let currentProject;

//todos
const newTodoItemButton = document.querySelector('.project-heading > button');
const todoArea = document.querySelector('.todo-area');


//todo functions
function getTodoInfo(e) {
    const data = e.formData;
    const todoItemInfo = [];
    for(let value of data.values()) {
        todoItemInfo.push(value);
    }
    return todoItemInfo
}

function getTodoIdFromDom(e) {
    console.log("e.target")
    console.log(e.target)
    console.log("e.target.closest('[data-todo-id]')");
    console.log(e.target.closest('[data-todo-id]'));
    console.log("e.target.closest('[data-todo-id]').dataset")
    console.log(e.target.closest('[data-todo-id]').dataset)
    console.log("e.target.closest('[data-todo-id]').dataset.todoId")
    console.log(e.target.closest('[data-todo-id]').dataset.todoId)
    return e.target.closest('[data-todo-id]').dataset.todoId;
}


function renderTodoList() {
    clearTodoArea();
    todoArea.append(createTodoList());

    const todoViewButtons = todoArea.querySelectorAll('button');

    todoViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const todoId = getTodoIdFromDom(e);
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

    const todoItem = todoArea.querySelectorAll('.todo-item');
    const contextMenu = document.querySelector('.context-menu');

    todoItem.forEach(item => {
        item.addEventListener('contextmenu', e => {
            e.preventDefault();
            const x = e.x;
            const y = e.y;
            contextMenu.classList.add('show');
            contextMenu.setAttribute('data-todo-id', getTodoIdFromDom(e));
            //check this
            contextMenu.style.top = `${y}px`
            contextMenu.style.left = `${x}px`
        });
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.context-menu') /*|| !e.target.closest('.move')*/) {
            //check this
            closeMenus();
        }
    });

    window.addEventListener('resize', () => {
        closeMenus();
    });
}


function checkForCompleted() {
    const completedTodos = todoArea.querySelectorAll('.completed');

    completedTodos.forEach(todo => {
        const todoId = todo.dataset.todoId;
        moveIntoProject(currentProject, todoId, "00000000-0000-0000-0000-000000000000");
    });
}

function clearTodoArea() {
    todoArea.replaceChildren();
}

//todo form
newTodoItemButton.addEventListener("click", () => {
    renderTodoForm("new");
})

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
            const todoId = e.target.formId;
            if (currentProject.getItem(todoId) !== undefined) {
                const todoItemInfo = getTodoInfo(e);
                todoEditor(currentProject, todoId, ...todoItemInfo);
            }
        });
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
        //do I need this?^
        renderTodoList();
    }
}

//project
const projectNameHolder = document.querySelector('.project-heading > h1');

projectNameHolder.addEventListener('dblclick', () => {
    projectNameHolder.textContent = ""
    projectNameHolder.append(createProjectForm())
    
    const projectNameForm = projectNameHolder.querySelector('form');
    const confirmButton = projectNameHolder.querySelector('.confirm');
        
    confirmButton.addEventListener("click", e => {
        e.preventDefault();
        new FormData(projectNameForm);
        renderCurrentProjectName();
        renderProjectList();
    });

    projectNameForm.addEventListener("formdata", e => {
        const newProjectName = e.formData.get("project-name");
        projectEditor(currentProject, newProjectName);
    });
});

//project functions
function renderCurrentProjectName() {
    projectNameHolder.textContent = currentProject.collectionName;
    // console.log(currentProject.id)
    // projectNameHolder.setAttribute('data-project-id', currentProject.id);
}

function loadProject() {
    renderCurrentProjectName();
    renderTodoList();
}

//project list
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
    currentProject = updateCurrentProject(e.target.dataset.projectId);
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

//context menu

const menus = document.querySelectorAll('.menu');
const contextMenu = document.querySelector('.context-menu');

function closeMenus() {
    menus.forEach(menu => {
        menu.classList.remove('show');
        if (menu.classList.contains('move')) {
            moveOption.replaceChildren();
            moveOption.textContent = "Move Todo";
            contextMenu.removeChild(menu)
        }
    });
}
//not sold on this, check later

const deleteOption = document.querySelector('.delete');

deleteOption.addEventListener('click', e => {
    e.preventDefault();
    const todoId = getTodoIdFromDom(e);
    currentProject.deleteItem(todoId);
    //might put pop up "do you want to delete" here
    closeMenus();
    renderTodoList();
})

const moveOption = document.querySelector('.move');

moveOption.addEventListener('click', e => {
    if (contextMenu.classList.contains('show')) {
        showMoveMenu(e);
    }
});

function showMoveMenu(e) {
    e.preventDefault();
    const todoId = getTodoIdFromDom(e);
    const x = e.x;
    const y = e.y;
    e.target.append(createMoveMenu(x, y));
    const projects = document.querySelectorAll('.available-projects');
    // check this
    projects.forEach(project => {
        project.addEventListener('click', () => {
            moveIntoProject(currentProject, todoId, project.dataset.projectId);
            moveOption.replaceChildren();
            moveOption.textContent = "Move Todo";
            closeMenus();
            renderTodoList();
        });
    });
}

//on page load
currentProject = setDefault();
loadProject();
renderProjectList();
//remember to check how this works with storage