var kaardid = [];
var mangijaKaardid = [];
var diileriKaardid = [];
var minuDollarid=50;
var loppMang=false; 
var loeKaarte = 0;
var mastid = ["spades","hearts","clubs","diams"];
var numbrid= ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var message = document.getElementById("message");
var output = document.getElementById("output");
var diilerHoidla = document.getElementById("diilerHoidla");
var mangijaHoidla = document.getElementById("mangijaHoidla");
var mVaartus = document.getElementById("mVaartus");
var dVaartus = document.getElementById("dVaartus");
var dollariVaartus = document.getElementById("dollars");


for (i in mastid){ 
    var mast = mastid[i][0].toUpperCase();
    var kaardivarv = (mast == "S" || mast == "C") ? "black" : "red";
    for (n in numbrid){
        
        var kaardivaartus = (n>9) ? 10 : parseInt(n)+1 
        var kaart={
            mast:mast,
            ikoon:mastid[i],
            kaardivarv:kaardivarv,
            kaardinum:numbrid[n],
            kaardivaartus:kaardivaartus
        }
        kaardid.push(kaart);
    }
}

function Start(){
    segaPakk(kaardid);
    jagaUus();
    document.getElementById('start').style.display='none'; 
    document.getElementById('dollars').innerHTML = minuDollarid; 
}

function jagaUus(){ 
    mangijaKaardid = [];
    diileriKaardid = [];
    diilerHoidla.innerHTML = ""; 
    mangijaHoidla.innerHTML = "";
    var panuseSuurus=document.getElementById('minupanus').value; 
    minuDollarid=minuDollarid-panuseSuurus;
    document.getElementById('dollars').innerHTML = minuDollarid;
    document.getElementById('minutegevus').style.display='block';
    message.innerHTML = "Saa 21 või sellele lähedale,et võita diiler!<br>Hetkene panus on $"+panuseSuurus;
    document.getElementById('minupanus').disabled=true;
    document.getElementById('maxpanus').disabled = true;
    jaga();
  
}

function jaga(){
    console.log(kaardid);
    for(x=0;x<2;x++){ 
        diileriKaardid.push(kaardid[loeKaarte]);
        diilerHoidla.innerHTML += kaardiValjund(loeKaarte,x);
        loeKaarte++
        if(x==0){ 
            diilerHoidla.innerHTML += '<div id="kaardi-kate" style="left:100px;"></div>';
        }
        mangijaKaardid.push(kaardid[loeKaarte]);
        mangijaHoidla.innerHTML += kaardiValjund(loeKaarte,x);
        loeKaarte++;
        
    }
    
    mVaartus.innerHTML =checktotal(mangijaKaardid);
    console.log(diileriKaardid);
    console.log(mangijaKaardid);
}

function kaardiValjund(n,x){
    var hpos = (x>0) ? x*60+100 : 100;
    return '<div class="mangkaart '+kaardid[n].ikoon+'" style="left:'+hpos+'px"> <div class="kaardi-ula mast">'+kaardid[n].kaardinum+'<br></div><div class="kaardi-kesk mast"></div><div class="kaardi-all mast">'+kaardid[n].kaardinum+'<br></div></div>';
}

function maxpanus(){
    document.getElementById('minupanus').value = minuDollarid;
    message.innerHTML = "Panus muudetud $"+minuDollarid;

}

function minuKaik(k){
    console.log(k);
    switch (k) { 
        case 'hit':
            mangiukaart(); 
            break;
        case 'hold':
            mangulopp(); 
            break;
        case 'double':
            var panuseSuurus= parseInt(document.getElementById('minupanus').value);
            if((minuDollarid-panuseSuurus)<0){
                panuseSuurus=panuseSuurus+minuDollarid;
                minuDollarid=0
            } else{
                minuDollarid=minuDollarid-panuseSuurus;
                panuseSuurus=panuseSuurus*2;
            }
            document.getElementById('dollars').innerHTML=minuDollarid;
            document.getElementById('minupanus').value=panuseSuurus;
            mangiukaart();
            mangulopp();
            break;
        default:
            console.log('done');
            mangulopp();

    }
}

function mangiukaart(){ 
    mangijaKaardid.push(kaardid[loeKaarte]); 
    mangijaHoidla.innerHTML += kaardiValjund(loeKaarte,(mangijaKaardid.length-1));
    loeKaarte++
    var rValue = checktotal(mangijaKaardid);
    mVaartus.innerHTML = rValue;
    if(rValue>21){
        message.innerHTML="LÄKSID LÕHKI!HAHA!";
        mangulopp();
    }
}
function mangulopp(){
    loppMang=true; 
    document.getElementById('kaardi-kate').style.display='none';
    document.getElementById('minutegevus').style.display='none';
    document.getElementById('btndeal').style.display='block';
    document.getElementById('minupanus').disabled= false;
    document.getElementById('maxpanus').disabled = false;
    message.innerHTML ="Mäng on läbi!<br>";
    var voitjatasuBlackjack=1;
    var diilerikasi= checktotal(diileriKaardid);
    dVaartus.innerHTML = diilerikasi;
    while(diilerikasi<17){ 
        diileriKaardid.push(kaardid[loeKaarte]); 
        diilerHoidla.innerHTML += kaardiValjund(loeKaarte,(mangijaKaardid.length-1));
        loeKaarte++;
        diilerikasi= checktotal(diileriKaardid);
        dVaartus.innerHTML = diilerikasi;
    }
    
    var mangijakasi= checktotal(mangijaKaardid);
    if(mangijakasi ==21 &&mangijaKaardid.length == 2){
        message.innerHTML ="Mangija sai BlackJacki"
        voitjatasuBlackjack = 1.5; 
    }
    var panus= parseInt(document.getElementById('minupanus').value)*voitjatasuBlackjack; 
   
    if((mangijakasi<22 && diilerikasi<mangijakasi) || (diilerikasi>21 && mangijakasi<22)){
        
        message.innerHTML += '<span style="color:green;">Sa võitsid! Sa võitsid $'+panus+'</span>';
        minuDollarid=minuDollarid+(panus*2);
        
    }
    else if(mangijakasi > 21){
        message.innerHTML += '<span style="color:red;">Diile võitis!Sa kaotasid $'+panus+'</span>';
    }
    else if (mangijakasi==diilerikasi){
        message.innerHTML += '<span style="color:blue;">Viik!</span>';
        minuDollarid=minuDollarid+panus;

    }
    else {
        message.innerHTML += '<span style="color:red;">Diile võitis!Sa kaotasid $'+panus+'</span>';

    }
    mVaartus.innerHTML = diilerikasi;
    dollariVaartus.innerHTML =minuDollarid;
}

function checktotal(arr){
    var rValue=0; 
    var assaSeade=false;
    for(var i in arr ){
        if(arr[i].kaardinum=='A' && !assaSeade){ 
            assaSeade=true;
            rValue=rValue+10;
        }
        rValue=rValue+arr[i].kaardivaartus
    }
    if(assaSeade && rValue>21){
        rValue=rValue-10;
    }
    return rValue;
}

function segaPakk(array){
    for(var i = array.length -1; i>0;i--){ 
        var o = Math.floor(Math.random() * (i+1));
        var ajutine = array [i];
        array[i] = array[o];
        array[o] = ajutine;
    }
    return array;
}

function valjastaKaart(){
    output.innerHTML += "<span style='color:"+kaardid[loeKaarte].kaardivarv+"'>"+kaardid[loeKaarte].kaardinum + "&"
    +kaardid[loeKaarte].ikoon+";</span> ";
}