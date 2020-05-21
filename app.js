var pepegas = 0;
var pepegaRate = 0;

var items = [
  {
    "name": "item_newbie",
    "price": "100"
  },
  {
    "name": "item_iwannabeamemer",
    "price": "250"
  },
  {
    "name": "item_clown",
    "price": "500"
  },
  {
    "name": "item_pay",
    "price": "800"
  },
  {
    "name": "item_senpai",
    "price": "1500"
  },
  {
    "name": "item_og",
    "price": "1500"
  },
  {
    "name": "item_belle",
    "price": "9999"
  }
  
];

var bSec = null;

if(localStorage.getItem("pepegas") === null){
  pepegas = 0;

  localStorage.setItem("pepegas", "0");

  $(".pepegaAmount").text(pepegas.toFixed(8))

}else{

  pepegas = parseFloat(localStorage.getItem("pepegas"));

  $(".pepegaAmount").text("loading...");
  $(".satoshiAmount").text("loading...");

  let satoshis = pepegas * 100000000;

}

var Game = {};

Game.GameConst = {
  "priceMultiplier": 1.5,
};

Game.units = [
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion",
      "Undecillion",
      "Duodecillion",
      "Tredecillion",
      "Quattuordecillion",
      "Quindecillion",
      "Sexdecillion",
      "Septdecillion",
      "Octodecillion",
      "Novemdecillion",
      "Vigintillion",
      "Unvigintillion",
      "Duovigintillion",
      "Trevigintillion",
      "Quattuorvigintillion",
      "Quinvigintillion",
      "Sexvigintillion",
      "Septvigintillion",
      "Octovigintillion",
      "Novemvigintillion",
      "Trigintillion"
];


Game.setPriceAtGameBeginning = function (element, price, itemAmount) {

  var multiplier = Game.GameConst.priceMultiplier;

  var calculation = (parseFloat(price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8);

  element.children()[2].textContent = calculation + " pepegas";

  element.attr("data-price", calculation.toString())

};

Game.itemAction = function (id) {

  var item = id;
  var itemAmount = 0;

  if(localStorage.getItem(item) === null){
    localStorage.setItem(item, "1");
  }else{
    itemAmount = parseInt(localStorage.getItem(item));

    localStorage.setItem(item, "" + (itemAmount + 1) + "");

  }

};


Game.setpepegaPerSecondRateAtBeginning = function () {

  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      var $element = $("#" + items[i].name);

      var itemAmount = localStorage.getItem(items[i].name);

      $element.children()[0].textContent = itemAmount;

      if(itemAmount > 0) {
        Game.setPriceAtGameBeginning($element, parseFloat(items[i].price), parseInt(itemAmount))
      }

      var bits_per_sec = $element.attr("data-bits-per-sec");
      itemAmount = parseInt(itemAmount);

      var before = pepegaRate;

      pepegaRate = pepegaRate + (itemAmount * bits_per_sec);

      console.log("i = " + i + " | B/sec before: " + before.toFixed(8) +
        " - Calculation made: " + before.toFixed(8) + " + (" + itemAmount + " * " + bits_per_sec + ") = " +  pepegaRate.toFixed(8) +
        " | New B/sec at " + pepegaRate.toFixed(8))
    }
  }

};


Game.setNewpepegaRate = function (rate) {

  console.log("setNewpepegaRate -> New rate: " + (pepegaRate + rate).toFixed(8) );

  if((pepegaRate + rate) >= 1000000) {
    $(".bSecRateNumber").text((pepegaRate + rate).toFixed(0).optimizeNumber())
  }else if((pepegaRate + rate) >= 1000 ){
    $(".bSecRateNumber").text((pepegaRate + rate).toFixed(0))
  }else if((pepegaRate + rate) >= 1 ){
    $(".bSecRateNumber").text((pepegaRate + rate).toFixed(2))
  }else{
    $(".bSecRateNumber").text((pepegaRate + rate).toFixed(8))
  }

  return pepegaRate = pepegaRate + rate;

};



Game.setNewPrice = function()
{
  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      var $element = $("#" + items[i].name);
      var itemAmount = localStorage.getItem(items[i].name);

      $element.children()[0].textContent = itemAmount;

      if(itemAmount > 0) {

        var multiplier = Game.GameConst.priceMultiplier;
        var calculation = (parseFloat(items[i].price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8);

        $element.children()[2].textContent = calculation + " pepegas";

        $element.attr("data-price", calculation.toString())

      }
    }
  }
};

Game.bSecFunction = function (rate) {

  pepegas = pepegas + rate;

  if(pepegas > 1000000){

    let pepegaUnitNumber = pepegas.optimizeNumber();

    $(".pepegaAmount").text(pepegaUnitNumber)
  }else if(pepegas >= 1000){
    $(".pepegaAmount").text(pepegas.toFixed(0))
  }else if(pepegas >= 1){
    $(".pepegaAmount").text(pepegas.toFixed(2))
  }else{
    $(".pepegaAmount").text(pepegas.toFixed(8))
  }


  var satoshis = pepegas * 100000000;

  if(satoshis < 1000000) {
    $(".satoshiAmount").text(Math.round(satoshis))
  }else{

    let satoshiUnitNumber = satoshis.optimizeNumber();
    $(".satoshiAmount").text(satoshiUnitNumber)
  }

  localStorage.setItem("pepegas", "" + pepegas + "");

  console.log("bSec -> B/sec at " + rate.toFixed(8))

};

Game.stopBsec = function () {
  clearInterval(bSec)
};

Game.optimizeNumber = function () {
  if(this >= 1e6){
    let number = parseFloat(this);
    let unit = Math.floor(parseFloat(number.toExponential(0).toString().replace("+", "").slice(2)) / 3) * 3;

    var num = (this / ('1e'+(unit))).toFixed(2);

    var unitname = Game.units[Math.floor(unit / 3) - 1];

    return num + " " + unitname
  }

  return this.toLocaleString()
};

Number.prototype.optimizeNumber = Game.optimizeNumber;
String.prototype.optimizeNumber = Game.optimizeNumber;

Game.resetGame = function () {
  Game.stopBsec();
  localStorage.setItem("pepegas", "0");
  localStorage.clear();
  location.reload()
};

Game.setpepegaPerSecondRateAtBeginning();

bSec = setInterval(function () {
  Game.bSecFunction(pepegaRate);
}, 1000);


$(document).ready(function () {

  $(".version").text("Version " + Game.GameConst.VERSION);

  if(pepegaRate >= 1000){
    $(".bSecRateNumber").text(pepegaRate.toFixed(0))
  }else if(pepegaRate >= 1 ){
    $(".bSecRateNumber").text(pepegaRate.toFixed(2))
  }else{
    $(".bSecRateNumber").text(pepegaRate.toFixed(8))
  }


  $(".pepega").click(function () {

    pepegas = pepegas + 1.00000000;

    if(pepegas > 1000000){

      let pepegaUnitNumber = pepegas.optimizeNumber();
      $(".pepegaAmount").text(pepegaUnitNumber)

    }else if(pepegas >= 1000){
      $(".pepegaAmount").text(pepegas.toFixed(0))
    }else if(pepegas >= 1){
      $(".pepegaAmount").text(pepegas.toFixed(2))
    }else{
      $(".pepegaAmount").text(pepegas.toFixed(8))
    }

    if((pepegas * 100000000) < 1000000) {
      $(".satoshiAmount").text(Math.round((pepegas * 100000000)))
    }else{

      let satoshiUnitNumber = (pepegas * 100000000).optimizeNumber();
      $(".satoshiAmount").text(satoshiUnitNumber)
    }

    localStorage.setItem("pepegas", "" + pepegas + "")

  });


  $(".purchaseItem").click(function () {


    var id = $(this).attr("id");

    var price = parseFloat($(this).attr("data-price"));


    var pepegasPerSecond = parseFloat($(this).attr("data-bits-per-sec"));

    var amountDisplay = $(this).children()[0];
    var amountDisplayAmount = parseInt(localStorage.getItem(id));

    var priceDisplay = $(this).children()[2];

    if(parseFloat(pepegas.toFixed(8)) >= price){

      pepegas = parseFloat(pepegas.toFixed(8)) - price;

      localStorage.setItem("pepegas", "" + pepegas + "");

      amountDisplayAmount = amountDisplayAmount + 1;
      amountDisplay.textContent = amountDisplayAmount.toString();

      if(pepegas > 1e6){

        let pepegaUnitNumber = pepegas.optimizeNumber();
        $(".pepegaAmount").text(pepegaUnitNumber)

      }else if(pepegas >= 1000){
        $(".pepegaAmount").text(pepegas.toFixed(0))
      }else if(pepegas >= 1){
        $(".pepegaAmount").text(pepegas.toFixed(2))
      }else{
        $(".pepegaAmount").text(pepegas.toFixed(8))
      }

      if((pepegas * 100000000) < 1e6) {
        $(".satoshiAmount").text(Math.round((pepegas * 100000000)))
      }else{

        let satoshiUnitNumber = (pepegas * 100000000).optimizeNumber();
        $(".satoshiAmount").text(satoshiUnitNumber)

      }

      Game.itemAction(id);

      Game.stopBsec();

      Game.setNewPrice();

      var newRate = Game.setNewpepegaRate(pepegasPerSecond);

      bSec = setInterval(function () {
        Game.bSecFunction(newRate);
      }, 1000)

    }

  });

  $(".resetButton").click(function () {
    Game.resetGame()
  })

});



