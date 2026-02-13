// ============================================================
// SYSTÈME MULTILINGUE - FRANÇAIS & ANGLAIS
// ============================================================

const translations = {
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.courses': 'Cours',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.logout': 'Déconnexion',
        'nav.myAccount': 'Mon Compte',

        // Page Login
        'login.title': 'Connexion à Votre Compte',
        'login.subtitle': 'Accédez à vos cours et votre progression',
        'login.email': 'Adresse Email',
        'login.emailPlaceholder': 'votre@email.com',
        'login.password': 'Mot de passe',
        'login.passwordPlaceholder': 'Entrez votre mot de passe',
        'login.rememberMe': 'Se souvenir de moi',
        'login.forgotPassword': 'Mot de passe oublié?',
        'login.signin': 'Se connecter',
        'login.noAccount': 'Pas encore de compte?',
        'login.createOne': 'En créer un',
        'login.errorInvalid': '❌ Email ou mot de passe invalide',
        'login.errorRequired': '⚠️ Tous les champs sont obligatoires',
        'login.success': '✅ Connexion réussie!',
        'login.loading': 'Connexion en cours...',

        // Page Inscription
        'register.title': 'Créer un Nouveau Compte',
        'register.subtitle': 'Inscrivez-vous pour accéder aux cours',
        'register.fullname': 'Nom Complet',
        'register.fullnamePlaceholder': 'Jean Dupont',
        'register.email': 'Adresse Email',
        'register.emailPlaceholder': 'votre@email.com',
        'register.password': 'Mot de passe',
        'register.passwordPlaceholder': 'Minimum 6 caractères',
        'register.confirmPassword': 'Confirmer le mot de passe',
        'register.confirmPasswordPlaceholder': 'Répétez le mot de passe',
        'register.country': 'Pays',
        'register.cameroon': 'Cameroun',
        'register.phone': 'Numéro WhatsApp (+237...)',
        'register.phonePlaceholder': '+237 6XX XXX XXX',
        'register.signup': 'S\'inscrire',
        'register.already': 'Vous avez déjà un compte?',
        'register.signin': 'Se connecter',
        'register.errorEmail': '⚠️ Email déjà utilisé',
        'register.errorPassword': '⚠️ Les mots de passe ne correspondent pas',
        'register.errorValidation': '⚠️ Veuillez remplir tous les champs correctement',
        'register.success': '✅ Compte créé avec succès!',
        'register.loading': 'Création du compte...',

        // Sélecteur langue
        'language.select': 'Choisir une langue',
        'language.french': '🇫🇷 Français',
        'language.english': '🇬🇧 English',
        'language.cameroon': 'Bienvenue au Cameroun!',

        // Accueil
        'home.greeting': 'Salut, je suis',
        'home.role': 'Développeur Full-Stack & Étudiant en Génie Logiciel',
        'home.description': 'Passionné par le développement C# et web, je transforme vos idées en solutions digitales innovantes. "Le code est ma toile, l\'innovation mon pinceau."',

        // À propos
        'about.title': 'À propos de moi',
        'about.subtitle': 'Découvrez mon parcours et mes compétences',

        // Portfolio
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Découvrez mes réalisations et projets',

        // Blog
        'blog.title': 'Blog Technique',
        'blog.subtitle': 'Mes derniers articles et tutoriels',

        // Formations
        'courses.title': 'Cours & Formations',
        'courses.location': 'Basé au Cameroun Enseignement en ligne & présentiel',
        'courses.description': 'Formations complètes en Informatique, Réseaux, Programmation, Maintenance et Hardware Paiement sécurisé via Orange Money 🟠',
        'courses.subtitle': 'Continuez votre apprentissage',
        'courses.free': 'Cours Gratuit',
        'courses.paid': 'Cours Payant',
        'courses.enrolled': 'Inscrit',
        'courses.notEnrolled': 'Non inscrit',
        'courses.progress': 'Progression',
        'courses.complete': 'Terminer le module',
        'courses.completed': 'Complété ✅',
        'courses.download': 'Télécharger le certificat',
        'courses.downloadDisabled': 'Complétez 100% pour télécharger',
        'courses.price': 'Prix',
        'courses.fcfa': 'FCFA',
        'courses.enroll': 'S\'inscrire',
        'courses.resume': 'Continuer',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Travaillons ensemble sur votre prochain projet',

        // Paiement
        'payment.title': '💳 PAIEMENT OBLIGATOIRE',
        'payment.required': 'Paiement requis pour accéder à ce cours',
        'payment.amount': 'Montant',
        'payment.proceed': '💳 Procéder au Paiement',
        'payment.cancel': 'Annuler',
        'payment.method': 'Choisir une méthode de paiement',
        'payment.mobilemoney': '📱 Mobile Money (Cameroun)',
        'payment.instructions': '🔴 ÉTAPES À SUIVRE:',
        'payment.step1': 'Ouvrez votre application Mobile Money',
        'payment.step2': 'Allez sur "Envoyer de l\'argent"',
        'payment.step3': 'Entrez le numéro',
        'payment.step4': 'Entrez le montant',
        'payment.step5': 'Validez la transaction',
        'payment.step6': 'Copiez le code de confirmation',
        'payment.step7': 'Collez-le ci-dessous et cliquez "Confirmer Paiement"',
        'payment.fullname': 'Votre Nom Complet',
        'payment.email': 'Votre Email',
        'payment.phone': 'Votre WhatsApp (+237...)',
        'payment.code': 'Code de Confirmation Mobile Money',
        'payment.confirm': 'Confirmer le Paiement',
        'payment.success': '✅ Paiement confirmé! Accès au cours accordé.',
        'payment.error': '❌ Erreur lors du paiement. Veuillez réessayer.',

        // Certificat
        'certificate.title': 'Certificat d\'Accomplissement',
        'certificate.congratulations': 'Félicitations!',
        'certificate.completed': 'Vous avez complété le cours',
        'certificate.name': 'Nom du certificat',
        'certificate.date': 'Date',
        'certificate.signature': 'Signature',
        'certificate.download': 'Télécharger en PDF',

        // Messages généraux
        'general.welcome': 'Bienvenue',
        'general.hello': 'Bonjour',
        'general.error': 'Erreur',
        'general.success': 'Succès',
        'general.loading': 'Chargement...',
        'general.back': '← Retour',
        'general.next': 'Suivant →',
        'general.save': 'Enregistrer',
        'general.cancel': 'Annuler',
        'general.delete': 'Supprimer',
        'general.edit': 'Modifier',
        'general.search': 'Rechercher...',
    },

    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.courses': 'Courses',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.logout': 'Logout',
        'nav.myAccount': 'My Account',

        // Login Page
        'login.title': 'Sign In to Your Account',
        'login.subtitle': 'Access your courses and progress',
        'login.email': 'Email Address',
        'login.emailPlaceholder': 'your@email.com',
        'login.password': 'Password',
        'login.passwordPlaceholder': 'Enter your password',
        'login.rememberMe': 'Remember me',
        'login.forgotPassword': 'Forgot password?',
        'login.signin': 'Sign In',
        'login.noAccount': 'Don\'t have an account?',
        'login.createOne': 'Create one',
        'login.errorInvalid': '❌ Invalid email or password',
        'login.errorRequired': '⚠️ All fields are required',
        'login.success': '✅ Sign in successful!',
        'login.loading': 'Signing in...',

        // Registration Page
        'register.title': 'Create a New Account',
        'register.subtitle': 'Sign up to access courses',
        'register.fullname': 'Full Name',
        'register.fullnamePlaceholder': 'John Doe',
        'register.email': 'Email Address',
        'register.emailPlaceholder': 'your@email.com',
        'register.password': 'Password',
        'register.passwordPlaceholder': 'Minimum 6 characters',
        'register.confirmPassword': 'Confirm Password',
        'register.confirmPasswordPlaceholder': 'Repeat password',
        'register.country': 'Country',
        'register.cameroon': 'Cameroon',
        'register.phone': 'WhatsApp Number (+237...)',
        'register.phonePlaceholder': '+237 6XX XXX XXX',
        'register.signup': 'Sign Up',
        'register.already': 'Already have an account?',
        'register.signin': 'Sign In',
        'register.errorEmail': '⚠️ Email already used',
        'register.errorPassword': '⚠️ Passwords do not match',
        'register.errorValidation': '⚠️ Please fill all fields correctly',
        'register.success': '✅ Account created successfully!',
        'register.loading': 'Creating account...',

        // Language Selector
        'language.select': 'Select a Language',
        'language.french': '🇫🇷 Français',
        'language.english': '🇬🇧 English',
        'language.cameroon': 'Welcome to Cameroon!',

        // Home
        'home.greeting': 'Hi, I\'m',
        'home.role': 'Full-Stack Developer & Software Engineering Student',
        'home.description': 'Passionate about C# and web development, I transform your ideas into innovative digital solutions. "Code is my canvas, innovation is my brush."',

        // About
        'about.title': 'About Me',
        'about.subtitle': 'Discover my journey and skills',

        // Portfolio
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Discover my achievements and projects',

        // Blog
        'blog.title': 'Technical Blog',
        'blog.subtitle': 'My latest articles and tutorials',

        // Courses
        'courses.title': 'Courses & Training',
        'courses.location': 'Based in Cameroon Online & in-person teaching',
        'courses.description': 'Complete training in Computing, Networks, Programming, Maintenance and Hardware Secure payment via Orange Money 🟠',
        'courses.subtitle': 'Continue your learning journey',
        'courses.free': 'Free Course',
        'courses.paid': 'Paid Course',
        'courses.enrolled': 'Enrolled',
        'courses.notEnrolled': 'Not Enrolled',
        'courses.progress': 'Progress',
        'courses.complete': 'Complete Module',
        'courses.completed': 'Completed ✅',
        'courses.download': 'Download Certificate',
        'courses.downloadDisabled': 'Complete 100% to download',
        'courses.price': 'Price',
        'courses.fcfa': 'FCFA',
        'courses.enroll': 'Enroll Now',
        'courses.resume': 'Continue',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Let\'s work together on your next project',

        // Payment
        'payment.title': '💳 PAYMENT REQUIRED',
        'payment.required': 'Payment is required to access this course',
        'payment.amount': 'Amount',
        'payment.proceed': '💳 Proceed to Payment',
        'payment.cancel': 'Cancel',
        'payment.method': 'Choose a payment method',
        'payment.mobilemoney': '📱 Mobile Money (Cameroon)',
        'payment.instructions': '🔴 STEPS TO FOLLOW:',
        'payment.step1': 'Open your Mobile Money application',
        'payment.step2': 'Go to "Send Money"',
        'payment.step3': 'Enter the number',
        'payment.step4': 'Enter the amount',
        'payment.step5': 'Validate the transaction',
        'payment.step6': 'Copy the confirmation code',
        'payment.step7': 'Paste it below and click "Confirm Payment"',
        'payment.fullname': 'Your Full Name',
        'payment.email': 'Your Email',
        'payment.phone': 'Your WhatsApp (+237...)',
        'payment.code': 'Mobile Money Confirmation Code',
        'payment.confirm': 'Confirm Payment',
        'payment.success': '✅ Payment confirmed! Course access granted.',
        'payment.error': '❌ Payment error. Please try again.',

        // Certificate
        'certificate.title': 'Certificate of Accomplishment',
        'certificate.congratulations': 'Congratulations!',
        'certificate.completed': 'You have completed the course',
        'certificate.name': 'Certificate Name',
        'certificate.date': 'Date',
        'certificate.signature': 'Signature',
        'certificate.download': 'Download as PDF',

        // General Messages
        'general.welcome': 'Welcome',
        'general.hello': 'Hello',
        'general.error': 'Error',
        'general.success': 'Success',
        'general.loading': 'Loading...',
        'general.back': '← Back',
        'general.next': 'Next →',
        'general.save': 'Save',
        'general.cancel': 'Cancel',
        'general.delete': 'Delete',
        'general.edit': 'Edit',
        'general.search': 'Search...',
    }
};

// ===== GESTION DE LA LANGUE ACTIVE =====

let currentLanguage = localStorage.getItem('appLanguage') || 'fr';

function setLanguage(lang) {
    if (lang === 'fr' || lang === 'en') {
        currentLanguage = lang;
        localStorage.setItem('appLanguage', lang);
        updatePageLanguage();
        document.documentElement.lang = lang;
        return true;
    }
    return false;
}

function getLanguage() {
    return currentLanguage;
}

function translate(key) {
    // DÉSACTIVÉ: Système de traduction
    // Retourner une chaîne vide pour éviter les clés brutes
    return '';
}

// Alias court
function t(key) {
    return translate(key);
}

function updatePageLanguage() {
    // Mettre à jour les éléments avec data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key);
    });

    // Mettre à jour les placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key);
    });

    // Mettre à jour les titres
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        element.title = translate(key);
    });

    // Mettre à jour les attributs value (boutons)
    document.querySelectorAll('[data-translate-value]').forEach(element => {
        const key = element.getAttribute('data-translate-value');
        element.value = translate(key);
    });

    // Mettre à jour la navigation
    updateNavigation();
    
    // Mettre à jour les drapeaux de langue
    updateLanguageFlags();
}

function updateNavigation() {
    const lang = getLanguage();
    
    // Mise à jour de la navbar
    const navLinks = {
        'nav.home': document.querySelector('[href="#home"]'),
        'nav.about': document.querySelector('[href="#about"]'),
        'nav.courses': document.querySelector('[href="#courses"]'),
        'nav.portfolio': document.querySelector('[href="#portfolio"]'),
        'nav.blog': document.querySelector('[href="#blog"]'),
        'nav.contact': document.querySelector('[href="#contact"]')
    };
    
    Object.entries(navLinks).forEach(([key, element]) => {
        if (element) {
            // Garder l'icône si elle existe
            const icon = element.querySelector('i');
            element.textContent = '';
            if (icon) {
                element.appendChild(icon.cloneNode(true));
                element.appendChild(document.createTextNode(' ' + translate(key)));
            } else {
                element.textContent = translate(key);
            }
        }
    });
}

function updateLanguageFlags() {
    const lang = getLanguage();
    const frFlag = document.querySelector('[onclick="selectLanguage(\'fr\')"]');
    const enFlag = document.querySelector('[onclick="selectLanguage(\'en\')"]');
    
    if (frFlag && enFlag) {
        if (lang === 'fr') {
            frFlag.classList.remove('inactive');
            frFlag.classList.add('active');
            enFlag.classList.remove('active');
            enFlag.classList.add('inactive');
        } else {
            enFlag.classList.remove('inactive');
            enFlag.classList.add('active');
            frFlag.classList.remove('active');
            frFlag.classList.add('inactive');
        }
    }
}

// ===== MODAL DE SÉLECTION DE LANGUE =====

function showLanguageSelector() {
    const html = `
        <div class="modal fade" id="languageSelectorModal" tabindex="-1" backdrop="static" keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-primary border-3">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" data-translate="language.select">Choisir une langue</h5>
                    </div>
                    
                    <div class="modal-body text-center">
                        <h6 class="mb-4" data-translate="language.cameroon">Bienvenue au Cameroun!</h6>
                        
                        <div class="d-grid gap-3">
                            <button class="btn btn-outline-primary btn-lg" onclick="selectLanguage('fr')">
                                <span style="font-size: 2em;">🇫🇷</span><br>
                                <strong data-translate="language.french">Français</strong>
                            </button>
                            
                            <button class="btn btn-outline-success btn-lg" onclick="selectLanguage('en')">
                                <span style="font-size: 2em;">🇬🇧</span><br>
                                <strong data-translate="language.english">English</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    const modal = new bootstrap.Modal(document.getElementById('languageSelectorModal'));
    modal.show();
}

function selectLanguage(lang) {
    setLanguage(lang);
    updatePageLanguage(); // Appel immédiat pour mettre à jour la page
    
    // Fermer la modale si elle existe
    const modal = document.getElementById('languageSelectorModal');
    if (modal) {
        const instance = bootstrap.Modal.getInstance(modal);
        if (instance) instance.hide();
    }
}

// ===== VÉRIFICATION DE LANGUE AU DÉMARRAGE =====

function initLanguageSystem() {
    // TOUJOURS appliquer les traductions au chargement
    updatePageLanguage();
    
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem('appVisited');
    
    if (!hasVisited) {
        // Première visite: marquer et montrer le sélecteur de langue
        localStorage.setItem('appVisited', 'true');
        // On peut ajouter un comportement spécial pour première visite ici si désiré
        // showLanguageSelector(); // Optionnel: décommenter si vous voulez un modal
    }
}

// ===== HELPER POUR TEXTE BILINGUE =====

function getBilingualText(textFr, textEn) {
    return currentLanguage === 'fr' ? textFr : textEn;
}

function getCourseBilingualName(courseName) {
    // Les noms de cours peuvent avoir des traductions
    const courseNamesFr = {
        'Introduction Programmation': 'Introduction to Programming',
        'Les Variables et Types': 'Variables and Data Types',
        'Structures de Contrôle': 'Control Structures',
    };
    
    if (currentLanguage === 'en' && courseNamesFr[courseName]) {
        return courseNamesFr[courseName];
    }
    
    return courseName;
}

// ===== DÉSACTIVÉ: Système de traduction complexe
// Maintenant, le site est entièrement en français (pas de bilingue)
// Pour réactiver le système multilingue, décommenter ci-dessous
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initLanguageSystem);
// } else {
//     initLanguageSystem();
// }
