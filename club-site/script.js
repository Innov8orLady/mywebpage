document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect for Hero Section
    const heroSubtitle = document.querySelector('.typewriter-text');
    const phrases = [
        "CODE. CREATE. CONQUER.",
        "WE BUILD THE FUTURE.",
        "JOIN THE REVOLUTION.",
        "CMP HACK SQUAD"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            heroSubtitle.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            heroSubtitle.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing if element exists
    if (heroSubtitle) {
        typeWriter();
    }

    // 2. Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Glitch Effect on Hover (Random visual corruption)
    const glitchElements = document.querySelectorAll('.hero-title, .section-title');

    glitchElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255,0,0,0.5),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0,0,255,0.5)
            `;
        });

        element.addEventListener('mouseout', () => {
            element.style.textShadow = '2px 2px 0px rgba(0, 255, 0, 0.2)';
        });
    });

    // 4. Matrix Rain Canvas Effect (Optional background)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        // Place canvas behind everything in hero
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.15';
        heroSection.appendChild(canvas);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = Array.from({ length: Math.floor(columns) }).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00aa00'; // Darker green for white bg
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        setInterval(draw, 30);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});
