import { projectList } from "./app-components";

function createProjectList() {
    const projectListContainer = document.createElement('div');
    //might have to add a class for styling

    projectList.getItemList().forEach((item) => {
        if (item.id !== "00000000-0000-0000-0000-000000000000") {
            const project = document.createElement('div');
            project.classList.add('project')
            //might have to add a class for styling the div as a whole
            project.textContent = item.item.collectionName;
            project.setAttribute("data-project-id", `${item.id}`);
            projectListContainer.append(project);
        }
    });

    return projectListContainer;
}

export { createProjectList }