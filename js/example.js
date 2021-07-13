(() => {
    let e = [];

    function t(t) {
        t.preventDefault();
        const n = document.querySelector("#inputBookTitle"),
            o = document.querySelector("#inputBookAuthor"),
            d = document.querySelector("#inputBookYear"),
            i = document.querySelector("#inputBookIsComplete"),
            c = {
                id: +new Date,
                title: n.value,
                author: o.value,
                year: d.value,
                isComplete: i.checked
            };
        console.log(c), e.push(c), document.dispatchEvent(new Event("bookChanged"))
    }

    function n(t) {
        t.preventDefault();
        const n = document.querySelector("searchBookTitle");
        query = n.value, query ? makeBook(e.filter((function (e) {
            return e.title.toLowerCase().includes(query.toLowerCase())
        }))) : makeBook(e)
    }

    window.addEventListener("load", (function () {
        const o = document.querySelector("#inputBook"),
            d = document.querySelector("#searchBook");
        o.addEventListener("submit", t), d.addEventListener("submit", n)
    }))
})();