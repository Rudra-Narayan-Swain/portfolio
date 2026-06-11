/* ===================================
   Portfolio JS - Rudra Narayan Swain
   =================================== */

// ─── Typed Text Animation ───────────────────────────────────────────────────
const typedElement = document.getElementById('typed-text');
const phrases = [
  'Full Stack Developer',
  'MERN Stack Expert',
  'React & Node.js Dev',
  'Python Developer',
  'Problem Solver'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (!typedElement) return;
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}

// ─── Navbar Scroll Behavior ──────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTopBtn.style.display = 'flex';
  } else {
    navbar.classList.remove('scrolled');
    backToTopBtn.style.display = 'none';
  }
});

// ─── Active Nav Link on Scroll ───────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));

// ─── Mobile Menu Toggle ──────────────────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ─── Skill Bars Animation ────────────────────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth + '%';
      skillBarObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillBarObserver.observe(bar));

// ─── Scroll Reveal / Fade-in Animation ──────────────────────────────────────
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

const revealTargets = document.querySelectorAll(
  '.glass-card, .section-header, .exp-item, .edu-card, .contact-item'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

// ─── Lightbox Modal (Images & Videos) ───────────────────────────────────────
const modal = document.getElementById('media-modal');
const modalImg = document.getElementById('modal-img');
const modalVideoWrapper = document.getElementById('modal-video-wrapper');
const modalVideo = document.getElementById('modal-video');
const modalTitleText = document.getElementById('modal-title-text');
const modalDescText = document.getElementById('modal-desc-text');

/**
 * Open modal with an image
 * @param {string} src - Image file path
 * @param {string} title - Modal title
 * @param {string} desc - Optional description
 */
function openImageModal(src, title, desc = '') {
  modal.classList.add('active');
  modalImg.src = src;
  modalImg.alt = title;
  modalImg.style.display = 'block';
  modalVideoWrapper.style.display = 'none';
  modalTitleText.textContent = title;
  modalDescText.textContent = desc;
  document.body.style.overflow = 'hidden';
}

/**
 * Open modal with a video
 * @param {string} src - Video file path
 * @param {string} title - Modal title
 * @param {string} desc - Optional description
 */
function openVideoModal(src, title, desc = '') {
  modal.classList.add('active');
  modalImg.style.display = 'none';
  modalVideoWrapper.style.display = 'block';
  modalVideo.querySelector('source').src = src;
  modalVideo.load();
  modalTitleText.textContent = title;
  modalDescText.textContent = desc;
  document.body.style.overflow = 'hidden';
}

/**
 * Open placeholder info (when no real media added yet)
 */
function openMediaPlaceholder(title, message) {
  showToast(`📁 ${message}`, 'info', 5000);
}

function openCertPlaceholder(title) {
  showToast(`📜 To add your certificate: place the image in the assets/ folder and update the HTML comment in the certificates section.`, 'info', 6000);
}

function closeModal() {
  modal.classList.remove('active');
  modalVideo.pause();
  document.body.style.overflow = '';
}

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── Contact Form Simulation ─────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formMessageStatus = document.getElementById('form-message-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const msg = document.getElementById('form-message').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  const submitBtn = document.getElementById('btn-send-message');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate async send (replace with actual EmailJS/FormSpree/backend call)
  setTimeout(() => {
    formMessageStatus.className = 'form-message success';
    formMessageStatus.textContent = `✅ Thank you, ${name}! Your message has been received. I'll get back to you soon.`;
    contactForm.reset();
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
  }, 1800);
});

// ─── Toast Notification System ───────────────────────────────────────────────
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  #toast-container {
    position: fixed;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
    pointer-events: none;
  }
  .toast {
    background: #1e293b;
    border: 1px solid rgba(99,102,241,0.3);
    color: #f8fafc;
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    max-width: 420px;
    text-align: center;
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    animation: toast-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    pointer-events: all;
  }
  .toast.error {
    border-color: rgba(239,68,68,0.4);
    background: #1f1215;
  }
  .toast.info {
    border-color: rgba(6,182,212,0.3);
  }
  .toast.out {
    animation: toast-out 0.3s ease forwards;
  }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes toast-out {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to   { opacity: 0; transform: translateY(10px) scale(0.95); }
  }
`;
document.head.appendChild(toastStyle);

const toastContainer = document.createElement('div');
toastContainer.id = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(message, type = 'default', duration = 3500) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─── Initialize on Load ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
});
