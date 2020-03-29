<html>
<head><title>Corona Jass</title>

  <link rel="shortcut icon" href="assets/favicon/CoronaJass.ico?v=1.0">
  <link rel="icon" sizes="16x16 32x32 64x64" href="/assets/favicon/CoronaJass.ico?v=1.0">
  <link rel="icon" type="image/png" sizes="196x196" href="assets/favicon/CoronaJass-192.png?v=1.0">
  <link rel="icon" type="image/png" sizes="160x160" href="assets/favicon/CoronaJass-160.png?v=1.0">
  <link rel="icon" type="image/png" sizes="96x96" href="assets/favicon/CoronaJass-96.png?v=1.0">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/favicon/CoronaJass-64.png?v=1.0">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/CoronaJass-32.png?v=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/CoronaJass-16.png?v=1.0">
  <link rel="apple-touch-icon" href="assets/favicon/CoronaJass-57.png?v=1.0">
  <link rel="apple-touch-icon" sizes="114x114" href="assets/favicon/CoronaJass-114.png?v=1.0">
  <link rel="apple-touch-icon" sizes="72x72" href="assets/favicon/CoronaJass-72.png?v=1.0">
  <link rel="apple-touch-icon" sizes="144x144" href="assets/favicon/CoronaJass-144.png?v=1.0">
  <link rel="apple-touch-icon" sizes="60x60" href="assets/favicon/CoronaJass-60.png?v=1.0">
  <link rel="apple-touch-icon" sizes="120x120" href="assets/favicon/CoronaJass-120.png?v=1.0">
  <link rel="apple-touch-icon" sizes="76x76" href="assets/favicon/CoronaJass-76.png?v=1.0">
  <link rel="apple-touch-icon" sizes="152x152" href="assets/favicon/CoronaJass-152.png?v=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/CoronaJass-180.png?v=1.0">
  <meta name="msapplication-TileColor" content="#FFFFFF">
  <meta name="msapplication-TileImage" content="assets/favicon/CoronaJass-144.png?v=1.0">
  <meta name="msapplication-config" content="assets/favicon/browserconfig.xml">
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="assets/css/style.css">
</head>
<body>
<canvas id="gameField" width="2000" height="1000"></canvas>
<iframe id="jitsi" allow="camera; microphone" src="<?php echo "https://meet.jit.si/coronajass".$_GET["id"];?>"></iframe>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="assets/js/player.js"></script>  

<script type="text/javascript">
  $.getJSON("../api/?action=game_state",
      function(data) {
        console.log(data)     
        if (data.game.id == null || data.protagonist == null) {
            window.location = "https://coronajass.ch/?id="+request.getParameter("id")
        }
  });
</script>
</body>
</html>