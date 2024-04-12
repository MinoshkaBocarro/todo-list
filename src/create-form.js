const form = document.createElement('form');
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
titleInput.setAttribute('value', "FILL");
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

function createSelect(label, labelText, id, option) {
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
        select.append(option.cloneNode(true));
    });
    li.append(label, select);
    ul.append(li.cloneNode(true));
}

function createTextArea(label, labelText, id, rows, columns) {
    const li = document.createElement('li');
    const textArea = document.createElement('textarea');

    label.setAttribute('for', id);
    label.textContent = labelText;
    textArea.setAttribute('id', id);
    textArea.setAttribute('name', id);
    textArea.setAttribute('rows', rows);
    textArea.setAttribute('cols', columns);
    //add prefilled value
    li.append(label, textArea);
    ul.append(li.cloneNode(true));
}

createInput(label, "Description:", "description", "text", "FILL");
createInput(label,"Due Date:", "due-date", "date", "1800-03-12");
createSelect(label, "Priority:", "priority", ["Low", "Medium", "High"]);
createSelect(label, "Repeat?", "repeated", ["None", "Daily", "Weekly", "Fortnightly", "Monthly", "Yearly"]);
createInput(label, "Notes:", "notes", "text", "FILL");
createTextArea(label, "Checklist (each list item on a new line)", "checklist", "5", "33")

form.append(ul);