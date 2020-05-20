
class Book{
    constructor(header, author, pages, company){
        this.header = header;
        this.author = author;
        this.pages = pages;
        this.company = company;
        this.read = false;
    }
}

var bookheader, bookauthor, bookpages, bookcompany;

function getReviewData() {
    bookheader = localStorage.getItem('bookheader');
    var bookheaderDiv = document.getElementById('bookheader');
    bookheaderDiv.innerHTML = bookheader; 

    bookauthor = localStorage.getItem('bookauthor');
    var bookauthorDiv = document.getElementById('bookauthor');
    bookauthorDiv.innerHTML = bookauthor; 

    bookpages = localStorage.getItem('bookpages');
    var bookpagesDiv = document.getElementById('bookpages');
    bookpagesDiv.innerHTML = bookpages; 

    bookcompany = localStorage.getItem('bookcompany');
    var bookcompanyDiv = document.getElementById('bookcompany');
    bookcompanyDiv.innerHTML = bookcompany; 

    var back = document.getElementById('back');
    back.onclick = function() {
        localStorage.setItem("editmode", true);
    }
}
    
function sendForm() {
    console.log(bookheader);
    this.books = JSON.parse(window.localStorage.getItem('books')) || [];
    this.books.push(new Book(bookheader, bookauthor, bookpages, bookcompany));
    window.localStorage.setItem('books', JSON.stringify(this.books));

    window.location.href = "allbooks.html";
    localStorage.setItem("editmode", false);
}




