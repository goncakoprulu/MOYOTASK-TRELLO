// Fetch the JSON data (assuming the file is named 'trello-moyotask.json')
fetch('trello-moyotask.json')
    .then(response => response.json())
    .then(data => {
        const taskContainer = document.getElementById('task-container');
        const lists = {};

        // Organize tasks by their list names
        data.actions.forEach(action => {
            if (action.data && action.data.card && action.data.list) {
                const listName = action.data.list.name;
                if (!lists[listName]) {
                    lists[listName] = [];
                }
                lists[listName].push({
                    name: action.data.card.name,
                    desc: action.data.card.desc || 'No description available'
                });
            }
        });

        // Create collapsible sections for each list
        Object.keys(lists).forEach(listName => {
            const listDiv = document.createElement('div');
            listDiv.classList.add('task-list');

            const listHeader = document.createElement('h2');
            listHeader.textContent = listName;
            listHeader.addEventListener('click', () => {
                const tasksDiv = listDiv.querySelector('.tasks');
                tasksDiv.style.display = tasksDiv.style.display === 'none' ? 'block' : 'none';
            });

            const tasksDiv = document.createElement('div');
            tasksDiv.classList.add('tasks');

            lists[listName].forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <h3>${task.name}</h3>
                    <p>${task.desc}</p>
                `;
                tasksDiv.appendChild(taskDiv);
            });

            listDiv.appendChild(listHeader);
            listDiv.appendChild(tasksDiv);
            taskContainer.appendChild(listDiv);
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));
