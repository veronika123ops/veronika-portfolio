/**
 * VERONIKA WANG - PORTFOLIO WEBSITE
 * Interactive JavaScript Features
 */

// ===== Welcome Alert on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome message only on first visit (using sessionStorage)
    if (!sessionStorage.getItem('welcomed')) {
        setTimeout(function() {
            showWelcomeMessage();
        }, 1000);
        sessionStorage.setItem('welcomed', 'true');
    }
    
    // Initialize all interactive features
    initNavbarScroll();
    initSmoothScroll();
    initAnimateOnScroll();
});

// ===== Welcome Message Function =====
function showWelcomeMessage() {
    // Create a custom toast notification instead of alert
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi bi-stars"></i>
            <span>Thanks for visiting my portfolio! Feel free to explore.</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles for the toast
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #9b7bb8 0%, #e8b4b8 100%);
        color: white;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(155, 123, 184, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease;
        max-width: 350px;
    `;
    
    const toastContent = toast.querySelector('.toast-content');
    toastContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
    `;
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        opacity: 0.8;
        transition: opacity 0.3s;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        if (toast.parentElement) {
            toast.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => toast.remove(), 500);
        }
    }, 5000);
}

// ===== Toggle Details Button Function =====
function toggleDetails(button) {
    const hiddenContent = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (hiddenContent.style.display === 'none') {
        hiddenContent.style.display = 'block';
        button.innerHTML = '<i class="bi bi-dash-circle"></i> Show Less';
    } else {
        hiddenContent.style.display = 'none';
        button.innerHTML = '<i class="bi bi-plus-circle"></i> Show More Details';
    }
}

// ===== Navbar Scroll Effect =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ===== Animate Elements on Scroll =====
function initAnimateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animateElements = document.querySelectorAll(
        '.skill-card, .award-card, .program-card, .experience-card, ' +
        '.leadership-card, .timeline-item, .interest-card, .stat-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add the animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== Contact Form Validation =====
function validateForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const formSuccess = document.getElementById('formSuccess');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const message = document.getElementById('message');
    
    // Reset previous error states
    email.classList.remove('is-invalid');
    emailError.style.display = 'none';
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate email format
    if (!emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        emailError.style.display = 'block';
        email.focus();
        return false;
    }
    
    // Check all required fields
    if (!firstName.value.trim() || !lastName.value.trim() || !message.value.trim()) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    // If validation passes, show success message
    formSuccess.style.display = 'block';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(function() {
        formSuccess.style.display = 'none';
    }, 5000);
    
    return false;
}

// ===== Typing Effect for Hero (Optional Enhancement) =====
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const roles = ['Engineer', 'AI Researcher', 'Innovator', 'Leader'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        
        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typeSpeed);
    }
    
    // Uncomment to enable typing effect
    // type();
}

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const isDecimal = counter.textContent.includes('.');
        const suffix = counter.textContent.replace(/[\d.]/g, '');
        
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation when DOM is ready
document.addEventListener('DOMContentLoaded', animateCounters);

// ===== Active Navigation Highlight =====
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNav);

// ===== Mobile Menu Close on Click =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});

// ===== Console Easter Egg =====
console.log('%c🚀 Welcome to Veronika Wang\'s Portfolio!', 
    'color: #9b7bb8; font-size: 20px; font-weight: bold;');
console.log('%cBuilding the future with AI, robotics, and innovation.', 
    'color: #e8b4b8; font-size: 14px;');
