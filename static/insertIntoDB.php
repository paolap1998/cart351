<?php
require('openDB.php');
try{
    $file_db->exec("PRAGMA foreign_keys = on");
    // $file_db->exec($insertStatement);

    $queryInsertUsers = array(
        "INSERT INTO userinformation (firstName, username, email, pass) VALUES ('Paola', 'paola123', 'paolaTest@email.com', 'testing123')",
        "INSERT INTO userinformation (firstName, username, email, pass) VALUES ('Julia', 'julia123', 'juliaTest@email.com', 'testing123')",
        "INSERT INTO userinformation (firstName, username, email, pass) VALUES ('Sammie', 'Sammieluv', 'sammie@email.com', 'testing123')",
        "INSERT INTO userinformation (firstName, username, email, pass) VALUES ('John', 'JohnDoe', 'johndoe@email.com', 'testing123')",
        "INSERT INTO userinformation (firstName, username, email, pass) VALUES ('Alex', 'Alexxx', 'alex@email.com', 'testing123')",
        "INSERT INTO userinformation (firstName, username, email, pass) VALUES ('Mingi', 'mingles', 'mingi@email.com', 'testing123')"
    );

    for($i=0; $i < count($queryInsertUsers); $i++){
        $file_db->exec($queryInsertUsers[$i]);
    }

    echo("INSERTION OF ENTRY INTO userinformation Table success");
    //close file db connection
    $file_db = null;
}
catch(PDOException $e){
    // Print PDOException message
    echo $e->getMessage();
}
?>
