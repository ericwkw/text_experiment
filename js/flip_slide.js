document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container-slide');
    const cardFront = document.querySelector('.card-slide.card-front');
    const cardBack = document.querySelector('.card-slide.card-back');

    if (cardContainer && cardFront && cardBack) {
        cardContainer.addEventListener('click', () => {
            if (cardFront.style.transform === 'translateX(-100%)') {
                cardFront.style.transform = 'translateX(0)';
                cardBack.style.transform = 'translateX(100%)';
            } else {
                cardFront.style.transform = 'translateX(-100%)';
                cardBack.style.transform = 'translateX(0)';
            }
        });
    }
});