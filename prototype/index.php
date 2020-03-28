<html>
<body>
	<form action="" method="POST">
  <div>
    <label for="room">Your Room</label>
    <input name="room" id="room" value="">
  </div>
  <div>
    <label for="name">Your Name</label>
    <input name="name" id="name" value="">
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
    curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/CoronaJass");
    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=create_player&p_name=".$name);
    $output = curl_exec($ch);
    curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=join_game&room_name=".$room);
    $game_joint = curl_exec($ch);
    #curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=my_cards");
    #$game_state = curl_exec($ch);
    curl_close($ch);

    header('Location: game.php');
    exit();
}
?>
</body>
</html>