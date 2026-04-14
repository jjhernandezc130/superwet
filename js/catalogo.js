document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById('promoBanner');
    if (!banner) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                banner.classList.add('is-visible');
                observer.unobserve(banner);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(banner);

    // 🔥 Parallax ligero (solo cuando es visible)
    let ticking = false;

    function onScrollParallax() {
        if (!banner.classList.contains('is-visible')) return;

        const rect = banner.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;

        // progreso dentro del viewport (-1 a 1 aprox)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;

        // valores suaves
        const glowY = progress * -20;     // fondo se mueve más
        const productY = progress * -10;  // producto menos
        const textY = progress * -6;      // texto aún más sutil

        const glow = banner.querySelector('.bg-glow');
        const product = banner.querySelector('.product-main');
        const text = banner.querySelector('.promo-title-img');

        if (glow) glow.style.transform = `translate(-50%, -50%) translateY(${glowY}px)`;
        if (product) product.style.transform = `scale(1.08) translateY(${productY}px)`;
        if (text) text.style.transform = `translateY(${textY}px)`;

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScrollParallax);
            ticking = true;
        }
    });
});
