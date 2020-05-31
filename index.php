<?php
require_once("sign.class.php");
require_once("config.php");

$doc = new signDoc;

if(isset($_POST['signMyself']) || isset($_POST['sendForSigning'])) {
    if($doc->checkInput($_POST)) {
        if($doc->createDocument()) {
            $doc->createSigning();
            if(isset($_POST['signMyself'])) {
                $doc->signMyself();
            } else {
                $doc->sendForSigning();
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Allkirjastamine</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="css/all.min.css" rel="stylesheet">
    <script src="js/main.js" defer></script>
    <script src="js/mobileLangSwitcher.js" defer></script>
</head>
<body>
    <div class="grid-3-2" style="margin-top: 30px;">
        <div class="front-header-image">
            <div class="front-header-image-text">
                <h1>INTERAKTIIVNE LEPINGU ALLKIRJASTAMINE</h1>
            </div>
        </div>
        <div class="front-slider">
            <img name="slider" alt="Slider">
            <div class="slider-full-screen" id="slider-full-screen">
                <img src="images/full_screen.svg" alt="Fullscreen">
            </div>
            <div class="slider-nav" id="slider-nav"></div>
        </div>
        
        <div class="front-icons grid-3" id="front-icons">
            <div class="front-product-shortcut active" id="contract1">
                <h3>LEPING 1</h3>
                <i class="fas fa-file-signature"></i>
                <p class="front-icons-text">Allkirjasta leping</p>
            </div>
            <div class="front-product-shortcut" id="contract2">
                <h3>LEPING 2</h3>
                <i class="fas fa-file-signature"></i>
                <p class="front-icons-text">Allkirjasta leping</p>
            </div>
            <div class="front-product-shortcut" id="contract3">
                <h3>LEPING 3</h3>
                <i class="fas fa-file-signature"></i>
                <p class="front-icons-text">Allkirjasta leping</p>
            </div>
        </div>
        <div class="front-header-sub-text">
            <div class="front-text">
                <p>Oliver Kobing</p>
                <a href="https://github.com/oliko888/iseseisev-projekt" target="_blank"><p>GIT REPO</p></a>
                <p>Interaktiivne lepingu allkirjastamine.</p>
                <p>Näidisena on toodud 3 erinevat lepingu põhja.</p>
                <p>Võimalik allkirjastada dokumente ise, või saata need volitatud isiku(te)le</p>
            </div>

        </div>
    </div>
    <!-- Front page mobile footer menu -->
    <div class="mobile-menu-wrap">
        <div class="front-mobile-footer">
            <div class="mobile-lang-switcher">
                <img src="images/est.jpg" id="mobile-lang-switcher" alt="Estonian">
                <div class="mobile-lang-dropdown" id="mobile-lang-dropdown" style="display: none;">
                    <img src="images/rus.png" alt="Russian">
                    <img src="images/lat.png" alt="Latvian">
                    <img src="images/eng.png" alt="English">
                </div>
            </div>

            <!-- Mobile menu toggler -->
            <div id="mobile-menu-toggler" style="display: block;">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <!-- Mobile menu -->
            <div id="mobile-menu" style="display: none;">
            </div>
        </div>
    </div>

<?php $doc->printContract();?>

    <div class="contract" id="contract">
        <strong>1. ÜLDSÄTTED</strong>
            <p>&nbsp;</p>
            <p>1.1 Lepingu eesm&auml;rgiks on kokku leppida &Uuml;hingu ja Juhatuse liikme vastastikused &otilde;igused, kohustused ja muud Juhatuse liikme kohustuste t&auml;itmisest tulenevad tingimused, sealhulgas Juhatuse liikme peamised tegevusvaldkonnad, tasu ja muud soodustused, kohustused konfidentsiaalse informatsiooni hoidmisel ja konkurentsikeeld, Poolte vastutus Lepingu rikkumise eest ning Lepingu l&otilde;ppemise alused ja tingimused.</p>
            <p><u>&nbsp;</u></p>
            <p>1.2 Juhatuse liige kinnitab, et:</p>
            <p>(a) tema suhtes ei ole kohus vastavalt karistusseadustiku &sect;-dele 49 v&otilde;i 49&sup1; kohaldanud juhatuse liikmena tegutsemise keeldu v&otilde;i ettev&otilde;tluskeeldu;</p>
            <p>(b)&nbsp; tal pole keelatud tegutseda samal tegevusalal, millel tegutseb &Uuml;hing;</p>
            <p>(c)&nbsp; tal ei ole keelatud olla juhatuse liige seaduse v&otilde;i kohtulahendi alusel;</p>
            <p>(d)&nbsp; tal ei lasu mingeid kohustusi kolmandate isikute ees, mis v&otilde;iksid olla vastuolus tema k&auml;esolevast Lepingust tulenevate kohustustega v&otilde;i takistada tal muul viisil oma k&auml;esolevast Lepingust tulenevaid kohustusi t&auml;itmast.</p>
            <p>1.3 &Uuml;hing kinnitab, et Lepingu s&otilde;lmimine ja selle tingimused on kinnitatud osanike <em>[kuup&auml;ev]</em> otsusega.</p>
            <p>&nbsp;</p>
        <ol start="3">
            <li><strong>TEENUSE HIND JA TASUMINE</strong>
                <ol>
                    <li>Teenuse puhul kehtib kuumaks igale kasutajakontole/litsentsile. Teenuse kasutamise kuutasu s&otilde;ltuvalt tellitud litsentside arvust ning lisateenustest on toodud Lepingu Lisas 1 - Teenuse hinnakiri.</li>
                    <li>Teenuse eest tasumine toimub ettemaksuna jooksva kalendriaasta eest.</li>
                    <li>Kui kalendriaasta keskel lisandub litsentside tellimusi, tasutakse nende eest tellimuse kinnitamisel aasta l&otilde;puni j&auml;&auml;nud kuude eest.</li>
                    <li>Meil on &otilde;igus muuta Teenuse hinnakirja, informeerides Klienti sellest ette v&auml;hemalt 30 p&auml;eva.</li>
                    <li>Teenuse kasutamise eest tasumine toimub poolt esitatud arve alusel, mille makset&auml;htaeg on v&auml;hemalt</li> 
                    <li>Kui Klient ei ole tasunud arvet t&auml;htajaks, on  &otilde;igus Teenuse osutamine ajutiselt peatada kuni arve tasumiseni.</li>
                </ol>
            </li>
        </ol>
        <p>&nbsp;</p>
        <ol start="4">
            <li><strong>LEPINGU KEHTIVUS, MUUTMINE JA L&Otilde;PETAMINE</strong>
                <ol>
                    <li>Leping j&otilde;ustub Lepingu allakirjutamisest ning l&otilde;ppeb kirjaliku Lepingu l&otilde;petamisega.</li>
                    <li>Kliendil on &otilde;igus Leping l&otilde;petada, kui ta teatab sellest kirjalikult 30 kalendrip&auml;eva ette.</li>
                    <li> on &otilde;igus Leping l&otilde;petada, kui ta teatab sellest kirjalikult 30 kalendrip&auml;eva ette v&otilde;i vastavalt Lepingu punktile 2.11.</li>
                    <li>M&otilde;lemal Poolel on &otilde;igus Leping l&otilde;petada, kui teine Pool rikub oluliselt Lepingut ja ei ole rikkumist k&otilde;rvaldanud 14 p&auml;eva jooksul teise poole kirjalikust teatest.</li>
                    <li>Pooled ei vastuta kokkulepitud kohustuste t&auml;itmata j&auml;tmise ega mitten&otilde;uetekohase t&auml;itmise eest v&auml;&auml;ramatu j&otilde;u esinemise korral, s.t tingimuste t&otilde;ttu, mis on poolte m&otilde;istliku kontrolli alt v&auml;ljas. Kui v&auml;&auml;ramatust j&otilde;ust tingitud takistus kestab enam kui 60 kalendrip&auml;eva, on pooltel &otilde;igus leping t&auml;hitud teate alusel l&otilde;petada.</li>
                </ol>
            </li>
        </ol>
        <p>&nbsp;</p>
        <ol start="5">
            <li><strong>MUUD TINGIMUSED</strong>
                <ol>
                    <li>K&otilde;ik Lepingust v&otilde;i sellega seoses tekkida v&otilde;ivad vaidlused lahendavad Pooled l&auml;bir&auml;&auml;kimiste teel. Kui vaidluse lahendamine l&auml;bir&auml;&auml;kimiste teel ei &otilde;nnestu, lahendatakse vaidlus kohtus Eesti Vabariigi seadustega s&auml;testatud korras.</li>
                    <li>Lepinguga reguleerimata k&uuml;simustes kuuluvad kohaldamisele Eesti Vabariigi &otilde;igusaktide s&auml;tted.</li>
                    <li>Leping on koostatud kahes v&otilde;rdv&auml;&auml;rses eksemplaris, milledest kumbki Pool saab &uuml;he eksemplari.</li>
                </ol>
            </li>
        </ol>
    </div>

<?php $doc->printContractEnd();?>
<!-- Slider Modal -->
    <div class="overlay" id="overlay">
        <div class="slider-modal" id="slider-modal"></div>
    </div>
</body>
</html>
