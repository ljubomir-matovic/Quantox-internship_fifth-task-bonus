var unplash = {};
(
    function () {
        this.LINK = "https://api.unsplash.com/photos/random?client_id=HqmqSgG3ozhQbA2EXcpnaax2l_5ZoFZnwSjuArKEf_0&count=";
        this.IMG_CONTAINER = document.querySelector("main");
        /**Return array of photos from unplash.com
         * @param {*} count 
         * @returns photosArray
         */
        this.getPhotos = async function(count = 1){
            let response = await fetch(this.LINK + `${count}`);
            if (!response.ok) {
                console.log("err");
                return;
            }
            let photosArray = await response.json();
            return photosArray;
        };
        /**Create DOM Element from photo object
         * @param {*} photo
         * @param classes
         * @returns DOM Element 
         */
        this.createUnplashPhoto = (photo,...classes)=>{
            let a = document.createElement("A");
            a.href = photo.links.html;
            let img = document.createElement("IMG");
            classes.forEach(c => { img.classList.add(c);})
            img.src = photo.urls.regular;
            img.alt = photo.alt_description;
            a.append(img);
            return a;
        };
        /**Display photos from unplash.com
         * @param {*} count 
         */
        this.displayPhotos = async function(count=1){
            let photosArray = await this.getPhotos(count);
            photosArray.forEach(photo => {
                let section = document.createElement("SECTION");
                section.append(this.createUnplashPhoto(photo));
                this.IMG_CONTAINER.append(section);
            });
        };
    }
).apply(unplash);