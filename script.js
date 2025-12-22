// ==================== Card Opening Functionality ====================
const cardBook = document.getElementById('cardBook');
const celebrateBtn = document.getElementById('celebrateBtn');
const confettiContainer = document.getElementById('confettiContainer');
const ageNumber = document.getElementById('ageNumber');

let isOpened = false;

// Open/close card on click
cardBook.addEventListener('click', (e) => {
    // Don't toggle if clicking the celebrate button
    if (e.target.closest('#celebrateBtn')) {
        return;
    }

    isOpened = !isOpened;
    cardBook.classList.toggle('opened');

    // Play opening sound effect
    playOpenSound();
});

// ==================== Confetti Animation ====================
function createConfetti() {
    const colors = ['#ffd700', '#f4c430', '#daa520', '#ffeb3b', '#ffc107', '#ffb300'];
    const confettiCount = 60;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            // Random shapes
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '5px solid transparent';
                confetti.style.borderRight = '5px solid transparent';
                confetti.style.borderBottom = `10px solid ${confetti.style.background}`;
                confetti.style.background = 'transparent';
            }

            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

// Celebrate button click
celebrateBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card from opening/closing
    createConfetti();
    animateCelebration();
});

// ==================== Celebration Animation ====================
function animateCelebration() {
    // Add celebration class for extra animations
    celebrateBtn.style.transform = 'scale(0.95)';

    setTimeout(() => {
        celebrateBtn.style.transform = 'scale(1)';
    }, 200);

    // Animate age number
    const currentAge = parseInt(ageNumber.textContent);
    animateNumber(ageNumber, currentAge, currentAge, 1000);
}

// ==================== Number Animation ====================
function animateNumber(element, start, end, duration) {
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
            element.style.transform = `scale(${1 + Math.sin(progress * Math.PI * 4) * 0.2})`;
            requestAnimationFrame(animate);
        } else {
            element.style.transform = 'scale(1)';
        }
    }

    requestAnimationFrame(animate);
}

// ==================== Sound Effects (Web Audio API) ====================
function playOpenSound() {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator for opening sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = isOpened ? 500 : 350;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// ==================== Keyboard Accessibility ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement === cardBook) {
            isOpened = !isOpened;
            cardBook.classList.toggle('opened');
            playOpenSound();
        }
    }
});

// Make card focusable
cardBook.setAttribute('tabindex', '0');
cardBook.setAttribute('role', 'button');
cardBook.setAttribute('aria-label', 'Open birthday card');

// ==================== Random Age Generator (Optional) ====================
// Uncomment to randomize age on page load
// window.addEventListener('load', () => {
//     const randomAge = Math.floor(Math.random() * 50) + 18;
//     ageNumber.textContent = randomAge;
// });

// ==================== Auto-open on first visit (Optional) ====================
// Uncomment to auto-open card after 2 seconds on first load
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         if (!isOpened) {
//             isOpened = true;
//             cardBook.classList.add('opened');
//             playOpenSound();
//         }
//     }, 2000);
// });

// ==================== Particle Effects on Hover ====================
let particleInterval;

cardBook.addEventListener('mouseenter', () => {
    particleInterval = setInterval(() => {
        createHoverParticle();
    }, 100);
});

cardBook.addEventListener('mouseleave', () => {
    clearInterval(particleInterval);
});

function createHoverParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.background = '#ffd700';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = '0.7';
    particle.style.animation = 'particleFade 1s ease-out forwards';
    particle.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.6)';

    cardBook.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add particle fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% { opacity: 0.7; transform: scale(1); }
        100% { opacity: 0; transform: scale(2); }
    }
`;
document.head.appendChild(style);

// ==================== Performance Optimization ====================
// Reduce animations on low-performance devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.setProperty('--animation-duration', '0.01s');
}

// ==================== Console Easter Egg ====================
console.log('%c🎉 Happy Birthday! 🎂', 'font-size: 24px; color: #daa520; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cThis card was made with ❤️ using modern web technologies!', 'font-size: 14px; color: #f4c430;');
