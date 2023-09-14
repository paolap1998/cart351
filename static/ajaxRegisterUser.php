<?php
require('openDB.php');
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $user = $_POST['a_user'];
    $firstName = $_POST['a_name'];
    $email = $_POST['a_email'];
    $hash=password_hash($_POST['a_pass'], PASSWORD_BCRYPT);

    try{
        $user_es = $file_db->quote($user);
        $firstName_es = $file_db->quote($firstName);
        $email_es = $file_db->quote($email);
        $password_es = $file_db->quote($hash);

        // check to make sure user does not exist
        $sql_select = "SELECT COUNT(*) from userinformation WHERE username=$user_es" ;
        $result = $file_db->query($sql_select);

        if (!$result) die("Cannot execute query.");

        //get the value of a column from the next row in the result set
       if ($result->fetchColumn() > 0) {
         echo("ALREADY IN");
       }
        else{
            echo("NOT IN");
            $queryInsert = "INSERT INTO userinformation(firstName, username, email, pass)VALUES ($firstName_es, $user_es, $email_es, $password_es)";
            $file_db->exec($queryInsert);
        }
    }
    catch(PDOEXCEPTION $e){
        echo $e->getMessage();
    }
    exit;
}

?>