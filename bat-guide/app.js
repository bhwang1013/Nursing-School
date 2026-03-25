/* =============================================
   Brazilian Free-Tailed Bat — app.js
   ============================================= */

// Smooth active nav highlighting on scroll
(function () {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();
