// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const notificationBell = document.getElementById('notification-bell');
const notificationBadge = document.querySelector('.notification-badge');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all features
function initializeApp() {
    setCurrentYear();
    initializeTheme();
    initializeNavigation();
    initializeNotifications();
    initializeContactForm();
    initializeScrollAnimations();
}

// Set current year in footer
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Theme Management
function initializeTheme() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Navigation Management
function initializeNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section link
                correspondingLink.classList.add('active');
            }
        }
    });
}

function closeMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
}

// Notifications Management
function initializeNotifications() {
    // Show notification badge on page load (simulate new content)
    setTimeout(() => {
        showNotification();
    }, 2000);
    
    // Notification bell click handler
    if (notificationBell) {
        notificationBell.addEventListener('click', handleNotificationClick);
    }
}

function showNotification() {
    if (notificationBadge) {
        notificationBadge.classList.add('active');
    }
}

function hideNotification() {
    if (notificationBadge) {
        notificationBadge.classList.remove('active');
    }
}

function handleNotificationClick() {
    // Hide the notification badge
    hideNotification();
    
    // Show notification alert
    showCustomAlert(
        'Nouvelles actualités !',
        'Découvrez mes derniers articles sur le blog et mes nouveaux projets portfolio.',
        'info'
    );
    
    // Scroll to blog section
    const blogSection = document.querySelector('#blog');
    if (blogSection) {
        const offsetTop = blogSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Custom Alert System
function showCustomAlert(title, message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;
    
    alert.innerHTML = `
        <div class="d-flex align-items-start">
            <div class="me-3">
                <i class="fas fa-${getAlertIcon(type)} fs-4"></i>
            </div>
            <div class="flex-grow-1">
                <h6 class="alert-heading mb-1">${title}</h6>
                <p class="mb-0 small">${message}</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.remove('show');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 150);
        }
    }, 5000);
}

function getAlertIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'danger': 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
}

// Contact Form Management
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name') || document.getElementById('name').value,
        email: formData.get('email') || document.getElementById('email').value,
        subject: formData.get('subject') || document.getElementById('subject').value,
        message: formData.get('message') || document.getElementById('message').value
    };
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showCustomAlert(
            'Message envoyé !',
            `Merci ${data.name}, votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.`,
            'success'
        );
        
        // Reset form
        contactForm.reset();
        clearAllFieldErrors();
        
    }, 2000);
}

function validateContactForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Veuillez entrer une adresse email valide');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject || data.subject.trim().length < 3) {
        showFieldError('subject', 'Le sujet doit contenir au moins 3 caractères');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field.id);
    
    switch (field.id) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError('email', 'Veuillez entrer une adresse email valide');
            }
            break;
        case 'subject':
            if (value.length < 3) {
                showFieldError('subject', 'Le sujet doit contenir au moins 3 caractères');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Le message doit contenir au moins 10 caractères');
            }
            break;
    }
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(fieldId) {
    const field = typeof fieldId === 'string' ? document.getElementById(fieldId) : fieldId;
    if (!field) return;
    
    field.classList.remove('is-invalid');
    const errorMessage = field.parentNode.querySelector('.invalid-feedback');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearAllFieldErrors() {
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldId => clearFieldError(fieldId));
}

// Scroll Animations
function initializeScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.project-card, .blog-card');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced scroll listener for performance
const debouncedScrollHandler = debounce(updateActiveNavLink, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible, check for new notifications
        setTimeout(showNotification, 1000);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Enter key on notification bell
    if (e.key === 'Enter' && e.target === notificationBell) {
        handleNotificationClick();
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setTheme,
        validateContactForm,
        showCustomAlert
    };
}