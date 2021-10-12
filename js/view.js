var view = {};
(
    function () {
        this.localStorage = window.localStorage;
        this.view_classes = ["grid", "list"];
        this.main = document.querySelector("main");
        this.changeView = (e) => {
            let className = e.target.className || e.target.parentElement.className;
           // console.log(className);
            let index = this.view_classes.indexOf(className);
            if (this.localStorage.getItem("view") != index) {
                this.main.className = className;
                this.localStorage.setItem("view", index);
                
                this.view_classes.forEach(c => {
                    document.querySelector(`section.${c}`).classList.toggle("active-view");
                });
            }
        };
    }
).apply(view);
document.querySelectorAll(".list , .grid").forEach(el=>el.addEventListener("click", view.changeView));