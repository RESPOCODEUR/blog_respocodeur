// ============================================================
// BASE DE DONNÉES DES COURS AVEC CONTENUS DÉTAILLÉS
// ============================================================

const coursesDatabase = {
    // COURS GRATUITS
    'Introduction Programmation': {
        type: 'free',
        price: 0,
        duration: '6 semaines',
        hours: 12,
        instructor: 'Wilfred Djikiakam',
        description: 'Apprenez les bases de la programmation avec Python',
        modules: [
            {
                title: 'Module 1: Introduction à Python',
                duration: '2 heures',
                content: `
                    <h5>Objectifs du module</h5>
                    <ul>
                        <li>Installation de Python et configuration de l'environnement</li>
                        <li>Premiers pas avec Python</li>
                        <li>Structure de base d'un programme</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Guide Python pour Débutants (PDF)</li>
                        <li>🎥 Vidéo: Installation Python (15 min)</li>
                        <li>💻 Exercice: Votre premier programme</li>
                    </ul>
                    <h5>À retenir</h5>
                    <p>Python est un langage facile à apprendre, parfait pour commencer la programmation!</p>
                `
            },
            {
                title: 'Module 2: Variables et Types de Données',
                duration: '2 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>Types de données: int, float, str, bool</li>
                        <li>Déclaration et utilisation des variables</li>
                        <li>Conversions de types</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Chapitre 2: Variables (PDF)</li>
                        <li>🎥 Vidéo: Types de Données (20 min)</li>
                        <li>💻 5 Exercices pratiques</li>
                    </ul>
                `
            },
            {
                title: 'Module 3: Structures de Contrôle (if, else)',
                duration: '2 heures',
                content: `
                    <h5>Ce que vous apprendrez</h5>
                    <ul>
                        <li>Conditions if/else/elif</li>
                        <li>Opérateurs de comparaison</li>
                        <li>Opérateurs logiques (and, or, not)</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Conditions et Logique (PDF)</li>
                        <li>🎥 Structures de Contrôle (25 min)</li>
                        <li>💻 Projet: Calculatrice Simple</li>
                    </ul>
                `
            },
            {
                title: 'Module 4: Boucles (for, while)',
                duration: '2 heures',
                content: `
                    <h5>Apprentissage</h5>
                    <ul>
                        <li>Boucles for et while</li>
                        <li>Break et continue</li>
                        <li>Itération sur listes</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Les Boucles en Python (PDF)</li>
                        <li>🎥 Démonstration Boucles (20 min)</li>
                        <li>💻 Projet: Table de Multiplication</li>
                    </ul>
                `
            },
            {
                title: 'Module 5: Fonctions',
                duration: '2 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>Créer des fonctions</li>
                        <li>Paramètres et arguments</li>
                        <li>Return et valeurs de retour</li>
                        <li>Scope des variables</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Guide Complet des Fonctions (PDF)</li>
                        <li>🎥 Fonctions en Python (25 min)</li>
                        <li>💻 Projet: Bibliothèque de Fonctions</li>
                    </ul>
                `
            },
            {
                title: 'Module 6: Projet Final',
                duration: '2 heures',
                content: `
                    <h5>Projet Capstone</h5>
                    <p>Créez un programme complet combinant tout ce que vous avez appris!</p>
                    <h5>Options de Projets</h5>
                    <ul>
                        <li>📊 Gestionnaire de Budget Personnel</li>
                        <li>🎮 Jeu de Devinettes</li>
                        <li>📚 Catalogue de Livres</li>
                    </ul>
                    <h5>Support</h5>
                    <ul>
                        <li>💬 Forum d'entraide (accès 3 mois)</li>
                        <li>📧 Support email: wilfreddjikiakam@gmail.com</li>
                    </ul>
                `
            }
        ],
        resources: {
            documents: ['Python_Basics_Guide.pdf', 'Exercices_Pratiques.zip'],
            videos: ['Introduction_Python.mp4', 'Variables_Types.mp4', 'Structures_Controle.mp4'],
            code: ['exemples_module1.py', 'solutions_exercices.zip']
        }
    },

    'HTML5 CSS3 Bases': {
        type: 'free',
        price: 0,
        duration: '4 semaines',
        hours: 8,
        instructor: 'Wilfred Djikiakam',
        description: 'Apprenez à créer des sites web avec HTML5 et CSS3',
        modules: [
            {
                title: 'Module 1: Fondamentaux HTML5',
                duration: '2 heures',
                content: `
                    <h5>Que vous apprendrez</h5>
                    <ul>
                        <li>Structure HTML5</li>
                        <li>Balises sémantiques</li>
                        <li>Formulaires HTML</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 HTML5 Complet (PDF)</li>
                        <li>🎥 Intro HTML5 (20 min)</li>
                        <li>💻 Codes d'exemple</li>
                    </ul>
                `
            },
            {
                title: 'Module 2: Styling avec CSS3',
                duration: '2 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>Sélecteurs CSS</li>
                        <li>Box Model</li>
                        <li>Propriétés avancées (flexbox, grid)</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 CSS3 Avancé (PDF)</li>
                        <li>🎥 CSS3 Tutorial (30 min)</li>
                        <li>💻 Feuille de styles réutilisable</li>
                    </ul>
                `
            },
            {
                title: 'Module 3: Responsive Design',
                duration: '2 heures',
                content: `
                    <h5>Apprentissage</h5>
                    <ul>
                        <li>Media queries</li>
                        <li>Mobile-first approach</li>
                        <li>Flexbox responsive</li>
                        <li>Bootstrap basics</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Responsive Design (PDF)</li>
                        <li>🎥 Mobile First (25 min)</li>
                        <li>💻 Template responsif</li>
                    </ul>
                `
            },
            {
                title: 'Module 4: Projet Portfolio',
                duration: '2 heures',
                content: `
                    <h5>Créez Votre Portfolio</h5>
                    <p>Construisez un site portfolio professionnel responsive!</p>
                    <h5>Étapes du Projet</h5>
                    <ul>
                        <li>✓ Page d'accueil avec présentation</li>
                        <li>✓ Galerie de projets</li>
                        <li>✓ Page À propos</li>
                        <li>✓ Formulaire de contact</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Guide Projet (PDF)</li>
                        <li>💻 Template de démarrage</li>
                    </ul>
                `
            }
        ]
    },

    'Fondamentaux Reseaux': {
        type: 'free',
        price: 0,
        duration: '5 semaines',
        hours: 10,
        instructor: 'Wilfred Djikiakam',
        description: 'Maîtrisez les bases des réseaux informatiques',
        modules: [
            {
                title: 'Module 1: Modèles OSI et TCP/IP',
                duration: '2 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>Les 7 couches du modèle OSI</li>
                        <li>Modèle TCP/IP (4 couches)</li>
                        <li>Comparaison des deux modèles</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Modèles Réseaux (PDF)</li>
                        <li>🎥 OSI vs TCP/IP (25 min)</li>
                        <li>💻 Diagrammes interactifs</li>
                    </ul>
                `
            },
            {
                title: 'Module 2: Adressage IP et Subnetting',
                duration: '2 heures',
                content: `
                    <h5>Apprentissage</h5>
                    <ul>
                        <li>Adressage IPv4 (Classes A-E)</li>
                        <li>Notation CIDR</li>
                        <li>Subnetting et VLSM</li>
                        <li>Adressage IPv6 basics</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Guide Adressage IP (PDF)</li>
                        <li>🎥 Subnetting Tutorial (30 min)</li>
                        <li>💻 Calculateur de subnets</li>
                    </ul>
                `
            },
            {
                title: 'Module 3: Types et Architecture de Réseaux',
                duration: '2 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>LAN, WAN, MAN, PAN</li>
                        <li>Topologies réseaux</li>
                        <li>Architectures réseau (peer-to-peer, client-serveur)</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Architecture Réseaux (PDF)</li>
                        <li>🎥 Types de Réseaux (20 min)</li>
                        <li>💻 Schémas détaillés</li>
                    </ul>
                `
            },
            {
                title: 'Module 4: Protocoles Réseau',
                duration: '2 heures',
                content: `
                    <h5>Apprentissage</h5>
                    <ul>
                        <li>TCP vs UDP</li>
                        <li>HTTP/HTTPS</li>
                        <li>DNS, DHCP</li>
                        <li>FTP, SMTP, POP3</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Protocoles Réseau (PDF)</li>
                        <li>🎥 Comparaison TCP/UDP (20 min)</li>
                    </ul>
                `
            },
            {
                title: 'Module 5: Concepts Avancés et Projet',
                duration: '2 heures',
                content: `
                    <h5>Sujets Avancés</h5>
                    <ul>
                        <li>Routage et Switching</li>
                        <li>VLANs et Trunking</li>
                        <li>ACLs basiques</li>
                    </ul>
                    <h5>Projet Final</h5>
                    <p>Concevoir une architecture réseau pour petite entreprise</p>
                `
            }
        ]
    },

    // FORMATIONS PAYANTES (exemples - à compléter)
    'Developpement Web Complet': {
        type: 'paid',
        price: 55000,
        duration: '12 semaines',
        hours: 36,
        instructor: 'Wilfred Djikiakam',
        featured: true,
        description: 'Devenez développeur web full-stack professionnel',
        modules: [
            {
                title: 'Section 1: Frontend Avancé (HTML, CSS, JavaScript)',
                duration: '4 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>HTML5 sémantique avancé</li>
                        <li>CSS3 (flexbox, grid, animations)</li>
                        <li>JavaScript ES6+ (classes, promises, async/await)</li>
                        <li>DOM manipulation avancée</li>
                    </ul>
                    <h5>Ressources Complètes</h5>
                    <ul>
                        <li>📖 3 guides complets (PDF)</li>
                        <li>🎥 12 vidéos tutoriels</li>
                        <li>💻 15+ exemples de code</li>
                        <li>📝 Exercices avec solutions</li>
                    </ul>
                `
            },
            {
                title: 'Section 2: Frameworks Frontend (Bootstrap, Tailwind)',
                duration: '3 heures',
                content: `
                    <h5>Apprentissage</h5>
                    <ul>
                        <li>Bootstrap 5 complet</li>
                        <li>Tailwind CSS avancé</li>
                        <li>Responsive design pro</li>
                        <li>Optimisation performance</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Frameworks Guide (PDF)</li>
                        <li>🎥 8 vidéos complètes</li>
                        <li>💻 Templates réutilisables</li>
                    </ul>
                `
            },
            {
                title: 'Section 3: Backend avec PHP/Node.js',
                duration: '4 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>PHP 8 ou Node.js</li>
                        <li>Gestion des sessions</li>
                        <li>API REST construction</li>
                        <li>Authentification et sécurité</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Backend Complet (PDF)</li>
                        <li>🎥 10 vidéos tutoriels</li>
                        <li>💻 Projets progressifs</li>
                    </ul>
                `
            },
            {
                title: 'Section 4: Base de Données (MySQL)',
                duration: '3 heures',
                content: `
                    <h5>Apprentissage</h5>
                    <ul>
                        <li>Design de base de données</li>
                        <li>SQL avancé (joins, subqueries)</li>
                        <li>Optimisation requêtes</li>
                        <li>Sécurité (injection SQL prevention)</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 SQL Complet (PDF)</li>
                        <li>🎥 8 vidéos práctiques</li>
                        <li>💻 Base de données exemple</li>
                    </ul>
                `
            },
            {
                title: 'Section 5: Déploiement & Hosting',
                duration: '2 heures',
                content: `
                    <h5>Contenu</h5>
                    <ul>
                        <li>Hébergement web</li>
                        <li>FTP et Git</li>
                        <li>Domaines et DNS</li>
                        <li>SSL/HTTPS</li>
                    </ul>
                    <h5>Ressources</h5>
                    <ul>
                        <li>📖 Déploiement Guide (PDF)</li>
                        <li>🎥 Tutoriels pas à pas</li>
                    </ul>
                `
            },
            {
                title: 'Section 6: Projet Capstone - Créer un Site E-commerce',
                duration: '3 heures',
                content: `
                    <h5>Projet Complet</h5>
                    <p>Construisez un site e-commerce fonctionnel de A à Z!</p>
                    <h5>Fonctionnalités</h5>
                    <ul>
                        <li>✓ Authentification utilisateur</li>
                        <li>✓ Catalogue de produits</li>
                        <li>✓ Panier d'achat</li>
                        <li>✓ Système de paiement</li>
                        <li>✓ Admin panel</li>
                    </ul>
                    <h5>Support</h5>
                    <ul>
                        <li>💬 Accès forum 6 mois</li>
                        <li>📧 Support direct formateur</li>
                        <li>🎯 Code review de vos projets</li>
                    </ul>
                `
            }
        ],
        certificate: true,
        support: '6 mois',
        resources: {
            documents: ['Full_Stack_Guide.pdf', 'API_Design.pdf', 'Database_Design.pdf'],
            videos: ['30+ heures de vidéos tutoriels'],
            code: ['Projets_complets.zip', 'Templates.zip']
        }
    }
};

// Fonction pour obtenir les informations d'un cours
function getCourseInfo(courseName) {
    return coursesDatabase[courseName] || null;
}

// Fonction pour obtenir tous les cours
function getAllCourses() {
    return coursesDatabase;
}

// Fonction pour vérifier si l'utilisateur est inscrit
function isUserEnrolled(courseName) {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const paidEnrollments = JSON.parse(localStorage.getItem('paidEnrollments') || '[]');
    
    return enrollments.some(e => e.courseName === courseName) || 
           paidEnrollments.some(e => e.courseName === courseName);
}

// Fonction pour obtenir les cours de l'utilisateur
function getUserEnrolledCourses() {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const paidEnrollments = JSON.parse(localStorage.getItem('paidEnrollments') || '[]');
    
    const enrolled = [];
    
    enrollments.forEach(e => {
        const courseInfo = getCourseInfo(e.courseName);
        if (courseInfo) {
            enrolled.push({
                ...e,
                ...courseInfo,
                enrolled: true
            });
        }
    });
    
    paidEnrollments.forEach(e => {
        const courseInfo = getCourseInfo(e.courseName);
        if (courseInfo) {
            enrolled.push({
                ...e,
                ...courseInfo,
                enrolled: true,
                paid: true
            });
        }
    });
    
    return enrolled;
}
