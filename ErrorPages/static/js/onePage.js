const titulos = [
    "Poster Ado", "Peluche de ado Orihara", "Peluche de Abo",
    "Peluche de Ado Hibana", "Poster de Uta", "Playera de Ado Hibana",
    "Sweater de Ado Hibana", "Chaqueta de Ado Hibana", "Best Adobum ", "Vinilo Kyougen"
];

const descripciones = [
    "poster 200x200 de Adomination.",
    "Peluche oficial de Ado.",
    "Peluche oficial de Abo.",
    "Peluche de Ado Tour mundial Hibana.",
    "Poster de la pelicula Film Red.",
    "Playera de Ado Tour mundial Hibana.",
    "Sweater de Ado Tour mundial Hibana.",
    "Chaqueta de Ado Tour mundial Hibana.",
    "CD Best Adobum oficial.",
    "Vinilo Kyougen oficial."
];

const imagenes = window.staticImages;

const container = document.getElementById("cards-container");
const loadingIndicator = document.getElementById("loading-indicator");
const endMessage = document.getElementById("end-message");

const MAX_CARDS = 100;
const BATCH_SIZE = 12;
let loadedCards = 0;
let isLoading = false;

let currentIndex = 0;

function createCard() {
    
    const index = currentIndex % titulos.length;
    currentIndex++;
    
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3 mb-4";

    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${imagenes[index]}"
                 class="card-img-top"
                 alt="${titulos[index]}"
                 style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${titulos[index]}</h5>
                <p class="card-text flex-grow-1">${descripciones[index]}</p>
                <a href="#" class="btn btn-primary btn-sm mt-auto">Ver más</a>
            </div>
        </div>
    `;

    return col;
}

function loadCards() {
    if (isLoading || loadedCards >= MAX_CARDS) return;

    isLoading = true;
    loadingIndicator.style.display = 'block';

    setTimeout(() => {
        const toLoad = Math.min(BATCH_SIZE, MAX_CARDS - loadedCards);
        
        for (let i = 0; i < toLoad; i++) {
            container.appendChild(createCard());
            loadedCards++;
        }

        if (loadedCards >= MAX_CARDS) {
            endMessage.style.display = 'block';
        }

        isLoading = false;
        loadingIndicator.style.display = 'none';
    }, 300);
}

function isNearBottom() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    return (scrollTop + windowHeight) >= (documentHeight - 100);
}

let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        if (isNearBottom() && !isLoading && loadedCards < MAX_CARDS) {
            loadCards();
        }
    }, 150);
}

loadCards();

window.addEventListener("scroll", handleScroll);

window.addEventListener("load", () => {
    if (isNearBottom() && !isLoading && loadedCards < MAX_CARDS) {
        loadCards();
    }
});