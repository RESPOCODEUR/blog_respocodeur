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
let favoritesFilterActive = false;

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
    initializeUserStorage(); // Initialiser stockage utilisateurs
    initializeUserSession();
    initializeCourseSearch();
    
    // Vérifier si un utilisateur est déjà connecté et afficher la notification
    if (isUserLoggedIn()) {
        setTimeout(checkUserEnrollmentsAfterLogin, 1000);
    }
    
    console.log('✅ Application RESPOCODEUR initialisée avec succès !');
}

// Définir l'année courante
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

function initializeUserSession() {
    if (isUserLoggedIn()) {
        const currentUser = getCurrentUser();
        if (currentUser) {
            updateNavbarWithUser(currentUser);
        }
    }
}

function initializeCourseSearch() {
    const searchInput = document.getElementById('courseSearchInput');
    const favoriteToggleBtn = document.getElementById('favoriteToggleBtn');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        favoritesFilterActive = false;
        updateFavoriteToggleButton();
        filterCourses();
    });

    if (favoriteToggleBtn) {
        favoriteToggleBtn.addEventListener('click', () => {
            favoritesFilterActive = !favoritesFilterActive;
            updateFavoriteToggleButton();
            filterCourses();
        });
    }

    document.querySelectorAll('#coursesTabs button[data-bs-toggle="tab"]').forEach(button => {
        button.addEventListener('shown.bs.tab', filterCourses);
    });

    attachFavoriteButtons();
    updateFavoriteSummary();
    filterCourses();
}

function filterCourses() {
    const query = document.getElementById('courseSearchInput')?.value.trim().toLowerCase() || '';
    const activeTab = document.querySelector('.tab-pane.show.active') || document.querySelector('.tab-pane.active') || document.querySelector('.tab-pane');
    let visibleCount = 0;

    document.querySelectorAll('.tab-pane').forEach(tabPane => {
        tabPane.querySelectorAll('.course-card, .workshop-card').forEach(card => {
            const title = card.querySelector('h5')?.textContent.toLowerCase() || '';
            const details = card.textContent.toLowerCase();
            const favoriteName = card.dataset.courseName || title;
            const matchesQuery = query === '' || title.includes(query) || details.includes(query);
            const matchesFavorite = !favoritesFilterActive || isCourseFavorite(favoriteName);
            const showCard = matchesQuery && matchesFavorite;
            const wrapper = card.closest('.col-lg-4, .col-lg-6, .col-md-6');
            if (wrapper) {
                wrapper.style.display = showCard ? '' : 'none';
            }
        });
    });

    if (activeTab) {
        activeTab.querySelectorAll('.course-card, .workshop-card').forEach(card => {
            const wrapper = card.closest('.col-lg-4, .col-lg-6, .col-md-6');
            if (wrapper && wrapper.style.display !== 'none') {
                visibleCount += 1;
            }
        });
    }

    const noResults = document.getElementById('courseSearchNoResults');
    if (noResults) {
        noResults.classList.toggle('d-none', visibleCount > 0);
    }
}

function updateFavoriteToggleButton() {
    const button = document.getElementById('favoriteToggleBtn');
    if (!button) return;
    button.classList.toggle('active', favoritesFilterActive);
    button.innerHTML = favoritesFilterActive
        ? '<i class="fas fa-heart me-1"></i>Montrer tous'
        : '<i class="fas fa-heart me-1"></i>Voir Favoris';
}

function attachFavoriteButtons() {
    document.querySelectorAll('.course-card, .workshop-card').forEach(card => {
        if (card.querySelector('.favorite-button')) return;

        const title = card.querySelector('h5')?.textContent.trim() || 'cours inconnu';
        card.dataset.courseName = title;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'favorite-button';
        button.title = 'Ajouter aux favoris';
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCourseFavorite(title, button);
        });

        card.appendChild(button);
        updateFavoriteButton(card, title);
    });
}

function toggleCourseFavorite(courseName, button) {
    const favorites = getFavoriteCourses();
    const existingIndex = favorites.indexOf(courseName);
    if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
    } else {
        favorites.push(courseName);
    }
    localStorage.setItem('favoriteCourses', JSON.stringify(favorites));
    updateFavoriteSummary();
    updateFavoriteButtonState();
    filterCourses();
}

function getFavoriteCourses() {
    try {
        const stored = JSON.parse(localStorage.getItem('favoriteCourses') || '[]');
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

function isCourseFavorite(courseName) {
    return getFavoriteCourses().includes(courseName);
}

function updateFavoriteSummary() {
    const countSpan = document.getElementById('favoriteCount');
    if (countSpan) {
        countSpan.textContent = getFavoriteCourses().length;
    }
}

function updateFavoriteButtonState() {
    document.querySelectorAll('.course-card, .workshop-card').forEach(card => {
        const title = card.dataset.courseName || card.querySelector('h5')?.textContent.trim() || '';
        const button = card.querySelector('.favorite-button');
        if (button) {
            button.classList.toggle('active', isCourseFavorite(title));
            button.title = isCourseFavorite(title) ? 'Supprimer des favoris' : 'Ajouter aux favoris';
        }
    });
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

// FONCTIONS SUPPLÉMENTAIRES

function requestDemoModal(projectName) {
    // Fermer la modale actuelle
    const activeModal = bootstrap.Modal.getInstance(document.querySelector('.modal.show'));
    if (activeModal) {
        activeModal.hide();
    }
    
    // Afficher une alerte de demande de démo
    showCustomAlert(
        `📞 Demande de démo - ${projectName}`,
        `Merci pour votre intérêt pour ${projectName} !
        
Je vais vous contacter très bientôt pour organiser une démonstration complète.

Vos coordonnées de contact :
📧 wilfreddjikiakam@gmail.com
📱 WhatsApp: +237 672 922 360

Vous pouvez aussi me contacter directement par ces canaux.`,
        'success'
    );
    
    // Rediriger vers le formulaire de contact
    setTimeout(() => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }, 3000);
    
    console.log(`📞 Demande de démo reçue pour ${projectName}`);
}

function downloadCV() {
    // Créer un blob avec le contenu du CV
    const cvContent = `
WILFRED DJIKIAKAM - DÉVELOPPEUR FULL-STACK
Email: wilfreddjikiakam@gmail.com
Phone: +237 672 922 360
LinkedIn: wilfreddjikiakam
GitHub: github.com/wilfred-djikiakam

PROFIL PROFESSIONNEL
Développeur Full-Stack passionné avec 3+ années d'expérience en développement logiciel.
Spécialisé en C# WinForms et développement web moderne. Titulaire d'une licence
professionnelle en génie logiciel. Devise: Adaptation - Motivation - Engagement.

EXPÉRIENCE PROFESSIONNELLE
Agent Stock - SCC (Société des Céréales du Cameroun) | 2021-2023
- Gestion complète des stocks et inventaires
- Coordination avec équipes multidisciplinaires
- Identification des inefficacités opérationnelles

Développeur Freelance | 2023-Présent
- MySCC: Application Windows de gestion pour minoterie (C#, WinForms, MySQL)
- MyStudent: Plateforme web pour étudiants (HTML5, CSS3, JavaScript, Bootstrap)
- PainPilote: Gestion de boulangeries (Web complète avec MySQL)
- DigitalMarket: Plateforme e-commerce (PHP, MySQL, JavaScript)
- 95%+ client satisfaction rate

FORMATION
Licence Professionnelle en Génie Logiciel | 2023-2024 | Distinction
- Méthodologies agiles (Scrum, Kanban)
- Design patterns et architecture logicielle
- Développement Full-Stack
- Gestion de projets informatiques

Formation en Réseaux Informatiques | 2024-En cours | 60% complété
- TCP/IP et protocoles réseau
- Administration Linux
- Sécurité réseau
- Cloud computing (AWS, Azure)

COMPÉTENCES TECHNIQUES
Langages: C#, JavaScript ES6+, HTML5, CSS3, SQL, MySQL, PHP
Frameworks: Bootstrap 5, WinForms, Vite
Outils: Git, GitHub, MySQL, WinForms, VS Code

SOFT SKILLS
✓ Adaptation - Polyvalence aux nouvelles technologies
✓ Motivation - Passion pour l'apprentissage constant
✓ Engagement - Dévouement total dans chaque projet
✓ Leadership - Coordination d'équipes
✓ Autonomie - Travail indépendant efficace
✓ Disponibilité 24/24

PROJETS MAJEURS
1. MySCC (Application Desktop)
   - Gestion complète pour minoterie en C# WinForms
   - 95% satisfaction utilisateur
   - Réduction de 75% du temps de saisie

2. PainPilote (Application Web)
   - Gestion boulangeries avec POS
   - Utilisée par 5+ points de vente
   - +35% d'efficacité opérationnelle

3. MyStudent (Plateforme Web)
   - 200+ utilisateurs actifs
   - 95% de satisfaction
   - Modules: cours, planning, forum, notes

4. DigitalMarket (E-commerce)
   - Plateforme e-commerce complète
   - Paiements intégrés
   - 98% uptime

LANGUES
- Français (Courant)
- Anglais (Bon)

RÉFÉRENCES & TÉMOIGNAGES
"MySCC a transformé notre gestion quotidienne. Simple, fiable et efficace."
- Ing Deumi Franck, Responsable SCC

"Développeur professionnel et très polyvalent."
- Clients satisfaits à 95%+

DISPONIBILITÉ & TARIFICATION
Disponibilité: 24/24, 7/7
Tarification: $500-$8000+ selon projet
Support: Email, WhatsApp, GitHub

Document généré: ${new Date().toLocaleDateString('fr-FR')}
`;

    // Créer le fichier
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cvContent));
    element.setAttribute('download', 'Wilfred_Djikiakam_CV.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    showCustomAlert(
        '✅ CV téléchargé avec succès !',
        'Le fichier "Wilfred_Djikiakam_CV.txt" a été téléchargé sur votre ordinateur.',
        'success'
    );
    
    console.log('📥 CV téléchargé');
}

function requestQuote(planName) {
    // Fermer la modale si ouverte
    const activeModal = document.querySelector('.modal.show');
    if (activeModal) {
        bootstrap.Modal.getInstance(activeModal).hide();
    }
    
    // Afficher l'alerte
    showCustomAlert(
        `💼 Demande de Devis - Plan ${planName}`,
        `Merci de votre intérêt pour le plan ${planName} !
        
Je vais vous préparer une proposition détaillée adapte à vos besoins.

📧 Email: wilfreddjikiakam@gmail.com
📱 WhatsApp: +237 672 922 360
🔗 LinkedIn: wilfreddjikiakam

Délai de réponse: 24h maximum`,
        'info'
    );
    
    // Défiler vers le formulaire
    setTimeout(() => {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 2000);
    
    console.log(`💼 Demande de devis pour le plan ${planName}`);
}

// ================= GESTION MODERNE DES COURS & FORMATIONS =================

// ===== FONCTION 1: S'INSCRIRE À UN COURS GRATUIT =====
function enrollCourse(courseName, type) {
    // Vérifier d'abord que l'utilisateur est connecté
    if (!isUserLoggedIn()) {
        alert('⚠️ Vous devez être connecté pour vous inscrire aux cours\n\nVeuillez d\'abord vous connecter ou créer un compte.');
        showLoginModal();
        return;
    }
    
    // Récupérer l'utilisateur connecté
    const currentUser = getCurrentUser();
    const courseName_clean = courseName.replace(/'/g, "\\'");
    
    // Créer la modal d'inscription
    let modalHTML = `
    <div class="modal fade" id="enrollmentModal_${Date.now()}" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-graduation-cap me-2"></i>Inscription Gratuite
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-3"><strong>Cours:</strong> ${courseName}</p>
                    
                    <div class="mb-3">
                        <p><strong>Informations de l'étudiant:</strong></p>
                        <div class="border-start ps-3 border-success">
                            <p class="mb-1"><i class="fas fa-user me-2 text-success"></i><strong>${currentUser.fullname}</strong></p>
                            <p class="mb-1"><i class="fas fa-envelope me-2 text-success"></i>${currentUser.email}</p>
                            <p class="mb-0"><i class="fas fa-phone me-2 text-success"></i>${currentUser.phone || 'Non renseigné'}</p>
                        </div>
                    </div>
                    
                    <div class="alert alert-success mb-3">
                        <i class="fas fa-check-circle me-2"></i>
                        <strong>Cours Gratuit !</strong> Accès immédiat après confirmation.
                    </div>
                    
                    <button type="button" class="btn btn-success w-100 fw-bold" onclick="confirmFreeEnrollment('${courseName_clean}', this)">
                        <i class="fas fa-check me-2"></i>Confirmer l'Inscription
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Injecter et afficher la modal
    const modalId = `enrollmentModal_${Date.now()}`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const newModal = new bootstrap.Modal(document.getElementById(modalId));
    newModal.show();
    
    console.log(`📚 Modal d'inscription affichée pour: ${courseName}`);
}

// ===== FONCTION 2: CONFIRMER L'INSCRIPTION GRATUITE =====
function confirmFreeEnrollment(courseName, button) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('❌ Erreur: Utilisateur non connecté');
        return;
    }
    
    // Désactiver le bouton et afficher "Traitement..."
    button.disabled = true;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Traitement...';
    
    // Simuler le traitement (1 seconde)
    setTimeout(() => {
        try {
            // Récupérer les inscriptions existantes
            const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
            
            if (allUsers[currentUser.email]) {
                // Mettre à jour les enrollments de l'utilisateur
                if (!allUsers[currentUser.email].enrollments) {
                    allUsers[currentUser.email].enrollments = [];
                }
                
                // Ajouter l'inscription s'il n'y en a pas déjà une
                if (!allUsers[currentUser.email].enrollments.includes(courseName)) {
                    allUsers[currentUser.email].enrollments.push(courseName);
                    localStorage.setItem('users', JSON.stringify(allUsers));
                }
            }
            
            // Afficher le succès
            showCustomAlert(
                '✅ Inscription Réussie !',
                `Bienvenue ${currentUser.fullname}!\n\nVous êtes maintenant inscrit au cours:\n\n📚 ${courseName}\n\n⏱️ Redirection vers le contenu du cours...`,
                'success'
            );
            
            // Fermer la modal
            const modal = document.querySelector('.modal.show');
            if (modal) {
                bootstrap.Modal.getInstance(modal).hide();
            }
            
            // Afficher les leçons après 2 secondes
            setTimeout(() => {
                displayCourseLessons(courseName);
            }, 2000);
            
            console.log(`✅ Inscription confirmée pour: ${courseName} (Utilisateur: ${currentUser.email})`);
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            alert('❌ Erreur lors de l\'inscription. Veuillez réessayer.');
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }, 1000);
}

// ===== FONCTION 3: S'INSCRIRE À UNE FORMATION PAYANTE =====
function enrollPaidCourse(courseName, price) {
    // Vérifier que l'utilisateur est connecté
    if (!isUserLoggedIn()) {
        alert('⚠️ Vous devez être connecté pour vous inscrire aux formations payantes\n\nVeuillez d\'abord vous connecter ou créer un compte.');
        showLoginModal();
        return;
    }
    
    const currentUser = getCurrentUser();
    const modalId = `paymentModal_${Date.now()}`;
    
    // Modal pour paiement Mobile Money
    let paymentModalHTML = `
    <div class="modal fade" id="${modalId}" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white border-0">
                    <h5 class="modal-title">
                        <i class="fas fa-mobile-alt me-2"></i>Paiement Mobile Money
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Infos formation -->
                    <div class="alert alert-warning fw-bold mb-3">
                        <h6 class="mb-2">📚 Formation Sélectionnée</h6>
                        <div class="h5 text-danger">${courseName}</div>
                        <div class="h4 text-danger mt-2">${price.toLocaleString('fr-CM')} FCFA</div>
                    </div>
                    
                    <!-- Instructions Mobile Money -->
                    <div class="alert alert-info mb-3">
                        <h6 class="mb-2"><i class="fas fa-mobile-alt me-2" style="color: #FF6600;"></i><strong>Paiement Mobile Money</strong></h6>
                        <p class="mb-2"><strong>Numéro Bénéficiaire:</strong></p>
                        <div class="bg-light p-2 rounded mb-2 text-center">
                            <span class="badge bg-danger fs-5">+237 672 922 360</span>
                        </div>
                        <small>📱 Envoyez <strong>${price.toLocaleString('fr-CM')} FCFA</strong> via Mobile Money à ce numéro</small>
                    </div>
                    
                    <!-- Formulaire de confirmation -->
                    <div class="mb-3">
                        <label class="form-label"><strong>Référence de Transaction</strong></label>
                        <input type="text" class="form-control" id="transactionRef" placeholder="Code reçu après paiement (ex: ABC123)" required>
                        <small class="text-muted">Collez le code de confirmation que vous avez reçu</small>
                    </div>
                    
                    <button type="button" class="btn btn-danger w-100 fw-bold" onclick="confirmPaidEnrollment('${courseName}', '${price}', this, '${modalId}')">
                        <i class="fas fa-check-circle me-2"></i>Confirmer le Paiement
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Injecter et afficher la modal
    document.body.insertAdjacentHTML('beforeend', paymentModalHTML);
    const paymentModal = new bootstrap.Modal(document.getElementById(modalId));
    paymentModal.show();
    
    console.log(`💳 Modal de paiement affichée pour: ${courseName} (${price} FCFA)`);
}

// ===== FONCTION 4: CONFIRMER LE PAIEMENT PAYANT =====
function confirmPaidEnrollment(courseName, price, button, modalId) {
    const currentUser = getCurrentUser();
    const transactionRef = document.getElementById('transactionRef').value.trim();
    
    if (!transactionRef) {
        alert('⚠️ Veuillez entrer la référence de transaction');
        return;
    }
    
    if (transactionRef.length < 3) {
        alert('⚠️ Référence de transaction invalide');
        return;
    }
    
    // Désactiver le bouton
    button.disabled = true;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Traitement du paiement...';
    
    // Simuler le traitement
    setTimeout(() => {
        try {
            // Mettre à jour les données utilisateur
            const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
            
            if (allUsers[currentUser.email]) {
                // Ajouter l'enrollment
                if (!allUsers[currentUser.email].enrollments) {
                    allUsers[currentUser.email].enrollments = [];
                }
                if (!allUsers[currentUser.email].enrollments.includes(courseName)) {
                    allUsers[currentUser.email].enrollments.push(courseName);
                }
                
                // Enregistrer le paiement
                if (!allUsers[currentUser.email].payments) {
                    allUsers[currentUser.email].payments = [];
                }
                allUsers[currentUser.email].payments.push({
                    courseName: courseName,
                    amount: price,
                    date: new Date().toISOString(),
                    status: 'completed',
                    transactionRef: transactionRef,
                    method: 'Mobile Money'
                });
                
                localStorage.setItem('users', JSON.stringify(allUsers));
            }
            
            // Générer reçu PDF
            generateReceiptPDF(courseName, price, currentUser.fullname, currentUser.email, currentUser.phone, transactionRef);
            
            // Afficher le succès
            showCustomAlert(
                '✅ Paiement Confirmé !',
                `Merci ${currentUser.fullname}!\n\nVotre paiement de ${price.toLocaleString('fr-CM')} FCFA pour:\n\n📚 ${courseName}\n\nA été reçu avec succès!\n\n📄 Un reçu PDF a été téléchargé\n\n⏱️ Redirection vers le contenu du cours...`,
                'success'
            );
            
            // Fermer la modal
            bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();
            
            // Afficher les leçons après 2 secondes
            setTimeout(() => {
                displayCourseLessons(courseName);
            }, 2000);
            
            console.log(`✅ Paiement confirmé: ${courseName} (${price} FCFA) - Ref: ${transactionRef}`);
        } catch (error) {
            console.error('Erreur lors du paiement:', error);
            alert('❌ Erreur lors du traitement du paiement');
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }, 2000);
}

// ===== FONCTION 5: GÉNÉRER UN REÇU PDF SIGNÉ =====
function generateReceiptPDF(courseName, price, fullName, email, phone, transactionRef) {
    try {
        if (typeof jspdf === 'undefined' || !jspdf.jsPDF) {
            console.warn('jsPDF non disponible, saut de la génération PDF');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // En-tête
        doc.setFillColor(220, 53, 69);
        doc.rect(0, 0, 210, 35, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text('RESPOCODEUR', 15, 15);
        
        doc.setFontSize(9);
        doc.text('Formations Professionnelles en Informatique', 15, 22);
        doc.text('Cameroun 🇨🇲 | www.respocodeur.com', 15, 28);
        
        // Titre
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('REÇU DE PAIEMENT', 15, 50);
        
        // Date et référence
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const refId = 'REC-' + Date.now();
        doc.text(`Réf: ${refId}`, 150, 50);
        doc.text(`Date: ${new Date().toLocaleString('fr-CM')}`, 150, 56);
        
        // Ligne séparatrice
        doc.setDrawColor(220, 53, 69);
        doc.setLineWidth(0.5);
        doc.line(15, 62, 195, 62);
        
        // Apprenant
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text('APPRENANT', 15, 72);
        doc.setFontSize(9);
        doc.text(fullName, 15, 79);
        doc.text(email, 15, 85);
        doc.text(phone || 'Non renseigné', 15, 91);
        
        // Formation
        doc.setFontSize(10);
        doc.text('FORMATION', 110, 72);
        doc.setFontSize(9);
        doc.text(courseName, 110, 79);
        doc.text('Accès Complet au Cours', 110, 85);
        doc.text(`Code: ${transactionRef}`, 110, 91);
        
        // Ligne séparatrice
        doc.line(15, 98, 195, 98);
        
        // Montant
        doc.setFontSize(11);
        doc.text('MONTANT PAYÉ', 15, 110);
        
        doc.setFontSize(16);
        doc.setTextColor(220, 53, 69);
        doc.text(`${price.toLocaleString('fr-CM')} FCFA`, 15, 122);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.text('Méthode: Mobile Money', 15, 132);
        
        // Ligne séparatrice
        doc.line(15, 140, 195, 140);
        
        // Signature
        doc.setFontSize(9);
        doc.text('Signé électroniquement par:', 15, 150);
        doc.setFillColor(220, 53, 69);
        doc.rect(15, 155, 180, 2, 'F');
        doc.text('Wilfred Djikiakam', 15, 163);
        doc.text('Formateur Certifié - RESPOCODEUR', 15, 169);
        doc.text('📱 +237 672 922 360 | 📧 wilfreddjikiakam@gmail.com', 15, 175);
        
        // Footer
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text('Ce reçu certifie le paiement pour les services de formation en ligne.', 15, 190);
        doc.text(`Généré: ${new Date().toLocaleString('fr-CM')} | RESPOCODEUR © 2024-2025`, 15, 196);
        doc.text('Merci pour votre inscription! Veuillez accéder à votre compte pour débuter le cours.', 15, 202);
        
        // Télécharger
        doc.save(`Reçu_${courseName.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
        console.log(`📄 Reçu PDF généré: ${refId}`);
    } catch (error) {
        console.warn('Erreur génération PDF:', error);
    }
}

// ===== FONCTION UTILITAIRE: TOGGLE MODULE (ACCORDION) =====
function toggleModule(index) {
    const moduleEl = document.getElementById('module' + index);
    if (moduleEl) {
        moduleEl.style.display = moduleEl.style.display === 'none' ? 'block' : 'none';
    }
}

// ===== FONCTION 6: AFFICHER LES LEÇONS DU COURS (AMÉLIORÉ) =====
function displayCourseLessons(courseName) {
    console.log(`🎓 Tentative d'affichage du cours: ${courseName}`);
    console.log(`📊 coursesDatabase disponible:`, typeof coursesDatabase !== 'undefined');
    
    // Vérifier que la BD des cours est disponible
    if (typeof coursesDatabase === 'undefined') {
        console.error('❌ coursesDatabase non chargé');
        alert('❌ Erreur: Les données du cours ne sont pas disponibles. Veuillez rafraîchir la page.');
        return;
    }
    
    // Chercher le cours
    let courseInfo = null;
    
    if (coursesDatabase[courseName]) {
        courseInfo = coursesDatabase[courseName];
        console.log(`✅ Cours trouvé:`, courseName);
    } else {
        console.warn(`⚠️ Cours "${courseName}" non trouvé dans la base de données`);
        console.log(`📋 Cours disponibles:`, Object.keys(coursesDatabase).slice(0, 5));
        alert(`📚 Cours Ouvert\n\nVous avez accès au cours: ${courseName}\n\nLe contenu détaillé du cours sera disponible très bientôt.\n\n📧 Pour toute question: wilfreddjikiakam@gmail.com\n📱 WhatsApp: +237 672 922 360`);
        return;
    }
    
    // Récupérer l'utilisateur et la progression
    const currentUser = getCurrentUser();
    const userEmail = currentUser ? currentUser.email : null;
    const courseKey = userEmail ? `${userEmail}_${courseName}` : null;
    const userCourses = courseKey ? JSON.parse(localStorage.getItem('userCourses') || '{}') : {};
    const courseProgress = userCourses[courseKey] || { completedModules: 0, totalModules: courseInfo.modules ? courseInfo.modules.length : 1 };
    const progressPercent = Math.round((courseProgress.completedModules / courseProgress.totalModules) * 100);
    
    // Créer la page du cours
    let courseHTML = `
    <div id="courseLessonPage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); z-index: 9999; overflow-y: auto;">
        <!-- En-tête supérieur -->
        <nav style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px 0; position: sticky; top: 0; z-index: 10; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
            <div class="container">
                <div style="display: flex; justify-content: space-between; align-items: center; color: white;">
                    <div>
                        <h5 style="margin: 0; font-size: 1.3em;">
                            <i class="fas fa-graduation-cap me-2"></i>${courseName}
                        </h5>
                        <small style="opacity: 0.9;">${courseInfo.description}</small>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div style="text-align: right;">
                            <small>Progression</small>
                            <div style="font-size: 1.5em; font-weight: bold;">${progressPercent}%</div>
                        </div>
                        <button onclick="closeCoursePage()" style="background: white; color: #667eea; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: bold;">
                            <i class="fas fa-times me-1"></i>Fermer
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        
        <!-- Barre de progression -->
        <div style="background: white; padding: 20px 0; box-shadow: 0 5px 10px rgba(0,0,0,0.05);">
            <div class="container">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: #333;">Progression du cours</span>
                    <span style="color: #667eea; font-weight: bold;">${courseProgress.completedModules}/${courseProgress.totalModules} modules</span>
                </div>
                <div style="height: 8px; background: #e2e8f0; border-radius: 10px; overflow: hidden;">
                    <div class="course-progress-bar" style="height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); width: ${progressPercent}%; transition: width 0.5s ease;"></div>
                </div>
            </div>
        </div>
        
        <!-- Contenu principal -->
        <div class="container" style="margin-top: 40px; margin-bottom: 40px;">
            <div class="row">
                <!-- Colonne gauche: Description -->
                <div class="col-lg-8" style="margin-bottom: 30px;">
                    <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; margin-top: 0;">${courseInfo.description || courseName}</h2>
                        <p style="color: #666; font-size: 1.1em;">
                            <i class="fas fa-user me-2" style="color: #667eea;"></i><strong>Instructeur:</strong> ${courseInfo.instructor || 'RESPOCODEUR'}
                        </p>
                        <p style="color: #666; font-size: 1.1em;">
                            <i class="fas fa-clock me-2" style="color: #667eea;"></i><strong>Durée:</strong> ${courseInfo.duration || 'Variable'} | <strong>Heures:</strong> ${courseInfo.hours || 'N/A'} heures
                        </p>
                    </div>
                    
                    <!-- Modules accordion -->
                    <div style="margin-top: 30px;">
                        <h3 style="color: #333; margin-bottom: 20px;">
                            <i class="fas fa-list-check me-2" style="color: #667eea;"></i>Contenu du Cours
                        </h3>
    `;
    
    // Ajouter les modules
    if (courseInfo.modules && courseInfo.modules.length > 0) {
        courseHTML += '<div style="display: flex; flex-direction: column; gap: 15px;">';
        
        courseInfo.modules.forEach((module, index) => {
            const isCompleted = index < courseProgress.completedModules;
            const isActive = index === courseProgress.completedModules;
            
            courseHTML += `
            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1); border-left: 5px solid ${isCompleted ? '#48bb78' : (isActive ? '#667eea' : '#e2e8f0')}; transition: all 0.3s;">
                <button onclick="toggleModule(${index})" style="width: 100%; text-align: left; background: none; border: none; padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.3s;"
                        onmouseover="this.style.background='#f7fafc'" onmouseout="this.style.background='transparent'">
                    <div>
                        <span style="display: inline-block; background: ${isCompleted ? '#48bb78' : (isActive ? '#667eea' : '#cbd5e0')}; color: white; border-radius: 50%; width: 35px; height: 35px; line-height: 35px; text-align: center; margin-right: 15px; font-weight: bold;">
                            ${isCompleted ? '✓' : (index + 1)}
                        </span>
                        <div style="display: inline-block;">
                            <strong style="color: ${isCompleted ? '#48bb78' : '#333'};">Module ${index + 1}: ${module.title || 'Leçon'}</strong>
                            ${isCompleted ? '<span style="margin-left: 10px; color: #48bb78;"><i class="fas fa-check-circle"></i> Complété</span>' : ''}
                        </div>
                    </div>
                    <i class="fas fa-chevron-down" style="color: #667eea;"></i>
                </button>
                
                <div id="module${index}" style="display: none; padding: 0 20px 20px; border-top: 1px solid #e2e8f0;">
                    <div style="padding: 15px; background: #f7fafc; border-radius: 8px; margin-bottom: 15px;">
                        ${typeof module === 'string' ? module : (module.content || '<i>Contenu en préparation...</i>')}
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        ${!isCompleted && isActive ? `<button onclick="completeModule('${courseName}', ${index})" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: transform 0.2s;"
                                onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <i class="fas fa-check-circle me-2"></i>Marquer comme complété
                        </button>` : ''}
                        ${isCompleted ? `<button style="flex: 1; background: #e2e8f0; color: #48bb78; border: none; padding: 12px; border-radius: 8px; cursor: default; font-weight: bold;">
                            <i class="fas fa-check-circle me-2"></i>Module Complété ✓
                        </button>` : ''}
                    </div>
                </div>
            </div>
            `;
        });
        
        courseHTML += '</div>';
    } else {
        courseHTML += `
            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; color: #b45309;">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Contenu en préparation</strong> - Le contenu détaillé du cours arrivera bientôt!
            </div>
        `;
    }
    
    courseHTML += `
                    </div>
                </div>
                
                <!-- Colonne droite: Résumé et infos -->
                <div class="col-lg-4">
                    <div style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); position: sticky; top: 200px;">
                        <h5 style="color: #333; margin-top: 0;">📊 Résumé du Cours</h5>
                        
                        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: #666;">Modules</span>
                                <strong style="color: #667eea;">${courseInfo.modules?.length || '?'}</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: #666;">Progression</span>
                                <strong style="color: #667eea;">${progressPercent}%</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #666;">Heures apprises</span>
                                <strong style="color: #667eea;">${Math.round((courseProgress.completedModules / courseProgress.totalModules) * (courseInfo.hours || 0))} / ${courseInfo.hours || '?'}h</strong>
                            </div>
                        </div>
                        
                        <div style="background: #f0f4ff; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                            <h6 style="color: #667eea; margin-top: 0;">📚 Contenu disponible</h6>
                            <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 0.95em;">
                                <li>Modules vidéo</li>
                                <li>Exercices pratiques</li>
                                <li>Documents PDF</li>
                                <li>Ressources supplémentaires</li>
                            </ul>
                        </div>
                        
                        ${progressPercent === 100 ? `
                        <button onclick="downloadCertificate('${courseName}')" style="width: 100%; background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: transform 0.2s; margin-bottom: 15px;"
                                onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <i class="fas fa-download me-2"></i>Télécharger Certificat
                        </button>
                        ` : ''}
                        
                        <div style="background: #f0fdf4; border-left: 4px solid #48bb78; padding: 15px; border-radius: 5px;">
                            <h6 style="color: #166534; margin-top: 0; margin-bottom: 8px;">💡 Conseil</h6>
                            <p style="color: #166534; font-size: 0.95em; margin: 0;">
                                Terminez chaque module en cliquant sur "Marquer comme complété" pour suivre votre progression.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Support -->
                    <div style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); margin-top: 20px;">
                        <h6 style="color: #333; margin-top: 0;">
                            <i class="fas fa-headset me-2" style="color: #667eea;"></i>Besoin d'aide?
                        </h6>
                        <p style="color: #666; font-size: 0.95em; margin: 10px 0;">
                            📧 <strong>Email:</strong><br>wilfreddjikiakam@gmail.com
                        </p>
                        <p style="color: #666; font-size: 0.95em; margin: 10px 0;">
                            📱 <strong>WhatsApp:</strong><br>+237 672 922 360
                        </p>
                        <p style="color: #666; font-size: 0.95em; margin: 0;">
                            <i class="fas fa-clock me-1"></i>Réponse rapide garantie
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Injecter la page
    document.body.insertAdjacentHTML('beforeend', courseHTML);
    window.scrollTo(0, 0);
    
    console.log(`✅ Page du cours "${courseName}" affichée avec progression`);
}

// ===== FONCTION 7: FERMER LA PAGE DU COURS =====
function closeCoursePage() {
    const coursePage = document.getElementById('courseLessonPage');
    if (coursePage) {
        coursePage.remove();
    }
}

// ===== FONCTION 8: AFFICHER "MES COURS" (NOUVEAU - SYSTÈME PROFESSIONNEL) =====
function viewMyLearning() {
    if (!isUserLoggedIn()) {
        alert('⚠️ Veuillez vous connecter pour accéder à vos cours');
        showLoginModal();
        return;
    }
    
    const currentUser = getCurrentUser();
    const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const userRecord = allUsers[currentUser.email];
    
    if (!userRecord || !userRecord.enrollments || userRecord.enrollments.length === 0) {
        alert('📚 Vous n\'êtes inscrit à aucun cours pour le moment.\n\nDécouvrez nos formations ci-dessous!');
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Créer la page "Mes Cours"
    let myCoursesHTML = `
    <div id="myCoursesPage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); z-index: 9999; overflow-y: auto; padding: 40px 20px;">
        <div class="container" style="max-width: 1200px;">
            <!-- En-tête -->
            <div style="color: white; margin-bottom: 40px; position: relative;">
                <button onclick="closeMyCoursesPage()" style="position: absolute; top: 0; right: 0; background: white; border: none; padding: 10px 20px; border-radius: 50px; font-weight: bold; cursor: pointer;">
                    <i class="fas fa-times me-2"></i>Fermer
                </button>
                <h1 style="font-size: 2.5em; margin-bottom: 10px;">
                    <i class="fas fa-book-open me-3"></i>Mes Cours & Ma Progression
                </h1>
                <p style="font-size: 1.1em; opacity: 0.9;">Bienvenue, ${currentUser.fullname}! 👋</p>
                <p style="opacity: 0.8;">Suivez votre apprentissage et continuez là où vous avez arrêté</p>
            </div>
            
            <!-- Statistiques utilisateur -->
            <div class="row mb-5" style="gap: 20px;">
                <div style="background: white; border-radius: 15px; padding: 25px; flex: 1; min-width: 200px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                    <h3 style="font-size: 2.5em; color: #667eea; margin: 0;">
                        <i class="fas fa-graduation-cap"></i> ${userRecord.enrollments.length}
                    </h3>
                    <p style="color: #666; margin: 5px 0 0;">Cours Inscrits</p>
                </div>
                <div style="background: white; border-radius: 15px; padding: 25px; flex: 1; min-width: 200px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                    <h3 style="font-size: 2.5em; color: #48bb78; margin: 0;">
                        <i class="fas fa-check-circle"></i> ${userRecord.completedCourses ? userRecord.completedCourses.length : 0}
                    </h3>
                    <p style="color: #666; margin: 5px 0 0;">Cours Complétés</p>
                </div>
                <div style="background: white; border-radius: 15px; padding: 25px; flex: 1; min-width: 200px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                    <h3 style="font-size: 2.5em; color: #ed8936; margin: 0;">
                        <i class="fas fa-clock"></i> ${userRecord.totalHours ? userRecord.totalHours : '0'} h
                    </h3>
                    <p style="color: #666; margin: 5px 0 0;">Heures Apprises</p>
                </div>
            </div>
            
            <!-- Liste des cours -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px;">
    `;
    
    // Ajouter chaque cours
    userRecord.enrollments.forEach((courseName, index) => {
        const courseInfo = coursesDatabase[courseName] || { description: courseName, hours: '?', duration: 'Variable' };
        const progress = getCourseProgress(currentUser.email, courseName);
        const isCompleted = progress >= 100;
        
        myCoursesHTML += `
        <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;" 
             onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 60px rgba(0,0,0,0.3)'" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 40px rgba(0,0,0,0.2)'">
            
            <!-- En-tête cours -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white;">
                <h3 style="margin: 0 0 10px; font-size: 1.4em;">
                    <i class="fas fa-book me-2"></i>${courseName}
                </h3>
                <p style="margin: 0; font-size: 0.95em; opacity: 0.9;">${courseInfo.description}</p>
            </div>
            
            <!-- Contenu cours -->
            <div style="padding: 20px;">
                <!-- Badges -->
                <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                    <span style="background: #f0f4ff; color: #667eea; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                        <i class="fas fa-hourglass me-1"></i>${courseInfo.hours}h
                    </span>
                    <span style="background: #f0fff4; color: #48bb78; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                        <i class="fas fa-calendar me-1"></i>${courseInfo.duration}
                    </span>
                    ${isCompleted ? '<span style="background: #fffaf0; color: #ed8936; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;"><i class="fas fa-trophy me-1"></i>Complété ✓</span>' : ''}
                </div>
                
                <!-- Barre de progression -->
                <p style="margin: 15px 0 8px; font-weight: bold; color: #333;">
                    Progression: <span style="color: #667eea;">${progress}%</span>
                </p>
                <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; margin-bottom: 15px;">
                    <div style="height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); width: ${progress}%; transition: width 0.5s;"></div>
                </div>
                
                <!-- Boutons actions -->
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button onclick="continueCourse('${courseName}')" style="flex: 1; background: #667eea; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.3s;"
                            onmouseover="this.style.background='#764ba2'" onmouseout="this.style.background='#667eea'">
                        <i class="fas fa-play-circle me-1"></i>Continuer
                    </button>
                    ${isCompleted ? `<button onclick="downloadCertificate('${courseName}')" style="flex: 1; background: #48bb78; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.3s;"
                            onmouseover="this.style.background='#38a169'" onmouseout="this.style.background='#48bb78'">
                        <i class="fas fa-download me-1"></i>Certificat
                    </button>` : ''}
                </div>
            </div>
        </div>
        `;
    });
    
    myCoursesHTML += `
            </div>
            
            <!-- CTA Découvrir plus -->
            <div style="background: white; border-radius: 15px; padding: 30px; margin-top: 40px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <h3 style="margin: 0 0 15px; color: #333;">Voulez-vous découvrir d'autres cours?</h3>
                <button onclick="closeMyCoursesPage(); document.getElementById('courses').scrollIntoView({behavior: 'smooth'});" 
                        style="background: #667eea; color: white; border: none; padding: 12px 30px; border-radius: 50px; cursor: pointer; font-weight: bold; font-size: 1em; transition: background 0.3s;"
                        onmouseover="this.style.background='#764ba2'" onmouseout="this.style.background='#667eea'">
                    <i class="fas fa-compass me-2"></i>Découvrir nos formations
                </button>
            </div>
        </div>
    </div>
    `;
    
    // Injecter et afficher
    document.body.insertAdjacentHTML('beforeend', myCoursesHTML);
    window.scrollTo(0, 0);
    console.log(`📚 Page "Mes Cours" affichée pour ${currentUser.fullname}`);
}

// ===== FONCTION 9: OBTENIR PROGRESSION D'UN COURS =====
function getCourseProgress(userEmail, courseName) {
    const userCourses = JSON.parse(localStorage.getItem('userCourses') || '{}');
    const courseKey = `${userEmail}_${courseName}`;
    
    if (userCourses[courseKey]) {
        const { completedModules, totalModules } = userCourses[courseKey];
        return Math.round((completedModules / totalModules) * 100);
    }
    
    return 0;
}

// ===== FONCTION 10: CONTINUER UN COURS =====
function continueCourse(courseName) {
    const currentUser = getCurrentUser();
    
    // Marquer le cours comme "en cours"
    const userCourses = JSON.parse(localStorage.getItem('userCourses') || '{}');
    const courseKey = `${currentUser.email}_${courseName}`;
    
    if (!userCourses[courseKey]) {
        const courseInfo = coursesDatabase[courseName];
        userCourses[courseKey] = {
            startedAt: new Date().toLocaleString('fr-CM'),
            completedModules: 0,
            totalModules: courseInfo.modules ? courseInfo.modules.length : 1,
            lastAccessed: new Date().toLocaleString('fr-CM')
        };
    } else {
        userCourses[courseKey].lastAccessed = new Date().toLocaleString('fr-CM');
    }
    
    localStorage.setItem('userCourses', JSON.stringify(userCourses));
    
    // Afficher le cours
    closeMyCoursesPage();
    displayCourseLessons(courseName);
}

// ===== FONCTION 11: MARQUER MODULE COMME COMPLÉTÉ =====
function completeModule(courseName, moduleIndex) {
    const currentUser = getCurrentUser();
    const userCourses = JSON.parse(localStorage.getItem('userCourses') || '{}');
    const courseKey = `${currentUser.email}_${courseName}`;
    
    if (userCourses[courseKey]) {
        userCourses[courseKey].completedModules = moduleIndex + 1;
        localStorage.setItem('userCourses', JSON.stringify(userCourses));
        
        const progress = getCourseProgress(currentUser.email, courseName);
        showCustomAlert(
            `✅ Module ${moduleIndex + 1} Complété!`,
            `Progression: ${progress}%\n\nContinuez pour terminer le cours!`,
            'success'
        );
        
        // Mettre à jour l'affichage
        const progressBar = document.querySelector('.course-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
}

// ===== FONCTION 12: TÉLÉCHARGER CERTIFICAT =====
function downloadCertificate(courseName) {
    const currentUser = getCurrentUser();
    
    if (typeof jspdf === 'undefined') {
        alert('⚠️ Impossible de générer le certificat. Veuillez réessayer.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    
    // Design professionnel du certificat
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Bordure décorative
    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);
    
    doc.setDrawColor(255, 198, 0);
    doc.setLineWidth(1);
    doc.rect(12, 12, 273, 186);
    
    // Logo/En-tête
    doc.setTextColor(102, 126, 234);
    doc.setFontSize(36);
    doc.text('RESPOCODEUR', 148, 40, { align: 'center' });
    
    // Titre du certificat
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.text('CERTIFICAT D\'ACCOMPLISSEMENT', 148, 65, { align: 'center' });
    
    // Ligne séparatrice
    doc.setDrawColor(255, 198, 0);
    doc.setLineWidth(2);
    doc.line(30, 75, 266, 75);
    
    // Contenu principal
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text('Nous certifions par la présente que', 148, 95, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(102, 126, 234);
    doc.text(currentUser.fullname.toUpperCase(), 148, 110, { align: 'center' });
    
    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    doc.text('a complété avec succès la formation', 148, 125, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(courseName, 148, 140, { align: 'center' });
    
    // Détails
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-CM')}`, 30, 160);
    doc.text(`Instructeur: Wilfred Djikiakam`, 30, 170);
    
    // Signature
    doc.setFontSize(10);
    doc.text('_________________________', 200, 160);
    doc.text('Wilfred Djikiakam', 200, 170);
    doc.text('Fondateur - RESPOCODEUR', 200, 175);
    
    // Numéro de certificat unique
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    const certNumber = `CERT-${Date.now()}`;
    doc.text(`Certificat #: ${certNumber}`, 148, 200, { align: 'center' });
    
    // Télécharger
    doc.save(`${courseName}-Certificat-${currentUser.fullname}.pdf`);
    
    showCustomAlert(
        '🎉 Certificat Téléchargé!',
        `Félicitations ${currentUser.fullname}!\n\nVotre certificat pour "${courseName}" a été généré.\n\nPartagez votre succès sur les réseaux sociaux! 📱`,
        'success'
    );
}

// ===== FONCTION 13: FERMER PAGE "MES COURS" =====
function closeMyCoursesPage() {
    const page = document.getElementById('myCoursesPage');
    if (page) {
        page.remove();
    }
}

// ===== VÉRIFIER INSCRIPTIONS APRÈS LOGIN =====
function checkUserEnrollmentsAfterLogin() {
    if (!isUserLoggedIn()) return;
    
    const currentUser = getCurrentUser();
    const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const userRecord = allUsers[currentUser.email];
    
    if (userRecord && userRecord.enrollments && userRecord.enrollments.length > 0) {
        // Montrer une notification avec lien vers "Mes Cours"
        const notification = document.createElement('div');
        notification.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 5000; max-width: 350px;">
            <h5 style="margin: 0 0 10px; font-weight: bold;">
                <i class="fas fa-book-open me-2"></i>Vous avez ${userRecord.enrollments.length} cours inscrits
            </h5>
            <p style="margin: 0 0 15px; font-size: 0.95em;">Cliquez ci-dessous pour continuer votre apprentissage</p>
            <button onclick="viewMyLearning()" style="background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; transition: transform 0.3s;"
                    onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.style.transform='scale(1)'">
                <i class="fas fa-arrow-right me-2"></i>Accéder à Mes Cours
            </button>
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; cursor: pointer; font-size: 1.5em;">×</button>
        </div>
        `;
        document.body.appendChild(notification);
    }
}

console.log('🎉 RESPOCODEUR - Système d\'inscription aux cours chargé avec succès!');