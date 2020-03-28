<html>
<body>
Welcome

<?php
session_id("1lbar94qgsv9s7ispvqlesph4k");
$ch = curl_init();

curl_setopt( $ch, CURLOPT_COOKIESESSION, true );
curl_setopt($ch, CURLOPT_COOKIEFILE, "__DIR__/../tmp/CoronaJass");

curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=my_cards");
$game_state = curl_exec($ch);
curl_close($ch);

echo "<br><br>Cookies:";
if($_COOKIE) {
foreach ($_COOKIE as $key=>$val)
       {
           echo $key.' is '.$val."<br>\n";
       }
    }
    else
    {
        echo "No Cookies are Set";    
    }
?>
</body>
</html>