(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

// Register ScrollTrigger plugin
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Function to set or toggle theme
        function setTheme(theme) {
            const body = document.body;
            const sunIcon = document.getElementById('sun-icon');
            const moonIcon = document.getElementById('moon-icon');

            if (theme === 'dark') {
                body.classList.add('dark');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
                localStorage.setItem('theme', 'light');
            }
        }

        // Initialize theme based on local storage or system preference
        function initializeTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }

        window.onload = function() {
            initializeTheme(); // Set theme on load

            // Only proceed with animations if GSAP is available
            if (typeof gsap === 'undefined') {
                console.warn('GSAP not loaded, skipping animations');
                return;
            }

            // Theme toggle button event listener
            const themeToggleBtn = document.getElementById('theme-toggle');
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener('click', () => {
                    if (document.body.classList.contains('dark')) {
                        setTheme('light');
                    } else {
                        setTheme('dark');
                    }
                });
            }

            // Hero Section Animations
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButton = document.querySelector('.hero-button');

            if (heroTitle) {
                gsap.from(heroTitle, {
                    duration: 1,
                    y: -50,
                    opacity: 0,
                    ease: "power3.out"
                });
            }

            if (heroSubtitle) {
                gsap.from(heroSubtitle, {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    delay: 0.3,
                    ease: "power3.out"
                });
            }

            if (heroButton) {
                gsap.from(heroButton, {
                    duration: 1,
                    scale: 0.8,
                    opacity: 0,
                    delay: 0.6,
                    ease: "back.out(1.7)"
                });
            }

            // Featured Vehicles Cards Animation
            const vehicleCards = document.querySelector('.vehicle-cards');
            if (vehicleCards && typeof ScrollTrigger !== 'undefined') {
                gsap.from(".vehicle-cards > div", {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    stagger: 0.2, // Animate each card with a slight delay
                    ease: "power2.out",
                    scrollTrigger: { // Use ScrollTrigger for elements coming into view
                        trigger: ".vehicle-cards",
                        start: "top 80%", // When the top of the trigger hits 80% of the viewport
                        toggleActions: "play none none none"
                    }
                });
            }

            // How It Works Steps Animation
            const howItWorksSteps = document.querySelector('.how-it-works-steps');
            if (howItWorksSteps && typeof ScrollTrigger !== 'undefined') {
                gsap.from(".how-it-works-steps > div", {
                    duration: 1,
                    x: -50,
                    opacity: 0,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".how-it-works-steps",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }

            // Header fade-in
            const header = document.querySelector('header');
            if (header) {
                gsap.from(header, {
                    duration: 0.8,
                    y: -100,
                    opacity: 0,
                    ease: "power2.out"
                });
            }
        };