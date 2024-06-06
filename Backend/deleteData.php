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

// Retrieve id from URL parameters
$id = $_GET['id'];

// Prepare and execute deletion query
$sql = "DELETE FROM boker WHERE ID='$id'";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo "Book deleted successfully";
} else {
    echo "Error deleting book: " . $conn->error;
}

// Lukk tilkoblingen
$conn->close();

?>