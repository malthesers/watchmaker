<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <title>Password protect</title>
</head>
<body>
    <h1>Now password protection is added to this folder</h1>    

   <?php
    // find dir
    $dir = dirname(__FILE__);

    // test if .htaccess exists
    if( file_exists( ".htaccess" ) ) {
        // if it does, create a backup.
        $backup_name = "old.htaccess";
        $backup_counter = 0;
        $backup_fullname = $backup_name;
        
        // make sure the backup doesn't overwrite a new backup
        while( file_exists( $backup_fullname ) ) {
            $backup_counter++;
            
            $backup_fullname = $backup_name . "-" . $backup_counter;
        }
        
        rename( ".htaccess", $backup_fullname );
        
        echo "<p>The old .htaccess-file is saved with the name <code>".$backup_fullname."</code> - you can erase it, when you can see that the password-protection works.</p>\n<hr>";
        
    
    } 

    // ready to create new .htaccess file
    $htaccess = "AuthType Basic\n". 
                "AuthName \"Password Protected Area\"\n".
                "AuthUserFile ".$dir."/.htpasswd\n".
                "Require valid-user";

    file_put_contents('.htaccess', $htaccess );

    // create .htpasswd
    $htpasswd = 'keammd:$apr1$Ab9saxGR$3YCpiocvG..Qj/YmXMlF.0';
    
    file_put_contents(".htpasswd", $htpasswd );
    
    echo "<p>Now this folder has been password protected</p>";
    
    echo "<p>Username: <code>keammd</code><br>Password: <code>kode2015</code></p>"

/*
AuthType Basic
AuthName "Password Protected Area"
AuthUserFile /var/www/petlatkea.dk/public_html/kea/patterns/.htpasswd
Require valid-user
*/

    // and create .htpasswd (keammd / kode2015
/*
keammd:$apr1$Ab9saxGR$3YCpiocvG..Qj/YmXMlF.0
*/



?>

    <hr>
    <p>You may erase the file <code>passwordprotect.php</code> form this folder - it has served it's purpose</p>

</body>
</html>