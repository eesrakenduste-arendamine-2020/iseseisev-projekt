let mastid=["spades","hearts","clubs","diams"];
let vaartus=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
let kaardiPakk=[];
let kaardiVarv = "";
let punktid = 0;
let kaardiLoendur = 0;
let txt = "";
let voit = 0;
let panus = 0;
var diileriKasi = document.getElementById("diileriKasi");
var mangijaKasi = document.getElementById("mangijaKasi");
var mangijaSkoor = document.getElementById("mangijaSkoor");
var diileriSkoor = document.getElementById("diileriSkoor");
let mangija={
    kaardid:[],
    punktid:0,
    kujutis: mangijaKasi,
    displeiSkoor: mangijaSkoor
};
let diiler={
    kaardid:[],
    punktid:0,
    kujutis: diileriKasi,
    displeiSkoor: diileriSkoor
};


for (i = 0; i < mastid.length; i++){
    if (mastid[i] == "spades"|| mastid[i] == "clubs"){
        kaardiVarv = "black";
    } else {
        kaardiVarv = "red";
    }
    for (j = 0; j < vaartus.length; j++){
        if (isNaN(vaartus[j])){
            if (vaartus[j] != "A"){
                punktid = 10;
            } else {
                punktid = 11;
            }
            
        } else {
            punktid = parseInt(vaartus[j]);
        }
        var kaart={
            mast:mastid[i],
            kaardivarv:kaardiVarv,
            vaartus:vaartus[j],
            punktid:punktid     
        };
        kaardiPakk.push(kaart);
    }
}
function Start(){
    mangija.kaardid = [];
    diiler.kaardid = [];
    mangija.punktid = 0;
    diiler.punktid = 0;
    voit = 0;
    mangija.kujutis.innerHTML = "";
    diiler.kujutis.innerHTML = "";
    txt = "";
    segaPakk(kaardiPakk);
   panus = prompt("Mängu alustamiseks sisesta panus:");
   if (!panus){
       location.reload()
   } else {
    uusMang();
    }
}

function valjastaKaart(kaardiLoendur){
    return "<span style='color:"+kaardiPakk[kaardiLoendur].kaardivarv+"'>"+kaardiPakk[kaardiLoendur].vaartus + "&"
    +kaardiPakk[kaardiLoendur].mast+";</span> ";

}

function segaPakk(array){
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array;
}

function uusMang(){
    for (var i=0; i<2; i++){
        uusKaart(mangija);
        uusKaart(diiler);
    }
    sai21();
    laksLohki();

}

function uusKaart(obj){
    obj.kujutis.innerHTML += valjastaKaart(kaardiLoendur);
   obj.kaardid.push(kaardiPakk[kaardiLoendur]);
   if (kaardiPakk[kaardiLoendur].vaartus == "A" && obj.kaardid.length>2){
       assaPunktid(obj, kaardiLoendur);
   }
   obj.punktid += kaardiPakk[kaardiLoendur].punktid;
   obj.displeiSkoor.innerHTML = obj.punktid;
   kaardiLoendur++;

}

function Hold(){
    lahemal21le();
    sai21();
    if (txt==""){
        diileriKaik();
    }
}

function Hit(){
    uusKaart(mangija);
    sai21();
    laksLohki();
    if(txt==""){
        diileriKaik();
    }
}

function diileriKaik(){
    if (diiler.punktid < 17){
        uusKaart(diiler);
    } else {
        setTimeout(function () {
            alert("Diileril on 17 punkti või rohkem. Sinu käik.");
        }, 400); 
    }
    sai21();
    laksLohki();
}

function assaPunktid(obj, kaardiLoendur){
    if (obj == mangija){
        var tulemus = confirm("Said Ässa. Kas arvestad selle väärtuseks 11?");
        if(tulemus == true){
            kaardiPakk[kaardiLoendur].punktid = 11;
        }else {
            kaardiPakk[kaardiLoendur].punktid = 1;
        }
    } else {
        if (obj.punktid + 11 > 21){
            kaardiPakk[kaardiLoendur].punktid = 1; 
        } else if (15 < obj.punktid + 11 < 17){            
            kaardiPakk[kaardiLoendur].punktid = 1; 
        } 
        
    }
}

function sai21(){
    if (mangija.punktid == 21 && diiler.punktid!= 21){
        if (mangija.kaardid.length == 2){
            voit = 2.5 * panus;
            txt = "BLACKJACK!"
        } else {
            voit = 2*panus;
            txt = "Said 21 punkti ja oled võtja!";  
        }
        manguLopp(txt);
    } else if (diiler.punktid == 21 && mangija.punktid != 21){
        txt = "Diiler sai 21 punkti ja võitis!";
        voit = -1 * panus;
        manguLopp(txt);
    } else if (diiler.punktid == 21 && mangija.punktid == 21){
        txt = "Viik!";  
        manguLopp(txt);
    }
}

function laksLohki(){
    if (mangija.punktid > 21){
        voit = -1 * panus
        txt = "Läksid lõhki ja kaotasid!";
        manguLopp(txt);
    } else if (diiler.punktid > 21){
        voit = 2 * panus;
        txt = "Diiler läks lõhki ja sina võtisid!";
        manguLopp(txt);
    }
}

function lahemal21le(){
    if (diiler.punktid >= 17 && diiler.punktid < 21 && mangija.punktid < 21) {
        if (diiler.punktid < mangija.punktid){
            txt = "Sinu skoor on lähemal 21-le ning sa võitsid!";
            voit = 2 * panus;
            manguLopp(txt);
        } else if (mangija.punktid < diiler.punktid){
            txt = "Diileri skoor on lähemal 21-le ning ta võitis!";
            voit = -1 * panus;
            manguLopp(txt);
        } else if (mangija.punktid == diiler.punktid){
            txt = "Viik!";
            manguLopp(txt);
        }
    }
   
}

function manguLopp(txt){
    setTimeout(function(){ alert(txt + " Sinu tulemuseks oli " + voit + " eurot."); }, 300);
    setTimeout(function(){ Start(); }, 600);
}

