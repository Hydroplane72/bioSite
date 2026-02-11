(() => {
    const ensureTrailingSlash = (path) => (path.endsWith("/") ? path : `${path}/`);
    const imageCatalog = {
        "Images/Embellishments_goals/": [
            "Grandmother/grandma r.jpg",
            "Grandmother/ShirleyHoldingFirstGBaby.jpg",
            "Mother/BirthdayFamilyPhoto.jpg",
            "Mother/ChristmasFamilyPhoto.jpg",
            "Mother/JustTheKids.jpg"
        ],
        "Images/Portraits/": [
            "LatestPortrait.jpg",
            "MostRecentPics.jpg",
            "OlderPortrait.jpg",
            "TeacherPortrait.jpg"
        ],
        "Images/Hobbies/Cooking/": [
            "Cooking.jpg"
        ],
        "Images/Hobbies/Flowers/": [
            "Flower1.jpg",
            "Flower2.jpg",
            "Flower3.jpg",
            "Flower4.jpg",
            "Flower5.jpg"
        ],
        "Images/Hobbies/Playing/": [
            "RidingBike.jpg",
            "ShirelyWithLittleSiblings.jpg",
            "ShirleyInFrontOfOldCars.jpg"
        ]
    };

    const startSlideshow = (container) => {
        const imageElement = container.querySelector("img");
        if (!imageElement) {
            return;
        }

        const folder = container.dataset.imageFolder?.trim();
        if (!folder) {
            return;
        }

        const basePath = ensureTrailingSlash(folder);
        const files = imageCatalog[basePath] || [];
        const images = files
            .map((file) => `${basePath}${String(file).trim()}`)
            .filter((src) => !src.endsWith("/"));

        if (images.length < 2) {
            if (images[0]) {
                imageElement.setAttribute("src", images[0]);
            }
            return;
        }

        const fadeDurationMs = 800;
        const displayDurationMs = 3000;
        let index = images.indexOf(imageElement.getAttribute("src"));

        if (index === -1) {
            index = 0;
            imageElement.setAttribute("src", images[0]);
        }

        const showNext = () => {
            const nextIndex = (index + 1) % images.length;
            imageElement.classList.add("is-fading-out");

            window.setTimeout(() => {
                const onLoad = () => {
                    imageElement.classList.remove("is-fading-out");
                    index = nextIndex;
                };

                imageElement.addEventListener("load", onLoad, { once: true });
                imageElement.setAttribute("src", images[nextIndex]);
            }, fadeDurationMs);
        };

        window.setInterval(showNext, fadeDurationMs + displayDurationMs);
    };

    document.querySelectorAll("[data-image-folder]").forEach(startSlideshow);
})();
