document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card-3d-enhanced');

    if (card) {
        // Automatically flip the card every 3 seconds
        setInterval(() => {
            card.classList.toggle('flipped');
        }, 3000); // Adjust time as needed
    }
});