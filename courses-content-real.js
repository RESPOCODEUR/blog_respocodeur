// ============================================================
// BASE DE DONNÉES DES COURS - CONTENU RÉEL ET DÉTAILLÉ
// ============================================================

const coursesDatabase = {
    // ========================
    // COURS GRATUITS
    // ========================
    
    'Introduction Programmation': {
        type: 'free',
        price: 0,
        duration: '6 semaines',
        hours: 12,
        instructor: 'Wilfred Djikiakam',
        description: 'Apprenez les bases de la programmation avec Python',
        certificate: false,
        modules: [
            {
                id: 'intro-prog-1',
                title: 'Module 1: Qu\'est-ce que la programmation?',
                duration: '1h30',
                content: `
                    <div class="module-content">
                        <h4>🎯 Objectifs</h4>
                        <ul>
                            <li>Comprendre ce qu'est la programmation</li>
                            <li>Connaître les différents langages</li>
                            <li>Installer Python sur votre ordinateur</li>
                            <li>Écrire votre premier programme</li>
                        </ul>

                        <h4>📚 Contenu Principal</h4>
                        
                        <h5>Qu'est-ce que la programmation?</h5>
                        <p>La programmation est l'art de donner des instructions à un ordinateur. Un programme informatique est une suite d'instructions que l'ordinateur exécute pas à pas.</p>
                        
                        <p><strong>Analogie:</strong> Imaginez que vous donnez des ordres à un robot qui suit exactement vos instructions. La programmation, c'est écrire ces instructions.</p>

                        <h5>Pourquoi apprendre la programmation?</h5>
                        <ul>
                            <li>💼 Débouchés professionnels exceptionnels</li>
                            <li>💰 Très bien rémunéré</li>
                            <li>🌍 Opportunités mondiales</li>
                            <li>🧠 Développe la logique et la créativité</li>
                        </ul>

                        <h5>Les langages de programmation</h5>
                        <table class="table table-sm">
                            <tr>
                                <td><strong>Python</strong></td>
                                <td>Facile, polyvalent, très populaire (IA, data science)</td>
                            </tr>
                            <tr>
                                <td><strong>JavaScript</strong></td>
                                <td>Web (sites internet), applications mobiles</td>
                            </tr>
                            <tr>
                                <td><strong>Java</strong></td>
                                <td>Applications professionnelles, Android</td>
                            </tr>
                            <tr>
                                <td><strong>C++</strong></td>
                                <td>Systèmes, jeux vidéo, haute performance</td>
                            </tr>
                        </table>

                        <h4>🔧 Installation de Python</h4>
                        <ol>
                            <li>Allez sur <strong>https://www.python.org</strong></li>
                            <li>Téléchargez la dernière version (3.12+)</li>
                            <li>Exécutez l'installateur</li>
                            <li>✅ Cochez "Add Python to PATH"</li>
                            <li>Cliquez "Install Now"</li>
                        </ol>

                        <h4>💻 Votre premier programme</h4>
                        <pre class="bg-dark text-light p-3 rounded">
# Ouvrez un terminal/cmd et tapez:
python

# Puis tapez:
print("Bonjour le monde!")

# Résultat:
# Bonjour le monde!
                        </pre>

                        <p><strong>Félicitations! 🎉 Vous avez écrit votre premier programme!</strong></p>

                        <h4>📝 Exercice Pratique</h4>
                        <div class="alert alert-info">
                            <strong>À faire:</strong> Écrivez un programme qui affiche votre nom et votre âge.
                            <pre class="mt-2">print("Je m'appelle Jean")
print("J'ai 25 ans")</pre>
                        </div>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 <strong>PDF:</strong> "Python_Installation_Guide.pdf" (2MB)</li>
                            <li>🎥 <strong>Vidéo:</strong> "Premier Programme Python" (12 min)</li>
                            <li>💾 <strong>Code:</strong> exemples.zip avec 5 programmes simples</li>
                        </ul>

                        <h4>✅ Résumé</h4>
                        <p>Vous avez appris ce qu'est la programmation, pourquoi c'est important, et vous avez installé Python. Vous êtes prêt pour le prochain module!</p>
                    </div>
                `
            },
            {
                id: 'intro-prog-2',
                title: 'Module 2: Variables et Types de Données',
                duration: '1h45',
                content: `
                    <div class="module-content">
                        <h4>🎯 Objectifs</h4>
                        <ul>
                            <li>Comprendre les variables</li>
                            <li>Connaître les types de données (int, float, str)</li>
                            <li>Effectuer des opérations simples</li>
                        </ul>

                        <h4>📚 Qu'est-ce qu'une variable?</h4>
                        <p>Une variable est une "boîte" qui contient une valeur. Elle porte un nom et stocke une information.</p>

                        <h5>Exemple concret:</h5>
                        <pre class="bg-dark text-light p-3 rounded">
# Créer une variable
age = 25
nom = "Jean"
hauteur = 1.75

# Afficher les variables
print(nom)      # Affiche: Jean
print(age)      # Affiche: 25
print(hauteur)  # Affiche: 1.75
                        </pre>

                        <h4>📊 Types de Données</h4>

                        <h5>1️⃣ Entiers (int)</h5>
                        <p>Les nombres sans décimales: -5, 0, 100, 1000</p>
                        <pre class="bg-dark text-light p-3 rounded">
annee = 2024
age = 25
nombre_courses = 10
temperature = -5  # Peut être négatif
                        </pre>

                        <h5>2️⃣ Décimaux (float)</h5>
                        <p>Les nombres avec virgule: 3.14, 2.5, -1.75</p>
                        <pre class="bg-dark text-light p-3 rounded">
prix = 19.99
hauteur = 1.75
pi = 3.14159
                        </pre>

                        <h5>3️⃣ Texte (str)</h5>
                        <p>Les chaînes de caractères entre guillemets</p>
                        <pre class="bg-dark text-light p-3 rounded">
nom = "Jean Dupont"
ville = "Douala"
message = "Bonjour à tous!"
                        </pre>

                        <h5>4️⃣ Booléens (bool)</h5>
                        <p>True (vrai) ou False (faux)</p>
                        <pre class="bg-dark text-light p-3 rounded">
est_vrai = True
est_faux = False
                        </pre>

                        <h4>🧮 Opérations Mathématiques</h4>
                        <pre class="bg-dark text-light p-3 rounded">
# Addition
resultat = 5 + 3  # 8

# Soustraction
resultat = 10 - 4  # 6

# Multiplication
resultat = 6 * 7  # 42

# Division
resultat = 20 / 4  # 5.0

# Division entière
resultat = 20 // 3  # 6 (sans décimales)

# Modulo (reste)
resultat = 20 % 3  # 2

# Puissance
resultat = 2 ** 3  # 8 (2 puissance 3)
                        </pre>

                        <h4>📝 Exercices Pratiques</h4>
                        <div class="alert alert-info">
                            <strong>Exercice 1:</strong> Créez une variable pour votre prénom et affichez-la
                            <div class="mt-2 p-2 bg-white">Réponse: <code>nom = "Votre Nom"; print(nom)</code></div>
                        </div>

                        <div class="alert alert-info">
                            <strong>Exercice 2:</strong> Calculez le prix TTC (TTC = Prix * 1.20)
                            <div class="mt-2 p-2 bg-white">
                                <code>
prix_ht = 100<br>
prix_ttc = prix_ht * 1.20<br>
print(prix_ttc)  # 120.0
                                </code>
                            </div>
                        </div>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 PDF: "Variables_et_Types.pdf"</li>
                            <li>🎥 Vidéo: "Variables Expliquées" (15 min)</li>
                            <li>💾 Exercices: 10 problèmes avec solutions</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'intro-prog-3',
                title: 'Module 3: Conditions (if, else, elif)',
                duration: '1h45',
                content: `
                    <div class="module-content">
                        <h4>🎯 Objectifs</h4>
                        <ul>
                            <li>Comprendre les conditions</li>
                            <li>Utiliser if, else, elif</li>
                            <li>Prendre des décisions en code</li>
                        </ul>

                        <h4>📚 Qu'est-ce qu'une condition?</h4>
                        <p>Une condition permet à votre programme de prendre des décisions basées sur certaines situations.</p>

                        <h5>Exemple du quotidien:</h5>
                        <p>SI vous avez faim ALORS vous mangez, SINON vous continuez votre travail.</p>

                        <h5>En code:</h5>
                        <pre class="bg-dark text-light p-3 rounded">
if vous_avez_faim:
    print("Allez manger!")
else:
    print("Continuez votre travail")
                        </pre>

                        <h4>🔍 Opérateurs de Comparaison</h4>
                        <pre class="bg-dark text-light p-3 rounded">
== (égal à)           5 == 5       # True
!= (différent de)     5 != 3       # True
>  (plus grand que)   10 > 5       # True
<  (plus petit que)   3 < 8        # True
>= (plus ou égal)     10 >= 10     # True
<= (moins ou égal)    5 <= 10      # True
                        </pre>

                        <h4>✔️ Structure IF</h4>
                        <pre class="bg-dark text-light p-3 rounded">
age = 18

if age >= 18:
    print("Vous êtes majeur")

# Output: Vous êtes majeur
                        </pre>

                        <h4>✔️ Structure IF-ELSE</h4>
                        <pre class="bg-dark text-light p-3 rounded">
age = 15

if age >= 18:
    print("Vous êtes majeur")
else:
    print("Vous êtes mineur")

# Output: Vous êtes mineur
                        </pre>

                        <h4>✔️ Structure IF-ELIF-ELSE</h4>
                        <pre class="bg-dark text-light p-3 rounded">
note = 75

if note >= 90:
    print("Excellent! A")
elif note >= 80:
    print("Très bien! B")
elif note >= 70:
    print("Bien! C")
else:
    print("À revoir")

# Output: Bien! C
                        </pre>

                        <h4>🧠 Opérateurs Logiques</h4>
                        <pre class="bg-dark text-light p-3 rounded">
# AND (et): Tous les deux doivent être vrais
age = 20
permis = True

if age >= 18 and permis:
    print("Vous pouvez conduire")

# OR (ou): Au moins l'un doit être vrai
weekend = True
vacances = False

if weekend or vacances:
    print("Repos!")

# NOT (non): Inverse la condition
est_occupé = False

if not est_occupé:
    print("Je suis libre!")
                        </pre>

                        <h4>📝 Exercice: Calculatrice de Note</h4>
                        <div class="alert alert-info">
                            <strong>Problème:</strong> Écrivez un programme qui affiche la mention en fonction de la note
                            <pre class="mt-2">
note = int(input("Entrez votre note: "))

if note >= 16:
    print("Excellent")
elif note >= 14:
    print("Très Bien")
elif note >= 12:
    print("Bien")
elif note >= 10:
    print("Passable")
else:
    print("Échoué")
                            </pre>
                        </div>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 PDF: "Conditions_Completes.pdf"</li>
                            <li>🎥 Vidéo: "Conditions en Pratique" (18 min)</li>
                            <li>💾 Exercices: 15 problèmes avec solutions</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'intro-prog-4',
                title: 'Module 4: Boucles (for et while)',
                duration: '2h',
                content: `
                    <div class="module-content">
                        <h4>🎯 Objectifs</h4>
                        <ul>
                            <li>Comprendre les boucles</li>
                            <li>Utiliser for et while</li>
                            <li>Répéter des actions en code</li>
                        </ul>

                        <h4>📚 Qu'est-ce qu'une boucle?</h4>
                        <p>Une boucle permet de répéter un bloc de code plusieurs fois sans le réécrire.</p>

                        <h5>Sans boucle (mauvais):</h5>
                        <pre class="bg-dark text-light p-3 rounded">
print("Bienvenue!")
print("Bienvenue!")
print("Bienvenue!")
print("Bienvenue!")
print("Bienvenue!")  # Répétitif et ennuyeux!
                        </pre>

                        <h5>Avec boucle (bon):</h5>
                        <pre class="bg-dark text-light p-3 rounded">
for i in range(5):
    print("Bienvenue!")  # S'affiche 5 fois
                        </pre>

                        <h4>🔄 Boucle FOR</h4>
                        <p>La boucle for répète une action un nombre défini de fois.</p>

                        <pre class="bg-dark text-light p-3 rounded">
# Afficher les nombres de 1 à 5
for numero in range(1, 6):
    print(numero)

# Output:
# 1
# 2
# 3
# 4
# 5
                        </pre>

                        <h5>Parcourir une liste:</h5>
                        <pre class="bg-dark text-light p-3 rounded">
fruits = ["Pomme", "Banane", "Orange"]

for fruit in fruits:
    print(fruit)

# Output:
# Pomme
# Banane
# Orange
                        </pre>

                        <h4>⏰ Boucle WHILE</h4>
                        <p>La boucle while répète tant qu'une condition est vraie.</p>

                        <pre class="bg-dark text-light p-3 rounded">
compteur = 0

while compteur < 5:
    print(compteur)
    compteur = compteur + 1

# Output:
# 0
# 1
# 2
# 3
# 4
                        </pre>

                        <h5>Cas réel: Mot de passe</h5>
                        <pre class="bg-dark text-light p-3 rounded">
mot_de_passe = "123"
essais = 0

while essais < 3:
    entree = input("Mot de passe: ")
    if entree == mot_de_passe:
        print("Accès accordé!")
        break  # Sort de la boucle
    essais = essais + 1

if essais == 3:
    print("Vous avez dépassé le nombre d'essais!")
                        </pre>

                        <h4>🛑 BREAK et CONTINUE</h4>
                        <pre class="bg-dark text-light p-3 rounded">
# BREAK: Sort immédiatement de la boucle
for i in range(10):
    if i == 5:
        break  # Sort à 5
    print(i)  # 0, 1, 2, 3, 4

# CONTINUE: Saute cette itération
for i in range(5):
    if i == 2:
        continue  # Saute 2
    print(i)  # 0, 1, 3, 4
                        </pre>

                        <h4>📝 Projet: Table de Multiplication</h4>
                        <div class="alert alert-info">
                            <strong>À faire:</strong> Afficher la table de 7
                            <pre class="mt-2">
for i in range(1, 11):
    resultat = 7 * i
    print(f"7 × {i} = {resultat}")

# Output:
# 7 × 1 = 7
# 7 × 2 = 14
# ...
# 7 × 10 = 70
                            </pre>
                        </div>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 PDF: "Boucles_Detaillees.pdf"</li>
                            <li>🎥 Vidéo: "Boucles FOR et WHILE" (20 min)</li>
                            <li>💾 Exercices: 20 problèmes (facile à difficile)</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'intro-prog-5',
                title: 'Module 5: Fonctions',
                duration: '2h',
                content: `
                    <div class="module-content">
                        <h4>🎯 Objectifs</h4>
                        <ul>
                            <li>Comprendre les fonctions</li>
                            <li>Créer et utiliser des fonctions</li>
                            <li>Réutiliser du code efficacement</li>
                        </ul>

                        <h4>📚 Qu'est-ce qu'une fonction?</h4>
                        <p>Une fonction est un bloc de code réutilisable qui effectue une tâche spécifique.</p>

                        <h5>Avantages:</h5>
                        <ul>
                            <li>✅ Réutiliser le même code plusieurs fois</li>
                            <li>✅ Rendre le code plus lisible et organisé</li>
                            <li>✅ Faciliter la maintenance</li>
                        </ul>

                        <h4>✍️ Créer une fonction simple</h4>
                        <pre class="bg-dark text-light p-3 rounded">
def saluer():
    print("Bonjour!")

# Appeler la fonction
saluer()  # Output: Bonjour!
saluer()  # Output: Bonjour!
                        </pre>

                        <h4>📥 Fonctions avec paramètres</h4>
                        <pre class="bg-dark text-light p-3 rounded">
def saluer(nom):
    print(f"Bonjour {nom}!")

saluer("Jean")      # Output: Bonjour Jean!
saluer("Marie")     # Output: Bonjour Marie!
                        </pre>

                        <h5>Plusieurs paramètres:</h5>
                        <pre class="bg-dark text-light p-3 rounded">
def additionner(a, b):
    print(f"{a} + {b} = {a + b}")

additionner(5, 3)   # Output: 5 + 3 = 8
additionner(10, 20) # Output: 10 + 20 = 30
                        </pre>

                        <h4>📤 Fonctions avec return</h4>
                        <pre class="bg-dark text-light p-3 rounded">
def multiplier(x, y):
    resultat = x * y
    return resultat

reponse = multiplier(6, 7)
print(reponse)  # Output: 42
                        </pre>

                        <h4>💰 Exemple réel: Calculatrice</h4>
                        <pre class="bg-dark text-light p-3 rounded">
def calculer_salaire(heures, taux_horaire):
    salaire = heures * taux_horaire
    return salaire

# Utilisation
mon_salaire = calculer_salaire(40, 2500)  # 40h × 2500 FCFA
print(f"Salaire: {mon_salaire} FCFA")  # 100000 FCFA
                        </pre>

                        <h4>📝 Projet: Convertisseur de Température</h4>
                        <div class="alert alert-info">
                            <pre>
def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

temp_c = 25
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f}°F")
# Output: 25°C = 77.0°F
                            </pre>
                        </div>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 PDF: "Fonctions_Complet.pdf"</li>
                            <li>🎥 Vidéo: "Créer et Utiliser des Fonctions" (18 min)</li>
                            <li>💾 Exercices: 12 problèmes progressifs</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'intro-prog-6',
                title: 'Module 6: Projet Final - Jeu de Devinage',
                duration: '1h30',
                content: `
                    <div class="module-content">
                        <h4>🎯 Objectif du Projet</h4>
                        <p>Créer un jeu où l'ordinateur pense à un nombre et vous devez le deviner.</p>

                        <h4>📋 Spécifications</h4>
                        <ul>
                            <li>L'ordinateur choisit un nombre aléatoire entre 1 et 100</li>
                            <li>L'utilisateur fait des propositions</li>
                            <li>Le programme dit si c'est trop grand ou trop petit</li>
                            <li>Afficher le nombre de tentatives</li>
                        </ul>

                        <h4>💻 Code Complet</h4>
                        <pre class="bg-dark text-light p-3 rounded">
import random

# Générer un nombre aléatoire
nombre_secret = random.randint(1, 100)
essais = 0
trouvé = False

print("Bienvenue au jeu de devinage!")
print("Je pense à un nombre entre 1 et 100")

while not trouvé:
    # Demander une proposition
    proposition = int(input("Votre proposition: "))
    essais += 1
    
    # Vérifier la proposition
    if proposition == nombre_secret:
        print(f"🎉 Bravo! C'était {nombre_secret}!")
        print(f"Vous avez trouvé en {essais} essais")
        trouvé = True
    elif proposition < nombre_secret:
        print("C'est plus grand!")
    else:
        print("C'est plus petit!")

# Évaluation
if essais <= 7:
    print("Excellent! 🌟")
elif essais <= 15:
    print("Très bien! 👍")
else:
    print("Pas mal, encore un effort! 💪")
                        </pre>

                        <h4>🔄 Étapes pour créer ce code</h4>
                        <ol>
                            <li>Créer un fichier <code>jeu.py</code></li>
                            <li>Copier le code ci-dessus</li>
                            <li>Exécuter: <code>python jeu.py</code></li>
                            <li>Jouer et vous amuser!</li>
                        </ol>

                        <h4>🚀 Extensions possibles</h4>
                        <ul>
                            <li>Ajouter un score basé sur les essais</li>
                            <li>Permettre plusieurs parties</li>
                            <li>Ajouter de la difficulté progressive</li>
                            <li>Sauvegarder les meilleurs scores</li>
                        </ul>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 PDF: "Projet_Complet.pdf"</li>
                            <li>💾 Code: jeu_complet.py + extensions</li>
                            <li>🎥 Vidéo: "Walkthrough du Projet" (12 min)</li>
                        </ul>

                        <h4>✅ Qu'avez-vous appris?</h4>
                        <p>Félicitations! 🎊 Vous avez complété le cours d'introduction à la programmation.</p>
                        <p>Vous maîtrisez maintenant:</p>
                        <ul>
                            <li>✅ Variables et types de données</li>
                            <li>✅ Conditions (if/else)</li>
                            <li>✅ Boucles (for/while)</li>
                            <li>✅ Fonctions</li>
                            <li>✅ Logique de programmation</li>
                        </ul>
                        <p><strong>Prochaine étape:</strong> Progresser vers Python Avancé ou développement Web!</p>
                    </div>
                `
            }
        ],
        resources: {
            documents: [
                'Introduction_Programmation_Complet.pdf',
                'Python_Guide_Debutant.pdf',
                'Cheatsheet_Python.pdf'
            ],
            videos: [
                'Python_Basics_Serie_6Episodes.mp4',
                'Tutoriel_Interactif.mp4'
            ],
            code: [
                'exemples_module1.zip',
                'exercices_corriges.zip',
                'jeu_complet.py'
            ]
        }
    },

    // === COURS GRATUIT 2 ===
    'HTML5 & CSS3 Bases': {
        type: 'free',
        price: 0,
        duration: '4 semaines',
        hours: 8,
        instructor: 'Wilfred Djikiakam',
        description: 'Les fondamentaux du web: HTML et CSS',
        certificate: false,
        modules: [
            {
                id: 'html-css-1',
                title: 'Module 1: Structure HTML',
                duration: '1h30',
                content: `
                    <div class="module-content">
                        <h4>📚 Structure de base d'une page HTML</h4>
                        <pre class="bg-dark text-light p-3 rounded">
&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Ma première page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Bienvenue!&lt;/h1&gt;
    &lt;p&gt;Ceci est ma première page web.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
                        </pre>

                        <h4>🏷️ Tags HTML principaux</h4>
                        <table class="table">
                            <tr>
                                <td><code>&lt;h1&gt;...&lt;/h1&gt;</code></td>
                                <td>Titre principal</td>
                            </tr>
                            <tr>
                                <td><code>&lt;h2&gt;...&lt;/h2&gt;</code></td>
                                <td>Sous-titre</td>
                            </tr>
                            <tr>
                                <td><code>&lt;p&gt;...&lt;/p&gt;</code></td>
                                <td>Paragraphe</td>
                            </tr>
                            <tr>
                                <td><code>&lt;a href="#"&gt;...&lt;/a&gt;</code></td>
                                <td>Lien</td>
                            </tr>
                            <tr>
                                <td><code>&lt;img src="#" alt=""&gt;</code></td>
                                <td>Image</td>
                            </tr>
                            <tr>
                                <td><code>&lt;button&gt;...&lt;/button&gt;</code></td>
                                <td>Bouton</td>
                            </tr>
                        </table>

                        <h4>💻 Exercice: Créer votre première page</h4>
                        <ol>
                            <li>Créer un fichier <code>index.html</code></li>
                            <li>Copier la structure ci-dessus</li>
                            <li>Ajouter votre contenu</li>
                            <li>Ouvrir dans le navigateur</li>
                        </ol>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 HTML5_Fondamentals.pdf</li>
                            <li>🎥 Vidéo: "Votre première page HTML" (10 min)</li>
                            <li>💾 Templates: 5 modèles de base</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'html-css-2',
                title: 'Module 2: CSS - Couleurs et Polices',
                duration: '1h30',
                content: `
                    <div class="module-content">
                        <h4>🎨 CSS: Décorer votre page</h4>
                        <p>CSS permet de styliser votre page HTML.</p>

                        <h4>🖍️ Couleurs</h4>
                        <pre class="bg-dark text-light p-3 rounded">
/* Trois méthodes pour les couleurs */

/* 1. Noms */
color: red;
background-color: blue;

/* 2. Hexadécimales */
color: #FF0000;  /* Rouge */
color: #00FF00;  /* Vert */

/* 3. RGB */
color: rgb(255, 0, 0);  /* Rouge */
                        </pre>

                        <h4>🔤 Polices</h4>
                        <pre class="bg-dark text-light p-3 rounded">
p {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    line-height: 1.6;
}
                        </pre>

                        <h4>📐 Textes</h4>
                        <pre class="bg-dark text-light p-3 rounded">
text-align: center;
text-decoration: underline;
letter-spacing: 2px;
                        </pre>

                        <h4>💻 Exercice: Styliser une page</h4>
                        <div class="alert alert-info">
                            Créer une page avec titre rouge, sous-titre bleu, texte gris
                        </div>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 CSS3_Couleurs_Polices.pdf</li>
                            <li>🎥 Vidéo: "Styliser avec CSS" (15 min)</li>
                            <li>💾 Palette de couleurs: 50 combinaisons</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'html-css-3',
                title: 'Module 3: Layouts et Responsive Design',
                duration: '1h30',
                content: `
                    <div class="module-content">
                        <h4>📐 Flexbox: Pour des layouts flexibles</h4>
                        <pre class="bg-dark text-light p-3 rounded">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
                        </pre>

                        <h4>📱 Responsive: Adapter au mobile</h4>
                        <pre class="bg-dark text-light p-3 rounded">
/* Desktop */
.container {
    width: 100%;
}

/* Mobile (écran < 768px) */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 10px;
    }
}
                        </pre>

                        <h4>💻 Projet: Page Responsive</h4>
                        <p>Créer une page qui s'adapte à tous les écrans</p>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 Layouts_Avances.pdf</li>
                            <li>🎥 Vidéo: "Responsive Design" (18 min)</li>
                            <li>💾 Templates responsive: 10 exemples</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'html-css-4',
                title: 'Module 4: Projet Final - Portfolio Personnel',
                duration: '2h',
                content: `
                    <div class="module-content">
                        <h4>🎯 Créer un portfolio web</h4>
                        <p>Un vrai projet pour votre CV</p>

                        <h4>📋 Sections à inclure</h4>
                        <ul>
                            <li>Header avec navigation</li>
                            <li>Section About (à propos)</li>
                            <li>Portfolio/Projects</li>
                            <li>Contact</li>
                            <li>Footer</li>
                        </ul>

                        <h4>💻 Code d'exemple</h4>
                        <pre class="bg-dark text-light p-3 rounded">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Mon Portfolio&lt;/title&gt;
    &lt;link rel="stylesheet" href="style.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;header&gt;
      &lt;h1&gt;Jean Dupont&lt;/h1&gt;
      &lt;nav&gt;
        &lt;a href="#about"&gt;À propos&lt;/a&gt;
        &lt;a href="#projects"&gt;Projets&lt;/a&gt;
        &lt;a href="#contact"&gt;Contact&lt;/a&gt;
      &lt;/nav&gt;
    &lt;/header&gt;
    
    &lt;main&gt;
      &lt;section id="about"&gt;
        &lt;h2&gt;À propos de moi&lt;/h2&gt;
        &lt;p&gt;Je suis développeur web...&lt;/p&gt;
      &lt;/section&gt;
    &lt;/main&gt;
  &lt;/body&gt;
&lt;/html&gt;
                        </pre>

                        <h4>🎬 Ressources</h4>
                        <ul>
                            <li>📖 Portfolio_Complet.pdf</li>
                            <li>🎥 Vidéo: "Créer un Portfolio" (25 min)</li>
                            <li>💾 Template complet + CSS</li>
                        </ul>

                        <h4>✅ Conclusion</h4>
                        <p>Vous avez créé votre premier site web responsive! 🎉</p>
                    </div>
                `
            }
        ],
        resources: {
            documents: ['HTML5_CSS3_Complet.pdf', 'Couleurs_Polices_Guide.pdf'],
            videos: ['HTML5_Tutorial.mp4', 'CSS3_Master.mp4'],
            code: ['exemples_html.zip', 'templates.zip']
        }
    },

    // === FORMATION PAYANTE 1 ===
    'Developpement Web Complet': {
        type: 'paid',
        price: 55000,
        duration: '12 semaines',
        hours: 36,
        instructor: 'Wilfred Djikiakam',
        description: 'Devenir développeur web full-stack professionnel',
        featured: true,
        certificate: true,
        support: '6 mois',
        modules: [
            {
                id: 'webdev-1',
                title: 'Module 1: Frontend Avancé avec HTML5 et CSS3',
                duration: '3h',
                content: `
                    <div class="module-content">
                        <h4>🎯 Maîtriser le Frontend</h4>
                        <p>Créer des interfaces web modernes et professionnelles</p>

                        <h4>📚 Contenu détaillé</h4>

                        <h5>1. HTML5 Sémantique</h5>
                        <ul>
                            <li>&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;footer&gt;</li>
                            <li>Formulaires HTML5 avancés</li>
                            <li>Accessibilité web (WCAG)</li>
                            <li>SEO et structure HTML</li>
                        </ul>

                        <pre class="bg-dark text-light p-3 rounded">
&lt;!-- Formulaire HTML5 avancé --&gt;
&lt;form&gt;
  &lt;input type="email" required&gt;
  &lt;input type="date"&gt;
  &lt;input type="number" min="0" max="100"&gt;
  &lt;textarea placeholder="Votre message"&gt;&lt;/textarea&gt;
  &lt;button type="submit"&gt;Envoyer&lt;/button&gt;
&lt;/form&gt;
                        </pre>

                        <h5>2. CSS3 Avancé</h5>
                        <ul>
                            <li>Flexbox et Grid layout</li>
                            <li>Animations et transitions</li>
                            <li>Variables CSS (custom properties)</li>
                            <li>Media queries responsive</li>
                        </ul>

                        <pre class="bg-dark text-light p-3 rounded">
/* CSS Grid pour layouts complexes */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* Animations fluides */
@keyframes slide-in {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}

.element {
    animation: slide-in 0.5s ease-out;
}
                        </pre>

                        <h5>3. Responsive Design Professionnel</h5>
                        <ul>
                            <li>Mobile-first approach</li>
                            <li>Breakpoints Bootstrap standard</li>
                            <li>Images responsive</li>
                            <li>Performance optimization</li>
                        </ul>

                        <h4>💻 Projet: Landing Page Responsive</h4>
                        <p>Créer une landing page complète pour un produit</p>
                        <ul>
                            <li>Header avec navigation sticky</li>
                            <li>Hero section avec CTA</li>
                            <li>Features section en grid</li>
                            <li>Testimonials carousel</li>
                            <li>Footer avec newsletter</li>
                        </ul>

                        <h4>📊 Ressources incluses</h4>
                        <ul>
                            <li>📖 PDF: 80 pages - HTML5/CSS3 Avancé</li>
                            <li>🎥 Vidéos: 6 heures de contenu vidéo</li>
                            <li>💻 Code: Landing page complète + composants réutilisables</li>
                            <li>✅ Exercices: 20 exercices avec solutions</li>
                        </ul>

                        <h4>⏱️ Durée: 3 heures</h4>
                    </div>
                `
            },
            {
                id: 'webdev-2',
                title: 'Module 2: JavaScript ES6+ Professionnel',
                duration: '4h',
                content: `
                    <div class="module-content">
                        <h4>🎯 JavaScript moderne et efficace</h4>

                        <h4>📚 Contenus couverts</h4>

                        <h5>1. JavaScript ES6+ Essentiels</h5>
                        <ul>
                            <li>let, const vs var</li>
                            <li>Arrow functions</li>
                            <li>Template literals</li>
                            <li>Destructuring</li>
                            <li>Spread operator</li>
                        </ul>

                        <pre class="bg-dark text-light p-3 rounded">
// ES6+ Modern JavaScript
const user = { name: 'Jean', age: 25 };
const { name, age } = user;  // Destructuring

const greet = (name) => \`Bonjour \${name}!\`;

const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
                        </pre>

                        <h5>2. DOM Manipulation</h5>
                        <ul>
                            <li>Sélectionner et modifier éléments</li>
                            <li>Event listeners</li>
                            <li>Créer/supprimer éléments dynamiquement</li>
                            <li>Gestion d'événements avancée</li>
                        </ul>

                        <pre class="bg-dark text-light p-3 rounded">
// Interactif
document.querySelector('button').addEventListener('click', function() {
    const input = document.querySelector('input').value;
    console.log('Vous avez saisi:', input);
});

// Créer éléments dynamiquement
const newItem = document.createElement('li');
newItem.textContent = 'Nouvel élément';
document.querySelector('ul').appendChild(newItem);
                        </pre>

                        <h5>3. Async/Await et Fetch API</h5>
                        <pre class="bg-dark text-light p-3 rounded">
// Récupérer des données d'un serveur
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

fetchData();
                        </pre>

                        <h5>4. Programmation Orientée Objet</h5>
                        <pre class="bg-dark text-light p-3 rounded">
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    display() {
        return \`\${this.name} (\${this.email})\`;
    }
}

const user = new User('Jean', 'jean@example.com');
console.log(user.display());
                        </pre>

                        <h4>💻 Projet: Todo App Complète</h4>
                        <p>Créer une application de gestion de tâches</p>
                        <ul>
                            <li>Ajouter/supprimer des tâches</li>
                            <li>Marquer comme complétée</li>
                            <li>Filtrer par statut</li>
                            <li>Sauvegarder en localStorage</li>
                            <li>Interface responsive</li>
                        </ul>

                        <h4>⏱️ Durée: 4 heures</h4>
                    </div>
                `
            },
            {
                id: 'webdev-3',
                title: 'Module 3: Frameworks Frontend - React Basics',
                duration: '3h',
                content: `
                    <div class="module-content">
                        <h4>⚛️ Introduction à React</h4>
                        <p>Créer des interfaces dynamiques avec React</p>

                        <h4>📚 Contenus</h4>

                        <h5>1. Qu'est-ce que React?</h5>
                        <ul>
                            <li>Bibliothèque JavaScript Facebook</li>
                            <li>Composants réutilisables</li>
                            <li>Virtual DOM</li>
                            <li>Réactivité automatique</li>
                        </ul>

                        <h5>2. Composants React</h5>
                        <pre class="bg-dark text-light p-3 rounded">
import React from 'react';

// Composant simple
function Welcome() {
    return &lt;h1&gt;Bienvenue!&lt;/h1&gt;;
}

// Composant avec props
function Card({ title, description }) {
    return (
        &lt;div&gt;
            &lt;h2&gt;{title}&lt;/h2&gt;
            &lt;p&gt;{description}&lt;/p&gt;
        &lt;/div&gt;
    );
}

// Utilisation
&lt;Card title="Mon titre" description="Description" /&gt;
                        </pre>

                        <h5>3. Hooks - useState et useEffect</h5>
                        <pre class="bg-dark text-light p-3 rounded">
import { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = \`Count: \${count}\`;
    }, [count]);
    
    return (
        &lt;div&gt;
            &lt;p&gt;Count: {count}&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;
                Augmenter
            &lt;/button&gt;
        &lt;/div&gt;
    );
}
                        </pre>

                        <h4>💻 Projet: Galerie d'images React</h4>
                        <ul>
                            <li>Afficher images en grid</li>
                            <li>Modal au clic</li>
                            <li>Navigation image précédente/suivante</li>
                            <li>Responsive design</li>
                        </ul>

                        <h4>⏱️ Durée: 3 heures</h4>
                    </div>
                `
            },
            {
                id: 'webdev-4',
                title: 'Module 4: Backend avec Node.js et Express',
                duration: '4h',
                content: `
                    <div class="module-content">
                        <h4>🖥️ Développement Backend</h4>
                        <p>Créer des serveurs web avec Node.js</p>

                        <h4>📚 Contenus</h4>

                        <h5>1. Node.js Fondamentaux</h5>
                        <ul>
                            <li>Installation et setup</li>
                            <li>npm et packages</li>
                            <li>Modules Node.js</li>
                            <li>Gestion des fichiers</li>
                        </ul>

                        <h5>2. Express.js - Framework Web</h5>
                        <pre class="bg-dark text-light p-3 rounded">
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Route simple
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue!' });
});

// Route avec paramètre
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ userId: userId, name: 'Jean' });
});

// POST request
app.post('/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log('Serveur démarré sur port 3000');
});
                        </pre>

                        <h5>3. APIs RESTful</h5>
                        <ul>
                            <li>GET - Récupérer</li>
                            <li>POST - Créer</li>
                            <li>PUT - Modifier</li>
                            <li>DELETE - Supprimer</li>
                        </ul>

                        <h4>💻 Projet: API REST Complète</h4>
                        <p>Créer une API pour gérer des articles de blog</p>
                        <ul>
                            <li>GET /articles - Lister tous</li>
                            <li>GET /articles/:id - Détails</li>
                            <li>POST /articles - Créer</li>
                            <li>PUT /articles/:id - Modifier</li>
                            <li>DELETE /articles/:id - Supprimer</li>
                        </ul>

                        <h4>⏱️ Durée: 4 heures</h4>
                    </div>
                `
            },
            {
                id: 'webdev-5',
                title: 'Module 5: Bases de Données MySQL et MongoDB',
                duration: '3h',
                content: `
                    <div class="module-content">
                        <h4>🗄️ Gestion de données</h4>

                        <h4>📚 Contenus</h4>

                        <h5>1. MySQL - Relationnel</h5>
                        <pre class="bg-dark text-light p-3 rounded">
-- Créer une table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer des données
INSERT INTO users (name, email, age) 
VALUES ('Jean', 'jean@example.com', 25);

-- Récupérer
SELECT * FROM users WHERE age > 20;
                        </pre>

                        <h5>2. MongoDB - NoSQL</h5>
                        <pre class="bg-dark text-light p-3 rounded">
// Insérer
db.users.insertOne({
    name: 'Jean',
    email: 'jean@example.com',
    age: 25,
    hobbies: ['Lecture', 'Code']
});

// Récupérer
db.users.find({ age: { $gt: 20 } });

// Mettre à jour
db.users.updateOne({ name: 'Jean' }, 
    { $set: { age: 26 } });
                        </pre>

                        <h4>💻 Projet: App avec Database</h4>
                        <ul>
                            <li>Créer schema</li>
                            <li>Insérer données</li>
                            <li>Requêtes complexes</li>
                            <li>Connexion backend</li>
                        </ul>

                        <h4>⏱️ Durée: 3 heures</h4>
                    </div>
                `
            },
            {
                id: 'webdev-6',
                title: 'Module 6: Déploiement et Production',
                duration: '2h',
                content: `
                    <div class="module-content">
                        <h4>🚀 Mettre en ligne votre application</h4>

                        <h4>📚 Contenus</h4>

                        <h5>1. Hosting</h5>
                        <ul>
                            <li>Vercel pour Next.js/React</li>
                            <li>Heroku pour API</li>
                            <li>Netlify pour sites statiques</li>
                            <li>AWS pour entreprise</li>
                        </ul>

                        <h5>2. Domaine et DNS</h5>
                        <ul>
                            <li>Acheter un domaine (.com, .fr)</li>
                            <li>Configurer DNS</li>
                            <li>SSL/HTTPS</li>
                        </ul>

                        <h5>3. Git et Versioning</h5>
                        <pre class="bg-dark text-light p-3 rounded">
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/user/repo
git push -u origin main
                        </pre>

                        <h4>⏱️ Durée: 2 heures</h4>
                    </div>
                `
            }
        ],
        resources: {
            documents: ['Web_Complet_Guide.pdf'],
            videos: ['Webdev_36h_Course.mp4'],
            code: ['complete_project.zip']
        }
    }
};

// FUNCTIONS EXPORT
function getCourseInfo(courseName) {
    return coursesDatabase[courseName];
}

function getAllCourses() {
    return coursesDatabase;
}

function isUserEnrolled(courseName) {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
    return enrollments.hasOwnProperty(courseName);
}

function getUserEnrolledCourses() {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
    return Object.keys(enrollments);
}

function saveModuleProgress(courseName, moduleId, isComplete) {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    if (!progress[courseName]) {
        progress[courseName] = {};
    }
    progress[courseName][moduleId] = isComplete;
    localStorage.setItem('courseProgress', JSON.stringify(progress));
}

function getModuleProgress(courseName) {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    return progress[courseName] || {};
}

function getCourseCompletion(courseName) {
    const course = coursesDatabase[courseName];
    const progress = getModuleProgress(courseName);
    const totalModules = course.modules.length;
    const completedModules = Object.values(progress).filter(Boolean).length;
    return {
        total: totalModules,
        completed: completedModules,
        percentage: Math.round((completedModules / totalModules) * 100)
    };
}
