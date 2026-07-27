/**
 * L P Golf - Clean JavaScript
 * Minimal, professional, anonymous
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initScrollReveal();
    initStatAnimations();
    initFormValidation();
    initSmoothScroll();
});

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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .about-image, .about-content, '
        + '.stats-grid, .stat-card, .sponsor-intro, .tier-card, '
        + '.contact-grid, .contact-info, .contact-form-wrapper, '
        + '.feature-item, .footer'
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
            
            showFormSuccess('Message sent successfully!');
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
// Console Easter Egg
// ============================================
console.log(`
%c L P Golf %c
%c Clean. Professional. Anonymous. %c

%c Stats: 295yds | 78% | 71.2 Avg %c

%c contact@lp-golf.com %c
`, 
'background: #00ff88; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
'',
'background: #121212; color: #ffffff; font-size: 14px; padding: 5px 15px; border-radius: 3px;',
'',
'background: #121212; color: #00ff88; font-size: 12px; padding: 10px; border-radius: 3px; font-style: italic;',
'',
'background: #121212; color: #ffffff; font-size: 10px; padding: 5px; border-radius: 3px;',
''
);
