var view = {};
(
    function () {
        this.localStorage = window.localStorage;
        this.view_classes = ["grid", "list"];
        this.main = document.querySelector("main");
        this.changeView = (e) => {
            let className = e.target.className || e.target.parentElement.className;
            console.log(className);
            let index = this.view_classes.indexOf(className);
            if (this.localStorage.getItem("view") != index) {
                this.main.className = className;
                this.localStorage.setItem("view", index);
            }

        };
    }
).apply(view);
window.onload = () => {
    const LOCAL_STORAGE = view.localStorage;
    if (LOCAL_STORAGE.getItem("view") === null)
        LOCAL_STORAGE.setItem("view", 0);
    view.main.classList.add(view.view_classes[LOCAL_STORAGE.getItem("view")]);
};
document.querySelectorAll(".list , .grid").forEach(el=>el.addEventListener("click", view.changeView));