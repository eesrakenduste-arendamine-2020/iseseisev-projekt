<?php
function getFileArray() {
    if ( file_exists('database.json') ) {
        $fileLocation = 'database.json';
        $fileBuffer = file_get_contents( $fileLocation);
        $fileData = json_decode($fileBuffer, true);
        return $fileData;
    }
    return false;
}

function createFileArray() {
    $dataArray['data'] = array();
    return $dataArray;
}

function saveToFile($dataArray) {
    $fileLocation = 'database.json';
    $newArray = array();
    $newArray['id'] = generateId();
    $newArray['title'] = $_POST['title'];
    $newArray['author'] = $_POST['author'];
    $newArray['year'] =  $_POST['year'];
    $newArray['pages_total'] = $_POST['pages_total'];
    $newArray['pages_finished'] = $_POST['pages_finished'];
    $newArray['rating'] = $_POST['rating'];

    array_push( $dataArray['data'], $newArray);
    $fileData_JSON = json_encode( $dataArray, JSON_PRETTY_PRINT );
    file_put_contents( $fileLocation, $fileData_JSON );
    echo $newArray['id'];
}

function generateId() {
    return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,10))), 1, 10);
}

