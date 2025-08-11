const timeline = anime.timeline({
    loop: true,
    easing: 'easeInOutQuad',
});

timeline
    .add({
        targets: '.headline1 .letter',
        rotateX: [0, 360],
        duration: 1500,
        delay: anime.stagger(100),
    })
    .add({
        targets: '.headline2 .letter',
        rotateX: [0, 360],
        duration: 1500,
        delay: anime.stagger(100),
        offset: '-=1200',
    })
    .add({
        targets: '.headline3 .letter',
        rotateX: [0, 360],
        duration: 1500,
        delay: anime.stagger(100),
        offset: '-=1200',
    });