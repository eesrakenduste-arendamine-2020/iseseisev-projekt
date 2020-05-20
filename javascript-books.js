
function render() {
    this.books = JSON.parse(window.localStorage.getItem('books')) || [];

    console.log(this.books);
    const ul = document.createElement('ul');
    ul.className = 'book-list';
    this.books.forEach((entryValue, entryIndex)=>{
        const li = document.createElement('li');
        const div = document.createElement('div');
        const input = document.createElement('input');
        const read = document.createElement('div');
        const removeButton = document.createElement('div');
        removeButton.classList.add('delete-button');
        const removeIcon = document.createTextNode('X');
        li.classList.add('book');
        input.classList.add('form-control');
        input.style.marginLeft = "5vw";
        input.style.marginRight = "5vw";
        input.placeholder = "Loetud leheküljed:"
        read.classList.add('read-pages')
        removeButton.addEventListener('click', ()=>{
            ul.removeChild(li);
            this.books.splice(entryIndex, 1);
            window.localStorage.setItem('books', JSON.stringify(this.books));
            this.render();
        });

        input.addEventListener("keyup", ()=>{
            if (event.keyCode === 13) {
                window.localStorage.setItem('readPages', input.value);
                location.reload();
            }
        });

        if(entryValue.done){
            li.classList.add('book-finished');
        }

        div.addEventListener('click', (event)=>{
            event.target.classList.add('book-finished');
            this.books[entryIndex].done = true;
            window.localStorage.setItem('books', JSON.stringify(this.books));
        });

        div.innerHTML = `<b>Raamatu pealkiri: </b> ${entryValue.header} <br> 
        <b>Autor: </b> ${entryValue.author} <br>
        <b>Leheküljed: </b> ${entryValue.pages} <br>
        <b>Kirjastus: </b> ${entryValue.company}`;

        read.innerHTML = window.localStorage.getItem('readPages') || 0;

        removeButton.appendChild(removeIcon);
        li.appendChild(div);
        li.appendChild(input);
        li.appendChild(read);
        li.appendChild(removeButton);
        ul.appendChild(li);
    });

    document.body.appendChild(ul);
}