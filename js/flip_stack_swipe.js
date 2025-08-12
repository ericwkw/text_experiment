document.addEventListener('DOMContentLoaded', () => {
    const cardStackContainer = document.querySelector('.card-stack-container');
    let cards = Array.from(document.querySelectorAll('.stack-card'));

    let isSwiping = false;
    let startX;
    let startY;
    let currentCard;
    let initialX;
    let initialY;
    let initialRotation;

    const CARD_WIDTH = 300; // Should match CSS
    const CARD_HEIGHT = 200; // Should match CSS
    const SWIPE_THRESHOLD = CARD_WIDTH / 3; // Distance to commit a swipe

    // Function to initialize card positions and z-index
    function initializeCards() {
        cards.forEach((card, index) => {
            card.style.position = 'absolute';
            card.style.width = `${CARD_WIDTH}px`;
            card.style.height = `${CARD_HEIGHT}px`;
            card.style.top = '0';
            card.style.left = '0';
            card.style.zIndex = cards.length - index; // Top card has highest z-index
            card.style.transform = `translateY(${index * -10}px) rotateX(0deg) rotateY(0deg) rotateZ(${index * 2}deg)`; // Slight offset for stack effect
            card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
            card.style.backfaceVisibility = 'hidden'; // Ensure backface is hidden during 3D transforms
        });
    }

    // Handle mouse/touch start
    function handleStart(e) {
        if (cards.length === 0) return;

        currentCard = cards[0]; // Always interact with the top card
        isSwiping = true;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;

        // Store initial transform values to apply relative changes
        const transformMatrix = new WebKitCSSMatrix(window.getComputedStyle(currentCard).transform);
        initialX = transformMatrix.m41;
        initialY = transformMatrix.m42;
        // For rotation, we might need to parse the string or keep track
        // For simplicity, we'll assume initial rotation is 0 for now and add to it
        initialRotation = 0; // Reset for each swipe

        currentCard.style.transition = 'none'; // Disable transition during drag
        currentCard.style.cursor = 'grabbing';
    }

    // Handle mouse/touch move
    function handleMove(e) {
        if (!isSwiping) return;

        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Apply translation and rotation based on swipe
        const rotation = deltaX / 20; // Adjust sensitivity
        currentCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotateZ(${rotation}deg)`;
    }

    // Handle mouse/touch end
    function handleEnd(e) {
        if (!isSwiping) return;
        isSwiping = false;

        const currentX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const deltaX = currentX - startX;

        currentCard.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out'; // Re-enable transition
        currentCard.style.cursor = 'grab';

        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            // Swipe committed: animate card away and re-order
            const direction = deltaX > 0 ? 1 : -1;
            currentCard.style.transform = `translate(${direction * window.innerWidth}px, ${deltaY * 2}px) rotateZ(${direction * 90}deg)`;
            currentCard.style.opacity = '0';

            currentCard.addEventListener('transitionend', () => {
                // Move card to the end of the array and reset its style
                currentCard.style.transition = 'none';
                currentCard.style.opacity = '1';
                currentCard.style.transform = `translateY(${(cards.length - 1) * -10}px) rotateZ(${(cards.length - 1) * 2}deg)`; // Reset to bottom of stack
                currentCard.style.zIndex = 0; // Temporarily lowest z-index

                cards.shift(); // Remove from front
                cards.push(currentCard); // Add to back

                // Re-initialize all cards to update z-index and slight offsets
                initializeCards();
            }, { once: true });

        } else {
            // Swipe not committed: return card to original position
            currentCard.style.transform = `translateY(0px) rotateZ(0deg)`; // Reset to top of stack
        }
    }

    // Attach event listeners
    cardStackContainer.addEventListener('mousedown', handleStart);
    cardStackContainer.addEventListener('mousemove', handleMove);
    cardStackContainer.addEventListener('mouseup', handleEnd);
    cardStackContainer.addEventListener('mouseleave', handleEnd); // End swipe if mouse leaves container

    cardStackContainer.addEventListener('touchstart', handleStart, { passive: true });
    cardStackContainer.addEventListener('touchmove', handleMove, { passive: true });
    cardStackContainer.addEventListener('touchend', handleEnd);

    // Initial setup
    initializeCards();
});