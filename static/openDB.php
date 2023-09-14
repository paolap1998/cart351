<?php
try {
    /** create db and open connections */

    // create/connect to sqlite db in file
    $file_db = new PDO('sqlite:db/userinformation.db');

    // set errormode to exceptions
    $file_db->setAttribute(PDO::ATTR_ERRMODE,
                            PDO::ERRMODE_EXCEPTION);
    // echo("opened or connected to the database userinformation <br>");
}
catch(PDOException $e){
    // echo $e->getMessage();
}

?>