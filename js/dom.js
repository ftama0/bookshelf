const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const SEARCH_BOOK_BEFORE = "search_before";
const SEACRH_BOOK_AFTER = "search_after";
const BOOK_ITEMID = "itemId";


function makeBook(judul, penulis, tahun, isCompleted) {

    const TitleBook = document.createElement("h3");
    TitleBook.innerText = judul;

    const AuthorBook = document.createElement("h7");
    AuthorBook.innerText = penulis;

    const YearBook = document.createElement("p");
    YearBook.innerText = tahun;

    const textContainer = document.createElement("ARTICLE");
    textContainer.classList.add("book_item")
    textContainer.append(TitleBook, AuthorBook, YearBook);

    if (isCompleted) {
        const green = createUncompleteButton();
        green.textContent = "Belum Dibaca"

        const blue = createEditButton();
        blue.textContent = "Edit Buku"

        const yellow = createsaveButton();
        yellow.textContent = "Simpan Edit Buku"

        const red = createTrashButton();
        red.textContent = "Hapus Buku"

        const container = document.createElement("div");
        container.classList.add("action")
        container.append(green, red, blue, yellow);

        textContainer.append(container);
    } else {
        const green = createCompleteButton();
        green.textContent = "Selesai Dibaca"

        const blue = createEditButton();
        blue.textContent = "Edit Buku"

        const yellow = createsaveButton();
        yellow.textContent = "Simpan Edit Buku"

        const red = createTrashButton();
        red.textContent = "Hapus Buku"

        const container = document.createElement("div");
        container.classList.add("action")
        container.append(green, red, blue, yellow);

        textContainer.append(container);
    }

    return textContainer;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function createCompleteButton() {
    return createButton("green", function (event) {
        CompletedBook(event.target.parentElement);
    });
}

function createUncompleteButton() {
    return createButton("green", function (event) {
        UncompletedBook(event.target.parentElement);
    });
}

function createEditButton() {
    return createButton("blue", function (event) {
        EditTask(event.target.parentElement);
        openForm();
    });
}

function createsaveButton() {
    return createButton("yellow", function (event) {
        if (confirm("Apakah anda yakin ingin ubah buku ?")) {
            alert('Buku Berhasil diubah');
            EditSave(event.target.parentElement);
            location.reload();
        } else {
            alert('Edit dibatalkan');
        }
    });
}

function createTrashButton() {
    return createButton("red", function (event) {
        removeBook(event.target.parentElement);
    });
}

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;

    const checkbook = document.getElementById("inputBookIsComplete");

    if (checkbook.checked == true) {
        const book = makeBook(BookTitle, BookAuthor, BookYear, true);
        const bookObject = composeBookObject(BookTitle, BookAuthor, BookYear, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBOOKList.append(book);
        updateDataToStorage();
    } else {
        const book = makeBook(BookTitle, BookAuthor, BookYear, false);
        const bookObject = composeBookObject(BookTitle, BookAuthor, BookYear, false);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        uncompletedBOOKList.append(book);
        updateDataToStorage();
    }
}

function CompletedBook(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    taskElement = taskElement.parentNode;
    const JudulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const PenulisBuku = taskElement.querySelector(".book_item > h7").innerText;
    const Yearbuku = taskElement.querySelector(".book_item > p").innerText;
    const newBook = makeBook(JudulBuku, PenulisBuku, Yearbuku, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();

}

function UncompletedBook(taskElement, ) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    taskElement = taskElement.parentNode;
    const JudulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const PenulisBuku = taskElement.querySelector(".book_item > h7").innerText;
    const TahunBuku = taskElement.querySelector(".book_item > p").innerText;
    const newBook = makeBook(JudulBuku, PenulisBuku, TahunBuku, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
    listUncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function EditTask(taskElement) {
    const BookTitle = document.getElementById("editBookTitle");
    const BookAuthor = document.getElementById("editBookAuthor");
    const BookYear = document.getElementById("editBookYear");

    taskElement = taskElement.parentNode;
    const JudulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const PenulisBuku = taskElement.querySelector(".book_item > h7").innerText;
    const TahunBuku = taskElement.querySelector(".book_item > p").innerText;

    BookTitle.append(JudulBuku);
    BookTitle.setAttribute("value", JudulBuku);
    BookAuthor.append(PenulisBuku);
    BookAuthor.setAttribute("value", PenulisBuku);
    BookYear.append(TahunBuku);
    BookYear.setAttribute("value", TahunBuku);
}


function EditSave(taskElement) {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    taskElement = taskElement.parentNode;
    const JudulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const PenulisBuku = taskElement.querySelector(".book_item > h7").innerText;
    const TahunBuku = taskElement.querySelector(".book_item > p").innerText;

    const BookTitle = document.getElementById("editBookTitle").value;
    const BookAuthor = document.getElementById("editBookAuthor").value;
    const BookYear = document.getElementById("editBookYear").value;
    const checkbook = document.getElementById("editStatus");

    if (checkbook.checked == true) {
        const newBook = makeBook(JudulBuku, PenulisBuku, TahunBuku, true);
        const book = findBook(taskElement[BOOK_ITEMID]);
        book.judul = BookTitle;
        book.penulis = BookAuthor;
        book.tahun = BookYear;
        book.isCompleted = true;
        newBook[BOOK_ITEMID] = book.id;

        completedBOOKList.append(newBook);
        taskElement.remove();
        updateDataToStorage();
    } else {
        const newBook = makeBook(JudulBuku, PenulisBuku, TahunBuku, false);
        const book = findBook(taskElement[BOOK_ITEMID]);
        book.judul = BookTitle;
        book.penulis = BookAuthor;
        book.tahun = BookYear;
        book.isCompleted = false;
        newBook[BOOK_ITEMID] = book.id;

        uncompletedBOOKList.append(newBook);
        taskElement.remove();
        updateDataToStorage();
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function removeBook(taskElement) {
    taskElement = taskElement.parentNode;
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    if (confirm("Apakah anda yakin menghapus !")) {
        alert('Hapus Buku Berhasil');
        taskElement.remove();
        updateDataToStorage();
    } else {
        alert('Hapus Buku dibatalkan');
    }
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    for (book of books) {
        const newBook = makeBook(book.judul, book.penulis, book.tahun, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }

}

function search() {
    const listBookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listBookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const SearchTitle = document.getElementById("searchBookTitle").value;

    if (listBookCompleted != null) {
        listBookCompleted.remove();
    }
    if (listBookUncompleted != null) {
        listBookUncompleted.remove();
    }

    for (book of books) {
        var search = book.judul;
        if (search == SearchTitle) {
            var judul = search;
            var penulis = book.penulis;
            var tahun = book.tahun;
            var status = book.isCompleted;
            var newBook = makeBook(judul, penulis, tahun, status);
            newBook[BOOK_ITEMID] = book.id;
        }
    }
    if (judul == SearchTitle) {
        if (status == true) {
            book.isCompleted = true;
            var search = document.createElement('DIV');
            search.setAttribute("id", "completeBookshelfList");
            search.classList.add("book_list");
            search.append(newBook);
            const final = document.getElementById(SEACRH_BOOK_AFTER);
            final.append(search);

        } else if (status == false) {
            book.isCompleted = false;
            var search = document.createElement('DIV');
            search.setAttribute("id", "incompleteBookshelfList");
            search.classList.add("book_list");
            search.append(newBook);
            const final = document.getElementById(SEARCH_BOOK_BEFORE);
            final.append(search);
        }
    } else {
        alert("Buku Tidak Ada");
        location.reload();
    }
}