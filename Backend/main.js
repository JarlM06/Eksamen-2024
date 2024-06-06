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
    // Display a confirmation dialog
    var confirmation = confirm("Er du sikker på at du vil slette denne boken fra bokregisteret?");
    
    // If user confirms
    if (confirmation) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open("GET", "/Backend/deleteData.php?id=" + id, true);

        // Set up the callback function
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Reload the page after the PHP script is done
                window.location.reload();
            }
        };

        // Send the request
        xhr.send();
    }
};
