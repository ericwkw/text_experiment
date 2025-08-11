const headline = document.querySelector('.headline');
const text = headline.textContent;
headline.innerHTML = ''; // Clear original text

// Create initial letters
for (let i = 0; i < text.length; i++) {
    const letter = document.createElement('span');
    letter.textContent = text[i];
    letter.classList.add('letter');
    headline.appendChild(letter);
}

const letters = document.querySelectorAll('.letter');

letters.forEach((letter, index) => {
    console.log(`Initializing animation for letter: ${letter.textContent} (index: ${index})`); // Added console.log
    anime.timeline({
        targets: letter,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: index * 20 // Stagger the start of each letter's animation
    })
    .add({
        'font-variation-settings': '"wght" 1',
        duration: 2000,
    })
    .add({
        'font-variation-settings': '"wght" 999',
        duration: 2000,
    });
});