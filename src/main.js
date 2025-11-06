// Providence Backgammon Club - Main JavaScript

// Hero Image Carousel
function initHeroCarousel() {
  const images = document.querySelectorAll('.hero-image');
  let currentIndex = 0;

  if (images.length === 0) return;

  function showNextImage() {
    // Remove active class from current image
    images[currentIndex].classList.remove('active');

    // Move to next image (loop back to start if at end)
    currentIndex = (currentIndex + 1) % images.length;

    // Add active class to new current image
    images[currentIndex].classList.add('active');
  }

  // Change image every 5 seconds
  setInterval(showNextImage, 5000);
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  if (section.id) {
    observer.observe(section);
  }
});

// Add fade-in animation on scroll for feature cards
const featureCards = document.querySelectorAll('.feature-card, .contact-item');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';

      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);

      fadeInObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

featureCards.forEach(card => {
  fadeInObserver.observe(card);
});

// Luma events integration
function initializeLumaEvents() {
  const lumaContainer = document.getElementById('luma-events');

  // Check if Luma embed already exists (iframe or Luma elements)
  const hasLumaContent = lumaContainer.querySelector('iframe') ||
                         lumaContainer.querySelector('[class*="luma"]') ||
                         lumaContainer.querySelector('a[data-luma-action]');

  if (hasLumaContent) {
    console.log('Luma integration detected and loaded');
    // Adjust iframe styling if needed
    const iframe = lumaContainer.querySelector('iframe');
    if (iframe) {
      iframe.style.width = '100%';
      iframe.style.minHeight = '450px';
      iframe.style.border = '1px solid var(--color-border)';
      iframe.style.borderRadius = '8px';
    }
  }
}

// Load Luma checkout button script if needed
function loadLumaCheckoutScript() {
  // Check if any Luma checkout buttons exist
  const lumaButtons = document.querySelectorAll('a[data-luma-action="checkout"]');

  if (lumaButtons.length > 0 && !document.querySelector('script[src*="lu.ma/checkout-button.js"]')) {
    const script = document.createElement('script');
    script.src = 'https://embed.lu.ma/checkout-button.js';
    script.async = true;
    document.body.appendChild(script);
    console.log('Luma checkout button script loaded');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeLumaEvents();
  loadLumaCheckoutScript();
});

console.log('Providence Backgammon Club website loaded successfully!');
