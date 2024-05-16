import { v4 as uuidv4 } from "uuid";
import { projectList, Project, TodoItem } from "./app-components";

function setDefault() {
    const projectCreatorId = uuidv4();
    projectCreator("To Do", projectCreatorId);
    projectCreator("Completed", "00000000-0000-0000-0000-000000000000");
    return updateCurrentProject(projectCreatorId);
}
// check how this works with storage

function todoCreator(currentProject,  id = uuidv4(), title, description, dueDate, priority, repeated, notes, checklist) {
    const todoInfo = { title, description, dueDate, priority, repeated, notes, checklist }
    const newTodoItem = { 
        item: new TodoItem(todoInfo),
        id: id,
    };
    currentProject.addItem(newTodoItem);
}

function projectCreator(projectName, id = uuidv4()) {
    const newProject = {
        item: new Project(projectName),
        id: id,
    };
    projectList.addItem(newProject);
}

function todoEditor(currentProject, todoItemId, title, description, dueDate, priority, repeated, notes, checklist) {
    const todoInfo = { title, description, dueDate, priority, repeated, notes, checklist }
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

export { setDefault, todoCreator, todoEditor, projectCreator, projectEditor, updateCurrentProject, moveIntoProject, manualMoveWithinProject, manualMoveProject, sortItemsBy, checkChecklistItem }