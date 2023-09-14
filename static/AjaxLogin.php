<?php
session_start();
session_unset();
session_destroy();

require('openDB.php');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
 $user = $_POST['a_user'];
 $pass_inputted= $_POST['a_pass'];

 try {
    $user_es = $file_db->quote($user);
    $password_es = $file_db->quote($pass_inputted);

    $sql_select = "SELECT COUNT(*) from userinformation WHERE username=$user_es";
    $result = $file_db->query($sql_select);

    if (!$result) die("Cannot execute query.");
    
    if ($result->fetchColumn() > 0) {

        $sql_getTest = "SELECT firstName, username, pass from userinformation WHERE username=$user_es";
        $result = $file_db->query($sql_getTest);
        $row = $result->fetch(PDO::FETCH_ASSOC);

        // pass check using inbuilt verify function
        if(password_verify($pass_inputted, $row["pass"])){
            // All good
            session_start();
            $_SESSION['firstName'] = $row["firstName"];
            $_SESSION['username'] = $row["username"];
            echo("IN");
            return;
        }
        else{
            echo("PASSWORD INCORRECT");
        }
    }
    else{
        $file_db = null;
        echo("USER INCORRECT");
    }
 }
 catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
  }
  exit;
}
?>