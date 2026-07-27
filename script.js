/**
 * Lucas Pauwels Golf - Modern JavaScript
 * Ultra-contemporary animations and interactions
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');
const particlesContainer = document.getElementById('particles');
const contactForm = document.getElementById('contactForm');
const typingText = document.getElementById('typingText');

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initScrollEffects();
    initScrollReveal();
    initTypingEffect();
    initStatAnimations();
    initFormValidation();
    initSmoothScroll();
    initHoverEffects();
});

// ============================================
// Particles Background
// ============================================
function initParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particle.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
    `;
    
    particlesContainer.appendChild(particle);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .about-image, .about-content, '
        + '.stats-grid, .stat-card, .sponsor-hero, .tier-card, '
        + '.contact-grid, .contact-info, .contact-form-wrapper, '
        + '.content-card, .footer'
    );
    
    const revealOnScroll = () => {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in-up', 'active');
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// ============================================
// Typing Effect
// ============================================
function initTypingEffect() {
    if (!typingText) return;
    
    const texts = [
        "European Tour Rising Star",
        "Belgian Golf Prodigy",
        "Future Major Champion",
        "Driving for Greatness"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1500);
}

// ============================================
// Stat Animations
// ============================================
function initStatAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.stat-progress');
                
                if (progressBar) {
                    const progress = progressBar.style.getPropertyValue('--progress');
                    animateProgress(progressBar, progress);
                }
                
                // Add glow effect
                entry.target.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.1)';
                
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => statObserver.observe(card));
}

function animateProgress(progressBar, targetProgress) {
    let currentProgress = 0;
    const target = parseFloat(targetProgress) || 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        currentProgress += increment;
        
        if (currentProgress >= target) {
            currentProgress = target;
            clearInterval(timer);
        }
        
        progressBar.style.setProperty('--progress', `${currentProgress}%`);
    }, 20);
}

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-form');
        const originalText = submitBtn.innerHTML;
        
        // Validate form
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormError('Please fill in all required fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60 100"/>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission
        try {
            await simulateFormSubmission({ name, email, subject, message });
            
            showFormSuccess('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        } catch (error) {
            showFormError('Something went wrong. Please try again later.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormError(message) {
    removeFormAlert();
    
    const alert = document.createElement('div');
    alert.className = 'form-alert error';
    alert.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${message}</span>
    `;
    
    styleAlert(alert, '#ff4444', 'rgba(255, 68, 68, 0.1)', 'rgba(255, 68, 68, 0.3)');
    
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    autoRemoveAlert(alert);
}

function showFormSuccess(message) {
    removeFormAlert();
    
    const alert = document.createElement('div');
    alert.className = 'form-alert success';
    alert.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>${message}</span>
    `;
    
    styleAlert(alert, '#00ff88', 'rgba(0, 255, 136, 0.1)', 'rgba(0, 255, 136, 0.3)');
    
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    autoRemoveAlert(alert);
}

function styleAlert(alert, color, bg, border) {
    alert.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: ${bg};
        border: 1px solid ${border};
        border-radius: 12px;
        color: ${color};
        margin-bottom: 20px;
        font-size: 0.95rem;
        animation: slideDown 0.3s ease;
    `;
    
    alert.querySelector('svg')?.setAttribute('style', `width: 20px; height: 20px; flex-shrink: 0;`);
}

function removeFormAlert() {
    const existingAlert = contactForm.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();
}

function autoRemoveAlert(alert) {
    setTimeout(() => {
        alert.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Submission failed'));
            }
        }, 1500);
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Hover Effects
// ============================================
function initHoverEffects() {
    // Card tilt effect
    const cards = document.querySelectorAll('.stat-card, .tier-card, .content-card, .image-wrapper');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// CSS Animations
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .spinner {
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// ============================================
// Performance Optimization
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c Lucas Pauwels Golf %c
%c Modern. Sleek. Professional. %c

%c Stats: 295yds Drive | 78% Accuracy | 71.2 Avg Score %c

%c Interested in sponsorship? Contact: lucas@pauwelsgolf.com %c
`, 
'background: #00ff88; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
'',
'background: #141414; color: #ffffff; font-size: 14px; padding: 5px 15px; border-radius: 3px;',
'',
'background: #141414; color: #00ff88; font-size: 12px; padding: 10px; border-radius: 3px; font-style: italic;',
'',
'background: #141414; color: #ffffff; font-size: 10px; padding: 5px; border-radius: 3px;',
''
);

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Touch Support
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Could implement section navigation here
    }
}

// ============================================
// Preloader (Optional)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
