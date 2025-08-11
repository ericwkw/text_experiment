const timeline = anime.timeline({
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
});

timeline.add({
    targets: '.letter',
    translateX: () => anime.random(-250, 250),
    translateY: () => anime.random(-250, 250),
    translateZ: () => anime.random(-250, 250),
    rotate: () => anime.random(-180, 180),
    duration: 2000,
    delay: anime.stagger(100)
}).add({
    targets: '.letter',
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    duration: 2000,
    delay: anime.stagger(100)
});
