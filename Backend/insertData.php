<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Påloggingsinformasjon for MySQL-serveren
$servername = "172.20.128.21";
$username = "jm";
$password = "Akademiet99!";
$database = "bokregister";

// Opprett tilkobling til MySQL-serveren
$conn = new mysqli($servername, $username, $password, $database);

// Sjekk tilkoblingen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sjekk om skjemaet er sendt inn
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Hent skjema-data og rens
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $author = mysqli_real_escape_string($conn, $_POST['author']);
    $isbn = mysqli_real_escape_string($conn, $_POST['isbn']);
    $publisher = mysqli_real_escape_string($conn, $_POST['publisher']);
    $year = mysqli_real_escape_string($conn, $_POST['year']);
    $pages = mysqli_real_escape_string($conn, $_POST['pages']);

    // SQL-spørring for å sette inn data i databasen
    $sql = "INSERT INTO boker (Tittel, Forfattere, ISBN, Utgiver, Publiseringsar, Sideantall) VALUES ('$title', '$author', '$isbn', '$publisher', '$year', '$pages')";

    // Utfør spørringen
    if ($conn->query($sql) === TRUE) {
        // Lukk tilkoblingen
        $conn->close();
        
        // Omdiriger brukeren til ønsket side
        header("Location: /Frontend/index.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Lukk tilkoblingen
$conn->close();

?>