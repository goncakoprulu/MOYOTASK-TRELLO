// Fetch the JSON data (assuming the file is named 'trello-moyotask.json')
fetch('trello-moyotask.json')
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');
        data.actions.forEach(action => {
            if (action.data && action.data.card) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <h3>${action.data.card.name}</h3>
                    <p>${action.data.card.desc || 'No description available'}</p>
                `;
                taskList.appendChild(taskDiv);
            }
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));
