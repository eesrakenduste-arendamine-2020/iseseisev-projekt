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
    $newArray['date_added'] = $_POST['date_added'];

    array_push( $dataArray['data'], $newArray);
    $fileData_JSON = json_encode( $dataArray, JSON_PRETTY_PRINT );
    file_put_contents( $fileLocation, $fileData_JSON );
    echo $newArray['id'];
}

function generateId() {
    return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,10))), 1, 10);
}

function createBookHTML() {
    $array = getFileArray();
    if ($array) :
        for($i=0;$i < sizeof($array['data']);$i++) :
        ?>
            <div class="flex-row table-row font-size-14">
                <div class="col__1"><?php echo $array['data'][$i]['title'];?></div>
                <div class="col__2"><?php echo $array['data'][$i]['author'];?></div>
                <div class="col__3"><?php echo $array['data'][$i]['pages_total'];?></div>
                <div class="col__4"><?php echo $array['data'][$i]['year'];?></div>
                <div class="col__6"><?php echo $array['data'][$i]['date_added'];?></div>
                <div class="col__7"><?php echo $array['data'][$i]['pages_finished'];?> / <?php echo $array['data'][$i]['pages_total'];?></div>
                <div class="col__8 js-edit" data-id="<?php echo $array['data'][$i]['id'];?>"><img src="img/options.png"></div>
            </div>

        <?php endfor;

    endif;

}

function readFields() {
    $taskId = $_GET['task_id'];
    $array = getFileArray();

    for($i=0;$i < sizeof($array['data']);$i++) :
        if ($array['data'][$i]['id'] == $taskId) {
            fileDataToJson($array['data'][$i]);
            break;
        }

    endfor;

}

function fileDataToJson($array) {
    if ($array) :
        echo json_encode( $array, JSON_PRETTY_PRINT );
        return;
    endif;
    return false;
}

// UPDATE
function updateBook() {
    $id = $_POST['id'];

    
    $array = getFileArray();

    for($i=0;$i < sizeof($array['data']);$i++) :
        if ($array['data'][$i]['id'] == $id) {
                $array['data'][$i]['title'] =  $_POST['title'];
                $array['data'][$i]['author'] =  $_POST['author'];
                $array['data'][$i]['year'] =  $_POST['year'];
                $array['data'][$i]['pages_total'] = $_POST['pages_total'];
                $array['data'][$i]['pages_finished'] = $_POST['pages_finished'];
                $array['data'][$i]['rating'] = $_POST['rating'];
            break;
        }

    endfor;

    writeNewArray($array);
}



function writeNewArray($array) {
    $fileLocation = 'database.json';
    $fileData_JSON = json_encode( $array, JSON_PRETTY_PRINT );
    file_put_contents( $fileLocation, $fileData_JSON );
}


function deleteBook() {
    $id = $_POST['id'];
    $array = getFileArray();
    $newArray = createFileArray();
    for($i=0;$i < sizeof($array['data']);$i++) :
        if ($array['data'][$i]['id'] == $id) {
            continue;
        }

        array_push($newArray['data'], $array['data'][$i]);
    endfor;

    writeNewArray($newArray);
}