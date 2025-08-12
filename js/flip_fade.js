document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container-fade');
    const cardFront = document.querySelector('.card-fade.card-front');
    const cardBack = document.querySelector('.card-fade.card-back');

    if (cardContainer && cardFront && cardBack) {
        cardContainer.addEventListener('click', () => {
            if (cardFront.style.opacity === '0') {
                cardFront.style.opacity = '1';
                cardBack.style.opacity = '0';
            } else {
                cardFront.style.opacity = '0';
                cardBack.style.opacity = '1';
            }
        });
    }
});