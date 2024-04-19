import { projectList } from "./app-components";

function createMoveMenu(x, y) {
    const menuContainer = document.createElement('div');
    menuContainer.classList.add("move-menu", "menu", "show");
    const ul = document.createElement('ul');
    menuContainer.style.top = `${y}px`
    menuContainer.style.left = `${x}px`

    projectList.getItemList().forEach(project => {
        if (project.id !== projectList.getCurrentProjectId() && project.id !== "00000000-0000-0000-0000-000000000000" ) {
            const li = document.createElement('li');
            li.textContent = project.item.collectionName;
            li.classList.add('available-projects')
            li.setAttribute('data-project-id', project.id);
            ul.append(li);
        }
    })

    menuContainer.append(ul);

    return menuContainer;
}

export {createMoveMenu};