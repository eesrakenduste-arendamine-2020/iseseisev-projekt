<?php
  require("../../config_eesrakendused.php");
  require("functions_main.php");
  require("function_lisa.php");
  $toScript = "\t" .'<link rel="stylesheet" type="text/css" href="kuldvillak.css">' ."\n";
  //$toScript .= "\t" .'<script type="text/javascript" src="kuldvillak.js" defer></script>' ."\n";
  require("header.php");
  $kategooria = ["Jalgsi", "Jalgratas",  "Auto",  "Rong", "Laev", "Lennuk"];
  $error="";
  $notice = null;
  if(isset($_POST["lisakysimus"])){
      if(strlen($_POST["kysimus"]) == 0){
        $error .= "Pealkiri on puudu!";
      }
      if(strlen($_POST["vastus1"]) == 0){
        $error .= "vastus 1 on puudu! ";
      }
      if(strlen($_POST["vastus2"]) == 0){
        $error .= "vastus 2 on puudu! ";
      }
      if(strlen($_POST["vastus3"]) == 0){
        $error .= "vastus 3 on puudu! ";
      }
      if(strlen($_POST["vastus4"]) == 0){
        $error .= "vastus 4 on puudu! ";
      }         
    $kysimus = test_input($_POST["kysimus"]);
    $kategooria_in = $_POST["kategooria"]+1;
    $vastus1 = test_input($_POST["vastus1"]);
    $vastus2 = test_input($_POST["vastus2"]);
    $vastus3 = test_input($_POST["vastus3"]);
    $vastus4 = test_input($_POST["vastus4"]);
    $vastus = test_input($_POST["kusimus"]);
      if($vastus == "1"){
        $vastus=$vastus1; 
      }
      elseif($vastus == "2"){
        $vastus=$vastus2; 
      }
      elseif($vastus == "3"){
        $vastus=$vastus3;
      }
      elseif($vastus == "4"){
        $vastus=$vastus4; 
      }
      $hind = test_input($_POST["hind"]);
      if($error == ""){             
        $result = lisakysimus($kysimus, $vastus1, $vastus2, $vastus3, $vastus4, $vastus, $kategooria_in, $hind);
          if($result == 1){
            $notice = "Küsimus salvestatud";
            $error = "";
            $kysimus ="";
            $vastus1 ="";
            $vastus2 ="";
            $vastus3 ="";
            $vastus4 ="";            
        }
      }
  }
  ?> 
<body>
<div class="kysimused">
<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<div>
	<label>Küsimus</label><br>
	  <textarea rows="2" cols="51" name="kysimus" id="kysimus" placeholder="Lisa küsimus ..."></textarea>
  <br>
  </div>
  <div>
	<label>Õige vastus?</label><input type="radio"   name="kusimus" value="1" checked><br>
  <textarea rows="2" cols="51" name="vastus1" id="vastus1" placeholder="Lisa vastus ..."></textarea>
  <br>
  </div>
  <div>
	<label>Õige vastus?</label><input type="radio"  name="kusimus" value="2"><br>
	  <textarea rows="2" cols="51" name="vastus2" id="vastus2" placeholder="Lisa vastus ..."></textarea>
  <br>
  </div><div> 
	<label>Õige vastus?</label><input type="radio"  name="kusimus" value="3"><br>
	  <textarea rows="2" cols="51" name="vastus3" id="vastus3" placeholder="Lisa vastus ..."></textarea>
  <br>
  </div>
  <div>
	<label>Õige vastus?</label><input type="radio"  name="kusimus" value="4"><br>
	  <textarea rows="2" cols="51" name="vastus4" id="vastus4" placeholder="Lisa vastus ..."></textarea>
  <br>
  </div>
<div>
<br>
  <label>Kategooria: </label>
  <?php
  echo '<select name="kategooria">' ."\n";
  for ($i = 0; $i < 6; $i ++){
    
    echo '<option value="' .$i .'"';
    if ($i == "0"){
      echo " selected ";
    }
    echo ">" .$kategooria[$i] ."</option> \n";
  }
  echo "</select> \n";
?>
<br>
<br>
</div>
<div>
<label>Hind</label>
<select id="hind" name="hind">
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
  <option value="50">50</option>
</select>
<div>
<br>
<input name="lisakysimus" type="submit" class="kysimused" value="Lisa küsimus"><span><?php echo $notice; ?></span>
</div>
</form>
</div>
</body>
</html>

