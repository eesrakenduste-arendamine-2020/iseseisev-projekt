<?php
$q=intval($_GET["q"]);
	require("../../config_eesrakendused.php");
	//$kysimusHMTL ="";
			$notice=0;
			$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
			$stmt = $conn->prepare('SELECT kusimus, vastus1, vastus2, vastus3, vastus4, vastus, hind, kuld, kat_hind  FROM kuldvillak where kat_hind=? ORDER BY RAND() LIMIT 1');
					echo $conn->error;
					$stmt->bind_param("s", $q);
	
			$stmt->bind_result($kysimusfromDB, $vastus1fromDB, $vastus2fromDB, $vastus3fromDB, $vastus4fromDB, $vastusfromDB, $hindfromDB, $kuldfromDB, $kat_hind);
					$stmt->execute();
					$stmt->fetch();
	
                    //echo($vastusfromDB);
                    //echo($kysimusfromDB);
                    $kysimusHTML = 
                    '<div id="timeruss">'
                    .'<div id="myProgress">'
                    .'</div>'
                    .'</div>'
                    .'<div id="vastamise_aken" class="vastamise_aken">'
                    .'<div class="kysimus_vastamiseks_kysimus">'
                    .$kysimusfromDB
                    ."</div>"
                    .'<div class="kysimus_vastamiseks_vastus">'
                    .'<div id="vastus1">'
                    .'<input type="button" onclick="loemepunkte(this.value)" id="vastus1" value="' .$vastus1fromDB
                    .'"></button>'
                    ."</div>"
                    .'<div id="vastus2">'
                    .'<input type="button" onclick="loemepunkte(this.value)" id="vastus1" value="' .$vastus2fromDB
                    .'"></button>'
                    ."</div>"
                    .'<div id="vastus3">'
                    .'<input type="button" onclick="loemepunkte(this.value)" id="vastus1" value="' .$vastus3fromDB
                    .'"></button>'
                    ."</div>"
                    .'<div id="vastus4">'
                    .'<input type="button" onclick="loemepunkte(this.value)" id="vastus1" value="'  .$vastus4fromDB
                    .'"></button>'
                    ."</div>"
                    ."</div>"
                    .'<div class="peida_div">'
                    .'<div id="oigevastus"'
                    ."<br>" .$vastusfromDB
                    ."</div>"
                    .'<div id="raha">'
                    .$hindfromDB
                    ."</div>"
                    ."</div>"
                    //."<button "
                    //.'click="move()";'
                    //."</button>"
                    //.'<script type="text/javascript">move();</script>'
                    ;
			$stmt->close();
			$conn->close();
            echo $kysimusHTML;
            
	?>
