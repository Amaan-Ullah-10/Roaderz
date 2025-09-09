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



// Hero Section Card Slider - GSAP + auto deck effect

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.slider-img');
  let current = 0;
  const total = images.length;
  const duration = 3500; // ms

  function showCard(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
      img.style.zIndex = i === idx ? 2 : 1;
    });
  }

  function nextCard() {
    current = (current + 1) % total;
    showCard(current);
  }

  // Initial
  showCard(current);

  // Animate with GSAP on card change
  setInterval(() => {
    // Animate out current
    gsap.to(images[current], {
      opacity: 0,
      scale: 0.92,
      y: 16,
      duration: 0.65,
      onComplete: () => {
        nextCard();
        gsap.fromTo(images[current],
          { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power2.out" }
        );
      }
    });
  }, duration);
});


// // theme-toggle.js
// // Toggle between dark and light themes and persist in localStorage

// (function () {
//   const themeBtn = document.getElementById('theme-toggle');
//   const html = document.documentElement;
//   const userPref = localStorage.getItem('theme');
//   if (userPref) html.setAttribute('data-theme', userPref);

//   themeBtn.addEventListener('click', function () {
//     const current = html.getAttribute('data-theme');
//     const next = current === 'dark' ? 'light' : 'dark';
//     html.setAttribute('data-theme', next);
//     localStorage.setItem('theme', next);

//     // Optional: animate background theme change (GSAP)
//     gsap.fromTo('body', {opacity: 0.7}, {opacity: 1, duration: 0.55, ease: "power2.inOut"});
//   });
// })();

// // theme-toggle.js
// // Toggle between dark and light themes and persist in localStorage
// const html = document.documentElement;
//     const toggleBtn = document.getElementById('theme-toggle');
//     // On load, set theme from localStorage or system preference
//     function getPreferredTheme() {
//       const stored = localStorage.getItem('theme');
//       if (stored) return stored;
//       return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
//     }
//     function setTheme(theme) {
//       html.setAttribute('data-theme', theme);
//       localStorage.setItem('theme', theme);
//     }
//     setTheme(getPreferredTheme());
//     toggleBtn.addEventListener('click', () => {
//       const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
//       setTheme(next);
//     });

	
// Hero Section Card Slider - GSAP + auto deck effect
document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
  const images = document.querySelectorAll('.slider-img');
    const html = document.documentElement; // Use document.documentElement to apply data-theme
  let current = 0;
  const total = images.length;
  const duration = 3500; // ms
    // Function to get the preferred theme
  function showCard(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
      img.style.zIndex = i === idx ? 2 : 1;
    });
  }
  function nextCard() {
    current = (current + 1) % total;
    showCard(current);
  }
  // Initial
  showCard(current);
  // Animate with GSAP on card change
  setInterval(() => {
    // Animate out current
    gsap.to(images[current], {
      opacity: 0,
      scale: 0.92,
      y: 16,
      duration: 0.65,
      onComplete: () => {
        nextCard();
        gsap.fromTo(images[current],
          { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power2.out" }
        );
      }
    });
  }, duration);
});
// theme-toggle.js
// Toggle between dark and light themes and persist in localStorage
(function () {
  const themeBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const userPref = localStorage.getItem('theme');
  if (userPref) html.setAttribute('data-theme', userPref);
  themeBtn.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    // Optional: animate background theme change (GSAP)
    gsap.fromTo('body', {opacity: 0.7}, {opacity: 1, duration: 0.55, ease: "power2.inOut"});
  });
})();
// theme-toggle.js
// Toggle between dark and light themes and persist in localStorage
const html = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    // On load, set theme from localStorage or system preference
    function getPreferredTheme() {
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem('theme');
      const stored = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
      if (stored) return stored;
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    }
    // Function to set the theme and update the button icon
    function setTheme(theme) {
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
      html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      localStorage.setItem('theme', theme);
        // Update button icons based on the active theme
        const moonIcon = themeToggle.querySelector('.icon-moon');
        const sunIcon = themeToggle.querySelector('.icon-sun');
        if (theme === 'dark') {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
        // Optional: Animate background theme change (requires GSAP to be loaded)
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('body', { opacity: 0.7 }, { opacity: 1, duration: 0.55, ease: "power2.inOut" });
        }
    }
    }
    // Set initial theme on page load
    setTheme(getPreferredTheme());
    setTheme(getPreferredTheme());
    // Add event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      setTheme(next);
    });
    });
});
 