const headline = document.querySelector('.headline');

const letters = document.querySelectorAll('.letter');

const timeline = anime.timeline({
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
});

timeline.add({
    targets: '.letter',
    opacity: [0, 1],
    filter: ['blur(10px)', 'blur(0px)'],
    duration: 2000,
    delay: anime.stagger(100),
});