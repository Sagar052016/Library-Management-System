let books = [];

function addBook() {
    const bookName = document.getElementById("bookName").value.trim();
    const authorName = document.getElementById("authorName").value.trim();

    if (bookName === "" || authorName === "") {
        alert("Please enter both book name and author name!");
        return;
    }

    books.push({
        id: Date.now(),
        name: bookName,
        author: authorName,
        issued: false
    });

    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";

    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book";

        const details = document.createElement("span");
        details.textContent = `${book.name} - ${book.author} (${book.issued ? "Issued" : "Available"})`;

        const issueButton = document.createElement("button");
        issueButton.textContent = book.issued ? "Return" : "Issue";
        issueButton.onclick = () => toggleBook(book.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteBook(book.id);

        div.append(details, issueButton, deleteButton);
        bookList.appendChild(div);
    });
}

function toggleBook(id) {
    const book = books.find(book => book.id === id);
    if (book) {
        book.issued = !book.issued;
        displayBooks();
    }
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    displayBooks();
}

function searchBooks() {
    const searchValue = document.getElementById("search").value.toLowerCase();

    document.querySelectorAll(".book").forEach((element, index) => {
        const book = books[index];
        element.style.display =
            book.name.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue)
                ? "flex"
                : "none";
    });
}