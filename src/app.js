import { projectList, Project, TodoItem } from "./app-components";

function todoCreator(currentProject, todoInfo) {
    const newTodoItem = new TodoItem(todoInfo);
    currentProject.addItem(newTodoItem);
}

function projectCreator(projectName) {
    const newProject = new Project(projectName);
    projectList.addProject(newProject);
}

function todoEditor(currentProject, todoInfo, todoItemIndex) {
    const todoItem = currentProject.getItem(todoItemIndex);
    todoItem.populateTodoItem(todoInfo);
    //Do I expect to get the full todoInfo every time?
}

function projectEditor(currentProject, newProjectName) {
    currentProject.projectName = newProjectName;
}

function moveIntoProject(currentProject, itemIndex, destinationProjectIndex) {
   const itemToBeMoved = currentProject.getItem(itemIndex);
   currentProject.deleteItem(itemIndex);
   const destinationProject = projectList.getProjectList()[destinationProjectIndex];
   destinationProject.addItem(itemToBeMoved);
}

const todoItemInfo = {title: "Todo Title", description: "Todo Description", dueDate: '2024-01-01'};
const newProjectName = "New Project Name"
projectCreator(newProjectName);
projectList.setCurrentProject(0);
let currentProject = projectList.getCurrentProject();
todoCreator(currentProject, todoItemInfo);
projectEditor(currentProject, "Working Title")
const todoItemEdit = {title: "Totle", description: "Totion", dueDate: '2024-06-01'};
todoEditor(currentProject, todoItemEdit, 0)
projectCreator("Destination")
moveIntoProject(currentProject, 0, 1)
todoCreator(currentProject, {title: "quarrel", description: "Todo Description", dueDate: '2024-01-01'})
todoCreator(currentProject, {title: "Jovial", description: "Todo Description", dueDate: '2023-01-01'})
todoCreator(currentProject, {title: "Jo Not", description: "Todo Description", dueDate: '2024-07-11'})
todoCreator(currentProject, {title: "Yanty", description: "Todo Description", dueDate: '2023-08-09'})
todoCreator(currentProject, {title: "Quarrel", description: "Todo Description", dueDate: '2024-07-11'})
todoCreator(currentProject, {title: "boris", description: "Todo Description", dueDate: '2023-08-01'})
currentProject.manualSort(3, 0);
projectList.sortProjects(1, 0)
currentProject.completeItem(0)
todoCreator(currentProject, {title: "boris", description: "Todo Description", dueDate: '2024-04-13', repeated: 'Yearly', priority: "high"})
"stop"

export { projectList }