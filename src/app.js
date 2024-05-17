import { v4 as uuidv4 } from "uuid";
import { ProjectList, Project, TodoItem } from "./app-components";

let projectList;

function populateProjectCollection(status) {
    if (status === "new") {
        projectList = new ProjectList('Project List');
    } else if (status === "stored") {
        const projectListInfo = JSON.parse(localStorage.getItem('projectList'));
        projectList = new ProjectList('Project List');
        const projects = projectListInfo.itemList;
        if (projects.length > 0) {
            for (let i = 0; i < projects.length; i++) {
                const currentProjectInfo = projects[i];
                projectCreator(currentProjectInfo.item.collectionName, currentProjectInfo.id);
                updateCurrentProject(projects[i].id);
                const currentProject = projectList.getCurrentProject();
                for (let i = 0; i < currentProjectInfo.item.itemList.length; i++) {
                    const currentTodoInfo = currentProjectInfo.item.itemList[i]
                    todoCreator(currentProject, currentTodoInfo.id, currentTodoInfo.item)
                }
            }
        }
    }
}

function setDefault() {
    const projectCreatorId = uuidv4();
    projectCreator("To Do", projectCreatorId);
    projectCreator("Completed", "00000000-0000-0000-0000-000000000000");
    return updateCurrentProject(projectCreatorId);
}

function updateStorage() {
    localStorage.setItem('projectList', JSON.stringify(projectList));
    console.log(JSON.parse(localStorage.getItem('projectList')))
}

function todoCreator(currentProject,  id = uuidv4(), constructedToDo, title, description, dueDate, priority, repeated, notes, checklistOriginal) {
    let todoInfo;
    if (constructedToDo === undefined) {
        todoInfo = { title, description, dueDate, priority, repeated, notes, checklistOriginal };
    } else {
        todoInfo = constructedToDo;
    }
    const newTodoItem = { 
        item: new TodoItem(todoInfo),
        id: id,
    };
    currentProject.addItem(newTodoItem);
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

function projectCreator(projectName, id = uuidv4()) {
    const newProject = {
        item: new Project(projectName),
        id: id,
    };
    projectList.addItem(newProject);
}

function todoEditor(currentProject, todoItemId, title, description, dueDate, priority, repeated, notes, checklistOriginal) {
    const todoInfo = { title, description, dueDate, priority, repeated, notes, checklistOriginal }
    const todoItem = currentProject.getItem(todoItemId);
    todoItem.populateTodoItem(todoInfo);
}

function projectEditor(currentProject, newProjectName) {
    currentProject.collectionName = newProjectName;
}


function checkChecklistItem(currentProject, todoItemId, checklistIndex) {
    const todoItem = currentProject.getItem(todoItemId);
    const checkedStatus = todoItem.checklistCompleted[checklistIndex];
    const newCheckedStatus = (checkedStatus === "unchecked") ? "checked" : "unchecked";
    todoItem.checklistCompleted[checklistIndex] = newCheckedStatus;
}

function moveIntoProject(currentProject, itemId, destinationProjectId) {
   const itemToBeMoved = {
        item: currentProject.getItem(itemId),
        id: itemId
   }
   currentProject.deleteItem(itemId);
   const destinationProject = projectList.getItem(destinationProjectId);
   destinationProject.addItem(itemToBeMoved);
}

function rescheduleTodo(currentProject, todoItemId) {
    currentProject.getItem(todoItemId).reschedule();
}

function updateCurrentProject(id) {
    projectList.setCurrentProject(id);
    return projectList.getCurrentProject();
}

function manualMoveWithinProject(originalPositionId, afterItemId) {
    projectList.getCurrentProject().sortItemsManually(originalPositionId, afterItemId);
}

function manualMoveProject(originalPositionId, afterItemId) {
    projectList.sortItemsManually(originalPositionId, afterItemId);
}

function sortItemsBy(currentProject, sortMethod) {
    currentProject.sortBy(sortMethod);
}

export { setDefault, todoCreator, todoEditor, projectCreator, projectEditor, updateCurrentProject, moveIntoProject, manualMoveWithinProject, manualMoveProject, sortItemsBy, checkChecklistItem, rescheduleTodo, populateProjectCollection, updateStorage, projectList }