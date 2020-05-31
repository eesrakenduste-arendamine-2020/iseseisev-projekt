/* Slider */
var i = -1;
var time = 5000;
var images = [];
var stopper = 0;
var baseUrl = 'http://localhost/iseseisevJS/images/';
var slider = document.getElementById('front-slider');
var arrows = document.getElementById('front-slider-arrows');
var leftArrow = document.getElementById('left-arrow');
var rightArrow = document.getElementById('right-arrow');

/* Add more colors, if there are more than 5 images in the slider */
var colors = ['#c0b283', '#dcd0c0', '#c0b283', '#dcd0c0', '#c0b283'];

images[0] = "binding-books-bound-colorful-272980.jpg";
images[1] = "chart-close-up-coffee-cup-590037.jpg";
images[2] = "person-holding-gray-twist-pen-and-white-printer-paper-on-955389.jpg";

slider.addEventListener('mouseenter', function () {
  arrows.classList.add('arrows');
})
slider.addEventListener('mouseleave', function () {
  arrows.classList.remove('arrows');
})

function changeSlide() {
  if (stopper == 0) {
    if (i < images.length - 1) {
      i++;
    } else {
      i = 0;
    }
    document.slider.src = baseUrl + images[i];
    colorDot();
    setTimeout("changeSlide()", time);
  }
}

for (let o = 0; o < images.length; o++) {
  var dot = document.createElement("span");
  dot.className = "slider-dot";
  dot.dataset.id = o;
  document.getElementById("slider-nav").appendChild(dot);
}

window.onload = changeSlide();

var dots = document.getElementsByClassName('slider-dot');
for (let u = 0; u < images.length; u++) {
  dots[u].addEventListener('click', selectSlide);
}

function selectSlide(e) {
  i = e.target.dataset.id;
  document.slider.src = baseUrl + images[i];
  colorDot();
}

function colorDot() {
  var dots = document.getElementsByClassName('slider-dot');
  Array.from(dots).forEach(function (dot, index) {
    dot.style.backgroundColor = colors[index];
  });
  
  var activeDot = document.querySelector('[data-id="' + i + '"]');
  activeDot.style.backgroundColor = "black";
}

rightArrow.addEventListener('click', function () {
  stopper = 1;
    for (let u = 0; u < images.length; u++) {
      if (document.slider.src == baseUrl + images[u]) {
        if (u != images.length - 1) {
          document.slider.src = baseUrl + images[u + 1];
          i++;
          break;
        } else {
          document.slider.src = baseUrl + images[0];
          i = 0;
          break;
        }
      }
  }
  colorDot();
})

leftArrow.addEventListener('click', function () {
  stopper = 1;
  for (let u = 0; u < images.length; u++) {
    if (u == i) {
      if (i > 0) {
        i--;
        document.slider.src = baseUrl + images[i];
        break;
      } else if ( i == u )  {
        i = images.length-1;
        document.slider.src = baseUrl + images[i];
        break;
      }
    }
  }
  colorDot();
})

/* Slider full screen button */
var fullScreen = document.getElementById('slider-full-screen');
var sliderOverlay = document.getElementById('overlay');
var sliderModal = document.getElementById('slider-modal');

fullScreen.addEventListener('click', makeFullScreen);
sliderOverlay.addEventListener('click', closeSliderModal);

function makeFullScreen() {
  stopper = 1;

  sliderOverlay.classList.add("active");
  sliderModal.classList.add("active");
  sliderModal.innerHTML = '<img src="' + document.slider.src + '">';
}

function closeSliderModal() {
  stopper = 0;
  sliderModal.classList.remove("active");
  sliderOverlay.classList.remove("active");
}

function hideInput(e) {
  errorId = e.target.dataset.id;
  if (e.target.value) {
    document.getElementById(errorId).style.display = "none";
    document.getElementById("input" + errorId).style.backgroundColor = "white";
  } else {
    const mq = window.matchMedia("(max-width: 567px)");
    if (mq.matches) {
      return;
    } else {
      document.getElementById(errorId).style.display = "inline-block";
      document.getElementById("input" + errorId).style.backgroundColor =
        "#ff5f5f";
    }
  }
}

/* Allkirjastamine */
window.onload = function () {
  document.getElementById("button-js").addEventListener("click", openModal);
  document.getElementById("button-js2").addEventListener("click", openModal2);
  document.getElementById("close-button").addEventListener("click", closeModal);
  document
    .getElementById("close-button2")
    .addEventListener("click", closeModal2);

  document.getElementById("plus").addEventListener("click", toggleExtra);

  modal = document.getElementById("modal");
  modal2 = document.getElementById("modal2");

  check = false;

  overlay = document.getElementById("overlay");

  document.getElementById("r1").addEventListener("click", hideInfo);
  document.getElementById("r2").addEventListener("click", showInfo);

  input = document.getElementById("test");

  allChangeAlt = document.getElementsByClassName("input");
  allChangeAltCount = allChangeAlt.length;

  for (let i = 0; i < allChangeAltCount; i++) {
    allChangeAlt[i].addEventListener("change", hideInput);
  }

  allChangeAlt2 = document.getElementsByClassName("input-modal");
  allChangeAltCount2 = allChangeAlt2.length;

  for (let i = 0; i < allChangeAltCount2; i++) {
    allChangeAlt2[i].addEventListener("input", disableSubmit);
  }

  if (document.getElementById("r1").checked) {
    hideInfo();
  } else {
    showInfo();
  }

  spinnerOverlay.style.opacity = 0;
  spinnerOverlay.style.visibility = 'hidden';

  hideInput();
};

function openModal(e) {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal(e) {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function openModal2(e) {
  modal2.style.display = "block";
  overlay.style.display = "block";

  if (
    !check &&
    document.getElementById("input10").value.length == 0 &&
    document.getElementById("input11").value.length == 0 &&
    document.getElementById("input12").value.length == 0
  ) {
    document.getElementById("input10").value = document.getElementById(
      "input1"
    ).value;
    document.getElementById("input11").value = document.getElementById(
      "input2"
    ).value;
    document.getElementById("input12").value = document.getElementById(
      "input4"
    ).value;
    check = true;
    disableSubmit();
  }
}

function closeModal2(e) {
  modal2.style.display = "none";
  overlay.style.display = "none";
}

function hideInfo() {
  var style = document.createElement("style");
  style.innerHTML = `
        .hide {
            display: none;
        }
        .show {
            display: block;
        }`;
  document.head.appendChild(style);
}

function showInfo() {
  var style = document.createElement("style");
  style.innerHTML = `
        .hide {
            display: block;
        }
        .show {
            display: none;
        }
        `;
  document.head.appendChild(style);
}

function disableSubmit() {
  if (document.getElementById("extra").style.display == "none") {
    if (
      document.getElementById("input10").value &&
      document.getElementById("input11").value &&
      document.getElementById("input12").value
    ) {
      document.getElementById("submit-button2").disabled = false;
      document.getElementById("submit-button2").style.backgroundImage =
        "linear-gradient(180deg, #039ae0, #0368ac)";
    } else {
      document.getElementById("submit-button2").disabled = true;
      document.getElementById("submit-button2").style.backgroundImage =
        "linear-gradient(180deg, rgb(232, 232, 232), rgb(171, 171, 171))";
    }
  } else {
    if (
      document.getElementById("input10").value &&
      document.getElementById("input11").value &&
      document.getElementById("input12").value &&
      document.getElementById("input13").value &&
      document.getElementById("input14").value &&
      document.getElementById("input15").value
    ) {
      document.getElementById("submit-button2").disabled = false;
      document.getElementById("submit-button2").style.backgroundImage =
        "linear-gradient(180deg, #039ae0, #0368ac)";
    } else {
      document.getElementById("submit-button2").disabled = true;
      document.getElementById("submit-button2").style.backgroundImage =
        "linear-gradient(180deg, rgb(232, 232, 232), rgb(171, 171, 171))";
    }
  }
}

function toggleExtra() {
  if (document.getElementById("extra").style.display == "none") {
    document.getElementById("extra").style.display = "block";
    document.getElementById("modal2").style.height = "425px";
    document.getElementById("submit-button2").style.marginTop = "15px";
    document.getElementById("plus").innerHTML = "-";
    disableSubmit();
  } else {
    document.getElementById("extra").style.display = "none";
    document.getElementById("modal2").style.height = "321px";
    document.getElementById("submit-button2").style.marginTop = "0";
    document.getElementById("plus").innerHTML = "+";
    disableSubmit();
  }
}

/* Change contracts */
var spinnerDur = 800;
var spinnerOverlay = document.getElementById('spinner-overlay');

document.getElementById('contract1').addEventListener('click', function () {
  setTimeout(function () {
    contract1();
  }, spinnerDur);

  spinnerOverlay.style.opacity = 1;
  spinnerOverlay.style.visibility = 'visible';
})
function contract1() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("contract").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("GET", "contract1.php", true);
  xmlhttp.send();
  
  document.getElementById('contract1').classList.add('active');
  document.getElementById('contract2').classList.remove('active');
  document.getElementById('contract3').classList.remove('active');
  spinnerOverlay.style.opacity = 0;
  spinnerOverlay.style.visibility = 'hidden';
}

document.getElementById('contract2').addEventListener('click', function () {
  setTimeout(function () {
    contract2();
  }, spinnerDur);

  spinnerOverlay.style.opacity = 1;
  spinnerOverlay.style.visibility = 'visible';
})

function contract2() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("contract").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("GET", "contract2.php", true);
  xmlhttp.send();
  
  document.getElementById('contract1').classList.remove('active');
  document.getElementById('contract2').classList.add('active');
  document.getElementById('contract3').classList.remove('active');
  spinnerOverlay.style.opacity = 0;
  spinnerOverlay.style.visibility = 'hidden';
}

document.getElementById('contract3').addEventListener('click', function () {
  setTimeout(function () {
    contract3();
  }, spinnerDur);

  spinnerOverlay.style.opacity = 1;
  spinnerOverlay.style.visibility = 'visible';
})
  function contract3() {
  
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("contract").innerHTML = this.responseText;
      }
    };
    xmlhttp.open("GET", "contract3.php", true);
    xmlhttp.send();
    
    document.getElementById('contract1').classList.remove('active');
    document.getElementById('contract2').classList.remove('active');
    document.getElementById('contract3').classList.add('active');
    spinnerOverlay.style.opacity = 0;
    spinnerOverlay.style.visibility = 'hidden';
}
  
/* Get query strings */
const queryString = window.location.search;
if (queryString == '?mailsent') {
  document.getElementById('success').innerHTML = '<h3>Leping on välja saadetud!</h3>';
} else if (queryString == '?success') {
  document.getElementById('success').innerHTML = '<h3>Leping on edukalt allkirjastatud!</h3>';
}

/* Mobile lang and menu toggler */
var switcher = document.getElementById('mobile-lang-switcher');
var dropdown = document.getElementById('mobile-lang-dropdown');

var menuToggler = document.getElementById('mobile-menu-toggler');
var menu = document.getElementById('mobile-menu');
var bars = document.getElementsByClassName('bar');

document.addEventListener("click", function (e) {
  if (menu.style.display == "block") {
    if (e.target !== menu && !menu.contains(e.target)) {
      toggleMenu();
    }
  } else if (menu.style.display == "none") {
    if (e.target == menuToggler || menuToggler.contains(e.target)) {
      toggleMenu();
    }
  }

  if (dropdown.style.display == "block") {
    if (e.target !== dropdown && !dropdown.contains(e.target)) {
      langToggler();
    }
  } else if (dropdown.style.display == "none") {
    if (e.target == switcher || switcher.contains(e.target)) {
      langToggler();
    }
  }
});

function langToggler() {
  if (dropdown.style.display == "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

function toggleMenu() {
  if (menu.style.display == "none") {
    menu.style.display = "block";
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#1f6653";
    }
  } else {
    menu.style.display = "none";
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#9ddda0";
    }
  }
}
