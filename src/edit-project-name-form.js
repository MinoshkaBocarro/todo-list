import { projectList } from "./app-components";

function createProjectForm() {
    const form = document.createElement('form');
    form.setAttribute('action', '""');
    form.setAttribute('method', "post");
    
    const projectContainer = document.createElement('h2');
    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', 'project-name');
    projectLabel.textContent = "Project:";
    const projectInput = document.createElement('input');
    projectInput.setAttribute('type', 'text');
    projectInput.setAttribute('id', 'project-name');
    projectInput.setAttribute('name', 'project-name');
    console.log(projectList)
    console.log(projectList.getCurrentProject())
    console.log(projectList.getCurrentProject().collectionName)
    projectInput.setAttribute('value', projectList.getCurrentProject().collectionName);
    projectContainer.append(projectLabel, projectInput);
    form.append(projectContainer);

    const confirmButton = document.createElement('button');
    confirmButton.setAttribute('value', 'confirm');
    confirmButton.setAttribute('class', 'confirm');
    confirmButton.textContent = "Done"

    form.append(confirmButton);

    return form;
}

export { createProjectForm }