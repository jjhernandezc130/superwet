
const footer = document.querySelector('#footer');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add('show-footer');
        }
    });
}, { threshold: 0.3 });

observer.observe(footer);
