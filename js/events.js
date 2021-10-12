window.onload = () => {
    const LOCAL_STORAGE = view.localStorage;
    if (LOCAL_STORAGE.getItem("view") === null)
        LOCAL_STORAGE.setItem("view", 0);
    let className = view.view_classes[LOCAL_STORAGE.getItem("view")];
    view.main.classList.add(className);
    document.querySelector("section." + className).classList.toggle("active-view");
    let height = (parseInt(window.outerHeight / 500)+1)*12 ;
    unplash.displayPhotos(height);
};
window.onscroll=(e)=>{
	const {scrollTop,scrollHeight,clientHeight}=document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 150)
        unplash.displayPhotos(12);
};