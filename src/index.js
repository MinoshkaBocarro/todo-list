class TodoItem {
    constructor({title, description, dueDate}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        // add priority, repeated, notes and checklist
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