(function () {
    const section = document.querySelector('.sw-crecemos');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('is-visible');

                setTimeout(() => {
                    section.classList.add('is-animated');
                }, 1700);

                observer.unobserve(section);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(section);
})();