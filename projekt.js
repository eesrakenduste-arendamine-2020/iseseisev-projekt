var table = document.getElementById("books");
var rowcnt = table.rows.length;
console.log(rowcnt);
var count = 1;
window.onload = function () { loadTable() };



function addBook() {
    
    //var cellcnt = rowcnt.cells.length;
    var book = window.prompt("Lisa raamat", "Nimi");
    var read = document.createElement("input");
    read.setAttribute("type", "radio");
    read.setAttribute("id", "read");
    read.setAttribute("name", "state" + count);
    read.setAttribute("value", "read");
    read.setAttribute("class", "stored");
    read.onclick = function () { markRead(this) };
    var labelRead = document.createElement('label');
    //labelRead.htmlFor = 'read';
    var descriptionRead = document.createTextNode('Loetud');
    labelRead.appendChild(descriptionRead);
    read.appendChild(labelRead);
    /*divRead = document.createElement("div");
    divRead.setAttribute("id", "divRead");
    divRead.appendChild(read);
    divRead.appendChild(labelRead);*/
    var unread = document.createElement("input");
    unread.setAttribute("type", "radio");
    unread.setAttribute("id", "unread");
    unread.setAttribute("name", "state" + count);
    unread.setAttribute("value", "unread");
    unread.setAttribute("class", "stored");
    unread.onclick = function () { markUnread(this) };
    unread.checked = true;
    var labelUnread = document.createElement('label');
    //labelUnread.htmlFor = 'unread';
    var descriptionUnread = document.createTextNode('Lugemata');
    labelUnread.appendChild(descriptionUnread);
    unread.appendChild(labelUnread);
    var reading = document.createElement("input");
    reading.setAttribute("type", "radio");
    reading.setAttribute("id", "reading");
    reading.setAttribute("name", "state" + count);
    reading.setAttribute("value", "reading");
    reading.setAttribute("class", "stored");
    reading.onclick = function () { markReading(this) };
    var labelReading = document.createElement('label');
    //labelReading.htmlFor = 'reading';
    var descriptionReading = document.createTextNode('Lugemisel');
    labelReading.appendChild(descriptionReading);
    reading.appendChild(labelReading);
    var pages = document.createElement("input");
    pages.setAttribute("type", "number");
    pages.setAttribute("id", "pages");
    pages.setAttribute("value", 0);
    pages.setAttribute("min", 1);
    pages.setAttribute("max", 9999);
    pages.setAttribute("class", "stored");
    divPages = document.createElement("div");
    divPages.setAttribute("id", "divPages")
    divPages.appendChild(pages);
    var remove = document.createElement("input");
    remove.setAttribute("class", "stored");
    remove.setAttribute("type", "button");
    remove.setAttribute("id", "remove");
    remove.setAttribute("value", "X");
    remove.onclick = function () { removeBook(this) };
    var labelRemove = document.createElement('label');
    //labelRemove.htmlFor = 'remove';
    var descriptionRemove = document.createTextNode('Kustuta');
    labelRemove.appendChild(descriptionRemove);
    divRemove = document.createElement("div");
    divRemove.setAttribute("id", "divRemove");
    divRemove.appendChild(remove);
    //remove.addEventListener("click", removeBook());
    divButtons = document.createElement("div");
    divButtons.setAttribute("id", "divButtons");
    divButtons.appendChild(read);
    divButtons.appendChild(labelRead);
    divButtons.appendChild(unread);
    divButtons.appendChild(labelUnread);
    divButtons.appendChild(reading);
    divButtons.appendChild(labelReading);
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = book;
    cell2.appendChild(divButtons);
    cell3.appendChild(divPages);
    cell4.appendChild(divRemove);
    count++;
    rowcnt = table.rows.length;
    console.log(rowcnt);
}

function removeBook(oButton) {
    table.deleteRow(oButton.parentNode.parentNode.parentNode.rowIndex);
    rowcnt = table.rows.length;
    console.log("nyyd " + rowcnt);
    count--;
}

function markReading(oButton) {
    var currRow = table.rows[oButton.parentNode.parentNode.parentNode.rowIndex];
    currRow.style.backgroundColor = "#8DD720";
    table.rows[0].insertAdjacentElement("afterend", currRow);
    console.log(currRow);
}

function markRead(oButton) {
    var currRow = table.rows[oButton.parentNode.parentNode.parentNode.rowIndex];
    currRow.style.backgroundColor = "#DB6D8A";
    table.rows[table.rows.length - 1].insertAdjacentElement("afterend", currRow);
    console.log(currRow);
}

function markUnread(oButton) {
    var currRow = table.rows[oButton.parentNode.parentNode.parentNode.rowIndex];
    currRow.style.backgroundColor = "#FECE7C";
    console.log(currRow);
}

function saveTable() {
    localStorage.table = document.querySelector('#books').innerHTML.trim();
    var pageInputs = document.querySelectorAll('input[type="number"]');
    var pageValues = [];
    var btns = document.querySelectorAll('input[type="radio"]');
    var checkedBTNs = [];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].checked == true) {
            checkedBTNs.push(btns[i].value);
        }
    }
    for (var i = 0; i < pageInputs.length; i++) {
        pageValues.push(pageInputs[i].value);
    }
    console.log(checkedBTNs);
    console.log(pageValues);
    localStorage.setItem("checked", JSON.stringify(checkedBTNs));
    localStorage.setItem("pages", JSON.stringify(pageValues));
    localStorage.setItem("count", JSON.stringify(count));
}

function loadTable() {
    document.querySelector('#books').innerHTML = localStorage.table;
    //document.querySelectorAll('#remove').onclick = function () { removeBook(this) };
    var rmvBTNs = document.querySelectorAll('#remove');
    for (var i = 0; i < rmvBTNs.length; i++) {
        rmvBTNs[i].onclick = function () { removeBook(this) };
    }
    var readBTNs = document.querySelectorAll('#read');
    for (var i = 0; i < readBTNs.length; i++) {
        readBTNs[i].onclick = function () { markRead(this) };
    }
    var unreadBTNs = document.querySelectorAll('#unread');
    for (var i = 0; i < unreadBTNs.length; i++) {
        unreadBTNs[i].onclick = function () { markUnread(this) };
    }
    var readingBTNs = document.querySelectorAll('#reading');
    for (var i = 0; i < readingBTNs.length; i++) {
        readingBTNs[i].onclick = function () { markReading(this) };
    }
    var savedRadios = JSON.parse(localStorage.getItem("checked"));
    var newRadios = document.querySelectorAll('input[type="radio"]');
    var newRValues = [];
    for (var i = 0; i < newRadios.length; i++) {
        newRValues.push(newRadios[i].value);
    }
    var tri_radios = [];
    var tri_buttons = [];
    for (var i = 0; i < newRValues.length; i+=3) {
        var temp = [];
        for (var j = i; j < i + 3; j++) {
            temp.push(newRValues[j]);
        }
        tri_radios.push(temp);
    }
    for (var i = 0; i < newRadios.length; i += 3) {
        var temp = [];
        for (var j = i; j < i + 3; j++) {
            temp.push(newRadios[j]);
        }
        tri_buttons.push(temp);
    }
    for (var i = 0; i < tri_radios.length; i++) {
        for (var j = 0; j < 3; j++) {
            if (tri_radios[i][j] == savedRadios[i]) {
                tri_buttons[i][j].checked = true;
            }
        }
    }
    var savedPages = JSON.parse(localStorage.getItem("pages"));
    var newPages = document.querySelectorAll('input[type="number"]');
    for (var i = 0; i < newPages.length; i++) {
        newPages[i].value = savedPages[i];
    }
    count = JSON.parse(localStorage.getItem("count"));
}


