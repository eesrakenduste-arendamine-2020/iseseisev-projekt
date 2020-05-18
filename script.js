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
    const books = [];

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
  }

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  static clear() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-page").value = "";
  }
}

// LocalStorage klass

// Näita raamatuid
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Lisa raamat
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const page = document.querySelector("#book-page").value;
  const errors = 0;

  if (title == "" && author == "" && page == "") {
    alert("Palun täitke kõik väljad!");
    error++;
  } else if (author == "") {
    alert("Palun sisestage raamatu autor!");
    error++;
  } else if (page == "") {
    alert("Palun sisestage loetud lehekülgede arv!");
    error++;
  } else if (title == "") {
    alert("Palun sisestage raamatu pealkiri!");
    error++;
  } else {
    error = 0;
  }

  if (error == 0) {
    const book = new Book(title, author, page);

    UI.addBook(book);

    UI.clear();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  console.log(e.target);
  UI.deleteBook(e.target);
});

// Event: Mark book as read
