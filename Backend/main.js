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

                // Går igjennom hver celle i raden
                for (const key in row) {
                    // Lager en ny celle i tabellen
                    const td = document.createElement('td');
                    td.textContent = row[key];
                    tr.appendChild(td);
                }

                // Leger den nye raden til i tabellen
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});