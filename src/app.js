const { compareAsc, isBefore, constructNow, addDays, format, addWeeks, addMonths, addYears } = require("date-fns");

class TodoItem {
    nextDueDate;

    constructor(todoInfo) {
        this.populateTodoItem(todoInfo);
    }

    populateTodoItem({title, description, dueDate, priority, repeated, notes, checklist}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority || "low";
        this.repeated = repeated;
        this.notes = notes;
        this.checklist = checklist;
    }

    set repeated(repeats) {
        if(typeof repeats === "undefined") {
            return
        } 
        let dateToCompare;
        let nextDueDate;
        if (isBefore(this.dueDate, constructNow())) {
            dateToCompare = constructNow();
        } else {
            dateToCompare = this.dueDate;
        }
        // ^ might not need this
        if(repeats === "Daily") {
            nextDueDate = addDays(dateToCompare, 2);
        } else if (repeats === "Weekly") {
            nextDueDate = addWeeks(dateToCompare, 1);
        } else if (repeats === "Fortnightly") {
            nextDueDate = addWeeks(dateToCompare, 2);
        } else if (repeats === "Monthly") {
            nextDueDate = addMonths(dateToCompare, 1);
        } else if (repeats === "Yearly") {
            nextDueDate = addYears(dateToCompare, 1);
        }
        this.nextDueDate = format(nextDueDate, 'yyyy-MM-dd')
        return this._repeated = repeats;
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

    getItemList() {
        return this.itemList;
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

    const getProjectList = function() {
        return projectList;
    };

    const setCurrentProject = function(currentProjectIndex) {
        currentProject = projectList[currentProjectIndex];
    };
    
    const sortProjects = function(originalIndex, newIndex) {
        const item = projectList[originalIndex];
        projectList.splice(originalIndex, 1);
        projectList.splice(newIndex, 0, item);
    };

    return { getCurrentProject, setCurrentProject, addProject, getProjectList, sortProjects };
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