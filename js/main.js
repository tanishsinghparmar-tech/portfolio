document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor Logic
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    if(cursor && cursorFollower) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;

            // Adding a slight delay to the follower for a smooth trailing effect
            setTimeout(() => {
                cursorFollower.style.left = `${posX}px`;
                cursorFollower.style.top = `${posY}px`;
            }, 100);
        });

        // Add hover effects to all interactive elements
        const interactives = document.querySelectorAll('a, button, input, textarea, .project-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
                cursorFollower.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
                cursorFollower.style.borderColor = 'transparent';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.backgroundColor = 'transparent';
                cursorFollower.style.borderColor = 'rgba(0, 240, 255, 0.5)';
            });
        });
    }

    // Initial Hero Entrance Animation
    gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            }
        });
    });

    // Scroll Reveal for general sections
    gsap.utils.toArray('.section-title, .about-text, .project-card, .timeline-item, .testimonial-card, .stat-card').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Navbar blur and border on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(5, 11, 20, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(0, 240, 255, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling (Optional - Replace with your backend service)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});