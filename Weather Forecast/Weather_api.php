
<?php

include('Weather_data.php');

$mysqli_object = $mysqli->query("SELECT * FROM Weather_data
ORDER BY api_fetchdate DESC LIMIT 1");

echo json_encode($mysqli_object->fetch_assoc());

?>