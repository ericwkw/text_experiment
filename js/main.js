document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired.');
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const container = document.querySelector('.container'); // Get the container element

    if (nav) {
        console.log('Nav element found.', nav);
    } else {
        console.log('Nav element NOT found.');
    }

    // Load navigation partial
    fetch('partials/navigation.html')
        .then(response => {
            console.log('Fetch response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (nav) {
                nav.innerHTML = data;
                console.log('Navigation HTML loaded and inserted.', data);
            }
        })
        .catch(error => console.error('Error loading navigation:', error));

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});