/**
 * Lucas Pauwels Golf - Interactive JavaScript
 * Award-winning website for rising golf star
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');
const golfBallContainer = document.getElementById('golfBallContainer');
const contactForm = document.getElementById('contactForm');

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initGolfBalls();
    initNavigation();
    initScrollEffects();
    initScrollReveal();
    initStatCounters();
    initFormValidation();
    initSmoothScroll();
});

// ============================================
// Golf Ball Background Animation
// ============================================
function initGolfBalls() {
    const ballCount = 15;
    
    for (let i = 0; i < ballCount; i++) {
        createGolfBall();
    }
}

function createGolfBall() {
    const ball = document.createElement('div');
    ball.className = 'golf-ball';
    
    // Random position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 15 + 10;
    
    // Random animation duration
    const duration = Math.random() * 15 + 15;
    
    // Random delay
    const delay = Math.random() * 10;
    
    ball.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    golfBallContainer.appendChild(ball);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
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
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-container, .about-image-container, .about-content, '
        + '.stats-container, .stat-card, .sponsor-hero, .tier-card, '
        + '.contact-container, .contact-info, .contact-form-container, '
        + '.achievement-card, .current-sponsors'
    );
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('reveal', 'active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// ============================================
// Stat Counters Animation
// ============================================
function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.stat-ring-progress');
                const percentElement = entry.target.querySelector('.stat-percent');
                
                if (progressBar && percentElement) {
                    const percent = parseInt(percentElement.textContent);
                    animateStat(progressBar, percent, percentElement);
                }
                
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => statObserver.observe(card));
}

function animateStat(progressBar, targetPercent, percentElement) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (targetPercent / 100) * circumference;
    
    let currentPercent = 0;
    const increment = targetPercent / 100;
    
    const timer = setInterval(() => {
        currentPercent += increment;
        
        if (currentPercent >= targetPercent) {
            currentPercent = targetPercent;
            clearInterval(timer);
        }
        
        const currentOffset = circumference - (currentPercent / 100) * circumference;
        progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
        progressBar.style.strokeDashoffset = currentOffset;
        percentElement.textContent = `${Math.round(currentPercent)}%`;
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
            <i class="fas fa-spinner fa-spin"></i>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission({ name, email, subject, message });
            
            // Show success
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
    // Remove existing alerts
    const existingAlert = contactForm.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();
    
    // Create error alert
    const alert = document.createElement('div');
    alert.className = 'form-alert error';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the alert
    alert.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background: rgba(255, 0, 0, 0.1);
        border: 1px solid rgba(255, 0, 0, 0.3);
        border-radius: 10px;
        color: #ff6b6b;
        margin-bottom: 20px;
        font-size: 0.95rem;
        animation: slideDown 0.3s ease;
    `;
    
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

function showFormSuccess(message) {
    // Remove existing alerts
    const existingAlert = contactForm.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();
    
    // Create success alert
    const alert = document.createElement('div');
    alert.className = 'form-alert success';
    alert.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the alert
    alert.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid rgba(0, 255, 0, 0.3);
        border-radius: 10px;
        color: #00ff88;
        margin-bottom: 20px;
        font-size: 0.95rem;
        animation: slideDown 0.3s ease;
    `;
    
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
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
// Image Stack Animation on Hover
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const imageStack = document.querySelector('.image-stack');
    
    if (imageStack) {
        imageStack.addEventListener('mousemove', (e) => {
            const items = imageStack.querySelectorAll('.image-stack-item');
            const rect = imageStack.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            items.forEach((item, index) => {
                const speed = (index + 1) * 0.5;
                const xOffset = (x - rect.width / 2) / rect.width * speed * 20;
                const yOffset = (y - rect.height / 2) / rect.height * speed * 20;
                
                item.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1)`;
            });
        });
        
        imageStack.addEventListener('mouseleave', () => {
            const items = imageStack.querySelectorAll('.image-stack-item');
            items.forEach(item => {
                item.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
});

// ============================================
// Tier Card Hover Effect
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const tierCards = document.querySelectorAll('.tier-card');
    
    tierCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// ============================================
// Typing Effect for Hero Tagline
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.hero-tagline');
    
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.visibility = 'visible';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after hero animations
        setTimeout(typeWriter, 1500);
    }
});

// ============================================
// CSS Animations Keyframes (for JS-injected elements)
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Performance Optimization
// ============================================
// Lazy load images (if added later)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
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
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c Lucas Pauwels Golf %c
%c Rising Star in Golf %c

%c Driving Ambition. Perfecting Precision. Chasing Greatness. %c

%c Interested in sponsorship? Contact: lucas.pauwels@golfpro.com %c
`, 
'background: #c8a86b; color: #1a2e2e; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
'',
'background: #2d5a5a; color: #ffffff; font-size: 14px; padding: 5px 15px; border-radius: 3px;',
'',
'background: #1a2e2e; color: #c8a86b; font-size: 12px; padding: 10px; border-radius: 3px; font-style: italic;',
'',
'background: #2d5a5a; color: #ffffff; font-size: 10px; padding: 5px; border-radius: 3px;',
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
    }
});

// ============================================
// Touch Support for Mobile
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
        if (diff > 0) {
            // Swipe left - could navigate to next section
        } else {
            // Swipe right - could navigate to previous section
        }
    }
}
