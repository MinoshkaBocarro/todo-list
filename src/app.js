import { NIL as uuidNil, v4 as uuidv4 } from "uuid";
import { projectList, Project, TodoItem } from "./app-components";
import { id } from "date-fns/locale";


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

function moveIntoProject(currentProject, itemId, destinationProjectId) {
   const itemToBeMoved = {
        item: currentProject.getItem(itemId),
        id: id
   }
   currentProject.deleteItem(itemId);
   const destinationProject = projectList.getItem(destinationProjectId);
   destinationProject.addItem(itemToBeMoved);
}

function updateCurrentProject(id) {
    projectList.setCurrentProject(id);
    return projectList.getCurrentProject();
}

// const todoItemInfo =["Todo Title", "Todo Description", '2024-01-01', 'low', 'none'];
// const todoId = uuidv4();
// const newProjectName = "New Project Name"
// const projectId = uuidv4();
// projectCreator(newProjectName, projectId)
// projectList.setCurrentProject(projectId);
// let currentProject = projectList.getCurrentProject();
// todoCreator(currentProject, todoId, ...todoItemInfo);
// projectEditor(currentProject, "Working Title")
// const todoItemEdit = {title: "Totle", description: "Totion", dueDate: '2024-06-01', repeated: 'none'};
// todoEditor(currentProject, todoId, todoItemEdit)
// const projectId2 = uuidv4();
// projectCreator("Destination", projectId2)
// moveIntoProject(currentProject, todoId, projectId2)
// todoCreator(currentProject, {title: "quarrel", description: "Todo Description", dueDate: '2024-01-01', repeated: 'none'})
// todoCreator(currentProject, {title: "Jovial", description: "Todo Description", dueDate: '2023-01-01', repeated: 'none'})
// todoCreator(currentProject, {title: "Jo Not", description: "Todo Description", dueDate: '2024-07-11', repeated: 'none'})
// todoCreator(currentProject, {title: "Yanty", description: "Todo Description", dueDate: '2023-08-09', repeated: 'none'})
// todoCreator(currentProject, {title: "Quarrel", description: "Todo Description", dueDate: '2024-07-11', repeated: 'none'})
// todoCreator(currentProject, {title: "boris", description: "Todo Description", dueDate: '2023-08-01', repeated: 'none'})
// currentProject.manualSort(3, 0);
// projectList.sortProjects(1, 0)
// currentProject.completeItem(0)
// todoCreator(currentProject, {title: "boris", description: "Todo Description", dueDate: '2024-04-13', repeated: 'Yearly', priority: "high"})
"stop"


export { setDefault, todoCreator, todoEditor, projectCreator, updateCurrentProject, moveIntoProject }