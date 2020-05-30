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
            console.log('toggle1');
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
