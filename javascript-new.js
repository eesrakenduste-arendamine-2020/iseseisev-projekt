

function formCheck() {
    var muutmisseisund = localStorage.getItem("editmode");
    if (muutmisseisund=="true") {
        document.getElementById("bookheader").value = localStorage.getItem("bookheader");
        document.getElementById("bookauthor").value = localStorage.getItem("bookauthor");
        document.getElementById("bookpages").value = localStorage.getItem("bookpages");
        document.getElementById("bookcompany").value = localStorage.getItem("bookcompany");
    } else {
        document.getElementById("bookheader").value = "";
        document.getElementById("bookauthor").value = "";
        document.getElementById("bookpages").value = "";
        document.getElementById("bookcompany").value = "";
    }
}

function sendForm(e) {
    e.preventDefault();
    var bookheader = document.forms["bookform"]["bookheader"].value;
    if (bookheader == "") {
        document.getElementById("bookheaderMistake").style.visibility = "visible";
        return false;
    } else {
        document.getElementById("bookheaderMistake").style.visibility = "hidden";
        localStorage.setItem('bookheader', bookheader);
    }
    var bookauthor = document.forms["bookform"]["bookauthor"].value;
    if (bookauthor == "") {
        document.getElementById("bookauthorMistake").style.visibility = "visible";
        return false;
    } else {
        document.getElementById("bookauthorMistake").style.visibility = "hidden";
        localStorage.setItem('bookauthor', bookauthor);
    }
    var bookpages = document.forms["bookform"]["bookpages"].value;
    if (bookpages == "") {
        document.getElementById("bookpagesMistake").style.visibility = "visible";
        return false;
    } else {
        document.getElementById("bookpagesMistake").style.visibility = "hidden";
        localStorage.setItem('bookpages', bookpages);
    }
    var bookcompany = document.forms["bookform"]["bookcompany"].value;
    if (bookcompany == "") {
        document.getElementById("bookcompanyMistake").style.visibility = "visible";
        return false;
    } else {
        document.getElementById("bookcompanyMistake").style.visibility = "hidden";
        localStorage.setItem('bookcompany', bookcompany);
    }
    
    window.location.href = "review.html";
}