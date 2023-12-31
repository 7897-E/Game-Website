document.addEventListener("DOMContentLoaded", function() {
    const gameListContainer = document.getElementById("gameList");
    const overlay = document.querySelector(".overlay");

    // Sample game data (replace with your actual data)
    const games = [
        {
            title: "10 Minutes Till Dawn",
            description: "Survive the night in this thrilling adventure as you navigate through mysterious challenges and unexpected twists.",
            image: "IMG_0503.webp",
            link: "10-mins-till-dawn.html"
        },
        {
            title: "Game 2",
            description: "Description of Game 2",
            image: "game2.jpg",
            link: "https://example.com/game2"
        }
        // Add entries for other games
    ];

    // Loop through the games array and dynamically create HTML for each game
    games.forEach(game => {
        const gameElement = document.createElement("section");
        gameElement.classList.add("game");

        const gameButton = document.createElement("button");
        gameButton.classList.add("game-button");

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

        gameButton.addEventListener("mouseenter", function(event) {
            overlay.style.display = "block";
            updateOverlayContent(game);
            positionOverlay(event, gameButton, overlay);
        });

        gameButton.addEventListener("mouseleave", function() {
            overlay.style.display = "none";
        });

        // Adjusted event listeners to prevent flashing
        overlay.addEventListener("mouseenter", function() {
            overlay.style.display = "block";
        });

        overlay.addEventListener("mouseleave", function() {
            overlay.style.display = "none";
        });
    });

    function updateOverlayContent(game) {
        overlay.innerHTML = `
            <h2>${game.title}</h2>
            <p>${game.description}</p>
        `;
    }
    function positionOverlay(event, gameButton, overlay) {
    const rect = gameButton.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    overlay.style.left = `${rect.left + window.pageXOffset}px`;
    overlay.style.top = `${rect.bottom + scrollTop -100}px`; // Adjust this value as needed
}
    
});
