class TodoItem {
    constructor(todoInfo) {
        this.populateTodoItem(todoInfo);
    }

    populateTodoItem({title, description, dueDate}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        // add priority, repeated, notes and checklist
        // check if this works for info I want a setter foe e.g duedate
    }
}

class Project {
    itemList = [];

    constructor(projectName){
        this.projectName = projectName;
    }

    addItem(item) {
        this.itemList.push(item);
    }

    getItem(itemIndex) {
        return this.itemList[itemIndex];
    }
}

const projectList = (function() {
    const projectList = [];
    let currentProject;

    const addProject = function(newProject) {
        projectList.push(newProject);
    }

    const getCurrentProject = function() {
        return currentProject;
    }

    const setCurrentProject = function(currentProjectIndex) {
        currentProject = projectList[currentProjectIndex];
    }

    return { getCurrentProject, setCurrentProject, addProject };
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
    currentProject.projectName = newProjectName;}