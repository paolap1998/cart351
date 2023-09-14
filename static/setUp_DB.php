<?php
    require('openDB.php');

    try{
        $file_db->exec("PRAGMA foreign_keys = on");
        // $theQuery = `CREATE TABLE userinformation (userID INTEGER PRIMARY KEY NOT NULL, firstName TEXT, username TEXT, email TEXT, pass TEXT)`;
        $theQuery = 'CREATE TABLE IF NOT EXISTS userinformation (
                    userID INTEGER PRIMARY KEY NOT NULL,
                    firstName TEXT,
                    username TEXT,
                    email TEXT,
                    pass TEXT)';
        $file_db ->exec($theQuery);
        echo ("Table userinformation created successfully<br>");
        $file_db = null;
    }
    catch(PDOException $e){
        // Print PDOExceptiopn message
        echo $e->getMessage();
    }
?>