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

    include('callAPI.php');

    $make_call = callAPI('POST', 'https://studentethz.ch/api/?action=create_player&p_name=', json_encode($name));
	$response = json_decode($make_call, true);
	$errors   = $response['response']['errors'];
	$data     = $response['response']['data'][0];
}
?>

</body>
</html>