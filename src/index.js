const { compareAsc } = require("date-fns");

class TodoItem {
    constructor(todoInfo) {
        this.populateTodoItem(todoInfo);
    }

    populateTodoItem({title, description, dueDate}) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        // add priority, repeated, notes and checklist
    }
}

class Project {
    itemList = [];
    completedList = [];

    constructor(projectName){
        this.projectName = projectName;
    }

    addItem(item) {
        this.itemList.push(item);
    }

    getItem(itemIndex) {
        return this.itemList[itemIndex];
    }

    deleteItem(itemIndex) {
        this.itemList.splice(itemIndex, 1);
    }

    sortBy(sortMethod) {
        if (sortMethod === "Alphabetical") {
            this.itemList.sort((firstTodo, secondTodo) => {
                const firstTitle = firstTodo.title.toUpperCase();
                const secondTitle = secondTodo.title.toUpperCase();
                if (firstTitle < secondTitle) {
                    return -1;
                }
                if (firstTitle > secondTitle) {
                    return 1;
                }
                return 0;
            });
        } else if (sortMethod === "Due date") {
            this.itemList.sort((firstTodo, secondTodo) => compareAsc(firstTodo.dueDate, secondTodo.dueDate));
        }
    }

    manualSort(originalIndex, newIndex) {
        const item = this.getItem(originalIndex)
        this.itemList.splice(originalIndex, 1);
        this.itemList.splice(newIndex, 0, item);
    }

    completeItem(itemIndex) {
        const item = this.getItem(itemIndex)
        this.itemList.splice(itemIndex, 1);
        this.completedList.push(item);
    }
}

const projectList = (function() {
    const projectList = [];
    let currentProject;

    const addProject = function(newProject) {
        projectList.push(newProject);
    };

    const getCurrentProject = function() {
        return currentProject;
    };

    const setCurrentProject = function(currentProjectIndex) {
        currentProject = projectList[currentProjectIndex];
    };
    
    const sortProjects = function(originalIndex, newIndex) {
        const item = projectList[originalIndex];
        projectList.splice(originalIndex, 1);
        projectList.splice(newIndex, 0, item);
    };

    return { getCurrentProject, setCurrentProject, addProject, projectList, sortProjects };
})();

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
   const destinationProject = projectList.projectList[destinationProjectIndex];
   destinationProject.addItem(itemToBeMoved);
}

const todoItemInfo = {title: "Todo Title", description: "Todo Description", dueDate: "Todo Due Date"};
const newProjectName = "New Project Name"
projectCreator(newProjectName);
projectList.setCurrentProject(0);
let currentProject = projectList.getCurrentProject();
todoCreator(currentProject, todoItemInfo);
projectEditor(currentProject, "Working Title")
const todoItemEdit = {title: "Totle", description: "Totion", dueDate: "Toe Date"};
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
console.log(projectList.projectList)
currentProject.completeItem(0)
console.log(projectList.projectList)
"stop"