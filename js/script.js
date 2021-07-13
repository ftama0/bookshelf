document.addEventListener("DOMContentLoaded", function () {

    const submitForm /* HTMLFormElement */ = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        addBook();
    });

    const searchForm /* HTMLFormElement */ = document.getElementById("searchBook");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        search();
        // refreshSearch();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks(); //pindah pling atas
});