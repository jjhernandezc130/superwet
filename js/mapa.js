
document.addEventListener("DOMContentLoaded", function () {
    var swSection = document.getElementById('sw-encuentra-seccion');
    if (!swSection) return;

    // Animaciones
    var elementsToAnimate = swSection.querySelectorAll('.sw-observer');

    var swObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('sw-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });

    elementsToAnimate.forEach(function (el) {
        swObserver.observe(el);
    });

    // Control de video
    var videoContainer = swSection.querySelector('.sw-video-container');
    if (videoContainer) {
        var video = videoContainer.querySelector('.sw-video-element');
        var overlay = videoContainer.querySelector('.sw-video-overlay');

        videoContainer.addEventListener('click', function () {
            if (video.paused) {
                video.muted = false;
                video.play();
                videoContainer.classList.add('playing');
            } else {
                video.pause();
                videoContainer.classList.remove('playing');
            }
        });
    }
});
