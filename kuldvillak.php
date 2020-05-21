
<?php
require("../../config_eesrakendused.php");
require("function_lisa.php");
$toScript = "\t" .'<link rel="stylesheet" type="text/css" href="style.css">' ."\n";
$toScript .= "\t" .'<script type="text/javascript" src="kuldvillak.js" defer></script>' ."\n";
require("header.php");
?>
<body onload="tyhjenda_local()">

<div id="vastused">


</div>

</div>
    <div id="kuldvillak-grid" class="kuldvillak-grid">
      
            <div class="kuldvillak-pealkiri">Jalgsi</div>
            <div class="kuldvillak-pealkiri">Jalgratas</div>
            <div class="kuldvillak-pealkiri">Auto</div>
            <div class="kuldvillak-pealkiri">Rong</div>
            <div class="kuldvillak-pealkiri">Laev</div>
            <div class="kuldvillak-pealkiri">Lennuk</div>
            
            <button id="110" class="kysimus" name="110" value="110" onclick="naita_kysimust(this.value)">10</button>
            <button id="210" class="kysimus" name="612" value="210" onclick="naita_kysimust(this.value)">10</button>
            <button id="310" class="kysimus" name="610" value="310" onclick="naita_kysimust(this.value)">10</button>
            <button id="410" class="kysimus" name="610" value="410" onclick="naita_kysimust(this.value)">10</button>
            <button id="510" class="kysimus" name="610" value="510" onclick="naita_kysimust(this.value)">10</button>
            <button id="610" class="kysimus" name="610" value="610" onclick="naita_kysimust(this.value)">10</button>

            <button id="120" class="kysimus" name="610" value="120" onclick="naita_kysimust(this.value)">20</button>
            <button id="220" class="kysimus" name="610" value="220" onclick="naita_kysimust(this.value)">20</button>
            <button id="320" class="kysimus" name="610" value="320" onclick="naita_kysimust(this.value)">20</button>
            <button id="420" class="kysimus" name="610" value="420" onclick="naita_kysimust(this.value)">20</button>
            <button id="520" class="kysimus" name="610" value="520" onclick="naita_kysimust(this.value)">20</button>
            <button id="620" class="kysimus" name="610" value="620" onclick="naita_kysimust(this.value)">20</button>
            
            <button id="130" class="kysimus" name="610" value="130" onclick="naita_kysimust(this.value)">30</button>
            <button id="230" class="kysimus" name="610" value="230" onclick="naita_kysimust(this.value)">30</button>
            <button id="330" class="kysimus" name="610" value="330" onclick="naita_kysimust(this.value)">30</button>
            <button id="430" class="kysimus" name="610" value="430" onclick="naita_kysimust(this.value)">30</button>
            <button id="530" class="kysimus" name="610" value="530" onclick="naita_kysimust(this.value)">30</button>
            <button id="630" class="kysimus" name="610" value="630" onclick="naita_kysimust(this.value)">30</button>

            <button id="140" class="kysimus" name="610" value="140" onclick="naita_kysimust(this.value)">40</button>
            <button id="240" class="kysimus" name="610" value="240" onclick="naita_kysimust(this.value)">40</button>
            <button id="340" class="kysimus" name="610" value="340" onclick="naita_kysimust(this.value)">40</button>
            <button id="440" class="kysimus" name="610" value="440" onclick="naita_kysimust(this.value)">40</button>
            <button id="540" class="kysimus" name="610" value="540" onclick="naita_kysimust(this.value)">40</button>
            <button id="640" class="kysimus" name="610" value="640" onclick="naita_kysimust(this.value)">40</button>
           
            <button id="150" class="kysimus" name="610" value="150" onclick="naita_kysimust(this.value)">50</button>
            <button id="250" class="kysimus" name="610" value="250" onclick="naita_kysimust(this.value)">50</button>
            <button id="350" class="kysimus" name="610" value="350" onclick="naita_kysimust(this.value)">50</button>
            <button id="450" class="kysimus" name="610" value="450" onclick="naita_kysimust(this.value)">50</button>
            <button id="550" class="kysimus" name="610" value="550" onclick="naita_kysimust(this.value)">50</button>
            <button id="650" class="kysimus" name="610" value="650" onclick="naita_kysimust(this.value)">50</button>  

            
            </div>
            <div id=jooksev_tulemus class="peida_div">
            </div>
            

</body>
</html>
