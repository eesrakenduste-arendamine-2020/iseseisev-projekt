// Raamatu klass
class Book {
  constructor(title, author, page) {
    this.title = title;
    this.author = author;
    this.page = page;
  }
}
// UI klass
class UI {
  static displayBooks() {
    const books = Storage.getBooks();

    books.forEach((book) => UI.addBook(book));
  }

  static addBook(book) {
    const bookList = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.page}</td>
        <td><i class="fas fa-trash delete"></i></td>
    `;

    bookList.appendChild(row);

    UI.showAlerts("Raamat lisatud!", "success");
  }

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
      UI.showAlerts("Raamat kustutatud!", "info");
    }
  }

  static showAlerts(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    var infoalert = document.querySelector(".alert-info") !== null;
    var successalert = document.querySelector(".alert-success") !== null;
    if (infoalert) {
      setTimeout(() => document.querySelector(".alert-info").remove(), 4000);
    }

    if (successalert) {
      setTimeout(() => document.querySelector(".alert-success").remove(), 4000);
    }
  }

  static deleteAlerts() {
    document.querySelectorAll(".alert-danger").forEach((e) => e.remove());
  }

  static clear() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-page").value = "";
  }

  static changeTheme(counter) {
    if (counter % 2 != 0) {
      cssheet.setAttribute(
        "href",
        "https://bootswatch.com/4/darkly/bootstrap.min.css"
      );
    } else {
      cssheet.setAttribute(
        "href",
        "https://bootswatch.com/4/cerulean/bootstrap.min.css"
      );
    }
  }
}

// LocalStorage klass

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static deleteBook(title) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Näita raamatuid
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Lisa raamat
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const page = document.querySelector("#book-page").value;
  let error = 0;
  if (title == "" && author == "" && page == "") {
    UI.showAlerts("Palun täitke kõik väljad!", "danger");
    error++;
  } else if (author == "") {
    UI.showAlerts("Palun sisestage autor!", "danger");
    error++;
  } else if (page == "") {
    UI.showAlerts("Palun sisestage loetud lehekülgede arv!", "danger");
    error++;
  } else if (title == "") {
    UI.showAlerts("Palun sisestage teose pealkiri!", "danger");
    error++;
  } else {
    error = 0;
  }

  if (error == 0) {
    const book = new Book(title, author, page);

    UI.addBook(book);

    Storage.addBook(book);

    UI.clear();

    UI.deleteAlerts();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  //console.log(e.target);
  UI.deleteBook(e.target);
  Storage.deleteBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );
});

const cssheet = document.getElementById("csstheme");
counter = 0;
document.querySelector("#checkbox").addEventListener("click", (e) => {
  counter++;
  UI.changeTheme(counter);
});

// Event: Mark book as read
