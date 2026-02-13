// ============================================================
// SYSTÈME DE PAIEMENT ET PROGRESSION DES COURS - VRAI SYSTÈME
// ============================================================

// ===== 1. MODAL DE PAIEMENT OBLIGATOIRE POUR COURS PAYANTS =====

function showPaymentModal(courseName, price) {
    const courseName_clean = courseName.replace(/'/g, "\\'");
    
    const html = `
        <div class="modal fade" id="paymentModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content border-danger border-3">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            💳 PAIEMENT OBLIGATOIRE - ${courseName}
                        </h5>
                        <button type="button" class="btn-close btn-close-white"></button>
                    </div>
                    
                    <div class="modal-body">
                        <!-- ÉTAPE 1: CONFIRMATION DE PAIEMENT -->
                        <div id="step1" class="payment-step">
                            <div class="alert alert-warning">
                                <h5>⚠️ Paiement Requis</h5>
                                <p>Pour accéder à ce cours, vous devez d'abord effectuer un paiement.</p>
                            </div>

                            <div class="card bg-light p-4 mb-3">
                                <h5>📋 Détails du Paiement</h5>
                                <hr>
                                <div class="row">
                                    <div class="col-6">
                                        <p><strong>Cours:</strong></p>
                                        <p>${courseName}</p>
                                    </div>
                                    <div class="col-6 text-end">
                                        <p><strong>Montant:</strong></p>
                                        <p class="h4 text-danger"><strong>${price.toLocaleString()} FCFA</strong></p>
                                    </div>
                                </div>
                            </div>

                            <button class="btn btn-danger w-100 mb-2" onclick="showPaymentMethod('${courseName_clean}', ${price})">
                                💳 Procéder au Paiement
                            </button>
                            <button class="btn btn-outline-secondary w-100" data-dismiss="modal">
                                Annuler
                            </button>
                        </div>

                        <!-- ÉTAPE 2: MÉTHODE DE PAIEMENT -->
                        <div id="step2" class="payment-step" style="display:none;">
                            <h5>Choisir une méthode de paiement</h5>
                            <div class="list-group">
                                <button class="list-group-item list-group-item-action" onclick="showMobileMoneyForm('${courseName_clean}', ${price})">
                                    <h6>📱 Mobile Money (Cameroun)</h6>
                                    <small>Transférez vers le numéro fourni</small>
                                </button>
                            </div>
                            <button class="btn btn-outline-secondary w-100 mt-3" onclick="backToStep1()">
                                ← Retour
                            </button>
                        </div>

                        <!-- ÉTAPE 3: FORMULAIRE MOBILE MONEY -->
                        <div id="step3" class="payment-step" style="display:none;">
                            <h5>📱 Mobile Money - Instructions</h5>
                            
                            <div class="alert alert-info">
                                <h6>🔴 ÉTAPES À SUIVRE:</h6>
                                <ol>
                                    <li>Ouvrez votre application <strong>Mobile Money</strong></li>
                                    <li>Allez sur <strong>"Envoyer de l'argent"</strong></li>
                                    <li>Entrez le numéro: <span class="badge bg-danger p-2">${getChamberrPaymentNumber()}</span></li>
                                    <li>Entrez le montant: <strong class="text-danger">${price.toLocaleString()} FCFA</strong></li>
                                    <li>Validez la transaction</li>
                                    <li>Copiez le <strong>code de confirmation</strong></li>
                                    <li>Collez-le ci-dessous et cliquez "Confirmer Paiement"</li>
                                </ol>
                            </div>

                            <form onsubmit="confirmPayment(event, '${courseName_clean}', ${price})">
                                <div class="mb-3">
                                    <label class="form-label">Votre Nom Complet *</label>
                                    <input type="text" class="form-control" id="payerName" required>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Votre Email *</label>
                                    <input type="email" class="form-control" id="payerEmail" required>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Votre WhatsApp (+237...) *</label>
                                    <input type="tel" class="form-control" id="payerPhone" required>
                                </div>

                                <div class="mb-3 p-3 bg-warning bg-opacity-25 border border-warning rounded">
                                    <label class="form-label"><strong>Code de Confirmation Mobile Money *</strong></label>
                                    <input type="text" class="form-control form-control-lg text-center font-monospace" 
                                           id="transactionRef" placeholder="Ex: ABC123XYZ" required>
                                    <small class="text-muted">Vous le recevez après le paiement Mobile Money</small>
                                </div>

                                <button type="submit" class="btn btn-success w-100 btn-lg">
                                    ✅ Confirmer le Paiement
                                </button>
                                <button type="button" class="btn btn-outline-secondary w-100 mt-2" onclick="backToStep2()">
                                    ← Retour
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Ajouter au DOM
    const existing = document.getElementById('paymentModal');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Afficher le modal
    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

function showPaymentMethod(courseName, price) {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function showMobileMoneyForm(courseName, price) {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
}

function backToStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function backToStep2() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function getChamberrPaymentNumber() {
    return '672922360';  // VOTRE NUMÉRO
}

function confirmPayment(event, courseName, price) {
    event.preventDefault();
    
    const payerName = document.getElementById('payerName').value;
    const payerEmail = document.getElementById('payerEmail').value;
    const payerPhone = document.getElementById('payerPhone').value;
    const transactionRef = document.getElementById('transactionRef').value;

    // Créer un ID unique pour le reçu
    const receiptId = 'REC-' + Date.now();

    // Sauvegarder l'inscription + paiement
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
    enrollments[courseName] = {
        studentName: payerName,
        studentEmail: payerEmail,
        studentPhone: payerPhone,
        enrolledAt: new Date().toLocaleString(),
        type: 'paid',
        price: price,
        paymentMethod: 'Mobile Money',
        transactionReference: transactionRef,
        receiptId: receiptId,
        paid: true
    };
    localStorage.setItem('enrollments', JSON.stringify(enrollments));

    // Fermer le modal
    bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();

    // Générer le reçu PDF
    setTimeout(() => {
        generateReceiptPDF(courseName, price, payerName, payerEmail, payerPhone, transactionRef, receiptId);
        
        // Message de succès
        setTimeout(() => {
            alert('✅ Paiement confirmé!\n\n📄 Reçu téléchargé\n📚 Accès au cours activé!');
            
            // Afficher le cours
            displayCourseLessonsWithProgress(courseName);
        }, 1000);
    }, 500);
}

// ===== 2. INTERFACE COURSE AVEC PROGRESSION =====

function displayCourseLessonsWithProgress(courseName) {
    const course = coursesDatabase[courseName];
    
    if (!course) {
        alert('Cours non trouvé');
        return;
    }

    const progress = getModuleProgress(courseName);
    const completion = getCourseCompletion(courseName);

    let courseLessonHTML = `
        <div id="courseLessonPage" class="course-lesson-overlay">
            <div class="course-lesson-container">
                <!-- Header du cours -->
                <div class="course-header bg-gradient">
                    <div class="container-fluid py-4">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h2>${courseName}</h2>
                                <p class="text-muted">
                                    Par ${course.instructor} | 
                                    ${course.hours}h | 
                                    ${course.duration}
                                </p>
                            </div>
                            <button class="btn btn-light" onclick="closeCoursePage()">
                                ✕ Fermer
                            </button>
                        </div>

                        <!-- Barre de progression PRINCIPALE -->
                        <div class="mt-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h6>Progression Globale du Cours</h6>
                                <span class="badge bg-success">${completion.percentage}% complété</span>
                            </div>
                            <div class="progress" style="height: 25px;">
                                <div class="progress-bar bg-success" 
                                     style="width: ${completion.percentage}%"
                                     role="progressbar">
                                    <strong>${completion.completed}/${completion.total} modules lus</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contenu des modules -->
                <div class="container-fluid py-4">
                    <div class="row">
                        <!-- Sidebar: Liste des modules -->
                        <div class="col-lg-3">
                            <div class="modules-sidebar">
                                <h5>📚 Modules</h5>
                                <div class="list-group">
    `;

    // Lister tous les modules
    course.modules.forEach((module, index) => {
        const isComplete = progress[module.id] || false;
        const checkmark = isComplete ? '✅' : '⬜';
        
        courseLessonHTML += `
                                    <button class="list-group-item list-group-item-action module-item ${isComplete ? 'active' : ''}" 
                                            onclick="showModule('${module.id}', this)">
                                        <div>${checkmark} Module ${index + 1}</div>
                                        <small>${module.title}</small>
                                        <small class="d-block text-muted">${module.duration}</small>
                                    </button>
        `;
    });

    courseLessonHTML += `
                                </div>

                                <!-- Bouton de téléchargement certificat -->
                                <div class="mt-4">
        `;

    if (completion.percentage === 100) {
        courseLessonHTML += `
                                    <button class="btn btn-success w-100" onclick="downloadCertificate('${courseName}')">
                                        🎓 Télécharger Certificat
                                    </button>
                                    <small class="text-success d-block text-center mt-2">
                                        ✅ Tous les modules complétés!
                                    </small>
        `;
    } else {
        courseLessonHTML += `
                                    <button class="btn btn-outline-success w-100" disabled>
                                        🎓 Certificat
                                    </button>
                                    <small class="text-muted d-block text-center mt-2">
                                        Complétez tous les modules (${completion.percentage}%)
                                    </small>
        `;
    }

    courseLessonHTML += `
                                </div>
                            </div>
                        </div>

                        <!-- Contenu du module -->
                        <div class="col-lg-9">
                            <div id="moduleContent" class="module-content-area">
                                <p class="text-muted">Sélectionnez un module pour commencer</p>
                            </div>
                        </div>
                    </div>

                    <!-- Section Support -->
                    <div class="row mt-5">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h5>📞 Besoin d'aide?</h5>
                                    <p>
                                        Email: <strong>wilfreddjikiakam@gmail.com</strong><br>
                                        WhatsApp: <strong>+237 672 922 360</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .course-lesson-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                overflow-y: auto;
                z-index: 10000;
            }

            .course-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .modules-sidebar {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                max-height: 600px;
                overflow-y: auto;
            }

            .module-item {
                margin-bottom: 10px;
                border-radius: 6px;
                transition: all 0.3s;
            }

            .module-item:hover {
                background: #e9ecef;
            }

            .module-item.active {
                background: #667eea;
                color: white;
                border: none;
            }

            .module-content-area {
                background: white;
                padding: 30px;
                border-radius: 8px;
                max-height: 800px;
                overflow-y: auto;
            }

            .progress {
                font-size: 14px;
                letter-spacing: 1px;
            }
        </style>
    `;

    // Ajouter au DOM
    const existing = document.getElementById('courseLessonPage');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', courseLessonHTML);

    // Afficher le premier module automatiquement
    if (course.modules.length > 0) {
        setTimeout(() => {
            showModule(course.modules[0].id, document.querySelector('.module-item'));
        }, 100);
    }

    window.scrollTo(0, 0);
}

function showModule(moduleId, element) {
    // Mettre en surbrillance le module cliqué
    document.querySelectorAll('.module-item').forEach(item => {
        item.classList.remove('active');
    });
    if (element) element.classList.add('active');

    // Trouver le module dans la base de données
    let module = null;
    let courseName = null;

    for (const [name, course] of Object.entries(coursesDatabase)) {
        const found = course.modules.find(m => m.id === moduleId);
        if (found) {
            module = found;
            courseName = name;
            break;
        }
    }

    if (!module) return;

    // Afficher le contenu du module
    const contentArea = document.getElementById('moduleContent');
    contentArea.innerHTML = `
        <div class="module-display">
            <h4>${module.title}</h4>
            <small class="text-muted">⏱️ ${module.duration}</small>
            <hr>

            <div class="module-body">
                ${module.content}
            </div>

            <div class="mt-4 p-3 bg-light border rounded">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="moduleCheckbox" ${getModuleProgress(courseName)[moduleId] ? 'checked' : ''}>
                    <label class="form-check-label" for="moduleCheckbox">
                        <strong>✓ J'ai lu et compris ce module</strong>
                    </label>
                </div>
            </div>
        </div>
    `;

    // Ajouter l'event listener
    document.getElementById('moduleCheckbox').addEventListener('change', function() {
        saveModuleProgress(courseName, moduleId, this.checked);
        
        // Rafraîchir la barre de progression
        updateProgressDisplay();
        
        if (this.checked) {
            alert('✅ Module marqué comme complété!');
        }
    });
}

function updateProgressDisplay() {
    // Rafraîchir la barre de progression principale
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.style.opacity = '0.7';
        setTimeout(() => {
            bar.style.opacity = '1';
        }, 200);
    });
}

function downloadCertificate(courseName) {
    const course = coursesDatabase[courseName];
    const enrollment = JSON.parse(localStorage.getItem('enrollments') || '{}')[courseName];
    
    if (!enrollment) {
        alert('Données d\'inscription non trouvées');
        return;
    }

    const completion = getCourseCompletion(courseName);
    
    if (completion.percentage < 100) {
        alert('⚠️ Vous devez compléter 100% du cours pour télécharger le certificat!');
        return;
    }

    // Créer le PDF du certificat
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Fond
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, width, height, 'F');

    // Bordure
    doc.setDrawColor(51, 102, 204);
    doc.setLineWidth(5);
    doc.rect(15, 15, width - 30, height - 30);

    // Titre
    doc.setFontSize(32);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(51, 102, 204);
    doc.text('CERTIFICAT D\'ACCOMPLISSEMENT', width / 2, 50, { align: 'center' });

    // Ligne
    doc.setDrawColor(51, 102, 204);
    doc.setLineWidth(2);
    doc.line(60, 60, width - 60, 60);

    // Texte de présentation
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Ceci certifie que', width / 2, 80, { align: 'center' });

    // Nom de l'apprenant
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text(enrollment.studentName.toUpperCase(), width / 2, 100, { align: 'center' });

    // Cours complété
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('A complété avec succès le cours:', width / 2, 125, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text(courseName, width / 2, 140, { align: 'center' });

    // Détails
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(64, 64, 64);
    doc.text(`Durée: ${course.hours} heures | ${course.duration}`, width / 2, 160, { align: 'center' });
    doc.text(`Formateur: ${course.instructor}`, width / 2, 168, { align: 'center' });

    // Date
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Délivré le: ${dateStr}`, width / 2, 185, { align: 'center' });

    // Signature
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Wilfred Djikiakam', 80, 200);
    doc.text('RESPOCODEUR', 220, 200);
    
    doc.text('Formateur Certifié', 80, 215);
    doc.text('Organisme de Formation', 220, 215);

    // Sceau
    doc.setFontSize(8);
    doc.setTextColor(200, 0, 0);
    doc.text('✓', 40, 230, { align: 'center' });
    doc.text('CERTIFICAT VALIDE', 40, 240, { align: 'center' });

    // Télécharger
    doc.save(`Certificat_${courseName}_${enrollment.studentName}.pdf`);
    alert('🎓 Certificat téléchargé avec succès!');
}

// ===== 3. HELPERS =====

function getModuleProgress(courseName) {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    return progress[courseName] || {};
}

function saveModuleProgress(courseName, moduleId, isComplete) {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    if (!progress[courseName]) {
        progress[courseName] = {};
    }
    progress[courseName][moduleId] = isComplete;
    localStorage.setItem('courseProgress', JSON.stringify(progress));
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

function closeCoursePage() {
    const page = document.getElementById('courseLessonPage');
    if (page) page.remove();
}
