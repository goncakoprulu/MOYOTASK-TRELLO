// Fetch the JSON data (assuming the file is named 'trello-moyotask.json')
fetch('trello-moyotask.json')
    .then(response => response.json())
    .then(data => {
        const taskContainer = document.getElementById('task-container');
        const selectedLists = {
            "Moyotask' Geçirilen Maddeler": [],
            "Moytask'a Geçirilecek Maddeler": []
        };

        // Organize tasks by their list names
        data.actions.forEach(action => {
            if (action.data && action.data.card && action.data.list) {
                const listName = action.data.list.name;
                if (selectedLists[listName]) {
                    selectedLists[listName].push({
                        name: action.data.card.name,
                        desc: action.data.card.desc || 'No description available'
                    });
                }
            }
        });

        // Display tasks from the selected lists
        Object.keys(selectedLists).forEach(listName => {
            selectedLists[listName].forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <h3>${task.name}</h3>
                    <p>${task.desc}</p>
                `;
                taskContainer.appendChild(taskDiv);
            });
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));
