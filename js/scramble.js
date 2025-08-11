const headline = document.querySelector('.headline');
const textToType = headline.textContent;
headline.innerHTML = ''; // Clear the text initially

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;",.<>/?`~';

function getRandomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
}

// Create span for each letter
for (let i = 0; i < textToType.length; i++) {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = ''; // Start empty
    letterSpan.classList.add('scramble-letter'); // Add a class for targeting
    headline.appendChild(letterSpan);
}

const scrambleLetters = document.querySelectorAll('.scramble-letter');

scrambleLetters.forEach((letterSpan, index) => {
    const targetChar = textToType[index];
    const isSpace = targetChar === ' ';

    if (isSpace) {
        letterSpan.textContent = ' '; // Just set space directly
        return; // Skip animation for spaces
    }

    // Delay the start of each letter's scramble
    setTimeout(() => {
        let scrambleCount = 0;
        const maxScramble = 10; // Number of random characters to cycle through

        const scrambleInterval = setInterval(() => {
            if (scrambleCount < maxScramble) {
                letterSpan.textContent = getRandomChar();
                scrambleCount++;
            } else {
                clearInterval(scrambleInterval);
                letterSpan.textContent = targetChar; // Settle on the correct character
                // Optional: Add a subtle final animation for the correct letter
                anime({
                    targets: letterSpan,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        }, 50); // Speed of scrambling
    }, index * 150); // Stagger delay for each letter to start scrambling
});