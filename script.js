document.addEventListener("DOMContentLoaded", function() {
    const gameListContainer = document.getElementById("gameList");
    const overlay = document.querySelector(".overlay");

    // Fetch game data from JSON file
    fetch('games.json' , { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(games => {
            // Loop through the games array and dynamically create HTML for each game
            games.forEach(game => {
                const gameElement = document.createElement("section");
                gameElement.classList.add("game");

                const gameButton = document.createElement("button");
                gameButton.classList.add("game-button");
                gameButton.addEventListener("click", function() {
                    window.open(game.link, "_blank");
                });

                const tooltip = document.createElement("div");
                tooltip.classList.add("tooltip");
                tooltip.textContent = game.description;

                gameButton.innerHTML = `
                    <img src="${game.image}" alt="${game.title}">
                    <h2>${game.title}</h2>
                `;

                gameButton.appendChild(tooltip);

                gameElement.appendChild(gameButton);
                gameListContainer.appendChild(gameElement);

                gameButton.addEventListener("mouseenter", function() {
                    overlay.style.display = "block";
                    updateOverlayContent(game);
                });

                gameButton.addEventListener("mouseleave", function() {
                    overlay.style.display = "none";
                });
            });
        })
        .catch(error => console.error('Error fetching games.json:', error));

    function updateOverlayContent(game) {
        overlay.innerHTML = `
            <h2>${game.title}</h2>
            <p>${game.description}</p>
        `;
    }
});
