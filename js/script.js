document.addEventListener('DOMContentLoaded', function() {

    // Création du compte administrateur par défaut si aucun n'existe
    function createDefaultAdmin() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const adminExists = users.some(u => u.email === 'kazotech@gmail.com');
        
        if (!adminExists) {
            const defaultAdmin = {
                id: 'admin_' + Date.now(),
                nom: 'Kazo',
                prenom: 'Tech',
                email: 'kazotech@gmail.com',
                password: 'kazo@1234',
                telephone: '+509 4146 0815',
                adresse: 'Cap-Haitien, Haïti',
                role: 'admin',
                photo: '',
                date_creation: new Date().toISOString(),
                statut: 'actif'
            };
            
            users.push(defaultAdmin);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Administrateur par défaut créé');
            console.log('Email: kazotech@gmail.com');
            console.log('Mot de passe: kazo@1234');
        }
    }
    
    createDefaultAdmin();

    // Menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            this.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // Gestion des onglets dans le formulaire de connexion
    window.switchTab = function(tabId) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabForms = document.querySelectorAll('.signin-form');

        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        tabForms.forEach(form => {
            form.classList.toggle('active', form.id === tabId);
        });

        document.querySelectorAll('.form-message').forEach(msg => {
            msg.style.display = 'none';
            msg.className = 'form-message';
        });
    };

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Fonctions pour gérer l'upload de photos de profil
    window.previewPhoto = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('La photo ne doit pas dépasser 2MB.');
            event.target.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format non supporté. Utilisez JPG, PNG, GIF ou WEBP.');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
            window.regPhotoData = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    window.previewProfilePhoto = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('La photo ne doit pas dépasser 2MB.');
            event.target.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format non supporté. Utilisez JPG, PNG, GIF ou WEBP.');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('profilePhotoPreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
            window.profilePhotoData = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    window.previewAdminPhoto = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('La photo ne doit pas dépasser 2MB.');
            event.target.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format non supporté. Utilisez JPG, PNG, GIF ou WEBP.');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('adminPhotoPreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
            window.adminPhotoData = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    // Inscription des nouveaux utilisateurs
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const messageEl = document.getElementById('registerMessage');
            messageEl.style.display = 'none';
            messageEl.className = 'form-message';

            const nom = document.getElementById('regNom').value.trim();
            const prenom = document.getElementById('regPrenom').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const telephone = document.getElementById('regTelephone').value.trim();
            const adresse = document.getElementById('regAdresse').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regPasswordConfirm').value;
            const role = document.getElementById('regRole').value;
            const terms = document.getElementById('termsCheck').checked;
            const photoData = window.regPhotoData || '';

            if (!nom || !prenom || !email || !password || !confirm) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Veuillez remplir tous les champs obligatoires.';
                messageEl.style.display = 'block';
                return;
            }

            if (password.length < 8) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Le mot de passe doit contenir au moins 8 caractères.';
                messageEl.style.display = 'block';
                return;
            }

            if (password !== confirm) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Les mots de passe ne correspondent pas.';
                messageEl.style.display = 'block';
                return;
            }

            if (!terms) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Vous devez accepter les conditions générales.';
                messageEl.style.display = 'block';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.email === email)) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Cet email est déjà utilisé.';
                messageEl.style.display = 'block';
                return;
            }

            const newUser = {
                id: 'user_' + Date.now(),
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                telephone: telephone || '',
                adresse: adresse || '',
                role: role,
                photo: photoData,
                date_creation: new Date().toISOString(),
                statut: 'actif'
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                nom: newUser.nom,
                prenom: newUser.prenom,
                email: newUser.email,
                role: newUser.role,
                statut: newUser.statut,
                photo: newUser.photo
            }));

            messageEl.className = 'form-message success';
            messageEl.textContent = 'Inscription réussie ! Redirection en cours...';
            messageEl.style.display = 'block';

            window.regPhotoData = '';
            this.reset();
            document.getElementById('photoPreview').innerHTML = '<i class="fas fa-user-circle"></i>';

            setTimeout(() => {
                if (newUser.role === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'client-dashboard.html';
                }
            }, 1500);
        });
    }

    // Connexion des utilisateurs
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const messageEl = document.getElementById('loginMessage');

            messageEl.style.display = 'none';
            messageEl.className = 'form-message';

            if (!email || !password) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Veuillez remplir tous les champs.';
                messageEl.style.display = 'block';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                if (user.statut === 'bloque') {
                    messageEl.className = 'form-message error';
                    messageEl.textContent = 'Votre compte a été bloqué. Veuillez contacter l\'administrateur.';
                    messageEl.style.display = 'block';
                    return;
                }

                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    role: user.role,
                    statut: user.statut,
                    photo: user.photo || ''
                }));

                messageEl.className = 'form-message success';
                messageEl.textContent = 'Connexion réussie ! Redirection en cours...';
                messageEl.style.display = 'block';

                this.reset();

                setTimeout(() => {
                    if (user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'client-dashboard.html';
                    }
                }, 1500);

            } else {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Email ou mot de passe incorrect.';
                messageEl.style.display = 'block';
            }
        });
    }

    // Réinitialisation du mot de passe
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('resetEmail').value.trim();
            const messageEl = document.getElementById('resetMessage');

            messageEl.style.display = 'none';
            messageEl.className = 'form-message';

            if (!email) {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Veuillez entrer votre adresse email.';
                messageEl.style.display = 'block';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);

            if (user) {
                const newPassword = 'pass' + Math.floor(Math.random() * 10000);
                user.password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));

                messageEl.className = 'form-message success';
                messageEl.innerHTML = 'Un lien de réinitialisation a été envoyé à <strong>' + email + '</strong>.<br><br><strong>Nouveau mot de passe temporaire :</strong> ' + newPassword;
                messageEl.style.display = 'block';

                this.reset();

                setTimeout(() => {
                    switchTab('login');
                    messageEl.style.display = 'none';
                }, 5000);

            } else {
                messageEl.className = 'form-message error';
                messageEl.textContent = 'Aucun compte trouvé avec cet email.';
                messageEl.style.display = 'block';
            }
        });
    }

    // Déconnexion
    window.logout = function() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        }
    };

    // Vérification de la session
    window.getCurrentUser = function() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };

    window.isAdmin = function() {
        const user = getCurrentUser();
        return user && user.role === 'admin';
    };

    window.isClient = function() {
        const user = getCurrentUser();
        return user && user.role === 'client';
    };

    window.isLoggedIn = function() {
        return getCurrentUser() !== null;
    };

    window.protectAdminPage = function() {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
            window.location.href = 'signin.html';
            return false;
        }
        return true;
    };

    window.protectClientPage = function() {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'client') {
            window.location.href = 'signin.html';
            return false;
        }
        return true;
    };

    // Mise à jour du bouton de connexion et de la navigation
    function updateLoginButton() {
        const currentUser = getCurrentUser();
        const loginBtn = document.getElementById('loginBtn');
        
        if (!loginBtn) return;
        
        if (currentUser) {
            const isAdmin = currentUser.role === 'admin';
            const userPhoto = currentUser.photo || '';
            
            let photoHtml = '';
            if (userPhoto) {
                photoHtml = `<img src="${userPhoto}" alt="Profil" class="user-avatar">`;
            } else {
                photoHtml = `<i class="fas fa-user-circle"></i>`;
            }
            
            loginBtn.innerHTML = `
                ${photoHtml}
                <span style="font-size: 11px; background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 10px; margin-left: 5px;">
                    ${isAdmin ? 'Admin' : 'Client'}
                </span>
            `;
            loginBtn.href = isAdmin ? 'admin-dashboard.html' : 'client-dashboard.html';
            loginBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = isAdmin ? 'admin-dashboard.html' : 'client-dashboard.html';
            };
        } else {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> Connexion`;
            loginBtn.href = 'signin.html';
            loginBtn.onclick = null;
        }
    }

    function updateNavMenu() {
        const currentUser = getCurrentUser();
        const navMenu = document.getElementById('navMenu');
        
        if (!navMenu) return;
        
        let navLinks = `
            <li><a href="index.html" class="${window.location.pathname.includes('index') ? 'active' : ''}"><i class="fas fa-home"></i> HOME</a></li>
            <li><a href="about.html" class="${window.location.pathname.includes('about') ? 'active' : ''}"><i class="fas fa-info-circle"></i> ABOUT</a></li>
            <li><a href="pricing.html" class="${window.location.pathname.includes('pricing') ? 'active' : ''}"><i class="fas fa-tags"></i> PRICING</a></li>
            <li><a href="contact.html" class="${window.location.pathname.includes('contact') ? 'active' : ''}"><i class="fas fa-envelope"></i> CONTACT</a></li>
        `;

        if (currentUser) {
            if (currentUser.role === 'admin') {
                navLinks += `
                    <li><a href="admin-dashboard.html" class="${window.location.pathname.includes('admin-dashboard') ? 'active' : ''}"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                `;
            } else {
                navLinks += `
                    <li><a href="client-dashboard.html" class="${window.location.pathname.includes('client-dashboard') ? 'active' : ''}"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                `;
            }
        }

        navLinks += `
            <li><a href="paynow.html" class="${window.location.pathname.includes('paynow') ? 'active' : ''}"><i class="fas fa-credit-card"></i> PAY NOW</a></li>
        `;

        navMenu.innerHTML = navLinks;
    }

    function updateUserUI() {
        updateLoginButton();
        updateNavMenu();
    }

    // Gestion du profil client
    window.loadProfile = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'signin.html';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === currentUser.id);

        if (user) {
            document.getElementById('profileNom').value = user.nom;
            document.getElementById('profilePrenom').value = user.prenom;
            document.getElementById('profileEmail').value = user.email;
            document.getElementById('profileTelephone').value = user.telephone || '';
            document.getElementById('profileAdresse').value = user.adresse || '';
            document.getElementById('profileRole').value = user.role;
            document.getElementById('profileName').textContent = user.prenom + ' ' + user.nom;
            document.getElementById('profileEmailDisplay').textContent = user.email;
            
            const preview = document.getElementById('profilePhotoPreview');
            if (user.photo) {
                preview.innerHTML = `<img src="${user.photo}" alt="Photo de profil">`;
            } else {
                preview.innerHTML = `<i class="fas fa-user-circle"></i>`;
            }
            
            const avatar = document.getElementById('profileAvatar');
            if (user.photo && avatar) {
                avatar.innerHTML = `<img src="${user.photo}" alt="Photo de profil">`;
            } else if (avatar) {
                avatar.innerHTML = `<i class="fas fa-user-circle"></i>`;
            }
        }
    };

    window.saveProfile = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Veuillez vous connecter.');
            return;
        }

        const nom = document.getElementById('profileNom').value.trim();
        const prenom = document.getElementById('profilePrenom').value.trim();
        const email = document.getElementById('profileEmail').value.trim();
        const telephone = document.getElementById('profileTelephone').value.trim();
        const adresse = document.getElementById('profileAdresse').value.trim();
        const messageEl = document.getElementById('profileMessage');

        messageEl.style.display = 'none';
        messageEl.className = 'form-message';

        if (!nom || !prenom || !email) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Nom, prénom et email sont obligatoires.';
            messageEl.style.display = 'block';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex === -1) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Utilisateur non trouvé.';
            messageEl.style.display = 'block';
            return;
        }

        const emailExists = users.some((u, index) => u.email === email && index !== userIndex);
        if (emailExists) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Cet email est déjà utilisé par un autre compte.';
            messageEl.style.display = 'block';
            return;
        }

        users[userIndex].nom = nom;
        users[userIndex].prenom = prenom;
        users[userIndex].email = email;
        users[userIndex].telephone = telephone;
        users[userIndex].adresse = adresse;

        if (window.profilePhotoData) {
            users[userIndex].photo = window.profilePhotoData;
            window.profilePhotoData = '';
        }

        localStorage.setItem('users', JSON.stringify(users));

        const updatedUser = {
            id: users[userIndex].id,
            nom: nom,
            prenom: prenom,
            email: email,
            role: users[userIndex].role,
            statut: users[userIndex].statut,
            photo: users[userIndex].photo || ''
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        messageEl.className = 'form-message success';
        messageEl.textContent = 'Profil mis à jour avec succès !';
        messageEl.style.display = 'block';

        updateUserUI();

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    };

    // Consultation des services achetés par le client
    window.loadClientServices = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'signin.html';
            return;
        }

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const clientOrders = orders.filter(o => o.clientId === currentUser.id);
        const container = document.getElementById('clientServices');

        if (!container) return;

        if (clientOrders.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-bag" style="font-size: 48px; color: var(--text-gray);"></i>
                    <p>Vous n'avez pas encore acheté de services.</p>
                    <a href="pricing.html" class="btn-primary">Découvrir nos services</a>
                </div>
            `;
            return;
        }

        container.innerHTML = clientOrders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">Commande #${order.id.slice(0, 8)}</span>
                    <span class="order-status ${order.statut}">${order.statut}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.nom}</span>
                            <span>${item.prix} $</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <strong>Total:</strong> ${order.total} $
                </div>
            </div>
        `).join('');
    };

    // Historique des paiements du client
    window.loadPaymentHistory = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'signin.html';
            return;
        }

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const clientPayments = payments.filter(p => p.clientId === currentUser.id);
        const container = document.getElementById('paymentHistory');

        if (!container) return;

        if (clientPayments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-credit-card" style="font-size: 48px; color: var(--text-gray);"></i>
                    <p>Aucun paiement enregistré.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = clientPayments.map(payment => `
            <div class="payment-card">
                <div class="payment-header">
                    <span class="payment-id">${payment.transactionId}</span>
                    <span class="payment-status ${payment.statut}">${payment.statut}</span>
                    <span class="payment-date">${new Date(payment.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div class="payment-details">
                    <span>Montant: <strong>${payment.montant} $</strong></span>
                    <span>Mode: ${payment.mode}</span>
                    <span>Service: ${payment.service}</span>
                </div>
            </div>
        `).join('');
    };

    // Statistiques du tableau de bord client
    window.loadClientStats = function() {
        if (!protectClientPage()) return;

        const currentUser = getCurrentUser();
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const clientOrders = orders.filter(o => o.clientId === currentUser.id);
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const clientPayments = payments.filter(p => p.clientId === currentUser.id);
        const totalSpent = clientPayments.reduce((sum, p) => sum + p.montant, 0);

        const statsContainer = document.getElementById('clientStats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-shopping-bag" style="color: var(--primary);"></i>
                        <h3>${clientOrders.length}</h3>
                        <p>Services achetés</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-credit-card" style="color: #28a745;"></i>
                        <h3>${clientPayments.length}</h3>
                        <p>Paiements effectués</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-dollar-sign" style="color: #ffc107;"></i>
                        <h3>${totalSpent.toFixed(2)} $</h3>
                        <p>Total dépensé</p>
                    </div>
                </div>
            `;
        }
    };

    // Changement d'onglet dans le tableau de bord admin
    window.switchAdminTab = function(tabId) {
        const panels = document.querySelectorAll('.admin-panel');
        panels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        const activePanel = document.getElementById(tabId);
        if (activePanel) {
            activePanel.classList.add('active');
        }
        
        const tabs = document.querySelectorAll('.admin-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            }
        });
        
        if (tabId === 'clients') {
            loadAdminClients();
        } else if (tabId === 'services') {
            loadAdminServices();
        } else if (tabId === 'payments') {
            loadAdminPayments();
        } else if (tabId === 'messages') {
            loadAdminMessages();
        } else if (tabId === 'users') {
            loadAdminUsers();
        } else if (tabId === 'settings') {
            loadAdminSettings();
        }
    };

    // Paramètres admin
    window.loadAdminSettings = function() {
        if (!protectAdminPage()) return;
        
        const currentUser = getCurrentUser();
        if (!currentUser) return;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === currentUser.id);
        
        if (user) {
            document.getElementById('adminNom').textContent = user.nom;
            document.getElementById('adminPrenom').textContent = user.prenom;
            document.getElementById('adminEmail').textContent = user.email;
            
            const preview = document.getElementById('adminPhotoPreview');
            if (user.photo) {
                preview.innerHTML = `<img src="${user.photo}" alt="Photo de profil">`;
            } else {
                preview.innerHTML = `<i class="fas fa-user-circle"></i>`;
            }
        }
    };

    window.saveAdminPhoto = function() {
        if (!protectAdminPage()) return;
        
        if (!window.adminPhotoData) {
            alert('Veuillez choisir une photo.');
            return;
        }
        
        const currentUser = getCurrentUser();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
            alert('Utilisateur non trouvé.');
            return;
        }
        
        users[userIndex].photo = window.adminPhotoData;
        localStorage.setItem('users', JSON.stringify(users));
        
        const updatedUser = {
            id: users[userIndex].id,
            nom: users[userIndex].nom,
            prenom: users[userIndex].prenom,
            email: users[userIndex].email,
            role: users[userIndex].role,
            statut: users[userIndex].statut,
            photo: window.adminPhotoData
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        alert('Photo mise à jour avec succès !');
        window.adminPhotoData = '';
        updateUserUI();
        loadAdminSettings();
    };

    window.changeAdminPassword = function() {
        if (!protectAdminPage()) return;
        
        const currentPassword = document.getElementById('currentPassword').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();
        const messageEl = document.getElementById('settingsMessage');
        
        messageEl.style.display = 'none';
        messageEl.className = 'form-message';
        
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Veuillez remplir tous les champs.';
            messageEl.style.display = 'block';
            return;
        }
        
        if (newPassword.length < 8) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Le nouveau mot de passe doit contenir au moins 8 caractères.';
            messageEl.style.display = 'block';
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Les mots de passe ne correspondent pas.';
            messageEl.style.display = 'block';
            return;
        }
        
        const currentUser = getCurrentUser();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Utilisateur non trouvé.';
            messageEl.style.display = 'block';
            return;
        }
        
        if (users[userIndex].password !== currentPassword) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Mot de passe actuel incorrect.';
            messageEl.style.display = 'block';
            return;
        }
        
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        const updatedUser = {
            id: users[userIndex].id,
            nom: users[userIndex].nom,
            prenom: users[userIndex].prenom,
            email: users[userIndex].email,
            role: users[userIndex].role,
            statut: users[userIndex].statut,
            photo: users[userIndex].photo || ''
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        messageEl.className = 'form-message success';
        messageEl.textContent = 'Mot de passe modifié avec succès !';
        messageEl.style.display = 'block';
        
        document.getElementById('settingsForm').reset();
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 4000);
    };

    // Gestion des clients par l'administrateur
    window.loadAdminClients = function() {
        if (!protectAdminPage()) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const clients = users.filter(u => u.role === 'client');
        const container = document.getElementById('adminClients');

        if (!container) return;

        if (clients.length === 0) {
            container.innerHTML = `
                <p style="text-align: center; color: var(--text-gray);">
                    Aucun client enregistré.
                </p>
            `;
            return;
        }

        container.innerHTML = clients.map(client => `
            <div class="admin-client-card">
                <div class="client-info">
                    <h4>${client.prenom} ${client.nom}</h4>
                    <p><i class="fas fa-envelope"></i> ${client.email}</p>
                    <p><i class="fas fa-phone"></i> ${client.telephone || 'Non renseigné'}</p>
                    <p><i class="fas fa-calendar"></i> Inscrit le ${new Date(client.date_creation).toLocaleDateString('fr-FR')}</p>
                    <p><span class="status-badge ${client.statut}">${client.statut}</span></p>
                </div>
                <div class="client-actions">
                    <button class="btn-small" onclick="toggleUserStatus('${client.id}')">
                        <i class="fas ${client.statut === 'actif' ? 'fa-ban' : 'fa-check'}"></i>
                        ${client.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
                    </button>
                    <button class="btn-small btn-promote" onclick="promoteToAdmin('${client.id}')">
                        <i class="fas fa-user-shield"></i> Promouvoir Admin
                    </button>
                </div>
            </div>
        `).join('');
    };

    // Gestion des services par l'administrateur
    window.loadAdminServices = function() {
        if (!protectAdminPage()) return;

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const container = document.getElementById('adminServices');

        if (!container) return;

        if (services.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun service disponible.</p>';
            return;
        }

        container.innerHTML = services.map(service => `
            <div class="admin-service-card">
                <div class="service-info">
                    <h4>${service.nom}</h4>
                    <p>${service.description}</p>
                    <p><strong>${service.prix} $</strong></p>
                    <p><span class="status-badge ${service.statut}">${service.statut}</span></p>
                </div>
                <div class="service-actions">
                    <button class="btn-small" onclick="editService('${service.id}')">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn-small btn-danger" onclick="deleteService('${service.id}')">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    };

    window.addService = function() {
        const nom = document.getElementById('serviceNom').value.trim();
        const description = document.getElementById('serviceDescription').value.trim();
        const prix = parseFloat(document.getElementById('servicePrix').value);
        const categorie = document.getElementById('serviceCategorie').value;
        const messageEl = document.getElementById('serviceMessage');

        messageEl.style.display = 'none';
        messageEl.className = 'form-message';

        if (!nom || !description || isNaN(prix) || prix <= 0) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Veuillez remplir tous les champs correctement.';
            messageEl.style.display = 'block';
            return;
        }

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const newService = {
            id: 'svc_' + Date.now(),
            nom: nom,
            description: description,
            prix: prix,
            categorie: categorie,
            statut: 'actif'
        };

        services.push(newService);
        localStorage.setItem('services', JSON.stringify(services));

        messageEl.className = 'form-message success';
        messageEl.textContent = 'Service ajouté avec succès !';
        messageEl.style.display = 'block';

        document.getElementById('serviceForm').reset();
        loadAdminServices();

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    };

    // Modification d'un service
    window.editService = function(serviceId) {
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const service = services.find(s => s.id === serviceId);
        
        if (!service) {
            alert('Service non trouvé.');
            return;
        }

        document.getElementById('editServiceId').value = serviceId;
        document.getElementById('editServiceNom').value = service.nom || '';
        document.getElementById('editServiceDescription').value = service.description || '';
        document.getElementById('editServicePrix').value = service.prix || 0;
        document.getElementById('editServiceCategorie').value = service.categorie || 'Développement';
        document.getElementById('editServiceStatut').value = service.statut || 'actif';
        
        const messageEl = document.getElementById('editServiceMessage');
        messageEl.style.display = 'none';
        messageEl.className = 'form-message';
        messageEl.textContent = '';

        document.getElementById('editServiceModal').classList.add('open');
    };

    window.saveServiceEdit = function() {
        const serviceId = document.getElementById('editServiceId').value;
        const nom = document.getElementById('editServiceNom').value.trim();
        const description = document.getElementById('editServiceDescription').value.trim();
        const prix = parseFloat(document.getElementById('editServicePrix').value);
        const categorie = document.getElementById('editServiceCategorie').value;
        const statut = document.getElementById('editServiceStatut').value;

        const messageEl = document.getElementById('editServiceMessage');
        messageEl.style.display = 'none';
        messageEl.className = 'form-message';

        if (!nom || !description || isNaN(prix) || prix <= 0) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Veuillez remplir tous les champs correctement.';
            messageEl.style.display = 'block';
            return;
        }

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const index = services.findIndex(s => s.id === serviceId);

        if (index === -1) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Service non trouvé.';
            messageEl.style.display = 'block';
            return;
        }

        services[index].nom = nom;
        services[index].description = description;
        services[index].prix = prix;
        services[index].categorie = categorie;
        services[index].statut = statut;

        localStorage.setItem('services', JSON.stringify(services));

        messageEl.className = 'form-message success';
        messageEl.textContent = 'Service modifié avec succès !';
        messageEl.style.display = 'block';

        loadAdminServices();

        setTimeout(() => {
            document.getElementById('editServiceModal').classList.remove('open');
            messageEl.style.display = 'none';
        }, 1500);
    };

    window.deleteService = function(serviceId) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;

        let services = JSON.parse(localStorage.getItem('services')) || [];
        services = services.filter(s => s.id !== serviceId);
        localStorage.setItem('services', JSON.stringify(services));
        loadAdminServices();
        alert('Service supprimé avec succès.');
    };

    // Consultation des paiements par l'administrateur
    window.loadAdminPayments = function() {
        if (!protectAdminPage()) return;

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const container = document.getElementById('adminPayments');

        if (!container) return;

        if (payments.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun paiement enregistré.</p>';
            return;
        }

        container.innerHTML = payments.map(payment => `
            <div class="admin-payment-card">
                <div class="payment-info">
                    <span class="payment-id">${payment.transactionId}</span>
                    <span><strong>${payment.clientNom}</strong></span>
                    <span>${payment.service}</span>
                    <span><strong>${payment.montant} $</strong></span>
                    <span class="status-badge ${payment.statut}">${payment.statut}</span>
                    <span>${new Date(payment.date).toLocaleDateString('fr-FR')}</span>
                </div>
            </div>
        `).join('');
    };

    // Consultation des messages par l'administrateur
    window.loadAdminMessages = function() {
        if (!protectAdminPage()) return;

        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const container = document.getElementById('adminMessages');

        if (!container) return;

        if (contacts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun message reçu.</p>';
            return;
        }

        container.innerHTML = contacts.map(msg => `
            <div class="admin-message-card ${msg.statut === 'non_lu' ? 'unread' : ''}">
                <div class="message-header">
                    <h4>${msg.prenom} ${msg.nom}</h4>
                    <span class="message-date">${new Date(msg.date_message).toLocaleDateString('fr-FR')}</span>
                    <span class="status-badge ${msg.statut}">${msg.statut}</span>
                </div>
                <div class="message-body">
                    <p><strong>Sujet:</strong> ${msg.sujet}</p>
                    <p><strong>Email:</strong> ${msg.email}</p>
                    <p><strong>Téléphone:</strong> ${msg.telephone || 'Non renseigné'}</p>
                    <p><strong>Message:</strong></p>
                    <p class="message-text">${msg.message}</p>
                </div>
                <div class="message-actions">
                    <button class="btn-small" onclick="markMessageRead('${msg.id}')">
                        <i class="fas fa-check"></i> Marquer comme lu
                    </button>
                    <button class="btn-small btn-danger" onclick="deleteMessage('${msg.id}')">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    };

    window.markMessageRead = function(messageId) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const index = contacts.findIndex(c => c.id === messageId);
        
        if (index !== -1) {
            contacts[index].statut = 'lu';
            localStorage.setItem('contacts', JSON.stringify(contacts));
            loadAdminMessages();
        }
    };

    window.deleteMessage = function(messageId) {
        if (!confirm('Supprimer ce message ?')) return;
        
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts = contacts.filter(c => c.id !== messageId);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadAdminMessages();
    };

    // Gestion des utilisateurs par l'administrateur
    window.loadAdminUsers = function() {
        if (!protectAdminPage()) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = getCurrentUser();
        const container = document.getElementById('adminUsers');

        if (!container) return;

        if (users.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun utilisateur enregistré.</p>';
            return;
        }

        container.innerHTML = users.map(user => {
            const isAdmin = user.role === 'admin';
            const isDefaultAdmin = user.email === 'kazotech@gmail.com';
            const isCurrentUser = currentUser && currentUser.id === user.id;
            const canManageAdmin = currentUser && currentUser.email === 'kazotech@gmail.com';

            let actionsHtml = '';

            if (isAdmin) {
                if (isDefaultAdmin) {
                    actionsHtml = `
                        <span style="font-size: 12px; color: #ffc107;">
                            <i class="fas fa-crown"></i> Administrateur Principal
                        </span>
                    `;
                } else {
                    if (canManageAdmin && !isDefaultAdmin && !isCurrentUser) {
                        actionsHtml = `
                            <button class="btn-small btn-revoke" onclick="revokeAdmin('${user.id}')">
                                <i class="fas fa-user-minus"></i> Révoquer Admin
                            </button>
                            <button class="btn-small" onclick="toggleUserStatus('${user.id}')">
                                <i class="fas ${user.statut === 'actif' ? 'fa-ban' : 'fa-check'}"></i>
                                ${user.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
                            </button>
                        `;
                    } else if (isCurrentUser) {
                        actionsHtml = `
                            <span style="font-size: 12px; color: var(--text-gray);">
                                <i class="fas fa-user"></i> Vous
                            </span>
                        `;
                    } else {
                        actionsHtml = `
                            <span style="font-size: 12px; color: var(--text-gray);">
                                <i class="fas fa-shield-alt"></i> Administrateur
                            </span>
                        `;
                    }
                }
            } else {
                actionsHtml = `
                    <button class="btn-small" onclick="toggleUserStatus('${user.id}')">
                        <i class="fas ${user.statut === 'actif' ? 'fa-ban' : 'fa-check'}"></i>
                        ${user.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
                    </button>
                    <button class="btn-small btn-promote" onclick="promoteToAdmin('${user.id}')">
                        <i class="fas fa-user-shield"></i> Promouvoir Admin
                    </button>
                `;
            }

            return `
                <div class="admin-user-card">
                    <div class="user-info">
                        <h4>
                            ${user.prenom} ${user.nom} 
                            ${isAdmin ? '⭐' : ''}
                            ${isDefaultAdmin ? '👑' : ''}
                        </h4>
                        <p><i class="fas fa-envelope"></i> ${user.email}</p>
                        <p><i class="fas fa-user-tag"></i> ${user.role}</p>
                        <p><span class="status-badge ${user.statut}">${user.statut}</span></p>
                    </div>
                    <div class="user-actions">
                        ${actionsHtml}
                    </div>
                </div>
            `;
        }).join('');
    };

    // Bloquer ou débloquer un utilisateur
    window.toggleUserStatus = function(userId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = getCurrentUser();
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            alert('Utilisateur non trouvé.');
            return;
        }

        // Seul l'administrateur principal peut bloquer un autre administrateur
        if (users[index].role === 'admin') {
            if (!currentUser || currentUser.email !== 'kazotech@gmail.com') {
                alert('Seul l\'administrateur principal (kazotech@gmail.com) peut bloquer un administrateur.');
                return;
            }
        }

        // L'administrateur principal ne peut pas se bloquer lui-même
        if (users[index].id === currentUser.id && currentUser.email === 'kazotech@gmail.com') {
            alert('Vous ne pouvez pas bloquer votre propre compte.');
            return;
        }

        users[index].statut = users[index].statut === 'actif' ? 'bloque' : 'actif';
        localStorage.setItem('users', JSON.stringify(users));
        
        loadAdminClients();
        loadAdminUsers();
        alert(`Utilisateur ${users[index].statut === 'actif' ? 'débloqué' : 'bloqué'} avec succès.`);
    };

    // Promouvoir un client en administrateur
    window.promoteToAdmin = function(userId) {
        const currentUser = getCurrentUser();
        
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Accès refusé. Vous devez être administrateur.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            alert('Utilisateur non trouvé.');
            return;
        }

        if (users[index].role === 'admin') {
            alert('Cet utilisateur est déjà administrateur.');
            return;
        }

        const confirmAction = confirm(
            `Êtes-vous sûr de vouloir promouvoir "${users[index].prenom} ${users[index].nom}" en administrateur ?\n\n` +
            `Cette action est irréversible.`
        );

        if (!confirmAction) return;

        users[index].role = 'admin';
        localStorage.setItem('users', JSON.stringify(users));

        loadAdminClients();
        loadAdminUsers();
        loadAdminStats();

        alert(`"${users[index].prenom} ${users[index].nom}" est maintenant administrateur.`);
    };

    // Révoquer les droits d'administrateur
    window.revokeAdmin = function(userId) {
        const currentUser = getCurrentUser();
        
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Accès refusé. Vous devez être administrateur.');
            return;
        }

        // Seul l'administrateur principal peut révoquer les droits d'un administrateur
        if (currentUser.email !== 'kazotech@gmail.com') {
            alert('Seul l\'administrateur principal (kazotech@gmail.com) peut révoquer les droits d\'un administrateur.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            alert('Utilisateur non trouvé.');
            return;
        }

        if (users[index].role !== 'admin') {
            alert('Cet utilisateur n\'est pas administrateur.');
            return;
        }

        if (users[index].id === currentUser.id) {
            alert('Vous ne pouvez pas révoquer vos propres droits.');
            return;
        }

        const confirmAction = confirm(
            `Êtes-vous sûr de vouloir révoquer les droits d'administrateur de "${users[index].prenom} ${users[index].nom}" ?\n\n` +
            `Cet utilisateur deviendra un client normal.`
        );

        if (!confirmAction) return;

        users[index].role = 'client';
        localStorage.setItem('users', JSON.stringify(users));

        loadAdminClients();
        loadAdminUsers();
        loadAdminStats();

        alert(`"${users[index].prenom} ${users[index].nom}" n'est plus administrateur.`);
    };

    // Statistiques du tableau de bord admin
    window.loadAdminStats = function() {
        if (!protectAdminPage()) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const clients = users.filter(u => u.role === 'client');
        const admins = users.filter(u => u.role === 'admin');
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const unreadMessages = contacts.filter(c => c.statut === 'non_lu');

        const statsContainer = document.getElementById('adminStats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users" style="color: var(--primary);"></i>
                        <h3>${users.length}</h3>
                        <p>Total Utilisateurs</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user" style="color: #28a745;"></i>
                        <h3>${clients.length}</h3>
                        <p>Clients</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-shield" style="color: var(--secondary);"></i>
                        <h3>${admins.length}</h3>
                        <p>Administrateurs</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-shopping-cart" style="color: #ffc107;"></i>
                        <h3>${orders.length}</h3>
                        <p>Commandes</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-envelope" style="color: #17a2b8;"></i>
                        <h3>${contacts.length}</h3>
                        <p>Messages</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-envelope-open" style="color: #dc3545;"></i>
                        <h3>${unreadMessages.length}</h3>
                        <p>Messages non lus</p>
                    </div>
                </div>
            `;
        }
    };

    // Chargement des services sur la page des tarifs
    window.loadServices = function() {
        const grid = document.getElementById('pricingGrid');
        if (!grid) return;

        const services = [
            {
                id: 1,
                nom: 'Développement de logiciels & programmation',
                description: 'Création de logiciels sur mesure, applications web et mobiles adaptées à vos besoins spécifiques. Technologies modernes et code de qualité.',
                prix: 800,
                categorie: 'Développement',
                icon: 'fa-laptop-code',
                color: '#2183e9'
            },
            {
                id: 2,
                nom: 'Conception & gestion de bases de données',
                description: 'Conception SQL et NoSQL, optimisation des requêtes, migration de données et maintenance de bases de données performantes.',
                prix: 500,
                categorie: 'Base de données',
                icon: 'fa-database',
                color: '#28a745'
            },
            {
                id: 3,
                nom: 'Sécurité informatique',
                description: 'Audit de sécurité complet, tests d\'intrusion, protection des données, mise en place de pare-feu et stratégies de cybersécurité.',
                prix: 700,
                categorie: 'Sécurité',
                icon: 'fa-shield-alt',
                color: '#dc3545'
            },
            {
                id: 4,
                nom: 'Consultation & assistance technique',
                description: 'Conseil en stratégie IT, support technique personnalisé, accompagnement dans vos projets numériques et formation de vos équipes.',
                prix: 600,
                categorie: 'Consultation',
                icon: 'fa-headset',
                color: '#ffc107'
            }
        ];

        localStorage.setItem('services', JSON.stringify(services));

        grid.innerHTML = services.map(service => `
            <div class="pricing-card ${service.id === 3 ? 'featured' : ''}">
                <div class="service-icon-wrapper">
                    <i class="fas ${service.icon}"></i>
                </div>
                <h3>${service.nom}</h3>
                <p class="service-description">${service.description}</p>
                <div class="service-price">${service.prix} $ <span>/ service</span></div>
                <button class="btn-primary btn-add-cart" onclick="addToCart(${service.id})">
                    <i class="fas fa-cart-plus"></i> Sélectionner
                </button>
            </div>
        `).join('');
    };

    // Gestion des messages de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = {
                id: 'msg_' + Date.now(),
                nom: document.getElementById('nom').value.trim(),
                prenom: document.getElementById('prenom').value.trim(),
                email: document.getElementById('email').value.trim(),
                telephone: document.getElementById('telephone').value.trim(),
                sujet: document.getElementById('sujet').value.trim(),
                message: document.getElementById('message').value.trim(),
                date_message: new Date().toISOString(),
                statut: 'non_lu'
            };

            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push(data);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            const messageEl = document.getElementById('formMessage');
            messageEl.className = 'form-message success';
            messageEl.textContent = 'Votre message a été envoyé avec succès !';
            messageEl.style.display = 'block';

            this.reset();

            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        });
    }

    // Gestion du paiement
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const currentUser = getCurrentUser();
            if (!currentUser) {
                alert('Vous devez être connecté pour effectuer un paiement.');
                window.location.href = 'signin.html';
                return;
            }

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Votre panier est vide.');
                return;
            }

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            const transactionId = 'TXN-' + Date.now();

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push({
                id: 'order_' + Date.now(),
                clientId: currentUser.id,
                clientNom: currentUser.prenom + ' ' + currentUser.nom,
                items: cart,
                total: total,
                date: new Date().toISOString(),
                statut: 'payé'
            });
            localStorage.setItem('orders', JSON.stringify(orders));

            const payments = JSON.parse(localStorage.getItem('payments')) || [];
            cart.forEach(item => {
                payments.push({
                    id: 'pay_' + Date.now(),
                    clientId: currentUser.id,
                    clientNom: currentUser.prenom + ' ' + currentUser.nom,
                    transactionId: transactionId,
                    service: item.nom,
                    montant: item.prix,
                    mode: document.querySelector('.payment-method.active')?.dataset.method || 'carte',
                    date: new Date().toISOString(),
                    statut: 'reussi'
                });
            });
            localStorage.setItem('payments', JSON.stringify(payments));

            document.getElementById('transactionId').textContent = transactionId;
            document.getElementById('receiptAmount').textContent = total.toFixed(2);
            document.getElementById('receiptDate').textContent = new Date().toLocaleString();
            document.getElementById('confirmationModal').classList.add('open');

            localStorage.removeItem('cart');
            updateCartDisplay();
        });
    }

    // Fermeture des modales
    window.closeModal = function() {
        document.getElementById('confirmationModal')?.classList.remove('open');
        document.getElementById('editServiceModal')?.classList.remove('open');
    };

    document.getElementById('confirmationModal')?.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('open');
    });

    document.getElementById('editServiceModal')?.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('open');
    });

    // Gestion du panier
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        const cartContainer = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const paymentItems = document.getElementById('paymentItems');
        const paymentTotal = document.getElementById('paymentTotal');

        if (cartContainer) {
            if (cart.length === 0) {
                cartContainer.innerHTML = '<p class="empty-cart">Aucun service sélectionné</p>';
            } else {
                cartContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.nom}</h4>
                            <p>${item.description || ''}</p>
                        </div>
                        <div class="cart-item-price">${item.prix} $</div>
                        <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (totalEl) totalEl.textContent = total.toFixed(2);
        if (paymentTotal) paymentTotal.textContent = total.toFixed(2);

        if (paymentItems) {
            if (cart.length === 0) {
                paymentItems.innerHTML = '<p class="empty-cart">Aucun service dans votre panier</p>';
            } else {
                paymentItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.nom}</h4>
                        </div>
                        <div class="cart-item-price">${item.prix} $</div>
                    </div>
                `).join('');
            }
        }

        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
            checkoutBtn.style.pointerEvents = cart.length === 0 ? 'none' : 'auto';
        }
    }

    window.addToCart = function(serviceId) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            const confirmAction = confirm(
                'Vous devez être connecté pour ajouter des services à votre panier.\n\n' +
                'Cliquez sur "OK" pour vous connecter ou "Annuler" pour rester sur cette page.'
            );
            if (confirmAction) {
                window.location.href = 'signin.html';
            }
            return;
        }

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const service = services.find(s => s.id === serviceId);
        
        if (!service) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.find(item => item.id === serviceId)) {
            alert('Ce service est déjà dans votre panier.');
            return;
        }

        cart.push({
            id: service.id,
            nom: service.nom,
            prix: service.prix,
            description: service.description
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        alert(`"${service.nom}" a été ajouté à votre panier !`);
    };

    window.removeFromCart = function(serviceId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== serviceId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Bouton pour procéder au paiement
    document.getElementById('checkoutBtn')?.addEventListener('click', function(e) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            e.preventDefault();
            alert('Vous devez être connecté pour procéder au paiement.');
            window.location.href = 'signin.html';
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            e.preventDefault();
            alert('Votre panier est vide.');
            return;
        }
    });

    // Changement de méthode de paiement
    window.switchPaymentMethod = function(method) {
        const methods = document.querySelectorAll('.payment-method');
        methods.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.method === method) {
                btn.classList.add('active');
            }
        });

        const details = document.querySelectorAll('.payment-details');
        details.forEach(detail => {
            detail.classList.remove('active');
        });

        const activeDetail = document.getElementById(method + 'Payment');
        if (activeDetail) {
            activeDetail.classList.add('active');
        }
    };

    // Paiement avec PayPal
    window.processPayPal = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Vous devez être connecté pour effectuer un paiement.');
            window.location.href = 'signin.html';
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        const confirmPay = confirm(
            'Vous allez être redirigé vers PayPal.\n\n' +
            'Montant total: ' + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2) + ' $\n\n' +
            'Cliquez sur "OK" pour continuer.'
        );
        
        if (confirmPay) {
            setTimeout(() => {
                completePayment('PayPal');
            }, 1000);
        }
    };

    // Paiement avec Stripe
    window.processStripe = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Vous devez être connecté pour effectuer un paiement.');
            window.location.href = 'signin.html';
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        const confirmPay = confirm(
            'Vous allez être redirigé vers Stripe.\n\n' +
            'Montant total: ' + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2) + ' $\n\n' +
            'Cliquez sur "OK" pour continuer.'
        );
        
        if (confirmPay) {
            setTimeout(() => {
                completePayment('Stripe');
            }, 1000);
        }
    };

    // Finalisation du paiement
    function completePayment(method) {
        const currentUser = getCurrentUser();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const transactionId = 'TXN-' + Date.now();

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push({
            id: 'order_' + Date.now(),
            clientId: currentUser.id,
            clientNom: currentUser.prenom + ' ' + currentUser.nom,
            items: cart,
            total: total,
            date: new Date().toISOString(),
            statut: 'payé',
            method: method
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        cart.forEach(item => {
            payments.push({
                id: 'pay_' + Date.now(),
                clientId: currentUser.id,
                clientNom: currentUser.prenom + ' ' + currentUser.nom,
                transactionId: transactionId,
                service: item.nom,
                montant: item.prix,
                mode: method.toLowerCase(),
                date: new Date().toISOString(),
                statut: 'reussi'
            });
        });
        localStorage.setItem('payments', JSON.stringify(payments));

        document.getElementById('transactionId').textContent = transactionId;
        document.getElementById('receiptAmount').textContent = total.toFixed(2);
        document.getElementById('receiptDate').textContent = new Date().toLocaleString();
        document.getElementById('receiptMethod').textContent = method;
        document.getElementById('confirmationModal').classList.add('open');

        localStorage.removeItem('cart');
        updateCartDisplay();
    }

    // Initialisation
    updateUserUI();
    updateCartDisplay();

    if (document.getElementById('pricingGrid')) {
        loadServices();
    }

    if (document.getElementById('adminStats')) {
        protectAdminPage();
        loadAdminStats();
        loadAdminClients();
        loadAdminServices();
        loadAdminPayments();
        loadAdminMessages();
        loadAdminUsers();
        loadAdminSettings();
    }

    if (document.getElementById('clientStats')) {
        protectClientPage();
        loadClientStats();
    }

    if (document.getElementById('profileForm')) {
        loadProfile();
    }

    if (document.getElementById('clientServices')) {
        loadClientServices();
    }

    if (document.getElementById('paymentHistory')) {
        loadPaymentHistory();
    }

});
