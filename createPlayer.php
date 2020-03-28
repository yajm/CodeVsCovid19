  <?php

  $name = "Jonny";
  $room = "BigRoom";
  $ch = curl_init();
  // set url 
  curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/CoronaJass");
  curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=create_player&p_name=".$name);
  // $output contains the output json
  $output = curl_exec($ch);

  curl_setopt($ch, CURLOPT_URL, "http://studentethz.ch/api/?action=join_game&room_name=".$room);
  $game_joint = curl_exec($ch);
  // close curl resource to free up system resources 
  curl_close($ch);
  ?>