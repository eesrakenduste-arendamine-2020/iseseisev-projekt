<?php	
	function lisakysimus($kysimus, $vastus1, $vastus2, $vastus3, $vastus4, $vastus, $kategooria_in, $hind){
		$notice = null;
		$kat_hind = $kategooria_in.$hind;
		$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		$stmt = $conn->prepare("INSERT INTO kuldvillak (kusimus, vastus1, vastus2, vastus3, vastus4, vastus, kategooria, hind, kat_hind, kuld ) values  (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
		echo $conn->error;
		$stmt->bind_param("sssssssss", $kysimus, $vastus1, $vastus2, $vastus3, $vastus4, $vastus, $kategooria_in, $hind, $kat_hind);
		if($stmt -> execute()){
            $notice = "Küsimus on salvestatud!";
   		} else {
            $notice = "Salvestamisel tekkis tehniline tõrge: " .$stmt -> error;
		}
		$stmt->close();
		$conn->close();
		return $notice;
	}
?>
