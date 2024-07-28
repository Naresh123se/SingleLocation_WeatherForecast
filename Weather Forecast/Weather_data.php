<?php
//Defult_Time
date_default_timezone_set('Asia/Kathmandu');

$mysqli = new mysqli('localhost:3307', 'root', '');
$Connect= $mysqli->connect_errno;

//creating Database
$createDatabase = "CREATE DATABASE IF NOT EXISTS Weather_Forecast";
$mysqli->query($createDatabase);
 
$mysqli->select_db('Weather_Forecast');

$createTable = "CREATE TABLE IF NOT EXISTS Weather_data(
    cityName VARCHAR(50) NOT NULL,
    temp FLOAT NOT NULL,
    descriptio VARCHAR(50) NOT NULL,
    pressure FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    speed FLOAT NOT NULL,
    direction FLOAT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    dt FLOAT NOT NULL,
    api_fetchdate DATETIME NOT NULL)
";
$mysqli->query($createTable);

// Checking fetchdata
$FreshDatacheck = " SELECT * FROM  Weather_data
        WHERE api_fetchdate >= DATE_SUB(NOW(),INTERVAL 1 HOUR)";

$mysqli_result = $mysqli->query($FreshDatacheck);
if ($mysqli_result->num_rows === 0)
{
$jsonFile = file_get_contents("https://api.openweathermap.org/data/2.5/weather?lat=32.470978&lon=-85.000763&appid=0740764120600717b997baa0755cb16b&units=metric");
$phpDataInObjects= json_decode($jsonFile);
    
    //Data 
    $name = $phpDataInObjects->name;
    $temp = $phpDataInObjects->main->temp;
    $desc = $phpDataInObjects->weather[0]->description;
    $pressure = $phpDataInObjects->main->pressure;
    $humidity = $phpDataInObjects->main->humidity;
    $speed =$phpDataInObjects->wind->speed;
    $direction = $phpDataInObjects->wind->deg;
    $icon = $phpDataInObjects->weather[0]->icon;
    $dt = $phpDataInObjects->dt;
    $afd = date('Y-m-d H:i:s');

// Insert Database
$insertDatabase = "INSERT INTO Weather_data
                    (cityName,temp,descriptio,pressure,humidity,speed,direction,icon,dt,api_fetchdate)
                    VALUES 
                    ('$name',$temp,'$desc',$pressure,$humidity,$speed,$direction,'$icon', $dt,'$afd')
                   ";

($mysqli->query($insertDatabase));
}

?>

