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
    <title>Deskis</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/main.css">
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
            <div><img src="assets/images/Deskis_logo.png" alt="Logo" width="100"></div>
            <div class="mobile-lang-switcher">
                <img src="assets/images/est.jpg" id="mobile-lang-switcher" alt="Estonian">
                <div class="mobile-lang-dropdown" id="mobile-lang-dropdown" style="display: none;">
                    <img src="assets/images/rus.png" alt="Russian">
                    <img src="assets/images/lat.png" alt="Latvian">
                    <a href="/en"><img src="assets/images/eng.png" alt="English"></a>
                </div>
            </div>
            <div class="new">
                <a href="/uudised/sundmused.php">
                    <div class="svg-wrap">
                        <svg  style="width: 27px; transform: translate(-2px, -3px);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.97 68.9"><title>Deskis_events</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M52.52,9.34v.75a7.22,7.22,0,0,1-14.44,0V9.34H22.89v.75a7.22,7.22,0,0,1-14.44,0V9.34H0V68.9H61V9.34ZM54.58,61.9H6.39V23.68H54.58Z"/><path d="M15.67,0a5.1,5.1,0,0,0-5.1,5.1v5a5.1,5.1,0,1,0,10.19,0v-5A5.09,5.09,0,0,0,15.67,0Z"/><path d="M45.3,0a5.09,5.09,0,0,0-5.09,5.1v5a5.1,5.1,0,1,0,10.19,0v-5A5.1,5.1,0,0,0,45.3,0Z"/><rect x="10.45" y="38.97" width="7.17" height="7.17"/><rect x="10.49" y="49.81" width="7.17" height="7.17"/><rect x="21.43" y="49.81" width="7.17" height="7.17"/><rect x="32.38" y="49.81" width="7.17" height="7.17"/><rect x="10.36" y="28.12" width="7.17" height="7.17"/><rect x="21.31" y="38.96" width="7.17" height="7.17"/><rect x="32.26" y="38.96" width="7.17" height="7.17"/><rect x="43.2" y="38.96" width="7.17" height="7.17"/><rect x="21.21" y="28.11" width="7.17" height="7.17"/><rect x="32.16" y="28.11" width="7.17" height="7.17"/><rect x="43.11" y="28.11" width="7.17" height="7.17"/></g></g></svg>
                    </div>
                </a>
            </div>
            <div class="new">
                <a href="/uudised/blogi.php">
                    <div class="svg-wrap">
                        <svg style="width: 38px; transform: translateX(1px);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.73 55.05"><title>Deskis_chatpot</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="61.2 39.68 61.2 55.05 45.37 39.23 61.2 39.68"/><rect x="25.24" y="13.45" width="47.49" height="29.85" rx="13.57"/><path d="M20.79,32.5c-.1-1.86-.06-4.7-.06-6.64V23A14.44,14.44,0,0,1,35.17,8.52H46.51A13.57,13.57,0,0,0,33.92,0H13.57A13.56,13.56,0,0,0,0,13.57v2.71a13.57,13.57,0,0,0,11.53,13.4V41.6Z"/></g></g></svg>
                    </div> 
                </a>
            </div>
            <div class="new">
                <a href="/uudised/uudised.php">
                    <div class="svg-wrap">
                        <svg style="transform: translate(-5px, -2px);; width: 36px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77.86 68.94"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>Deskis_news</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M74.76,31.13A25.34,25.34,0,0,0,76,28.53c.91-2.9-2.48-10.94-5.24-12.27a13.27,13.27,0,0,0-2.28-.61C69.76,18.54,71.81,23.35,74.76,31.13Z"/><path class="cls-1" d="M37.15,58.64c-.25-2.21-.3-4.45-.48-7.44,2.14-1,2.94-1.34,5.14-2.15C38.57,36.63,34.08,29.4,31.47,25.84c-6.91,3-12.34,5.19-19.27,8.1-6.39,2.68-8.35,7.28-5.79,13.58.76,1.87,1.5,3.74,2.29,5.6,1.45,3.43,6.34,5.82,10,5.46a6.46,6.46,0,0,1,4.53,1.62c2.38,2.26,4.22,5.09,6.52,7.44,2.05,2.09,6.88,1.57,9.46-.89s.26-4.09-1-5.93A5.25,5.25,0,0,1,37.15,58.64Z"/><path class="cls-1" d="M77.65,47c-1.35-4.09-3.34-8-4.71-12.07a1.93,1.93,0,0,1-.07-.43c-4.24-11.38-6.79-17-8-19.54a1,1,0,0,1-.11-.17l-.18-.39a12.66,12.66,0,0,0-.68-1.25l.1-.06C62.31,9.27,60.9,5.38,59.14,1.65A3.78,3.78,0,0,0,55.85,0c-.91.26-1.64,1.92-2,3.11-.51,1.55-.27,3.38-.93,4.83A29.2,29.2,0,0,1,38.07,23L35.94,24c2.75,3.81,7.36,11.17,10.57,23.41,7.51-2.55,13.89-3.15,22.35.14,1.4.55,2.55,1.69,3.92,2.36S76,52.11,77,51.46,78.07,48.26,77.65,47Z"/><path class="cls-1" d="M6.75,55.61S2.26,46.8,2.59,43.75c0,0-3.82,1.26-2.18,7.16S6.16,55.63,6.75,55.61Z"/></g></g></svg>
                    </div>
                </a>
            </div>
            <!-- Mobile menu toggler -->
            <div id="mobile-menu-toggler" style="display: block;">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <!-- Mobile menu -->
            <div id="mobile-menu" style="display: none;">
                <div class="mobile-menu-sections grid-3">
                    <h4>TOOTED</h4>
                    <p><a href="tooted/tarkvarad.php">Tarkvarad</a></p>
                    <p><a href="#">Valdkonnad</a></p>
                    <p><a href="/ettevote/meist.php">Miks Deskis</a></p>
                </div>
                <div class="mobile-menu-sections grid-3">
                    <h4>LISAINFO</h4>
                    <p><a href="/lisainfo/ettekanded.php">Ettekanded</a></p>
                    <p><a href="/lisainfo/juhised.php">Juhised</a></p>
                    <p><a href="/lisainfo/oppevideod.php">Õppevideod</a></p>
                </div>
                <div class="mobile-menu-sections grid-3">
                    <h4>UUDISED</h4>
                    <p><a href="/uudised/sundmused.php">Sündmused</a></p>
                    <p><a href="/uudised/blogi.php">Blogi</a></p>
                    <p><a href="/uudised/uudised.php">Uudised</a></p>
                </div>
                <div class="mobile-menu-sections grid-3">
                    <h4>ETTEVÕTE</h4>
                    <p><a href="/ettevote/meist.php">Meist</a></p>
                    <p><a href="/ettevote/karjaar.php">Karjäär</a></p>
                    <p><a href="/ettevote/kontakt.php">Kontakt</a></p>
                </div>
            </div>
        </div>
    </div>
    <!-- Slider Modal -->
    <div class="overlay" id="overlay">
        <div class="slider-modal" id="slider-modal"></div>
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
</body>
</html>
