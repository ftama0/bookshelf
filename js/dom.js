const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const SEARCH_BOOK_BEFORE = "search_before";
const SEACRH_BOOK_AFTER = "search_after";
const BOOK_ITEMID = "itemId";

function makeBook(judul /* string */ , penulis, tahun /* string */ , isCompleted /* boolean */ ) {

    const TitleBook = document.createElement("h3");
    TitleBook.innerText = judul;

    const AuthorBook = document.createElement("p");
    AuthorBook.innerText = penulis;

    const YearBook = document.createElement("p");
    YearBook.innerText = tahun;

    const textContainer = document.createElement("ARTICLE");
    textContainer.classList.add("book_item")
    textContainer.append(TitleBook, AuthorBook, YearBook);

    if (isCompleted) {
        const green = createUndoButton();
        green.textContent = "Belum Selesai Dibaca"

        const red = createTrashButton();
        red.textContent = "Hapus Buku"

        const container = document.createElement("div");
        container.classList.add("action")
        container.append(green, red);

        textContainer.append(container);
    } else {
        const green = createCheckButton();
        green.textContent = "Selesai Dibaca"

        const red = createTrashButton();
        red.textContent = "Hapus Buku"

        const container = document.createElement("div");
        container.classList.add("action")
        container.append(green, red);

        textContainer.append(container);
    }

    return textContainer;
}

function createButton(buttonTypeClass /* string */ , eventListener /* Event */ ) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function createUndoButton() {
    return createButton("green", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("red", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("green", function (event) {
        addTaskToCompleted(event.target.parentElement);
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

function addTaskToCompleted(taskElement /* HTMLELement */ ) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    taskElement = taskElement.parentNode;
    const JudulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const PenulisBuku = taskElement.querySelector(".book_item > p").innerText;
    const TahunBuku = taskElement.querySelector(".book_item > p").innerText;

    const newBook = makeBook(JudulBuku, PenulisBuku, TahunBuku, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    if (book != null) {
        //do something on someObjectElement.innerText

        book.isCompleted = true;
        newBook[BOOK_ITEMID] = book.id;

        listCompleted.append(newBook); //bisa walaupun di hilangkan
        taskElement.remove();

        updateDataToStorage();
    }
}

function removeTaskFromCompleted(taskElement /* HTMLELement */ ) {
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

function undoTaskFromCompleted(taskElement /* HTMLELement */ ) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    taskElement = taskElement.parentNode;
    const JudulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const PenulisBuku = taskElement.querySelector(".book_item > p").innerText;
    const TahunBuku = taskElement.querySelector(".book_item > p").innerText;

    const newBook = makeBook(JudulBuku, PenulisBuku, TahunBuku, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
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

function search() { //kalau search nya kosong malah tidak bisa, curang pakai "required"
    //     let a, i, txtValue;
    //     var serializedData = sessionStorage.getItem(STORAGE_KEY);
    //     let data = JSON.parse(serializedData);
    //     if(data !== null)
    //     books = data;
    //     // let abc = books[0].judul;
    //     const x = document.getElementById("searchBookTitle");
    //     filter = x.value.toUpperCase(); // gak ad cons/let nya
    //     const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    //     const listcompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    //     listUncompleted.style.display = "none";
    //     listcompleted.style.display = "none";
    //     let showing = listcompleted.style.display = "";

    //     for(i=0; i<books.length; i++){
    //         a = books[i].judul;
    //         b = books[i].penulis;
    //         c = books[i].tahun;
    //         d = books[i].isCompleted;
    //         txtValue = a;
    //     // const y = findBook() = e; //cari cara mendapatkan list judul
    //     // const z = document.getElementsByClassName(".book_item > h3");
    //     // const f = document.getElementsByTagName("h3").innerText;
    //             if(txtValue.toUpperCase().indexOf(filter) > -1){
    //                 const newBook = makeBook(txtValue, b, c, d);
    //                 console.log(txtValue, b, c, d);


    //                     newBook[BOOK_ITEMID] = book.id;
    //                     // listcompleted.append(newBook);



    //                 }
    //             }

    //  listCompleted.remove();
    // listuncompleted.remove();
    /////////////////////////////////////

    const listBookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listBookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const SearchTitle = document.getElementById("searchBookTitle").value;
    // listCompleted.style.display = "none";
    // listUncompleted.style.display = "none";
    if(listBookCompleted != null){ // penyebab tidak bisa pindah
        listBookCompleted.remove();
    }
    if(listBookUncompleted != null){
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
    console.log(judul, penulis, tahun, status)
    // const completeBook = document.getElementById("completeBookList");
    // const incompleteBook = document.getElementById("incompleteBookList");
    // if(completeBook != null){
    //     completeBook.remove();
    // }
    // if(incompleteBook != null){
    //     incompleteBook.remove();
    // }
 
    if (judul == SearchTitle) {
        if (status == true) {
            book.isCompleted = true;
            var search = document.createElement('DIV');
            search.setAttribute("id", "completeBookshelfList");
            search.classList.add("book_list");
            search.append(newBook);
            const OK = document.getElementById(SEACRH_BOOK_AFTER);
            OK.append(search);
    
        } else if (status == false) {
            book.isCompleted = false;
            var search = document.createElement('DIV');
            search.setAttribute("id", "incompleteBookshelfList");
            search.classList.add("book_list");
            search.append(newBook);
            const OK = document.getElementById(SEARCH_BOOK_BEFORE);
            OK.append(search);
        }
    } else {
        alert("Buku Tidak Ada");
        location.reload();
    }
}