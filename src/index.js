console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    fetchDogImages();
    fetchDogBreeds();
});

let allBreeds = []; 


function fetchDogImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.querySelector("#dog-image-container");
            data.message.forEach(imgUrl => {
                const img = document.createElement("img");
                img.src = imgUrl;
                img.alt = "Random Dog";
                img.style.width = "200px";
                img.style.margin = "10px";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching images:", error));
}


function fetchDogBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message); 
            renderBreeds(allBreeds);
            enableFilter(); 
        })
        .catch(error => console.error("Error fetching breeds:", error));
}


function renderBreeds(breeds) {
    const breedList = document.querySelector("#dog-breeds");
    breedList.innerHTML = ""; 

    breeds.forEach(breed => {
        const li = document.createElement("li");
        li.textContent = breed;
        li.style.cursor = "pointer"; 

        li.addEventListener("click", () => {
            li.style.color = "blue";
        });

        breedList.appendChild(li);
    });
}


function enableFilter() {
    const dropdown = document.querySelector("#breed-dropdown");

    dropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;

        if (!selectedLetter || selectedLetter === "all") {
            renderBreeds(allBreeds);
        } else {
            const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
            renderBreeds(filteredBreeds);
        }
    });
}

