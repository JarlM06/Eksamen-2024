document.addEventListener('DOMContentLoaded', function() {
    // Henter data fra PHP scriptet
    fetch('/Backend/getData.php')
        .then(response => response.json())
        .then(data => {
            // Henter HTML tabellen
            const tbody = document.querySelector('#bokRegister tbody');

            // Går igjennom hver rad med data
            data.forEach(row => {
                // Lager en ny rad i tabellen
                const tr = document.createElement('tr');

                var id;
                // Går igjennom hver celle i raden
                for (const key in row) {
                    // Sjekker om dataen er 'ID'
                    if (key !== 'ID') {
                        // Lager en ny celle i tabellen
                        const td = document.createElement('td');
                        td.textContent = row[key];
                        tr.appendChild(td);
                    } else {
                        id = row[key];
                    }
                }

                const td = document.createElement('td');
                tr.appendChild(td);
                const button = document.createElement('button');
                td.appendChild(button);
                button.textContent = 'Slett';
                button.className = 'delete-button';
                button.setAttribute('onclick', 'deleteBook("' + id + '")');

                // Leger den nye raden til i tabellen
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function deleteBook(id) {
    console.log("Deleting book with id:", id);
};