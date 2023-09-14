<?php
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_GET['submit'])){
       $repeatSong = $_GET['repeatSong'];
       $favArtist = $_GET['favArtist'];
       $musicFreq = $_GET['musicFreq'];
       $firstAlbum = $_GET['firstAlbum'];

       $ansFile = fopen("data/userAnswers.txt", "a") or die("Something went wrong");
       
       fwrite($ansFile, "Favorite Artist: ".$favArtist."\n");
       fwrite($ansFile, "Repeat: ".$repeatSong."\n");
       fwrite($ansFile, "Time of Day: ".$musicFreq."\n");
       fwrite($ansFile, "First Album: ".$firstAlbum."\n");

       fclose($ansFile);
       exit;


    }
}

if($_SEVER['REQUEST_METHOD'] == 'GET' && isset($_GET["getAjaxOnClick"])){
       $ansFile = fopen("data.userAnswers.txt", "r") or die("ERROR");
       $answers = array();
       $TOTAL = 4;

       while(!feof($theFile)){
        $ansObj = new stdClass();

        for($i = 0; $i < $TOTAL; $i++){
            $AnsString = fgets($ansFile);
            $split = explode(": ", $AnsString);
            $key = $split[0];

            if(isset($split[1])){
                $value = $split[1];
                $ansObj ->$key = trim($value);
            }
        }
        fclose($theFile);

        $JsonObj = json_encode($outArr);
        echo $JsonObj;
       }    
       exit;
}

if($_SEVER['REQUEST_METHOD'] == 'POST'){
    $ansFile = fopen("data/userAnswers.txt", "a") or die("ERROR");

    $length = intval($_POST['lengthOfVals']);
    for($i = 0; $i < $length; $i++){
        fwrite($ansFile,$_POST['e'.$i]."\n");
    }

    fwrite($ansFile,'{"END":"'.$_POST['lengthOfVals'].'"}'."\n");
    fclose($ansFile);
    echo("done");
    exit;
}

?>