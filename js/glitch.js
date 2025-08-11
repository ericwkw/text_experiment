const glitchElement = document.querySelector('.glitch');

function animateGlitch() {
    anime({
        targets: glitchElement,
        // Animate the ::before pseudo-element
        '--glitch-before-x': () => anime.random(-10, 10) + 'px',
        '--glitch-before-y': () => anime.random(-10, 10) + 'px',
        // Animate the ::after pseudo-element
        '--glitch-after-x': () => anime.random(-10, 10) + 'px',
        '--glitch-after-y': () => anime.random(-10, 10) + 'px',
        duration: 100, // Fast animation for glitch effect
        easing: 'linear',
        complete: animateGlitch // Loop the animation
    });
}

animateGlitch();