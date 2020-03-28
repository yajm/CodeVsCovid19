<html>
<body>
    <form action="" method="POST">
  <div>
    <label for="room">Your Room</label>
    <input name="room" id="room" value="">
  </div>
  <div>
    <!--<button>Start Game</button>-->
    <input type="submit" value="Start Game " name="submit">
  </div>
</form>

<?php
if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $room = $_POST['room'];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/CoronaJass.txt");

    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=create_player&p_name=Peter");
    $output = curl_exec($ch);
    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=join_game&room_name=".$room);
    $game_joint = curl_exec($ch);

    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=create_player&p_name=Anna");
    $output = curl_exec($ch);
    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=join_game&room_name=".$room);
    $game_joint = curl_exec($ch);

    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=create_player&p_name=Bob");
    $output = curl_exec($ch);
    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=join_game&room_name=".$room);
    $game_joint = curl_exec($ch);

    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=create_player&p_name=Susi");
    $output = curl_exec($ch);
    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=join_game&room_name=".$room);
    $game_joint = curl_exec($ch);

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
}
?>
</body>
</html>