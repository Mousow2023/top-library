let myLibrary = [];

// Book class
class Book {

    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = false;
    }

    get infos() {
        return `${this.title} by ${this.author}, ${this.pages} pages, is ${this.isRead ? "read" : "not read"}`;
    }

    markAsRead = function () {
        this.isRead = !this.isRead;
    }
}

// Capture the books div container from the DOM
const booksElem = document.querySelector(".books");
// Capture the submit button of the form from the DOM
const submitFormButton = document.querySelector(".save-btn");

// Create some initial books using the Book constructor
let myBook = new Book("Sama Tere", "Moustapha SOW", 322);
let hisBook = new Book("Terem", "Samba Diop", 322);
let ourBook = new Book("Sounou Tere", "Moustapha SOW", 322);
let maimouna = new Book("Maimouna", "Abdoulaye Sadji", 322);
let richDadPoorDad = new Book("Rich Dad Poor Dad", "Robert Kyosaki", 223);

// Change the status of some of them
maimouna.markAsRead();
richDadPoorDad.markAsRead();

let booksList = [myBook, hisBook, ourBook, maimouna, richDadPoorDad]

// Loop over the book list and add each one to the library
for (let index = 0; index < booksList.length; index++) {
    addBookToLibrary(booksList[index]);
}

// Generate book elements dynamically in the DOM
booksElem.innerHTML = displayBooks(myLibrary);

attachEventListeners();

submitFormButton.addEventListener("click", function (event) {
    // Prevent from submitting to a server
    event.preventDefault()

    // Get the values from the from
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    // Check if all values are provided
    if (title !== "" && author !== "" && pages !== "") {
        // Create the book
        let book = new Book(title, author, pages);

        // Set the book status based on the checkbox.status
        book.isRead = document.getElementById("status").checked;

        // Clear the form values
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("status").checked = false;

        addBookToLibrary(book);

        // Update the DOM content
        displayBooks(myLibrary);
    }
});

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(array) {
    // Initiate a .books content accumulator
    let htmlBookContainer = ``;

    // Loop through the array of books (books)
    for (let index = 0; index < array.length; index++) {
        const book = array[index];
        // for each books, check if it's not empty 
        if (book !== null) {
            // then create the book element and add it to the .books content accumulator
            htmlBookContainer +=
                `<div class="book">
                    <h3>${book.title}</h3>
                    <h5>Author: ${book.author}</h5>
                    <h5>Pages: ${book.pages}</h5>
                    <h5>Status: ${book.isRead ? "Read" : "Not Read"}</h5>
                    <div class="buttons">
                        <button class="status-btn btn" data-index=${index}>Change Status</button>
                        <button class="delete-btn btn" data-index=${index}>Delete</button>
                    </div>
                </div>`
        }
    }

    // Assign the .books content accumulator the .books element
    booksElem.innerHTML = htmlBookContainer;

    // Reset the event listeners
    attachEventListeners();

    return htmlBookContainer;
}

function toggleStatus(e) {
    // Store the index of the book
    bookIndex = e.target.dataset.index;
    // Change the status of the book at the specified index
    myLibrary[bookIndex].markAsRead();
    displayBooks(myLibrary);
}

function deleteBook(array, index) {
    // Delete the book at the specified index from the list
    // And return the new list
    let newLibrary = array.filter(item => item !== array[index]);
    return newLibrary;
}

// Capture delete and change buttons and attach event listeners to them
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

