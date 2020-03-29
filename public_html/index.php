<html>
<head>
   <title>Corona Jass</title>
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
  <link rel="stylesheet" type="text/css" href="game/assets/css/style.css">
</head>  

<body>
<div class="parent">
<div class="corona">
<img src="game/assets/images/corona.png" alt="" width="128px">
</div>
<div class="pageCenter">
  <div>
    <input name="room" id="room" value="<?php echo $_GET["id"];?>" placeholder="Your Room">
  </div>
  <br>
  <br>
  <div>
    <input name="name" id="name" placeholder="Your Name">
  </div>
  <br>
  <br>
  <div>
    <button class="button" onclick="onSubmit()">Spiel beitreten</button>
  </div>
</div>
<div class="topRight">
<font size="7" color="white">
<b>#CodeVsCOVID19</b>
</font>
</div>

<div class="bottomRight">
<font size="2" color="white">
Made by:<br>
<a href="https://kastgroup.com">Patrice Kast</a><br>
<a href="https://n.ethz.ch/~pascscha/">Pascal Sch&auml;rli</a><br>
<a href="https://yajm.ch">Yannick M&uuml;ller</a>
</font>
</div>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script>
  $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    });

function onSubmit() {
  var name = document.getElementById("name").value
  var room = document.getElementById("room").value

  $.post("api/?delete",
      function(data) {
      $.post("api/?action=create_player&p_name="+name,
           function(data) {
             $.post("api/?action=join_game&room_name="+room,
              function(data){
                $.getJSON("api/?action=game_state",
                     function(data) {
                       console.log(data)
                       window.location = "game?id="+room
                     })
              })
       })
  })
}

</script>
</body>
</html>
