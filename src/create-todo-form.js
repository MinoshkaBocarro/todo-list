import { constructNow, format } from "date-fns";
import { projectList } from "./app-components";

function createTodoForm(type, todoId) {
    const form = document.createElement('form');

    let todoInfo;
    if (type === "new")  {
        todoInfo = {
            title: "",
            description: "",
            dueDate: format(constructNow(), 'yyyy-MM-dd'),
            priority: "low",
            repeated: "none",
            notes: "",
            checklist: ""
        };
    } else if (type === "edit") {
       todoInfo = projectList.getCurrentProject().getItem(todoId);
       form.setAttribute('data-todo-id', todoId);
    }

    form.setAttribute('action', '""');
    form.setAttribute('method', "post");

    const titleContainer = document.createElement('h2');
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = "To Do:";
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('value', todoInfo.title);
    titleContainer.append(titleLabel, titleInput);
    form.append(titleContainer);

    const ul = document.createElement('ul');
    const label = document.createElement('label');

    function createInput(label, labelText, id, type, value) {
        const li = document.createElement('li');
        const input = document.createElement('input');
    
        label.setAttribute('for', id);
        label.textContent = labelText;
        input.setAttribute('type', type);
        input.setAttribute('id', id);
        input.setAttribute('name', id);
        input.setAttribute('value', value);
        li.append(label, input);
        ul.append(li.cloneNode(true));
    }

    function createSelect(label, labelText, id, option, selected) {
        const li = document.createElement('li');
        const select = document.createElement('select');
    
        label.setAttribute('for', id);
        label.textContent = labelText;
        select.setAttribute('id', id);
        select.setAttribute('name', id);
        option.forEach(index => {
            const option = document.createElement('option');
            option.setAttribute('value', index.toLowerCase());
            option.textContent = index;
            if(selected === option) {
                option.setAttribute('selected');
            }
            select.append(option.cloneNode(true));
        });
        li.append(label, select);
        ul.append(li.cloneNode(true));
    }

    function createTextArea(label, labelText, id, rows, columns, content) {
        const li = document.createElement('li');
        const textArea = document.createElement('textarea');
    
        label.setAttribute('for', id);
        label.textContent = labelText;
        //Check how this works with breaks
        textArea.setAttribute('id', id);
        textArea.setAttribute('name', id);
        textArea.setAttribute('rows', rows);
        textArea.setAttribute('cols', columns);
        textArea.textContent = content;
        //check this
        li.append(label, textArea);
        ul.append(li.cloneNode(true));
    }

    createInput(label, "Description:", "description", "text", todoInfo.description);
    createInput(label,"Due Date:", "due-date", "date", todoInfo.dueDate);
    createSelect(label, "Priority:", "priority", ["Low", "Medium", "High"], todoInfo.priority);
    createSelect(label, "Repeat?", "repeated", ["None", "Daily", "Weekly", "Fortnightly", "Monthly", "Yearly"], todoInfo.repeated);
    createInput(label, "Notes:", "notes", "text", todoInfo.notes);
    createTextArea(label, "Checklist (each list item on a new line)", "checklist", "5", "33", todoInfo.checklist)

    form.append(ul);

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('value', 'cancel');
    cancelButton.setAttribute('class', 'cancel');
    cancelButton.textContent = "Go back"
    const confirmButton = document.createElement('button');
    confirmButton.setAttribute('value', 'confirm');
    confirmButton.setAttribute('class', 'confirm');
    confirmButton.textContent = "Done"

    form.append(cancelButton, confirmButton);

    return form;
}

export { createTodoForm }