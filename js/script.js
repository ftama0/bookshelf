document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const searchForm = document.getElementById("searchBook");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        search();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});