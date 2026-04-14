
document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // LENIS opcional
    if (typeof Lenis !== "undefined") {
        const lenis = new Lenis({ duration: 1.2 });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);
    }

    //  TIMELINE (reveal + glow, consistente sin depender del viewport)

    const isMobile = window.innerWidth <= 768;

    //  Valores basados en proporción (no en altura de pantalla)
    const isDesktopLarge = window.innerWidth >= 1400;
    const isLaptop = window.innerWidth < 1400 && window.innerWidth > 768;

    //  BALANCE FINAL
    const logoY1 = -5;
    const logoY2 = isMobile ? -20 : (isDesktopLarge ? -35 : (isLaptop ? -160 : -70));

    const productY1 = isMobile ? 15 : 20;
    const productY2 = isMobile ? 20 : (isDesktopLarge ? 40 : (isLaptop ? 160 : 85)); // baja más el bote siempre

    const tlScroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=1400",
            scrub: 1.2,
            pin: true,
            pinSpacing: true /* 🔥 asegura que GSAP agregue espacio automáticamente */
        }
    });

    //  FASE 1
    tlScroll.to(".hero__logo", {
        y: logoY1,
        scale: 1.0,
        ease: "power2.out"
    }, 0);

    tlScroll.to(".hero__product", {
        y: productY1,
        ease: "power2.out"
    }, 0);

    // 🟡 FASE 2
    tlScroll.to(".hero__logo", {
        y: logoY2,
        scale: 1.08,
        filter: "drop-shadow(0 0 20px rgba(195,221,46,0.7)) drop-shadow(0 0 40px rgba(195,221,46,0.5))",
        ease: "power2.out"
    }, 0);

    tlScroll.to(".hero__product", {
        y: productY2,
        scale: 0.97,
        ease: "power2.out"
    }, 0.2);

});
