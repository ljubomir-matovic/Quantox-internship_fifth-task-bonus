var unplash = {};
(
    function () {
        this.LINK = "https://api.unsplash.com/photos/random?client_id=HqmqSgG3ozhQbA2EXcpnaax2l_5ZoFZnwSjuArKEf_0&fit=clip&w=100&h=100&count=";
        this.IMG_CONTAINER = document.querySelector("main");
        /**Return array of photos from unplash.com
         * @param {*} count 
         * @returns photosArray
         */
        this.getPhotos = async function(count = 1){
            let response = await fetch(this.LINK + `${count}`);
            if (!response.ok) {
                let error = `<section class="error">
                                <h1>Rate Limit Exceed</h1>
                                <h1>Try again later</h1>
                            </section>`;
                this.IMG_CONTAINER.innerHTML = error;
                document.body.style.overflow = "hidden";
                throw new Error("err");
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
            a.className = "img-a";
            let img = document.createElement("IMG");
            classes.forEach(c => { img.classList.add(c);})
            img.src = photo.urls.regular;
            img.alt = photo.alt_description || "photo";
            img.title=photo.alt_description || "photo";
            a.append(img);
            return a;
        };
        /**Display photos from unplash.com
         * @param {*} count 
         */
        this.displayPhotos = async function (count = 1) {
            try {
                let photosArray = await this.getPhotos(count);
                photosArray.forEach(photo => {
                    let section = document.createElement("SECTION");
                    section.className = "img-container";
                    let instagram = photo.user.social.instagram_username;
                    if (instagram)
                        instagram = instagram.toLowerCase();
                    else instgram = "";
                    photo.user.social.instagram_username = "https://instagram.com/" + instagram;
                    let other = `<section class="info">
                                <section class="row">
                                <img src="${photo.user.profile_image.small}" class="profile-img" alt="No profile image">
                                <h2>${photo.user.name}</h2>
                                </section>
                                <p>${photo.user.bio || ""}</p>
                                <section class="row">
                                <p>${photo.likes} likes</p>
                                <p>${photo.downloads} downaloads</p>
                                <p>${photo.views} views</p>
                                </section>
                                <section class="row">
                                <a href="${photo.user.portfolio_url}">Portfolio</a>
                                <a href="${photo.user.social.instagram_username}">Instagram</a>
                                <a href="https://twitter.com/${photo.user.social.twitter_username || ""}">Twitter</a>
                                </section>
                            </section>`;
                    section.append(this.createUnplashPhoto(photo));
                    section.innerHTML += other;
                    this.IMG_CONTAINER.append(section);
                });
            }
            catch (err) {
                console.error("Rate limit exceed");
            }
        };
    }
).apply(unplash);