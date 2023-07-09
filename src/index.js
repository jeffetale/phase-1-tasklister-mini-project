document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#create-task-form');
  const tasksList = document.querySelector('#tasks');
  const priorityDropdown = document.querySelector('#priority-dropdown');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskInput = document.querySelector('#new-task-description');
    const taskDescription = taskInput.value;
    const taskPriority = priorityDropdown.value;

    if (taskDescription) {
      const taskItem = createTaskItem(taskDescription, taskPriority);

      tasksList.appendChild(taskItem);
      taskInput.value = '';
    }
  });

  tasksList.addEventListener('click', (event) => {
    const taskItem = event.target.closest('li');

    if (event.target.classList.contains('edit-button')) {
      const taskDescription = taskItem.querySelector('.task-description');
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.value = taskDescription.textContent;
      taskDescription.textContent = '';
      taskDescription.appendChild(taskInput);
      event.target.textContent = 'Save';
      event.target.classList.remove('edit-button');
      event.target.classList.add('save-button');
    } else if (event.target.classList.contains('save-button')) {
      const taskDescription = taskItem.querySelector('.task-description');
      const taskInput = taskDescription.querySelector('input');
      taskDescription.textContent = taskInput.value;
      event.target.textContent = 'Edit';
      event.target.classList.remove('save-button');
      event.target.classList.add('edit-button');
    } else if (event.target.classList.contains('delete-button')) {
      taskItem.remove();
    }
  });

  const sortButton = document.querySelector('#sort-button');
  sortButton.addEventListener('click', () => {
    const taskItems = Array.from(tasksList.children);

    taskItems.sort((a, b) => {
      const priorityA = getPriorityValue(a);
      const priorityB = getPriorityValue(b);

      return priorityA.localeCompare(priorityB);
    });

    const ascendingOrder = document.querySelector('#ascending-order').checked;

    if (!ascendingOrder) {
      taskItems.reverse();
    }

    tasksList.innerHTML = '';
    taskItems.forEach((item) => {
      tasksList.appendChild(item);
    });
  });

  function createTaskItem(description, priority) {
    const taskItem = document.createElement('li');

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = description;

    if (priority === 'high') {
      taskDescription.style.color = 'red';
    } else if (priority === 'medium') {
      taskDescription.style.color = 'yellow';
    } else if (priority === 'low') {
      taskDescription.style.color = 'green';
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    taskItem.appendChild(taskDescription);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    return taskItem;
  }

  function getPriorityValue(taskItem) {
    const prioritySpan = taskItem.querySelector('.task-description');
    if (prioritySpan) {
      return prioritySpan.dataset.priority;
    }
    return '';
  }
});
