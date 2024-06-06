<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Login informasjon om MySQL server
$servername = "172.20.128.21";
$username = "jm";
$password = "Akademiet99!";
$database = "bokregister";

// Etablerer en kobling til MySQL serveren
$conn = new mysqli($servername, $username, $password, $database);

// Sjekker tilkoblingen
if ($conn -> connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Henter all data fra "boker" i databasen
$sql = "SELECT * FROM boker";
$result = $conn->query($sql);

if ($result === FALSE) {
    die("Error executing query: " . $conn->error);
}

if ($result->num_rows > 0) {
    // Returnerer dataen av hver rad som JSON
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($rows);
} else {
    header('Content-Type: application/json');
    echo json_encode(array()); // Returnerer et tomt array hvis ingen data er funnet
}

$conn->close();

?>