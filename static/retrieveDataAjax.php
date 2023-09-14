<?php

require('openDB.php');
    if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET["theUsers"])){
        try {
            $escaped = $file_db->quote($_GET["theUsers"]);
            $myStr="SELECT * FROM userinformation WHERE username =".$escaped;
            $result = $file_db->query($myStr);
            if(!$result) die("Cannot execute query");

            $res = array();
            $i=0;

            while($row = $result->fetch(PDO::FETCH_ASSOC))
            {
                $res[$i] = $row;
                $i++;
            }

            $myJSONObj = json_encode($res);
            echo $myJSONObj;

        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
        exit;
    }

?>
