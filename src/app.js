import { v4 as uuidv4 } from "uuid";
import { projectList, Project, TodoItem } from "./app-components";

function setDefault() {
    const projectCreatorId = uuidv4();
    projectCreator("To Do", projectCreatorId);
    projectList.setCurrentProject(projectCreatorId);
    return projectList.getCurrentProject();
}

function todoCreator(currentProject, title, description, dueDate, priority, repeated, notes, checklist) {
    const todoInfo = { title, description, dueDate, priority, repeated, notes, checklist }
    const newTodoItem = new TodoItem(todoInfo);
    currentProject.addItem(newTodoItem);
}

function projectCreator(projectName, id = uuidv4()) {
    const newProject = {
        project: new Project(projectName),
        id: id,
    }
    projectList.addProject(newProject);
}

function todoEditor(currentProject, todoItemIndex, todoInfo) {
    const todoItem = currentProject.getItem(todoItemIndex);
    todoItem.populateTodoItem(todoInfo);
    //Do I expect to get the full todoInfo every time?
}

function projectEditor(currentProject, newProjectName) {
    currentProject.projectName = newProjectName;
}

function moveIntoProject(currentProject, itemIndex, destinationProjectId) {
   const itemToBeMoved = currentProject.getItem(itemIndex);
   currentProject.deleteItem(itemIndex);
   const destinationProject = projectList.getProject(destinationProjectId);
   destinationProject.addItem(itemToBeMoved);
}

const todoItemInfo =["Todo Title", "Todo Description", '2024-01-01', 'low', 'none'];
const newProjectName = "New Project Name"
const projectId = uuidv4();
projectCreator(newProjectName, projectId)
projectList.setCurrentProject(projectId);
let currentProject = projectList.getCurrentProject();
todoCreator(currentProject, ...todoItemInfo);
projectEditor(currentProject, "Working Title")
const todoItemEdit = {title: "Totle", description: "Totion", dueDate: '2024-06-01', repeated: 'none'};
todoEditor(currentProject, 0, todoItemEdit)
const projectId2 = uuidv4();
projectCreator("Destination", projectId2)
moveIntoProject(currentProject, 0, projectId2)
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


export { setDefault, todoCreator }