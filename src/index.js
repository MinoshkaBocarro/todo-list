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


function todoCreator(todoInfo) {
    const currentProject = projectList.getCurrentProject();
    // ^ this could be passed in
    const newTodoItem = new TodoItem(todoInfo)
    currentProject.addItem(newTodoItem);
}

function projectCreator(projectName) {
    const newProject = new Project(projectName);
    projectList.addProject(newProject);
}