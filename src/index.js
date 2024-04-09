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