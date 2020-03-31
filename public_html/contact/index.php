<?php 
$nameErr = $emailErr = $messageErr = "";

if(isset($_POST['submit'])){
	if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } 
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } 
  if (empty($_POST["textarea"])) {
    $messageErr = "Message is required";
  }
  if (!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["textarea"])) {
    $to = "info@coronajass.ch"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = "Contact - Submission";
    $subject2 = "Submission on coronajass.ch";
    $message = $name . " with the E-Mail: " . $from . " wrote the following:" . "\n\n" . $_POST['textarea'] . "\n\n";
    $message2 = "Mail sent: " . $name . "\n\n" . $_POST['textarea'] . "\n\nI will contact you shortly.";

    $headers = "From:" . $from; # "pas.schaerli@sunrise.ch"
    $headers2 = "From:" . $to; # "passcha@student.ethz.ch"
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    header('Location: /');
	}
}
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Kontakt - Corona Jass</title>
  <link rel="shortcut icon" href="game/assets/favicon/CoronaJass.ico?v=1.0">
  <link rel="icon" sizes="16x16 32x32 64x64" href="game/assets/favicon/CoronaJass.ico?v=1.0">
  <link rel="icon" type="image/png" sizes="196x196" href="game/assets/favicon/CoronaJass-192.png?v=1.0">
  <link rel="icon" type="image/png" sizes="160x160" href="game/assets/favicon/CoronaJass-160.png?v=1.0">
  <link rel="icon" type="image/png" sizes="96x96" href="game/assets/favicon/CoronaJass-96.png?v=1.0">
  <link rel="icon" type="image/png" sizes="64x64" href="game/assets/favicon/CoronaJass-64.png?v=1.0">
  <link rel="icon" type="image/png" sizes="32x32" href="game/assets/favicon/CoronaJass-32.png?v=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="game/assets/favicon/CoronaJass-16.png?v=1.0">
  <link rel="apple-touch-icon" href="game/assets/favicon/CoronaJass-57.png?v=1.0">
  <link rel="apple-touch-icon" sizes="114x114" href="game/assets/favicon/CoronaJass-114.png?v=1.0">
  <link rel="apple-touch-icon" sizes="72x72" href="game/assets/favicon/CoronaJass-72.png?v=1.0">
  <link rel="apple-touch-icon" sizes="144x144" href="game/assets/favicon/CoronaJass-144.png?v=1.0">
  <link rel="apple-touch-icon" sizes="60x60" href="game/assets/favicon/CoronaJass-60.png?v=1.0">
  <link rel="apple-touch-icon" sizes="120x120" href="game/assets/favicon/CoronaJass-120.png?v=1.0">
  <link rel="apple-touch-icon" sizes="76x76" href="game/assets/favicon/CoronaJass-76.png?v=1.0">
  <link rel="apple-touch-icon" sizes="152x152" href="game/assets/favicon/CoronaJass-152.png?v=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="game/assets/favicon/CoronaJass-180.png?v=1.0">
  <meta name="msapplication-TileColor" content="#FFFFFF">
  <meta name="msapplication-TileImage" content="game/assets/favicon/CoronaJass-144.png?v=1.0">
  <meta name="msapplication-config" content="game/assets/favicon/browserconfig.xml">
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="../game/assets/css/style.css">
	</head>
	<body class="is-preload">
		<div class="parent">
			<div class="corona">
<img src="game/assets/images/corona.png" alt="" width="128px">
</div>
<div class="pageCenter">
		<h2>Kontakt / Support Anfrage</h2>
				<form method="post" action="#">
					<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<input type="text" name="name" id="name" value="" placeholder="Name" />
							<span class="error"> <?php echo $nameErr;?></span>
							<br>
							<br>
							<input type="email" name="email" id="email" value="" placeholder="Email" />
							<span class="error"> <?php echo $emailErr;?></span>
							<br>
							<br>
							<textarea name="textarea" id="textarea" placeholder="Frage zu Coronajass.ch\n\n Bei Supportanfrage am besten Skype Namen auch angeben" rows="6"></textarea>
							<span class="error"> <?php echo $messageErr;?></span>
							<br>
							<br>
							<button class="button" type="submit" name="submit">Senden</button>		
				</form>	
			</div>
		</div>
	</body>
</html>