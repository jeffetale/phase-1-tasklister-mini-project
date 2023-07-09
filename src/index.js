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
      const taskItem = document.createElement('li');
      taskItem.textContent = taskDescription;

      if (taskPriority === 'high') {
        taskItem.style.color = 'red';
      } else if (taskPriority === 'medium') {
        taskItem.style.color = 'yellow';
      } else if (taskPriority === 'low') {
        taskItem.style.color = 'green';
      }

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        taskItem.remove();
      });

      taskItem.appendChild(deleteButton);
      tasksList.appendChild(taskItem);
      taskInput.value = '';
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

  function getPriorityValue(taskItem) {
    const prioritySpan = taskItem.querySelector('.priority-span');
    if (prioritySpan) {
      return prioritySpan.dataset.priority;
    }
    return '';
  }
});
