import { projectList } from "./app";

function createProjectList() {
    const projectListContainer = document.createElement('div');

    projectList.getItemList().forEach((item) => {
        if (item.id !== "00000000-0000-0000-0000-000000000000") {
            const project = document.createElement('div');
            project.classList.add('project')
            project.textContent = item.item.collectionName;
            project.setAttribute("data-project-id", `${item.id}`);
            project.setAttribute('draggable', 'true')
            projectListContainer.append(project);
        }
    });

    return projectListContainer;
}

export { createProjectList }