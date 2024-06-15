document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('type').value;
    const attribute = document.getElementById('attribute').value;
    const value = document.getElementById('value').value;

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, attribute, value })
    })
    .then(response => response.json())
    .then(data => {
        const itemsDiv = document.getElementById('items');
        itemsDiv.innerHTML = '';

        if (data.count > 0) {
            data.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `<strong>${item.name}</strong> (${item.type})<br>`;
                for (const key in item.attributes) {
                    itemDiv.innerHTML += `${key}: ${item.attributes[key]}<br>`;
                }
                itemsDiv.appendChild(itemDiv);
            });
        } else {
            itemsDiv.innerHTML = `<p class="message">${data.message}</p>`;
            if (data.similar_items_count > 0) {
                const suggestionsDiv = document.createElement('div');
                suggestionsDiv.className = 'suggestions';
                suggestionsDiv.innerHTML = `<h2>${data.alternative_message}</h2>`;
                data.similar_items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'item';
                    itemDiv.innerHTML = `<strong>${item.name}</strong> (${item.type})<br>`;
                    for (const key in item.attributes) {
                        itemDiv.innerHTML += `${key}: ${item.attributes[key]}<br>`;
                    }
                    suggestionsDiv.appendChild(itemDiv);
                });
                itemsDiv.appendChild(suggestionsDiv);
            }
        }
    });
});

document.getElementById('viewAll').addEventListener('click', function() {
    fetch('/items')
    .then(response => response.json())
    .then(data => {
        const itemsDiv = document.getElementById('items');
        itemsDiv.innerHTML = '';

        data.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `<strong>${item.name}</strong> (${item.type})<br>`;
            for (const key in item.attributes) {
                itemDiv.innerHTML += `${key}: ${item.attributes[key]}<br>`;
            }
            itemsDiv.appendChild(itemDiv);
        });
    });
});
