// ============================================================
// SYSTÈME DE LOGIN - GESTION DES COMPTES UTILISATEURS
// ============================================================

// ===== STRUCTURE UTILISATEURS EN LOCALSTORAGE =====
/*
localStorage.users = {
    "user@example.com": {
        fullname: "John Doe",
        email: "user@example.com",
        password: "hash_ou_plain",  // En production, utiliser hash!
        country: "Cameroon",
        phone: "+237XXXXXXXXX",
        createdAt: "2025-01-01T12:00:00Z",
        enrollments: ["Course1", "Course2"],
        payments: [
            { courseId: "Course1", amount: 50000, date: "2025-01-01", status: "completed" }
        ]
    }
}

localStorage.currentUser = {
    email: "user@example.com",
    fullname: "John Doe",
    token: "session_token_xyz",
    loggedInAt: "2025-01-01T12:00:00Z"
}
*/

// ===== INITIALISER LE STOCKAGE DES UTILISATEURS =====

function initializeUserStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    
    // Créer un utilisateur de test
    const testUsers = {
        "test@example.com": {
            fullname: "Test User",
            email: "test@example.com",
            password: "test123", // En production: utiliser bcrypt ou hachage!
            country: "Cameroon",
            phone: "+237672922360",
            createdAt: new Date().toISOString(),
            enrollments: [],
            payments: []
        },
        "demo@cameroun.cm": {
            fullname: "Wilfred Djikiakam",
            email: "demo@cameroun.cm",
            password: "demo123",
            country: "Cameroon",
            phone: "+237672922360",
            createdAt: new Date().toISOString(),
            enrollments: [],
            payments: []
        }
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Ajouter les utilisateurs de test s'ils n'existent pas
    Object.keys(testUsers).forEach(email => {
        if (!users[email]) {
            users[email] = testUsers[email];
        }
    });
    
    localStorage.setItem('users', JSON.stringify(users));
}

// ===== VÉRIFIER SI UTILISATEUR EST CONNECTÉ =====

function isUserLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null && currentUser !== undefined;
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// ===== ENREGISTREMENT NOUVEL UTILISATEUR =====

function registerUser(fullname, email, password, confirmPassword, country, phone) {
    // Validation
    if (!fullname || !email || !password || !confirmPassword || !country || !phone) {
        alert('⚠️ Veuillez remplir tous les champs correctement');
        return { success: false, error: 'validation' };
    }

    if (password !== confirmPassword) {
        alert('⚠️ Les mots de passe ne correspondent pas');
        return { success: false, error: 'password_mismatch' };
    }

    if (password.length < 6) {
        alert('⚠️ Le mot de passe doit avoir au moins 6 caractères');
        return { success: false, error: 'password_short' };
    }

    if (!email.includes('@')) {
        alert('⚠️ Veuillez entrer une adresse email valide');
        return { success: false, error: 'invalid_email' };
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
        alert('⚠️ Email déjà utilisé');
        return { success: false, error: 'email_exists' };
    }

    // Créer nouvel utilisateur
    const newUser = {
        fullname: fullname.trim(),
        email: email.toLowerCase().trim(),
        password: password, // ⚠️ EN PRODUCTION: Utiliser bcrypt ou argon2!
        country: country,
        phone: phone.trim(),
        createdAt: new Date().toISOString(),
        enrollments: [],
        payments: []
    };

    users[email.toLowerCase()] = newUser;
    localStorage.setItem('users', JSON.stringify(users));

    console.log('✅ Nouvel utilisateur créé:', email);
    
    return { success: true };
}

// ===== CONNEXION UTILISATEUR =====

function loginUser(email, password) {
    // Validation
    if (!email || !password) {
        alert('⚠️ Tous les champs sont obligatoires');
        return { success: false, error: 'required_fields' };
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[email.toLowerCase()];

    if (!user) {
        alert('❌ Email ou mot de passe invalide');
        return { success: false, error: 'not_found' };
    }

    if (user.password !== password) { // ⚠️ À AMÉLIORER: Utiliser bcrypt!
        alert('❌ Email ou mot de passe invalide');
        return { success: false, error: 'invalid_password' };
    }

    // Créer session
    const currentUser = {
        email: user.email,
        fullname: user.fullname,
        country: user.country,
        phone: user.phone,
        token: generateToken(),
        loggedInAt: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('✅ Connexion réussie:', email);
    
    // Vérifier si l'utilisateur a des cours inscrits (nouveau système)
    if (typeof checkUserEnrollmentsAfterLogin === 'function') {
        setTimeout(checkUserEnrollmentsAfterLogin, 500);
    }
    
    return { success: true, user: currentUser };
}

// ===== DÉCONNEXION =====

function logoutUser() {
    localStorage.removeItem('currentUser');
    console.log('✅ Déconnexion réussie');
    
    // Mettre à jour le navbar immédiatement
    logoutUserNavbar();
    
    // Rediriger vers accueil après un court délai
    setTimeout(() => {
        window.location.href = '#home';
        location.reload();
    }, 300);
}

// ===== GÉNÉRER TOKEN =====

function generateToken() {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// ===== OBTENIR DONNÉES UTILISATEUR =====

function getUserData(email) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    return users[email.toLowerCase()] || null;
}

function getUserEnrollments(email) {
    const user = getUserData(email);
    return user ? user.enrollments : [];
}

function getUserPayments(email) {
    const user = getUserData(email);
    return user ? user.payments : [];
}

// ===== METTRE À JOUR PROFIL UTILISATEUR =====

function updateUserProfile(email, updates) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (!users[email.toLowerCase()]) {
        return { success: false, error: 'user_not_found' };
    }

    // Mettre à jour les champs autorisés
    const allowedFields = ['fullname', 'phone', 'country'];
    
    allowedFields.forEach(field => {
        if (updates[field]) {
            users[email.toLowerCase()][field] = updates[field];
        }
    });

    localStorage.setItem('users', JSON.stringify(users));

    // Mettre à jour la session actuelle si c'est l'utilisateur connecté
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === email.toLowerCase()) {
        allowedFields.forEach(field => {
            if (updates[field]) {
                currentUser[field] = updates[field];
            }
        });
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    return { success: true };
}

// ===== AJOUTER INSCRIPTION À UN COURS =====

function addEnrollment(userEmail, courseName, courseType, price = 0) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (!users[userEmail.toLowerCase()]) {
        return { success: false, error: 'user_not_found' };
    }

    const user = users[userEmail.toLowerCase()];
    
    if (!user.enrollments) {
        user.enrollments = [];
    }

    // Vérifier si déjà inscrit
    if (user.enrollments.includes(courseName)) {
        return { success: false, error: 'already_enrolled' };
    }

    user.enrollments.push(courseName);
    localStorage.setItem('users', JSON.stringify(users));

    console.log(`✅ Inscription ajoutée: ${userEmail} -> ${courseName}`);
    
    return { success: true };
}

// ===== ENREGISTRER PAIEMENT =====

function recordPayment(userEmail, courseName, amount, paymentMethod = 'mobile_money', transactionRef = '') {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (!users[userEmail.toLowerCase()]) {
        return { success: false, error: 'user_not_found' };
    }

    const user = users[userEmail.toLowerCase()];
    
    if (!user.payments) {
        user.payments = [];
    }

    const payment = {
        courseId: courseName,
        amount: amount,
        paymentMethod: paymentMethod,
        transactionReference: transactionRef,
        date: new Date().toISOString(),
        status: 'completed'
    };

    user.payments.push(payment);
    localStorage.setItem('users', JSON.stringify(users));

    console.log(`💳 Paiement enregistré: ${userEmail} - ${courseName} - ${amount} FCFA`);
    
    return { success: true, payment: payment };
}

// ===== PAGE DE LOGIN MODALE =====

function showLoginModal() {
    const html = `
        <div class="modal fade" id="loginModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" data-translate="login.title">Connexion à Votre Compte</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    
                    <div class="modal-body">
                        <form id="loginForm" onsubmit="handleLoginSubmit(event)">
                            <div class="mb-3">
                                <label class="form-label" data-translate="login.email">Adresse Email</label>
                                <input type="email" class="form-control" id="loginEmail" 
                                       data-translate-placeholder="login.emailPlaceholder" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" data-translate="login.password">Mot de passe</label>
                                <input type="password" class="form-control" id="loginPassword" 
                                       data-translate-placeholder="login.passwordPlaceholder" required>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="rememberMe">
                                <label class="form-check-label" for="rememberMe" data-translate="login.rememberMe">
                                    Se souvenir de moi
                                </label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 mb-3" data-translate-value="login.signin">
                                Se connecter
                            </button>
                        </form>

                        <hr>

                        <p class="text-center" data-translate="login.noAccount">Pas encore de compte?</p>
                        <button class="btn btn-outline-primary w-100" onclick="switchToRegisterModal()" 
                                data-translate-value="login.createOne">
                            En créer un
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    // DÉSACTIVÉ: updatePageLanguage();
    
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

function showRegisterModal() {
    const html = `
        <div class="modal fade" id="registerModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" data-translate="register.title">Créer un Nouveau Compte</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    
                    <div class="modal-body">
                        <form id="registerForm" onsubmit="handleRegisterSubmit(event)">
                            <div class="mb-3">
                                <label class="form-label" data-translate="register.fullname">Nom Complet</label>
                                <input type="text" class="form-control" id="registerFullname" 
                                       data-translate-placeholder="register.fullnamePlaceholder" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" data-translate="register.email">Adresse Email</label>
                                <input type="email" class="form-control" id="registerEmail" 
                                       data-translate-placeholder="register.emailPlaceholder" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" data-translate="register.password">Mot de passe</label>
                                <input type="password" class="form-control" id="registerPassword" 
                                       data-translate-placeholder="register.passwordPlaceholder" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" data-translate="register.confirmPassword">Confirmer le mot de passe</label>
                                <input type="password" class="form-control" id="registerConfirmPassword" 
                                       data-translate-placeholder="register.confirmPasswordPlaceholder" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" data-translate="register.country">Pays</label>
                                <select class="form-control" id="registerCountry" required>
                                    <option value="Cameroon" data-translate="register.cameroon">Cameroon</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" data-translate="register.phone">Numéro WhatsApp (+237...)</label>
                                <input type="tel" class="form-control" id="registerPhone" 
                                       data-translate-placeholder="register.phonePlaceholder" required>
                            </div>

                            <button type="submit" class="btn btn-success w-100 mb-3" data-translate-value="register.signup">
                                S'inscrire
                            </button>
                        </form>

                        <hr>

                        <p class="text-center" data-translate="register.already">Vous avez déjà un compte?</p>
                        <button class="btn btn-outline-success w-100" onclick="switchToLoginModal()" 
                                data-translate-value="register.signin">
                            Se connecter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    // DÉSACTIVÉ: updatePageLanguage();
    
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

// ===== GESTIONNAIRES DE SOUMISSION DE FORMULAIRE =====

function handleLoginSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const result = loginUser(email, password);

    if (result.success) {
        alert('✅ Connexion réussie!');
        
        if (rememberMe) {
            localStorage.setItem('rememberEmail', email);
        }

        // Fermer modal et afficher courses
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();

        setTimeout(() => {
            showUserDashboard();
        }, 500);
    }
}

function handleRegisterSubmit(event) {
    event.preventDefault();

    const fullname = document.getElementById('registerFullname').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const country = document.getElementById('registerCountry').value;
    const phone = document.getElementById('registerPhone').value;

    const result = registerUser(fullname, email, password, confirmPassword, country, phone);

    if (result.success) {
        alert('✅ Compte créé avec succès!');

        // Fermer modal register
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();

        // Ouvrir modal login
        setTimeout(() => {
            showLoginModal();
        }, 500);
    }
}

// ===== BASCULER ENTRE MODAUX =====

function switchToLoginModal() {
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (registerModal) registerModal.hide();

    setTimeout(() => {
        showLoginModal();
    }, 500);
}

function switchToRegisterModal() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();

    setTimeout(() => {
        showRegisterModal();
    }, 500);
}

// ===== TABLEAU DE BORD UTILISATEUR =====

function showUserDashboard() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        alert('⚠️ Veuillez vous connecter d\'abord');
        showLoginModal();
        return;
    }

    console.log('📊 Affichage du tableau de bord pour:', currentUser.fullname);

    // Afficher la section courses
    const coursesSection = document.querySelector('section#courses');
    if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Mettre à jour la navigation pour afficher l'utilisateur
    updateNavbarWithUser(currentUser);

    // Afficher les cours de l'utilisateur
    displayUserCourses(currentUser.email);
}

function updateNavbarWithUser(user) {
    // Masquer les boutons auth et afficher le menu utilisateur
    const authButtons = document.querySelector('#authButtons');
    const userMenu = document.querySelector('#userMenu');
    const userName = document.querySelector('#userName');
    
    if (authButtons) authButtons.style.display = 'none';
    if (userMenu) {
        userMenu.style.display = 'flex';
        if (userName) {
            userName.textContent = user.fullname.split(' ')[0];
        }
    }
}

function logoutUserNavbar() {
    // Afficher les boutons auth et masquer le menu utilisateur
    const authButtons = document.querySelector('#authButtons');
    const userMenu = document.querySelector('#userMenu');
    
    if (authButtons) authButtons.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
}

function viewProfile() {
    const user = getCurrentUser();
    if (!user) {
        showLoginModal();
        return;
    }
    alert('Profil de ' + user.fullname + '\nEmail: ' + user.email + '\nPays: ' + user.country);
}

function displayUserCourses(userEmail) {
    const user = getUserData(userEmail);
    const enrollments = user.enrollments || [];

    console.log('📚 Cours de l\'utilisateur:', enrollments);

    // À implémenter selon votre structure de cours
}

// ===== FONCTIONS SUPPLÉMENTAIRES =====

function showUserAccount() {
    const user = getCurrentUser();
    alert(`👤 Profil\n\nNom: ${user.fullname}\nEmail: ${user.email}\nPays: ${user.country}\nWhatsApp: ${user.phone}`);
}

function showMyEnrollments() {
    const user = getCurrentUser();
    const userData = getUserData(user.email);
    const enrollments = userData.enrollments || [];

    if (enrollments.length === 0) {
        alert('📚 Vous n\'êtes pas encore inscrit à un cours');
        return;
    }

    alert(`📚 Vos Cours (${enrollments.length}):\n\n${enrollments.join('\n')}`);
}

function showMyPayments() {
    const user = getCurrentUser();
    const userData = getUserData(user.email);
    const payments = userData.payments || [];

    if (payments.length === 0) {
        alert('💳 Aucun paiement enregistré');
        return;
    }

    let paymentList = '💳 Vos Paiements:\n\n';
    payments.forEach(p => {
        paymentList += `${p.courseId}\n  ${p.amount} FCFA - ${new Date(p.date).toLocaleDateString()}\n\n`;
    });

    alert(paymentList);
}

// ===== INITIALISATION AU CHARGEMENT =====

function initializeLoginSystem() {
    initializeUserStorage();

    // Si utilisateur déjà connecté, mettre à jour la navbar
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateNavbarWithUser(currentUser);
    }

    // Remplir l'email de login si "Se souvenir de moi" était coché
    const rememberEmail = localStorage.getItem('rememberEmail');
    if (rememberEmail && document.getElementById('loginEmail')) {
        document.getElementById('loginEmail').value = rememberEmail;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoginSystem);
} else {
    initializeLoginSystem();
}
