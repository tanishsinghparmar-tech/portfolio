document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader & Initialization
    const loader = document.querySelector('.loader');
    
    // Simple loader animation out
    setTimeout(() => {
        gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: initAnimations
        });
    }, 1500);

    function initAnimations() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        initCustomCursor();
        initHeroAnimations();
        initScrollAnimations();
        init3DTilt();
        initCounters();
        initMobileMenu();
    }

    // Mobile Menu
    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links a');

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Custom Cursor
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        
        // Only run on non-touch devices
        if(window.matchMedia("(pointer: fine)").matches) {
            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                // Immediate cursor update
                gsap.set(cursor, { x: mouseX, y: mouseY });
            });

            // Smooth follower
            gsap.ticker.add(() => {
                followerX += (mouseX - followerX) * 0.15;
                followerY += (mouseY - followerY) * 0.15;
                gsap.set(follower, { x: followerX, y: followerY });
            });

            // Hover effects
            const interactables = document.querySelectorAll('a, button, .tool-card, .project-card, .btn-primary, .btn-secondary, .btn-outline');
            
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(follower, { scale: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
                    gsap.to(cursor, { scale: 0, duration: 0.3 });
                });
                
                el.addEventListener('mouseleave', () => {
                    gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
                    gsap.to(cursor, { scale: 1, duration: 0.3 });
                });
            });
        }
    }

    // 3. Hero Animations
    function initHeroAnimations() {
        const tl = gsap.timeline();
        
        tl.from('.hero-title .text-reveal', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        })
        .from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")
        .from('.hero-intro', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from('.hero-cta', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.6")
        .from('.hero-image-wrapper', {
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        }, "-=1.5");

        // Parallax for Hero Image
        gsap.to('.hero-image-container', {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // 4. Scroll Animations
    function initScrollAnimations() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // About Text Scrub (Highlights text as you scroll)
        const scrubTexts = document.querySelectorAll('.scrub-text');
        scrubTexts.forEach(text => {
            gsap.to(text, {
                color: "rgba(255,255,255,1)",
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: true
                }
            });
        });

        // Reveal sections
        const sections = document.querySelectorAll('.section-padding');
        sections.forEach(section => {
            gsap.from(section.querySelector('.section-header'), {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Timeline Line Fill
        gsap.to('.timeline-line::before', {
            height: '100%',
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });

        // Timeline items pop in
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, i) => {
            gsap.from(item, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Projects Stagger
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(card => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // 5. 3D Tilt Effect for Tool Cards
    function init3DTilt() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
                const rotateY = ((x - centerX) / centerX) * 15;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 500,
                    ease: "power1.out",
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    ease: "power3.out",
                    duration: 0.8
                });
            });
        });
    }

    // 6. Animated Counters
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    // 7. Contact Form WhatsApp Redirection
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const whatsappNumber = "+919461551550";
            const text = `Hi Tanish, I'm ${name} (${email}).\n\n${message}`;
            const encodedText = encodeURIComponent(text);
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
            
            contactForm.reset();
        });
    }
});
