$('.auto-save').savy('load');

function bmivalue(){
  var kaal = document.getElementById('kaal').value;
  var pikkus = document.getElementById('pikkus').value;
    
  var KMI =  kaal  / (pikkus * pikkus);
  Math.round(KMI);

  document.getElementById('KMIvalue').value = Math.round(KMI);
    

}

function bmrvalue(){
  var kaal = document.getElementById('kaal').value;
  var pikkus = document.getElementById('pikkus').value;
  var vanus = document.getElementById('vanus').value;
  var bmr = 66.47 + (13.75 * kaal) + (5.003 * pikkus) - (6.755 * vanus);
  document.getElementById('BMRvalue').value = Math.round(bmr);
   
}

function MacrosToCalories() {
		var proteins = document.getElementById('proteins').value;
		 var carbs = document.getElementById('carbs').value;
		 var fats = document.getElementById('fats').value;
		var toiteV22rtus = ((proteins * 4) + (carbs * 4) + (fats * 9));
        document.getElementById('nutValue').value = toiteV22rtus;
}


var buttonAmount = 1;
var nonInputRows = 2; 
var calColumn = 2;


function totalCalories() {
  var total = 0;
    var totalCalories = document.getElementById("totalCalories");
    
  var amountOfInputFields = document.getElementsByTagName("input").length - buttonAmount; 
  
  for (var index = 0; index < amountOfInputFields; index++) {
    if ((index % calColumn) == 1) {
      var calInput = document.getElementsByTagName("input")[index];
      var calNum = Number(calInput.value);
      if (isValid(calInput)) {
        total += calNum;
      }
    }
  }
    
    
  totalCalories.innerHTML = total;
}


function isValid(input) {
  var minCalories = 0;
  var maxCalories = 100000;

  if ((Number(input.value) > minCalories) && ((Number(input.value) < maxCalories)) && !isNaN(input.value) && (Number(input.value) % 1 == 0))
    return true;
  
    
}



(function() {
    
  var hours = 00;
  var minutes = 00;
  var seconds = 00;
  var tens = 00;
  var aHours = document.getElementById("hours");
  var aMinutes = document.getElementById("minutes");
  var aSeconds = document.getElementById("seconds");
  var aTens = document.getElementById("tens");
    
  var Start = document.getElementById("start");
  var Stop = document.getElementById("stop");
  var reset = document.getElementById("reset");
  var clear = document.getElementById("clear");
  var Interval;
  var Lap = document.getElementById("lap");
  var Laps = document.getElementById("laps");
  var lapCount = 1;
  var lapsContent = document.getElementById("laps").innerHTML;
  var lastLap = { hours: 0, minutes: 0, tens: 0, seconds: 0 };

  function leftPad(value) {
    return value < 10 ? "0" + value : value;
  }
  
  
  function supportsLocalStorage() {
    return typeof(Storage)!== 'undefined';
  }
  
  $('#stop').hide();

  Start.onclick = function() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    $('#stop').toggle();
    $('#start').toggle();
  };

  Stop.onclick = function() {
    clearInterval(Interval);
    $('#start').toggle();
    $('#stop').toggle();
  };

  reset.onclick = function() {
    clearInterval(Interval);
    hours = "00";
    minutes = "00";
    seconds = "00";
    tens = "00";
    aHours.innerHTML = hours;
    aMinutes.innerHTML = minutes;
    aSeconds.innerHTML = seconds;
    aTens.innerHTML = tens;
  };
  
  function startTimer() {
    
    tens++;

    if (tens < 9) {
      aTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
      aTens.innerHTML = tens;
    }

    if (tens > 99) {
      seconds++;
      aSeconds.innerHTML = "0" + seconds;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
      aSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
      minutes++;
      aMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      aSeconds.innerHTML = "0" + 0;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
      aMinutes.innerHTML = minutes;
    }

    if (minutes > 59) {
      hours++;
      aHours.innerHTML = "0" + hours;
      minutes = 0;
      aMinutes.innerHTML = "0" + 0;
      seconds = 0;
      aSeconds.innerHTML = "0" + 0;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (hours > 9) {
      aHours.innerHTML = hours;
    }
  }
  
  

  if (!supportsLocalStorage()) {
    console.log('Selles brouseris andmeid ei saa salvestada :(')
    
    Lap.onclick = function() {
      var lapHours = hours - lastLap.hours;
      var lapMinutes = minutes - lastLap.minutes;
      if (lapMinutes < 0) {
        var lapMinutes = minutes - lastLap.minutes + 60;
      }
      var lapSeconds = seconds - lastLap.seconds;
      if (lapSeconds < 0) {
        var lapSeconds = seconds - lastLap.seconds + 60;
      }
      var lapTens = tens - lastLap.tens;
      if (lapTens < 0) {
        var lapTens = tens - lastLap.tens + 100;
      }
      lastLap = {
        tens: tens,
        seconds: seconds,
        minutes: minutes,
        hours: hours
      };

      Laps.innerHTML +=
        "<li>" +
        leftPad(lapHours) +
        ":" +
        leftPad(lapMinutes) +
        ":" +
        leftPad(lapSeconds) +
        ":" +
        leftPad(lapTens) +
        "</li>";
    };
    clear.onclick = function() {
      Laps.innerHTML = '';
    }
  } else {

    try {
      Lap.onclick = function() {
        var lapHours = hours - lastLap.hours;
        var lapMinutes = minutes - lastLap.minutes;
        if (lapMinutes < 0) {
          var lapMinutes = minutes - lastLap.minutes + 60;
        }
        var lapSeconds = seconds - lastLap.seconds;
        if (lapSeconds < 0) {
          var lapSeconds = seconds - lastLap.seconds + 60;
        }
        var lapTens = tens - lastLap.tens;
        if (lapTens < 0) {
          var lapTens = tens - lastLap.tens + 100;
        }
        lastLap = {
          tens: tens,
          seconds: seconds,
          minutes: minutes,
          hours: hours
        };

        Laps.innerHTML +=
          "<li>" +
          "Aeg " + lapCount++ + " – " +
          leftPad(lapHours) +
          ":" +
          leftPad(lapMinutes) +
          ":" +
          leftPad(lapSeconds) +
          "." +
          leftPad(lapTens) +
          "</li>";
        
        localStorage.setItem('laps', JSON.stringify(Laps.innerHTML));
      };

      clear.onclick = function() {
        Laps.innerHTML = '';
        localStorage.removeItem('laps');
      }
    }
    
    catch (e) {
    
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Palun kustutage andmed');
      }
    }
  
    if (localStorage.getItem('laps')) {
    
      var storedLaps = JSON.parse(localStorage.getItem('laps'));
      $('#laps').html(storedLaps);
    }
  }
})();

