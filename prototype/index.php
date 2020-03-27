<html>
<body>
	<form action="https://www.studentethz.ch/game.php" method="POST">
  <div>
    <label for="room">Your Room</label>
    <input name="room" id="room" value="">
  </div>
  <div>
    <label for="name">Your Name</label>
    <input name="name" id="name" value="">
  </div>
  <div>
    <button>Start Game</button>
  </div>
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $name = $_POST['name'];
    $room = $_POST['room'];
    if (empty($name) || empty($room)) {
        echo "Name is empty";
    } else {
        echo $name;
    }

    include('connect.php');

    $eintrag = "INSERT INTO aktivieren
			(email, passwort, vorname, nachname, sprache, newsletter)
			
			
			
			
			
	VALUES
	('$email', '$pw', '$vorname', '$nachname', '$sprache', '$newsletter')";

	$eintragen = mysql_query($eintrag);
}
?>

</body>
</html>