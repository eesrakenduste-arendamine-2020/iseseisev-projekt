class Entry {
  constructor(title, author, zanr) {
    this.title = title;
    this.author = author;
    this.zanr = zanr;
    this.done = false;
  }
}
var searchButton = document.querySelector('#searchInput');
class Book {
  constructor() {
    this.entries = JSON.parse(window.localStorage.getItem("entries")) || [];

    document.querySelector("#addButton").addEventListener("click", () => {
      this.addEntry();
    });
    document.querySelector("#sortByTitle").addEventListener("click", () => {
      this.sortByTitle();
    });
    document.querySelector("#sortByAuthor").addEventListener("click", () => {
      this.sortByAuthor();
    });
    document.querySelector("#sortByZanr").addEventListener("click", () => {
      this.sortByZanr();  
    });
    searchButton.addEventListener('keyup', ()=>{this.search()});
    this.render();
  }

  addEntry() {
    const titleValue = document.querySelector("#title").value;
    const authorValue = document.querySelector("#author").value;
    const zanrValue = document.querySelector("#zanr").value;
    

    console.log(titleValue, authorValue, zanrValue);

    this.entries.push(new Entry(titleValue, authorValue, zanrValue));

    console.log(this.entries);
    this.saveLocal();

    this.render();
  }

  render() {
    if (document.querySelector(".book-list")) {
      document.body.removeChild(document.querySelector(".book-list"));
    }

    const ul = document.createElement("ul");
    ul.className = "book-list";
    this.entries.forEach((entryValue, entryIndex) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const doneButton = document.createElement("div");
      doneButton.classList.add("done-button");
      const doneIcon = document.createTextNode("✓");

      const pageButton = document.createElement("div");
      pageButton.classList.add("page-button");
      const pageIcon = document.createTextNode("LK");
      const removeButton = document.createElement("div");
      removeButton.classList.add("delete-button");
      const removeIcon = document.createTextNode("X");
      li.classList.add("entry");
      removeButton.addEventListener("click", () => {
        ul.removeChild(li);
        this.entries.splice(entryIndex, 1);
        this.saveLocal();
        this.render();
      });

      if (entryValue.done) {
        li.classList.add("done-state");
      }

      doneButton.addEventListener("click", () => {
        this.entries[entryIndex].done = true;
        this.saveLocal();
        location.reload();
      });

      pageButton.addEventListener("click", myFunction);
      this.saveLocal();
      //location.reload();

      div.innerHTML = `${entryValue.title} <br> ${entryValue.author} <br> ${entryValue.zanr}`;

      doneButton.appendChild(doneIcon);
      pageButton.appendChild(pageIcon);
      removeButton.appendChild(removeIcon);
      li.appendChild(doneButton);
      li.appendChild(pageButton);
      li.appendChild(div);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
  }

  saveLocal() {
    window.localStorage.setItem("entries", JSON.stringify(this.entries));
    console.log("save");
  }

  sortByTitle() {
    this.entries.sort(function (a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    this.saveLocal();
    this.render();
  }

  sortByAuthor() {
    this.entries.sort(function (a, b) {
      var x = a.author;
      var y = b.author;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    this.saveLocal();
    this.render();
  }

  sortByZanr() {
    this.entries.sort(function (a, b) {
      var x = a.zanr.toLowerCase();
      var y = b.zanr.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    this.saveLocal();
    this.render();
  }

  search() {
    var firstChars, ul, li, a, i, txtValue;  
    firstChars = searchButton.value.toLowerCase();
    ul = document.getElementsByClassName("book-list");
    li = ul[0].getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[2];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(firstChars) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    
}

}

function myFunction() {
  var txt;
  var LK = prompt("Mis leheküljel oled hetkel raamatuga? ");
  if (LK == null || LK == "") {
    txt = "Kasutaja ei sisestanud lehekülje numbrit.";
  } else {
    txt = "Lehekülg - " + LK;
  }
  document.getElementById("demo").innerHTML = txt;
}

const book = new Book();
