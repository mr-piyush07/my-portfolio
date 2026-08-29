/* ==========================================================================
   Piyush Kushwah Portfolio JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Smooth Anchor Scroll Handling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, { offset: -80, duration: 1.5 });
                }
            });
        });
    }

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Interactive Glass Card Hover Mouse Glow Effect
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });

    // 4. Live Digital Clock in Footer
    const clockElement = document.getElementById('digital-clock');
    if (clockElement) {
        function updateDigitalClock() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // '0' should be '12'
            const formattedHours = String(hours).padStart(2, '0');
            
            clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
        }
        updateDigitalClock();
        setInterval(updateDigitalClock, 1000);
    }
});
