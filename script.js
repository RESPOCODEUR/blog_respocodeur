// Éléments DOM
const themeToggle = document.getElementById('theme-toggle');
const notificationBell = document.getElementById('notification-bell');
const notificationBadge = document.querySelector('.notification-badge');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');
const navLinks = document.querySelectorAll('.nav-link');
const notificationBanner = document.getElementById('notification-banner');
const allowNotificationsBtn = document.getElementById('allow-notifications');
const denyNotificationsBtn = document.getElementById('deny-notifications');

// Variables globales
let notificationsEnabled = false;
let lastUpdateCheck = localStorage.getItem('lastUpdateCheck') || Date.now();

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 RESPOCODEUR - Initialisation...');
    initializeApp();
});

// Fonction principale d'initialisation
function initializeApp() {
    setCurrentYear();
    initializeTheme();
    initializeNavigation();
    initializeNotificationSystem();
    initializeContactForm();
    initializeScrollAnimations();
    initializeModals();
    initializePerformanceMonitoring();
    
    console.log('✅ Application RESPOCODEUR initialisée avec succès !');
}

// Définir l'année courante
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// GESTION DU THÈME
function initializeTheme() {
    // Charger le thème sauvegardé ou utiliser le thème clair par défaut
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Écouteur d'événement pour le bouton de basculement du thème
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    // Ajouter la classe de transition pour un changement fluide
    document.body.classList.add('theme-transition');
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Mettre à jour l'icône du bouton de thème
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Retirer la classe de transition après l'animation
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
    
    console.log(`🎨 Thème changé vers : ${theme}`);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Effet de feedback visuel
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 150);
}

// GESTION DE LA NAVIGATION
function initializeNavigation() {
    // Défilement fluide pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Mettre à jour le lien de navigation actif lors du défilement
    window.addEventListener('scroll', debounce(updateActiveNavLink, 10));
    
    // Fermer le menu mobile lors du clic sur un lien
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
            const offsetTop = targetElement.offsetTop - 80; // Compenser la hauteur de l'en-tête fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Ajouter un effet de feedback
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Décalage pour l'en-tête
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Retirer la classe active de tous les liens
                navLinks.forEach(link => link.classList.remove('active'));
                // Ajouter la classe active au lien de la section courante
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

// SYSTÈME DE NOTIFICATIONS AVANCÉ
function initializeNotificationSystem() {
    // Vérifier si les notifications ont été configurées
    const notificationPermission = localStorage.getItem('notificationPermission');
    
    if (!notificationPermission) {
        // Afficher la bannière de permission après 3 secondes
        setTimeout(() => {
            showNotificationBanner();
        }, 3000);
    } else if (notificationPermission === 'granted') {
        notificationsEnabled = true;
        // Vérifier les mises à jour périodiquement
        checkForUpdates();
        setInterval(checkForUpdates, 300000); // Vérifier toutes les 5 minutes
    }
    
    // Écouteurs d'événements pour les boutons de permission
    if (allowNotificationsBtn) {
        allowNotificationsBtn.addEventListener('click', handleAllowNotifications);
    }
    
    if (denyNotificationsBtn) {
        denyNotificationsBtn.addEventListener('click', handleDenyNotifications);
    }
    
    // Écouteur pour la cloche de notification
    if (notificationBell) {
        notificationBell.addEventListener('click', handleNotificationClick);
    }
    
    // Simuler une notification après le chargement
    setTimeout(() => {
        showNotificationBadge();
    }, 5000);
}

function showNotificationBanner() {
    if (notificationBanner) {
        notificationBanner.classList.add('show');
        console.log('📢 Bannière de notification affichée');
    }
}

function hideNotificationBanner() {
    if (notificationBanner) {
        notificationBanner.classList.remove('show');
        setTimeout(() => {
            notificationBanner.style.display = 'none';
        }, 400);
    }
}

function handleAllowNotifications() {
    localStorage.setItem('notificationPermission', 'granted');
    notificationsEnabled = true;
    hideNotificationBanner();
    
    showCustomAlert(
        '🔔 Notifications activées !',
        'Vous recevrez maintenant des notifications pour les nouvelles mises à jour du site RESPOCODEUR.',
        'success'
    );
    
    // Commencer à vérifier les mises à jour
    checkForUpdates();
    setInterval(checkForUpdates, 300000); // Toutes les 5 minutes
    
    console.log('✅ Notifications autorisées par l\'utilisateur');
}

function handleDenyNotifications() {
    localStorage.setItem('notificationPermission', 'denied');
    hideNotificationBanner();
    
    showCustomAlert(
        '📵 Notifications désactivées',
        'Vous pouvez réactiver les notifications à tout moment en cliquant sur la cloche.',
        'info'
    );
    
    console.log('❌ Notifications refusées par l\'utilisateur');
}

function checkForUpdates() {
    if (!notificationsEnabled) return;
    
    // Simuler une vérification de mise à jour
    const now = Date.now();
    const timeSinceLastCheck = now - parseInt(lastUpdateCheck);
    
    // Si plus de 24 heures depuis la dernière vérification
    if (timeSinceLastCheck > 86400000) { // 24 heures en millisecondes
        // Simuler une nouvelle mise à jour (30% de chance)
        if (Math.random() < 0.3) {
            showNotificationBadge();
            localStorage.setItem('lastUpdateCheck', now.toString());
            
            // Notification native du navigateur si supportée
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('RESPOCODEUR - Nouvelle mise à jour !', {
                    body: 'De nouveaux contenus sont disponibles sur le portfolio.',
                    icon: '/favicon.ico',
                    tag: 'respocodeur-update'
                });
            }
            
            console.log('🔔 Nouvelle mise à jour détectée !');
        }
    }
}

function showNotificationBadge() {
    if (notificationBadge) {
        notificationBadge.classList.add('active');
        console.log('🔴 Badge de notification activé');
    }
}

function hideNotificationBadge() {
    if (notificationBadge) {
        notificationBadge.classList.remove('active');
        console.log('⚪ Badge de notification masqué');
    }
}

function handleNotificationClick() {
    // Masquer le badge de notification
    hideNotificationBadge();
    
    // Afficher l'alerte de notification
    showCustomAlert(
        '🎉 Nouvelles mises à jour disponibles !',
        `Découvrez les dernières améliorations de RESPOCODEUR :
        
        ✨ 4 nouveaux projets détaillés avec modals interactifs
        📝 6 articles de blog techniques complets
        🎨 Interface mobile optimisée comme une app
        🔔 Système de notifications en temps réel
        🌙 Mode sombre amélioré avec transitions fluides
        
        Explorez les boutons "Voir plus" et "Lire la suite" pour découvrir tous les détails !`,
        'info'
    );
    
    // Défiler vers la section portfolio
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
        const offsetTop = portfolioSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    console.log('🔔 Notification cliquée - Redirection vers portfolio');
}

// SYSTÈME D'ALERTES PERSONNALISÉES
function showCustomAlert(title, message, type = 'info') {
    // Créer l'élément d'alerte
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        max-width: 500px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        border: none;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    alert.innerHTML = `
        <div class="d-flex align-items-start">
            <div class="me-3">
                <i class="fas fa-${getAlertIcon(type)} fs-4"></i>
            </div>
            <div class="flex-grow-1">
                <h6 class="alert-heading mb-2 fw-bold">${title}</h6>
                <div class="mb-0" style="white-space: pre-line; font-size: 0.9rem;">${message}</div>
            </div>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Retrait automatique après 8 secondes
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 400);
        }
    }, 8000);
    
    console.log(`📢 Alerte affichée : ${type} - ${title}`);
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

// GESTION DU FORMULAIRE DE CONTACT
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name') || document.getElementById('name').value,
        email: formData.get('email') || document.getElementById('email').value,
        subject: formData.get('subject') || document.getElementById('subject').value,
        message: formData.get('message') || document.getElementById('message').value
    };
    
    // Valider le formulaire
    if (!validateContactForm(data)) {
        return;
    }
    
    // Afficher l'état de chargement
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
    submitButton.disabled = true;
    
    // Simuler l'envoi du formulaire (remplacer par une implémentation réelle)
    setTimeout(() => {
        // Réinitialiser le bouton
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Afficher le message de succès
        showCustomAlert(
            '✅ Message envoyé avec succès !',
            `Merci ${data.name} pour votre message concernant "${data.subject}".
            
Je vous répondrai dans les plus brefs délais à l'adresse : ${data.email}
            
Votre message :
"${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}"`,
            'success'
        );
        
        // Réinitialiser le formulaire
        contactForm.reset();
        clearAllFieldErrors();
        
        console.log('📧 Formulaire de contact soumis avec succès');
        
    }, 2500);
}

function validateContactForm(data) {
    let isValid = true;
    
    // Valider le nom
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }
    
    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Veuillez entrer une adresse email valide');
        isValid = false;
    }
    
    // Valider le sujet
    if (!data.subject || data.subject.trim().length < 3) {
        showFieldError('subject', 'Le sujet doit contenir au moins 3 caractères');
        isValid = false;
    }
    
    // Valider le message
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
            if (value.length > 0 && value.length < 2) {
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
            if (value.length > 0 && value.length < 3) {
                showFieldError('subject', 'Le sujet doit contenir au moins 3 caractères');
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError('message', 'Le message doit contenir au moins 10 caractères');
            }
            break;
    }
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.add('is-invalid');
    
    // Supprimer le message d'erreur existant
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Ajouter le nouveau message d'erreur
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

// ANIMATIONS DE DÉFILEMENT
function initializeScrollAnimations() {
    // Intersection Observer pour les animations de fondu
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                console.log(`🎬 Animation déclenchée pour : ${entry.target.className}`);
            }
        });
    }, observerOptions);
    
    // Observer les éléments animés
    const animatedElements = document.querySelectorAll('.project-card, .blog-card, .experience-item');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// FONCTIONNALITÉS MODALES AMÉLIORÉES
function initializeModals() {
    // Défilement vers le haut lors de l'ouverture d'une modale
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            // Faire défiler le contenu de la modale vers le haut
            const modalBody = this.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
            console.log(`📖 Modal ouverte : ${this.id}`);
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            console.log(`📖 Modal fermée : ${this.id}`);
        });
    });
    
    // Navigation au clavier pour les modales
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Fermer toute modale ouverte
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modalInstance = bootstrap.Modal.getInstance(openModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        }
    });
}

// SURVEILLANCE DES PERFORMANCES
function initializePerformanceMonitoring() {
    // Surveiller les métriques de performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Page chargée en ${Math.round(loadTime)}ms`);
        
        // Enregistrer les métriques de navigation si disponibles
        if (performance.getEntriesByType) {
            const navTiming = performance.getEntriesByType('navigation')[0];
            if (navTiming) {
                console.log(`📊 DOM chargé en ${Math.round(navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart)}ms`);
            }
        }
        
        // Initialiser le lazy loading pour les images si nécessaire
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                            console.log(`🖼️ Image chargée : ${img.alt}`);
                        }
                    }
                });
            });
            
            // Observer les images avec l'attribut data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    });
}

// GESTION DES CHANGEMENTS DE VISIBILITÉ DE LA PAGE
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // La page est devenue visible, vérifier les nouvelles notifications
        if (notificationsEnabled) {
            setTimeout(() => {
                checkForUpdates();
                
                // Afficher un message de bienvenue si l'utilisateur revient après 5 minutes
                const lastVisit = localStorage.getItem('lastVisit');
                const now = Date.now();
                if (lastVisit && (now - parseInt(lastVisit)) > 300000) { // 5 minutes
                    setTimeout(() => {
                        showCustomAlert(
                            '👋 Bon retour sur RESPOCODEUR !',
                            'N\'hésitez pas à explorer les nouveaux contenus détaillés disponibles dans les modals des projets et articles de blog.',
                            'info'
                        );
                    }, 2000);
                }
            }, 1000);
        }
    } else {
        // Stocker l'heure de la dernière visite
        localStorage.setItem('lastVisit', Date.now().toString());
    }
});

// NAVIGATION CLAVIER AMÉLIORÉE
document.addEventListener('keydown', (e) => {
    // Touche ESC pour fermer le menu mobile et les modales
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Touche Entrée sur la cloche de notification
    if (e.key === 'Enter' && e.target === notificationBell) {
        handleNotificationClick();
    }
    
    // Ctrl/Cmd + K pour focus sur la recherche (fonctionnalité future)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('🔍 Raccourci de recherche détecté (fonctionnalité future)');
    }
});

// GESTION D'ERREURS
window.addEventListener('error', (e) => {
    console.error('❌ Erreur JavaScript :', e.error);
    // Afficher un message d'erreur convivial en production
    if (window.location.hostname !== 'localhost') {
        showCustomAlert(
            '⚠️ Une erreur s\'est produite',
            'Une erreur technique temporaire est survenue. Veuillez rafraîchir la page si le problème persiste.',
            'warning'
        );
    }
});

// Gestion des rejets de promesses non gérés
window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Rejet de promesse non géré :', e.reason);
    e.preventDefault(); // Empêcher le comportement par défaut du navigateur
});

// FONCTIONS UTILITAIRES
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

// Ajouter les styles CSS pour les animations personnalisées
const customAnimationCSS = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Injecter les styles CSS personnalisés
const styleSheet = document.createElement('style');
styleSheet.textContent = customAnimationCSS;
document.head.appendChild(styleSheet);

// Exporter les fonctions pour les tests (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setTheme,
        validateContactForm,
        showCustomAlert,
        handleNotificationClick,
        checkForUpdates
    };
}

// Message de bienvenue dans la console
console.log(`
🚀 RESPOCODEUR - Portfolio & Blog
👨‍💻 Développé par Wilfred Djikiakam
📧 Contact: wilfreddjikiakam@gmail.com
🌟 "Le code est ma toile, l'innovation mon pinceau"

✨ Fonctionnalités actives :
- 🎨 Thème clair/sombre avec transitions fluides
- 🔔 Système de notifications en temps réel
- 📱 Design mobile-first comme une app
- 🖱️ Modals interactifs pour projets et blog
- ⚡ Animations et micro-interactions
- 🎯 Navigation fluide par scroll
- 📊 Monitoring des performances
- ♿ Accessibilité améliorée

Devise: Adaptation - Motivation - Engagement
`);

console.log('🎉 Bienvenue sur RESPOCODEUR ! Explorez les projets et articles avec les boutons "Voir plus" et "Lire la suite".');