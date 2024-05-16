document.addEventListener('DOMContentLoaded', () => {
    const left = document.querySelector(".left");

    function addCard({ imageUrl, name, address, distance_km }) {
        return `
        <div class="card">
            <img src="${imageUrl}" alt="">
            <div class="card-cont">
                <div class="name">${name}</div>
                <div class="address">${address}</div>
                <div class="distance">${distance_km}</div>
            </div>
        </div>
        `;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function loadCards() {
        try {
            const response = await fetch('data.json');
            const arr = await response.json();
            const shuffledArr = shuffleArray([...arr]);
            left.innerHTML += shuffledArr.map(addCard).join('');
        } catch (error) {
            console.error('Error loading cards:', error);
            left.innerHTML = `<h1>No Result Found</h1>`;
        }
    }

    function search(query, arr) {
        const results = arr.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        left.innerHTML = results.length > 0 ? results.map(addCard).join('') : `<h1>No Result Found</h1>`;
    }

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.ham').classList.toggle('hide');
    });

    document.querySelector('.searchBtn').addEventListener('click', async () => {
        const searchInput = document.getElementById('s').value;
        try {
            const response = await fetch('data.json');
            const arr = await response.json();
            search(searchInput, arr);
        } catch (error) {
            console.error('Error performing search:', error);
            left.innerHTML = `<h1>Error performing search</h1>`;
        }
    });

    // Load cards on page load
    loadCards();
});
const ham = document.querySelector('.ham');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    ham.classList.toggle('hide');
});