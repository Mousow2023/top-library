// Changed
let myLibrary = [];

// Book constructor function
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.infos = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, is ${this.isRead ? "read" : "not read"}`;
    }
};

Book.prototype.markAsRead = function () {
    this.isRead ? this.isRead = false : this.isRead = true;
}

const booksElem = document.querySelector(".books");
const submitFormButton = document.querySelector(".save-btn");

let myBook = new Book("Sama Tere", "Moustapha SOW", 322);
let hisBook = new Book("Terem", "Samba Diop", 322);
let ourBook = new Book("Sounou Tere", "Moustapha SOW", 322);
let maimouna = new Book("Maimouna", "Abdoulaye Sadji", 322);
let richDadPoorDad = new Book("Rich Dad Poor Dad", "Robert Kyosaki", 223);

maimouna.markAsRead();
richDadPoorDad.markAsRead();

myLibrary.push(myBook);
myLibrary.push(hisBook);
myLibrary.push(ourBook);
myLibrary.push(maimouna);
myLibrary.push(richDadPoorDad);

booksElem.innerHTML = displayBooks(myLibrary);

attachEventListeners();

submitFormButton.addEventListener("click", function (event) {
    event.preventDefault()

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").checked;

    if (title !== "" && author !== "" && pages !== "") {
        let book = new Book(title, author, pages);

        status ? book.isRead = true : book.isRead = false;

        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("status").checked = false;

        myLibrary.push(book);

        displayBooks(myLibrary);
    }

});

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(array) {
    let htmlBookContainer = ``;
    for (let index = 0; index < array.length; index++) {
        const book = array[index];
        if (book !== null) {
            htmlBookContainer += `
                <div class="book">
                    <h3>${book.title}</h3>
                    <h5>Author: ${book.author}</h5>
                    <h5>Pages: ${book.pages}</h5>
                    <h5>Status: ${book.isRead ? "Read" : "Not Read"}</h5>
                    <div class="buttons">
                        <button class="status-btn btn" data-index=${index}>Change Status</button>
                        <button class="delete-btn btn" data-index=${index}>Delete</button>
                    </div>
                </div>
            `
        }
    }

    booksElem.innerHTML = htmlBookContainer;

    attachEventListeners();

    return htmlBookContainer;
}

function toggleStatus(e) {
    // Store the index of the book
    bookIndex = e.target.dataset.index;
    myLibrary[bookIndex].markAsRead();
    displayBooks(myLibrary);
}

function deleteBook(array, index) {
    let newLibrary = array.filter(item => item !== array[index]);
    return newLibrary;
}

function attachEventListeners() {
    const changeStatus = document.querySelectorAll(".status-btn.btn");
    const deleteBookElem = document.querySelectorAll(".delete-btn.btn");

    changeStatus.forEach(element => {
        element.addEventListener("click", (event) => {
            toggleStatus(event);
        });
    });

    deleteBookElem.forEach(element => {
        element.addEventListener("click", (event) => {
            myLibrary = deleteBook(myLibrary, event.target.dataset.index);
            displayBooks(myLibrary);
        })
    });
}