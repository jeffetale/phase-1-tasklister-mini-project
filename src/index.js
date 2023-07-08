document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#create-task-form');
  const tasksList = document.querySelector('#tasks');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const taskInput = document.querySelector('#new-task-description');
    const taskDescription = taskInput.value;

    if (taskDescription) {
      const taskItem = document.createElement('li');
      taskItem.textContent = taskDescription;
      tasksList.appendChild(taskItem);
      taskInput.value = '';
    }
  });
  
});

 
