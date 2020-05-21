// Raamatu klass
class Book {
  constructor(title, author, page, read, id) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
  }
}

// UI klass
class UI {
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach((book) => UI.addBook(book));
  }

  static addBook(book) {
    document.createElement("td");
    const bookList = document.querySelector("#book-list");
    const row = document.createElement("tr");
    if (book.read === true) {
      row.classList.add("read");
    }

    row.addEventListener("click", function () {
      UI.markAsRead(row);
    });

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
      Storage.deleteBook(
        target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent
      );
      UI.showAlerts("Raamat kustutatud!", "info");
    }
  }

  static markAsRead(row) {
    const title = row.children[0].textContent;
    if (row.classList.contains("read")) {
      row.classList.remove("read");
      Storage.markBookAsRead(row);
    } else {
      row.classList.add("read");
      Storage.markBookAsRead(row);
    }
  }

  static showAlerts(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    const infoalert = document.querySelector(".alert-info") !== null;
    const successalert = document.querySelector(".alert-success") !== null;
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
    let dm = JSON.parse(localStorage.darkMode);
    console.log(dm.dark);
    if (dm.dark === false) {
      cssheet.setAttribute(
        "href",
        "https://bootswatch.com/4/darkly/bootstrap.min.css"
      );
      const darkModeValue = true;
      Storage.setDarkMode(darkModeValue);
    } else {
      cssheet.setAttribute(
        "href",
        "https://bootswatch.com/4/cerulean/bootstrap.min.css"
      );
      const darkModeValue = false;
      Storage.setDarkMode(darkModeValue);
    }
  }

  static showTheme() {
    const darkmodestorage = Storage.getDarkMode();
    if (darkmodestorage === undefined || darkmodestorage.length < 1) {
      Storage.setDarkMode(false);
    }
    let dm = JSON.parse(localStorage.darkMode);
    if (dm.dark === true) {
      cssheet.setAttribute(
        "href",
        "https://bootswatch.com/4/darkly/bootstrap.min.css"
      );
      document.getElementById("checkbox").checked = true;
    } else {
      cssheet.setAttribute(
        "href",
        "https://bootswatch.com/4/cerulean/bootstrap.min.css"
      );
      document.getElementById("checkbox").checked = false;
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

  // static getStorageSize() {
  //   const storageSize = Storage.getBooks().length;
  //   return storageSize;
  // }

  static markBookAsRead(row) {
    const title = row.children[0].textContent;
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        if (book.read === false) {
          book.read = true;
        } else if (book.read === true) {
          book.read = false;
        }
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  static markBookAsUnread() {
    const title = row.children[0].textContent;
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        book.read = false;
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  static getDarkMode() {
    let darkMode;
    if (localStorage.getItem("darkMode") === null) {
      darkMode = [];
    } else {
      darkMode = JSON.parse(localStorage.getItem("darkMode"));
    }
    return darkMode;
  }

  static setDarkMode(darkModeValue) {
    const darkMode = {
      dark: darkModeValue,
    };
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }
}

// Näita raamatuid
document.addEventListener("DOMContentLoaded", UI.displayBooks);
document.addEventListener("DOMContentLoaded", UI.showTheme);

// Lisa raamat
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const page = document.querySelector("#book-page").value;
  const read = false;

  let error = 0;
  if (title === "" && author === "" && page === "") {
    UI.showAlerts("Palun täitke kõik väljad!", "danger");
    error++;
  } else if (author === "") {
    UI.showAlerts("Palun sisestage autor!", "danger");
    error++;
  } else if (page === "") {
    UI.showAlerts("Palun sisestage loetud lehekülgede arv!", "danger");
    error++;
  } else if (title === "") {
    UI.showAlerts("Palun sisestage teose pealkiri!", "danger");
    error++;
  } else {
    error = 0;
  }

  if (error === 0) {
    const book = new Book(title, author, page, false);

    UI.addBook(book);

    Storage.addBook(book);

    UI.clear();

    UI.deleteAlerts();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  //console.log(e.target);
  UI.deleteBook(e.target);
});

// document.querySelector("#book-list").addEventListener("click", (e) => {
//   //console.log(e.target);
//   UI.deleteBook(e.target);
// });

const cssheet = document.getElementById("csstheme");
counter = 0;
document.querySelector("#checkbox").addEventListener("click", () => {
  counter++;
  UI.changeTheme(counter);
});
