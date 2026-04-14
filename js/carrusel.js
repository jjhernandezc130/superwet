document.addEventListener("DOMContentLoaded", () => {
    const carouselRoot = document.getElementById('sw-carousel');
    if (!carouselRoot) return;

    const slides = carouselRoot.querySelectorAll('.sw-slide');
    let index = 0;
    let started = false;

    function resetAnimations(slide) {
        const texts = slide.querySelectorAll('.sw-text');
        texts.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = '';
        });
    }

    function showSlide(i) {
        slides.forEach(s => s.classList.remove('active'));
        const current = slides[i];
        current.classList.add('active');
        resetAnimations(current);
    }

    const nextBtn = carouselRoot.querySelector('.sw-next');
    if (nextBtn) {
        nextBtn.onclick = () => {
            index = (index + 1) % slides.length;
            showSlide(index);
        };
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                resetAnimations(slides[0]);
                setInterval(() => {
                    index = (index + 1) % slides.length;
                    showSlide(index);
                }, 5000);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(carouselRoot);

    // SWIPE MOBILE
    let startX = 0;
    let endX = 0;

    const carousel = carouselRoot;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // swipe left
                index = (index + 1) % slides.length;
            } else {
                // swipe right
                index = (index - 1 + slides.length) % slides.length;
            }
            showSlide(index);
        }
    }
});
