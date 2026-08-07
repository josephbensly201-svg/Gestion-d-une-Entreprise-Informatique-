/**
 * SCRIPT.JS - Fichye prensipal JavaScript
 * Validasyon nom, prenom, email, telephone
 */

// Fonksyon validasyon
function isOnlyLetters(text) {
    return /^[a-zA-ZÀ-ÿ\s\-']+$/.test(text);
}

function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(text) {
    return /^[0-9+\s\-()]+$/.test(text);
}

function removeNumbers(text) {
    return text.replace(/[0-9]/g, '');
}

function removeLetters(text) {
    return text.replace(/[a-zA-Z]/g, '');
}

function blockNumbers(event) {
    const key = event.key;
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    
    if (allowedKeys.includes(key)) return;
    if (event.ctrlKey || event.metaKey) return;
    
    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        return false;
    }
}

function blockPhoneLetters(event) {
    const key = event.key;
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', '+', '(', ')', '-', ' '];
    
    if (allowedKeys.includes(key)) return;
    if (event.ctrlKey || event.metaKey) return;
    
    if (!/^[0-9]$/.test(key)) {
        event.preventDefault();
        return false;
    }
}

function validateNameInput(event) {
    const input = event.target;
    const originalValue = input.value;
    const cleanedValue = removeNumbers(originalValue);
    if (originalValue !== cleanedValue) {
        input.value = cleanedValue;
        showNotification('Les chiffres ne sont pas autorisés dans ce champ.', 'error');
    }
}

function validateEmailInput(event) {
    const input = event.target;
    const value = input.value;
    
    if (value === '') return;
    
    if (!isValidEmail(value)) {
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
    }
}

function validatePhoneInput(event) {
    const input = event.target;
    const originalValue = input.value;
    const cleanedValue = removeLetters(originalValue);
    
    if (originalValue !== cleanedValue) {
        input.value = cleanedValue;
        showNotification('Les lettres ne sont pas autorisées dans le numéro de téléphone.', 'error');
    }
    
    if (cleanedValue.length > 0 && !isValidPhone(cleanedValue)) {
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else if (cleanedValue.length > 0) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }, 100);
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {

    // Creation admin default
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
                adresse: 'Cap-Haitien, Haiti',
                role: 'admin',
                photo: '',
                date_creation: new Date().toISOString(),
                statut: 'actif'
            };
            
            users.push(defaultAdmin);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Administrateur par defaut cree');
            console.log('Email: kazotech@gmail.com');
            console.log('Mot de passe: kazo@1234');
        }
    }
    createDefaultAdmin();

    // Creation statistiques default
    function createDefaultStats() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        if (orders.length > 0) return;
        
        const services = [
            {
                id: 'svc_1',
                nom: 'Developpement de logiciels & programmation',
                description: 'Creation de logiciels sur mesure, applications web et mobiles adaptees a vos besoins.',
                prix: 800,
                categorie: 'Developpement',
                icon: 'fa-laptop-code',
                image: 'assets/images/services/developpement-web.jpg',
                statut: 'actif'
            },
            {
                id: 'svc_2',
                nom: 'Conception & gestion de bases de donnees',
                description: 'Conception SQL et NoSQL, optimisation des requetes, migration de donnees et maintenance performante.',
                prix: 500,
                categorie: 'Base de donnees',
                icon: 'fa-database',
                image: 'assets/images/services/base-donnees.jpg',
                statut: 'actif'
            },
            {
                id: 'svc_3',
                nom: 'Securite informatique',
                description: 'Audit de securite complet, tests d intrusion, protection des donnees et strategies de cybersecurite.',
                prix: 700,
                categorie: 'Securite',
                icon: 'fa-shield-alt',
                image: 'assets/images/services/securite-informatique.jpg',
                statut: 'actif'
            },
            {
                id: 'svc_4',
                nom: 'Consultation & assistance technique',
                description: 'Conseil en strategie IT, support technique personnalise, accompagnement et formation des equipes.',
                prix: 600,
                categorie: 'Consultation',
                icon: 'fa-headset',
                image: 'assets/images/services/consultation-it.jpg',
                statut: 'actif'
            }
        ];
        
        localStorage.setItem('services', JSON.stringify(services));
        
        const repartition = {
            'Developpement de logiciels & programmation': 75,
            'Conception & gestion de bases de donnees': 55,
            'Securite informatique': 48,
            'Consultation & assistance technique': 37
        };
        
        const clients = [
            'Building 4s.', 'Naldika Fr.', 'Dudley Jo.', 'TechCorp', 'DataSolutions',
            'SecureNet', 'Innovation Labs', 'Digital Services', 'Cloud Systems', 'IT Partners',
            'StartUp Digital', 'FinTech Solutions', 'HealthCare IT', 'EduTech', 'Green Energy',
            'Logistic Pro', 'Media House', 'Real Estate Tech', 'Food Delivery', 'Travel Agency',
            'E-Commerce Plus', 'AI Solutions', 'Blockchain Corp', 'IoT Systems', 'Cyber Defense',
            'Data Analytics', 'Mobile Apps', 'Web Solutions', 'Cloud Native', 'DevOps Masters',
            'Agile Team', 'Scrum Masters', 'Digital Nomad', 'Remote Work', 'Smart Solutions'
        ];
        
        const simulatedOrders = [];
        let orderId = 1;
        
        Object.keys(repartition).forEach((serviceName, index) => {
            const count = repartition[serviceName];
            const prix = [800, 500, 700, 600][index % 4] || 600;
            
            for (let i = 0; i < count; i++) {
                const client = clients[Math.floor(Math.random() * clients.length)];
                const date = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
                
                simulatedOrders.push({
                    id: 'order_' + Date.now() + '_' + orderId++,
                    clientId: 'client_' + Date.now() + '_' + i,
                    clientNom: client,
                    items: [{
                        nom: serviceName,
                        prix: prix,
                        id: services[index % 4].id
                    }],
                    total: prix,
                    date: date.toISOString(),
                    statut: 'paye'
                });
            }
        });
        
        localStorage.setItem('orders', JSON.stringify(simulatedOrders));
        console.log('Statistiques simulees creees: ' + simulatedOrders.length + ' commandes');
    }
    createDefaultStats();

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

    // Fonctions auth
    window.getCurrentUser = function() {
        try {
            return JSON.parse(localStorage.getItem('currentUser'));
        } catch {
            return null;
        }
    };

    window.isLoggedIn = function() {
        return getCurrentUser() !== null;
    };

    window.isAdmin = function() {
        const user = getCurrentUser();
        return user && user.role === 'admin';
    };

    window.isClient = function() {
        const user = getCurrentUser();
        return user && user.role === 'client';
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

    window.logout = function() {
        if (confirm('Etes-vous sur de vouloir vous deconnecter ?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        }
    };

    // Navigation dynamique
    function renderNavigation() {
        const navMenu = document.getElementById('navMenu');
        if (!navMenu) return;
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const user = getCurrentUser();
        const isLoggedIn = !!user;
        
        const links = [
            { href: 'index.html', icon: 'fa-home', label: 'HOME' },
            { href: 'about.html', icon: 'fa-info-circle', label: 'ABOUT' },
            { href: 'pricing.html', icon: 'fa-tags', label: 'PRICING' },
            { href: 'contact.html', icon: 'fa-envelope', label: 'CONTACT' }
        ];
        
        if (isLoggedIn) {
            if (user.role === 'admin') {
                links.push({ href: 'admin-dashboard.html', icon: 'fa-tachometer-alt', label: 'DASHBOARD' });
            } else {
                links.push({ href: 'client-dashboard.html', icon: 'fa-tachometer-alt', label: 'DASHBOARD' });
            }
        }
        
        links.push({ href: 'paynow.html', icon: 'fa-credit-card', label: 'PAY NOW' });
        
        navMenu.innerHTML = links.map(link => `
            <li>
                <a href="${link.href}" class="${currentPage === link.href ? 'active' : ''}">
                    <i class="fas ${link.icon}"></i> ${link.label}
                </a>
            </li>
        `).join('');
    }

    // Bouton connexion
    function updateLoginButton() {
        const user = getCurrentUser();
        const loginBtn = document.getElementById('loginBtn');
        if (!loginBtn) return;
        
        if (user) {
            const isAdmin = user.role === 'admin';
            const photo = user.photo || '';
            const photoHtml = photo 
                ? `<img src="${photo}" alt="Profil" class="user-avatar">` 
                : `<i class="fas fa-user-circle"></i>`;
            
            loginBtn.innerHTML = `
                ${photoHtml}
                <span class="user-badge">${isAdmin ? 'Admin' : 'Client'}</span>
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

    // Upload photos
    window.previewPhoto = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('La photo ne doit pas depasser 2MB.');
            event.target.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format non supporte. Utilisez JPG, PNG, GIF ou WEBP.');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
                window.regPhotoData = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };

    window.previewProfilePhoto = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('La photo ne doit pas depasser 2MB.');
            event.target.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format non supporte.');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('profilePhotoPreview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
                window.profilePhotoData = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };

    window.previewAdminPhoto = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('La photo ne doit pas depasser 2MB.');
            event.target.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format non supporte.');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('adminPhotoPreview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
                window.adminPhotoData = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };

    // Auth tabs
    window.switchAuthTab = function(tabId) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        document.querySelectorAll('.signin-form').forEach(form => {
            form.classList.toggle('active', form.id === tabId);
        });
        document.querySelectorAll('.form-message').forEach(msg => {
            msg.style.display = 'none';
            msg.className = 'form-message';
        });
    };

    // Helpers form
    function showFormError(el, message) {
        el.className = 'form-message error';
        el.textContent = message;
        el.style.display = 'block';
    }

    function showFormSuccess(el, message) {
        el.className = 'form-message success';
        el.textContent = message;
        el.style.display = 'block';
    }

    // Inscription
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const regNom = document.getElementById('regNom');
        const regPrenom = document.getElementById('regPrenom');
        const regEmail = document.getElementById('regEmail');
        const regTelephone = document.getElementById('regTelephone');
        
        if (regNom) {
            regNom.addEventListener('keydown', blockNumbers);
            regNom.addEventListener('input', validateNameInput);
        }
        
        if (regPrenom) {
            regPrenom.addEventListener('keydown', blockNumbers);
            regPrenom.addEventListener('input', validateNameInput);
        }
        
        if (regEmail) {
            regEmail.addEventListener('input', validateEmailInput);
            regEmail.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !isValidEmail(value)) {
                    showNotification('Veuillez entrer une adresse email valide (ex: nom@domaine.com)', 'error');
                    this.focus();
                }
            });
        }
        
        if (regTelephone) {
            regTelephone.addEventListener('keydown', blockPhoneLetters);
            regTelephone.addEventListener('input', validatePhoneInput);
            regTelephone.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !isValidPhone(value)) {
                    showNotification('Numero de telephone invalide. Utilisez uniquement des chiffres, +, espaces ou -', 'error');
                    this.focus();
                }
            });
        }
        
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

            if (!isOnlyLetters(nom)) {
                showFormError(messageEl, 'Le nom ne doit pas contenir de chiffres.');
                return;
            }

            if (!isOnlyLetters(prenom)) {
                showFormError(messageEl, 'Le prenom ne doit pas contenir de chiffres.');
                return;
            }

            if (!isValidEmail(email)) {
                showFormError(messageEl, 'Veuillez entrer une adresse email valide (ex: nom@domaine.com)');
                return;
            }

            if (telephone && !isValidPhone(telephone)) {
                showFormError(messageEl, 'Le numero de telephone ne doit contenir que des chiffres, espaces, + et -.');
                return;
            }

            if (!nom || !prenom || !email || !password || !confirm) {
                showFormError(messageEl, 'Veuillez remplir tous les champs obligatoires.');
                return;
            }

            if (password.length < 8) {
                showFormError(messageEl, 'Le mot de passe doit contenir au moins 8 caracteres.');
                return;
            }

            if (password !== confirm) {
                showFormError(messageEl, 'Les mots de passe ne correspondent pas.');
                return;
            }

            if (!terms) {
                showFormError(messageEl, 'Vous devez accepter les conditions generales.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.email === email)) {
                showFormError(messageEl, 'Cet email est deja utilise.');
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

            showFormSuccess(messageEl, 'Inscription reussie ! Redirection en cours...');
            window.regPhotoData = '';
            this.reset();
            const preview = document.getElementById('photoPreview');
            if (preview) preview.innerHTML = '<i class="fas fa-user-circle"></i>';

            setTimeout(() => {
                window.location.href = newUser.role === 'admin' ? 'admin-dashboard.html' : 'client-dashboard.html';
            }, 1500);
        });
    }

    // Connexion
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
                showFormError(messageEl, 'Veuillez remplir tous les champs.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                if (user.statut === 'bloque') {
                    showFormError(messageEl, 'Votre compte a ete bloque. Contactez l administrateur.');
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

                showFormSuccess(messageEl, 'Connexion reussie ! Redirection en cours...');
                this.reset();

                setTimeout(() => {
                    window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'client-dashboard.html';
                }, 1500);

            } else {
                showFormError(messageEl, 'Email ou mot de passe incorrect.');
            }
        });
    }

    // Reset password
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('resetEmail').value.trim();
            const messageEl = document.getElementById('resetMessage');

            messageEl.style.display = 'none';
            messageEl.className = 'form-message';

            if (!email) {
                showFormError(messageEl, 'Veuillez entrer votre adresse email.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);

            if (user) {
                const newPassword = 'pass' + Math.floor(Math.random() * 10000);
                user.password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));

                messageEl.className = 'form-message success';
                messageEl.innerHTML = 'Un lien de reinitialisation a ete envoye a <strong>' + email + '</strong>.<br><br><strong>Nouveau mot de passe temporaire :</strong> ' + newPassword;
                messageEl.style.display = 'block';

                this.reset();

                setTimeout(() => {
                    switchAuthTab('login');
                    messageEl.style.display = 'none';
                }, 5000);

            } else {
                showFormError(messageEl, 'Aucun compte trouve avec cet email.');
            }
        });
    }

    // Profil client
    window.loadProfile = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'signin.html';
            return;
        }

        const profileNom = document.getElementById('profileNom');
        const profilePrenom = document.getElementById('profilePrenom');
        const profileEmail = document.getElementById('profileEmail');
        const profileTelephone = document.getElementById('profileTelephone');

        if (profileNom) {
            profileNom.addEventListener('keydown', blockNumbers);
            profileNom.addEventListener('input', validateNameInput);
        }

        if (profilePrenom) {
            profilePrenom.addEventListener('keydown', blockNumbers);
            profilePrenom.addEventListener('input', validateNameInput);
        }

        if (profileEmail) {
            profileEmail.addEventListener('input', validateEmailInput);
            profileEmail.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !isValidEmail(value)) {
                    showNotification('Veuillez entrer une adresse email valide (ex: nom@domaine.com)', 'error');
                    this.focus();
                }
            });
        }

        if (profileTelephone) {
            profileTelephone.addEventListener('keydown', blockPhoneLetters);
            profileTelephone.addEventListener('input', validatePhoneInput);
            profileTelephone.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !isValidPhone(value)) {
                    showNotification('Numero de telephone invalide. Utilisez uniquement des chiffres, +, espaces ou -', 'error');
                    this.focus();
                }
            });
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === currentUser.id);

        if (user) {
            const nomEl = document.getElementById('profileNom');
            const prenomEl = document.getElementById('profilePrenom');
            const emailEl = document.getElementById('profileEmail');
            const telephoneEl = document.getElementById('profileTelephone');
            const adresseEl = document.getElementById('profileAdresse');
            const roleEl = document.getElementById('profileRole');
            const nameEl = document.getElementById('profileName');
            const emailDisplayEl = document.getElementById('profileEmailDisplay');
            const preview = document.getElementById('profilePhotoPreview');
            const avatar = document.getElementById('profileAvatar');

            if (nomEl) nomEl.value = user.nom;
            if (prenomEl) prenomEl.value = user.prenom;
            if (emailEl) emailEl.value = user.email;
            if (telephoneEl) telephoneEl.value = user.telephone || '';
            if (adresseEl) adresseEl.value = user.adresse || '';
            if (roleEl) roleEl.value = user.role;
            
            if (nameEl) nameEl.textContent = user.prenom + ' ' + user.nom;
            if (emailDisplayEl) emailDisplayEl.textContent = user.email;
            
            if (preview) {
                if (user.photo) {
                    preview.innerHTML = `<img src="${user.photo}" alt="Photo de profil">`;
                } else {
                    preview.innerHTML = `<i class="fas fa-user-circle"></i>`;
                }
            }
            
            if (avatar) {
                if (user.photo) {
                    avatar.innerHTML = `<img src="${user.photo}" alt="Photo de profil">`;
                } else {
                    avatar.innerHTML = `<i class="fas fa-user-circle"></i>`;
                }
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

        if (!isOnlyLetters(nom)) {
            showFormError(messageEl, 'Le nom ne doit pas contenir de chiffres.');
            return;
        }

        if (!isOnlyLetters(prenom)) {
            showFormError(messageEl, 'Le prenom ne doit pas contenir de chiffres.');
            return;
        }

        if (!isValidEmail(email)) {
            showFormError(messageEl, 'Veuillez entrer une adresse email valide (ex: nom@domaine.com)');
            return;
        }

        if (telephone && !isValidPhone(telephone)) {
            showFormError(messageEl, 'Le numero de telephone ne doit contenir que des chiffres, espaces, + et -.');
            return;
        }

        if (!nom || !prenom || !email) {
            showFormError(messageEl, 'Nom, prenom et email sont obligatoires.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex === -1) {
            showFormError(messageEl, 'Utilisateur non trouve.');
            return;
        }

        const emailExists = users.some((u, index) => u.email === email && index !== userIndex);
        if (emailExists) {
            showFormError(messageEl, 'Cet email est deja utilise par un autre compte.');
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

        showFormSuccess(messageEl, 'Profil mis a jour avec succes !');
        updateLoginButton();

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    };

    // Client services
    window.loadClientServices = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'signin.html';
            return;
        }

        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmailDisplay');
        const avatar = document.getElementById('profileAvatar');
        
        if (nameEl) nameEl.textContent = currentUser.prenom + ' ' + currentUser.nom;
        if (emailEl) emailEl.textContent = currentUser.email;
        
        if (avatar) {
            if (currentUser.photo) {
                avatar.innerHTML = `<img src="${currentUser.photo}" alt="Photo de profil">`;
            } else {
                avatar.innerHTML = `<i class="fas fa-user-circle"></i>`;
            }
        }

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const clientOrders = orders.filter(o => o.clientId === currentUser.id);
        const container = document.getElementById('clientServices');

        if (!container) return;

        if (clientOrders.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-bag" style="font-size: 48px; color: var(--text-gray);"></i>
                    <p>Vous n'avez pas encore achete de services.</p>
                    <a href="pricing.html" class="btn-primary">Decouvrir nos services</a>
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

    // Payment history
    window.loadPaymentHistory = function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'signin.html';
            return;
        }

        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmailDisplay');
        const avatar = document.getElementById('profileAvatar');
        
        if (nameEl) nameEl.textContent = currentUser.prenom + ' ' + currentUser.nom;
        if (emailEl) emailEl.textContent = currentUser.email;
        
        if (avatar) {
            if (currentUser.photo) {
                avatar.innerHTML = `<img src="${currentUser.photo}" alt="Photo de profil">`;
            } else {
                avatar.innerHTML = `<i class="fas fa-user-circle"></i>`;
            }
        }

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const clientPayments = payments.filter(p => p.clientId === currentUser.id);
        const container = document.getElementById('paymentHistory');

        if (!container) return;

        if (clientPayments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-credit-card" style="font-size: 48px; color: var(--text-gray);"></i>
                    <p>Aucun paiement enregistre.</p>
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

    // Client stats
    window.loadClientStats = function() {
        if (!protectClientPage()) return;

        const currentUser = getCurrentUser();
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const clientOrders = orders.filter(o => o.clientId === currentUser.id);
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const clientPayments = payments.filter(p => p.clientId === currentUser.id);
        const totalSpent = clientPayments.reduce((sum, p) => sum + (p.montant || 0), 0);

        const statsContainer = document.getElementById('clientStats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-shopping-bag" style="color: var(--primary);"></i>
                        <h3>${clientOrders.length}</h3>
                        <p>Services achetes</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-credit-card" style="color: #28a745;"></i>
                        <h3>${clientPayments.length}</h3>
                        <p>Paiements effectues</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-dollar-sign" style="color: #ffc107;"></i>
                        <h3>${totalSpent.toFixed(2)} $</h3>
                        <p>Total depense</p>
                    </div>
                </div>
            `;
        }
    };

    // Admin dashboard
    window.switchAdminTab = function(tabId) {
        document.querySelectorAll('.admin-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const activePanel = document.getElementById(tabId);
        if (activePanel) {
            activePanel.classList.add('active');
        }
        
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            }
        });
        
        const loaders = {
            clients: loadAdminClients,
            services: loadAdminServices,
            payments: loadAdminPayments,
            messages: loadAdminMessages,
            users: loadAdminUsers,
            settings: loadAdminSettings
        };
        if (loaders[tabId]) loaders[tabId]();
    };

    window.loadAdminSettings = function() {
        if (!protectAdminPage()) return;
        
        const currentUser = getCurrentUser();
        if (!currentUser) return;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === currentUser.id);
        
        if (user) {
            const nomEl = document.getElementById('adminNom');
            const prenomEl = document.getElementById('adminPrenom');
            const emailEl = document.getElementById('adminEmail');
            const preview = document.getElementById('adminPhotoPreview');
            
            if (nomEl) nomEl.textContent = user.nom;
            if (prenomEl) prenomEl.textContent = user.prenom;
            if (emailEl) emailEl.textContent = user.email;
            
            if (preview) {
                if (user.photo) {
                    preview.innerHTML = `<img src="${user.photo}" alt="Photo de profil">`;
                } else {
                    preview.innerHTML = `<i class="fas fa-user-circle"></i>`;
                }
            }
        }
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
            showFormError(messageEl, 'Veuillez remplir tous les champs.');
            return;
        }
        
        if (newPassword.length < 8) {
            showFormError(messageEl, 'Le nouveau mot de passe doit contenir au moins 8 caracteres.');
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            showFormError(messageEl, 'Les mots de passe ne correspondent pas.');
            return;
        }
        
        const currentUser = getCurrentUser();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
            showFormError(messageEl, 'Utilisateur non trouve.');
            return;
        }
        
        if (users[userIndex].password !== currentPassword) {
            showFormError(messageEl, 'Mot de passe actuel incorrect.');
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
        
        showFormSuccess(messageEl, 'Mot de passe modifie avec succes !');
        document.getElementById('settingsForm').reset();
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 4000);
    };

    // Admin clients
    window.loadAdminClients = function() {
        if (!protectAdminPage()) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const clients = users.filter(u => u.role === 'client');
        const container = document.getElementById('adminClients');

        if (!container) return;

        if (clients.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun client enregistre.</p>';
            return;
        }

        container.innerHTML = clients.map(client => `
            <div class="admin-client-card">
                <div class="client-info">
                    <h4>${client.prenom} ${client.nom}</h4>
                    <p><i class="fas fa-envelope"></i> ${client.email}</p>
                    <p><i class="fas fa-phone"></i> ${client.telephone || 'Non renseigne'}</p>
                    <p><i class="fas fa-calendar"></i> Inscrit le ${new Date(client.date_creation).toLocaleDateString('fr-FR')}</p>
                    <p><span class="status-badge ${client.statut}">${client.statut}</span></p>
                </div>
                <div class="client-actions">
                    <button class="btn-small" onclick="toggleUserStatus('${client.id}')">
                        <i class="fas ${client.statut === 'actif' ? 'fa-ban' : 'fa-check'}"></i>
                        ${client.statut === 'actif' ? 'Bloquer' : 'Debloquer'}
                    </button>
                    <button class="btn-small btn-promote" onclick="promoteToAdmin('${client.id}')">
                        <i class="fas fa-user-shield"></i> Promouvoir Admin
                    </button>
                </div>
            </div>
        `).join('');
    };

    // Admin services
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
        const image = document.getElementById('serviceImage').value.trim() || 'assets/images/services/default.jpg';
        const messageEl = document.getElementById('serviceMessage');

        messageEl.style.display = 'none';
        messageEl.className = 'form-message';

        if (!nom || !description || isNaN(prix) || prix <= 0) {
            showFormError(messageEl, 'Veuillez remplir tous les champs correctement.');
            return;
        }

        const iconMap = {
            'Developpement': 'fa-laptop-code',
            'Base de donnees': 'fa-database',
            'Securite': 'fa-shield-alt',
            'Consultation': 'fa-headset',
            'Infrastructure': 'fa-server'
        };

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const newService = {
            id: 'svc_' + Date.now(),
            nom: nom,
            description: description,
            prix: prix,
            categorie: categorie,
            icon: iconMap[categorie] || 'fa-cog',
            image: image,
            statut: 'actif'
        };

        services.push(newService);
        localStorage.setItem('services', JSON.stringify(services));

        showFormSuccess(messageEl, 'Service ajoute avec succes !');
        document.getElementById('serviceForm').reset();
        loadAdminServices();
        loadServices();
        loadServicesPreview();

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    };

    window.editService = function(serviceId) {
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const service = services.find(s => s.id === serviceId);
        
        if (!service) {
            alert('Service non trouve.');
            return;
        }

        document.getElementById('editServiceId').value = serviceId;
        document.getElementById('editServiceNom').value = service.nom || '';
        document.getElementById('editServiceDescription').value = service.description || '';
        document.getElementById('editServicePrix').value = service.prix || 0;
        document.getElementById('editServiceCategorie').value = service.categorie || 'Developpement';
        document.getElementById('editServiceStatut').value = service.statut || 'actif';
        document.getElementById('editServiceImage').value = service.image || '';
        
        const messageEl = document.getElementById('editServiceMessage');
        messageEl.style.display = 'none';
        messageEl.className = 'form-message';

        document.getElementById('editServiceModal').classList.add('open');
    };

    window.saveServiceEdit = function() {
        const serviceId = document.getElementById('editServiceId').value;
        const nom = document.getElementById('editServiceNom').value.trim();
        const description = document.getElementById('editServiceDescription').value.trim();
        const prix = parseFloat(document.getElementById('editServicePrix').value);
        const categorie = document.getElementById('editServiceCategorie').value;
        const statut = document.getElementById('editServiceStatut').value;
        const image = document.getElementById('editServiceImage').value.trim() || 'assets/images/services/default.jpg';

        const messageEl = document.getElementById('editServiceMessage');
        messageEl.style.display = 'none';
        messageEl.className = 'form-message';

        if (!nom || !description || isNaN(prix) || prix <= 0) {
            showFormError(messageEl, 'Veuillez remplir tous les champs correctement.');
            return;
        }

        const iconMap = {
            'Developpement': 'fa-laptop-code',
            'Base de donnees': 'fa-database',
            'Securite': 'fa-shield-alt',
            'Consultation': 'fa-headset',
            'Infrastructure': 'fa-server'
        };

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const index = services.findIndex(s => s.id === serviceId);

        if (index === -1) {
            showFormError(messageEl, 'Service non trouve.');
            return;
        }

        services[index] = {
            ...services[index],
            nom: nom,
            description: description,
            prix: prix,
            categorie: categorie,
            icon: iconMap[categorie] || 'fa-cog',
            image: image,
            statut: statut
        };

        localStorage.setItem('services', JSON.stringify(services));

        showFormSuccess(messageEl, 'Service modifie avec succes !');
        loadAdminServices();
        loadServices();
        loadServicesPreview();

        setTimeout(() => {
            document.getElementById('editServiceModal').classList.remove('open');
            messageEl.style.display = 'none';
        }, 1500);
    };

    window.deleteService = function(serviceId) {
        if (!confirm('Etes-vous sur de vouloir supprimer ce service ?')) return;

        let services = JSON.parse(localStorage.getItem('services')) || [];
        services = services.filter(s => s.id !== serviceId);
        localStorage.setItem('services', JSON.stringify(services));
        loadAdminServices();
        loadServices();
        loadServicesPreview();
        alert('Service supprime avec succes.');
    };

    // Admin payments
    window.loadAdminPayments = function() {
        if (!protectAdminPage()) return;

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const container = document.getElementById('adminPayments');

        if (!container) return;

        if (payments.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun paiement enregistre.</p>';
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

    // Admin messages
    window.loadAdminMessages = function() {
        if (!protectAdminPage()) return;

        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const container = document.getElementById('adminMessages');

        if (!container) return;

        if (contacts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun message recu.</p>';
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
                    <p><strong>Telephone:</strong> ${msg.telephone || 'Non renseigne'}</p>
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
            loadAdminStats();
        }
    };

    window.deleteMessage = function(messageId) {
        if (!confirm('Supprimer ce message ?')) return;
        
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts = contacts.filter(c => c.id !== messageId);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadAdminMessages();
        loadAdminStats();
    };

    // Admin users
    window.loadAdminUsers = function() {
        if (!protectAdminPage()) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = getCurrentUser();
        const container = document.getElementById('adminUsers');

        if (!container) return;

        if (users.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Aucun utilisateur enregistre.</p>';
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
                                <i class="fas fa-user-minus"></i> Revoker Admin
                            </button>
                            <button class="btn-small" onclick="toggleUserStatus('${user.id}')">
                                <i class="fas ${user.statut === 'actif' ? 'fa-ban' : 'fa-check'}"></i>
                                ${user.statut === 'actif' ? 'Bloquer' : 'Debloquer'}
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
                        ${user.statut === 'actif' ? 'Bloquer' : 'Debloquer'}
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
                            ${isDefaultAdmin ? '' : ''}
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

    window.toggleUserStatus = function(userId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = getCurrentUser();
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            alert('Utilisateur non trouve.');
            return;
        }

        if (users[index].role === 'admin') {
            if (!currentUser || currentUser.email !== 'kazotech@gmail.com') {
                alert('Seul l administrateur principal (kazotech@gmail.com) peut bloquer un administrateur.');
                return;
            }
        }

        if (users[index].id === currentUser?.id && currentUser?.email === 'kazotech@gmail.com') {
            alert('Vous ne pouvez pas bloquer votre propre compte.');
            return;
        }

        users[index].statut = users[index].statut === 'actif' ? 'bloque' : 'actif';
        localStorage.setItem('users', JSON.stringify(users));
        
        loadAdminClients();
        loadAdminUsers();
        loadAdminStats();
        alert(`Utilisateur ${users[index].statut === 'actif' ? 'debloque' : 'bloque'} avec succes.`);
    };

    window.promoteToAdmin = function(userId) {
        const currentUser = getCurrentUser();
        
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Acces refuse. Vous devez etre administrateur.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            alert('Utilisateur non trouve.');
            return;
        }

        if (users[index].role === 'admin') {
            alert('Cet utilisateur est deja administrateur.');
            return;
        }

        if (!confirm(`Etes-vous sur de vouloir promouvoir "${users[index].prenom} ${users[index].nom}" en administrateur ?\n\nCette action est irreversible.`)) return;

        users[index].role = 'admin';
        localStorage.setItem('users', JSON.stringify(users));

        loadAdminClients();
        loadAdminUsers();
        loadAdminStats();

        alert(`"${users[index].prenom} ${users[index].nom}" est maintenant administrateur.`);
    };

    window.revokeAdmin = function(userId) {
        const currentUser = getCurrentUser();
        
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Acces refuse. Vous devez etre administrateur.');
            return;
        }

        if (currentUser.email !== 'kazotech@gmail.com') {
            alert('Seul l administrateur principal (kazotech@gmail.com) peut revoquer les droits d un administrateur.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            alert('Utilisateur non trouve.');
            return;
        }

        if (users[index].role !== 'admin') {
            alert('Cet utilisateur n est pas administrateur.');
            return;
        }

        if (users[index].id === currentUser.id) {
            alert('Vous ne pouvez pas revoquer vos propres droits.');
            return;
        }

        if (!confirm(`Etes-vous sur de vouloir revoquer les droits d administrateur de "${users[index].prenom} ${users[index].nom}" ?\n\nCet utilisateur deviendra un client normal.`)) return;

        users[index].role = 'client';
        localStorage.setItem('users', JSON.stringify(users));

        loadAdminClients();
        loadAdminUsers();
        loadAdminStats();

        alert(`"${users[index].prenom} ${users[index].nom}" n est plus administrateur.`);
    };

    // Admin stats
    window.loadAdminStats = function() {
        if (!protectAdminPage()) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const clients = users.filter(u => u.role === 'client');
        const admins = users.filter(u => u.role === 'admin');
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const unreadMessages = contacts.filter(c => c.statut === 'non_lu');
        
        const totalEntreprises = orders.length > 0 ? orders.length : 215;

        const statsContainer = document.getElementById('adminStats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-building" style="color: var(--primary);"></i>
                        <h3>${totalEntreprises}</h3>
                        <p>Entreprises accompagnees</p>
                    </div>
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

    // Services (Pricing & Home)
    function loadServicesPreview() {
        const preview = document.getElementById('servicesPreview');
        if (!preview) return;
        
        let services = JSON.parse(localStorage.getItem('services'));
        
        if (!services || services.length === 0) {
            services = [
                {
                    id: 'svc_1',
                    nom: 'Developpement de logiciels & programmation',
                    description: 'Creation de logiciels sur mesure, applications web et mobiles adaptees a vos besoins.',
                    prix: 800,
                    categorie: 'Developpement',
                    icon: 'fa-laptop-code',
                    image: 'assets/images/services/developpement-web.jpg',
                    statut: 'actif'
                },
                {
                    id: 'svc_2',
                    nom: 'Conception & gestion de bases de donnees',
                    description: 'Conception SQL et NoSQL, optimisation des requetes, migration de donnees et maintenance performante.',
                    prix: 500,
                    categorie: 'Base de donnees',
                    icon: 'fa-database',
                    image: 'assets/images/services/base-donnees.jpg',
                    statut: 'actif'
                },
                {
                    id: 'svc_3',
                    nom: 'Securite informatique',
                    description: 'Audit de securite complet, tests d intrusion, protection des donnees et strategies de cybersecurite.',
                    prix: 700,
                    categorie: 'Securite',
                    icon: 'fa-shield-alt',
                    image: 'assets/images/services/securite-informatique.jpg',
                    statut: 'actif'
                },
                {
                    id: 'svc_4',
                    nom: 'Consultation & assistance technique',
                    description: 'Conseil en strategie IT, support technique personnalise, accompagnement et formation des equipes.',
                    prix: 600,
                    categorie: 'Consultation',
                    icon: 'fa-headset',
                    image: 'assets/images/services/consultation-it.jpg',
                    statut: 'actif'
                }
            ];
            localStorage.setItem('services', JSON.stringify(services));
        }
        
        preview.innerHTML = services
            .filter(s => s.statut === 'actif')
            .slice(0, 3)
            .map(service => `
                <div class="service-card">
                    <div class="service-image-wrapper">
                        <img src="${service.image || 'assets/images/services/default.jpg'}" alt="${service.nom}" class="service-image" />
                    </div>
                    <div class="service-icon">
                        <i class="fas ${service.icon || 'fa-cog'}"></i>
                    </div>
                    <h3>${service.nom}</h3>
                    <p>${service.description.substring(0, 100)}${service.description.length > 100 ? '...' : ''}</p>
                    <a href="pricing.html" class="service-link">En savoir plus →</a>
                </div>
            `).join('');
    }

    window.loadServices = function() {
        let services = JSON.parse(localStorage.getItem('services'));
        
        if (!services || services.length === 0) {
            services = [
                {
                    id: 'svc_1',
                    nom: 'Developpement de logiciels & programmation',
                    description: 'Creation de logiciels sur mesure, applications web et mobiles adaptees a vos besoins.',
                    prix: 800,
                    categorie: 'Developpement',
                    icon: 'fa-laptop-code',
                    image: 'assets/images/services/developpement-web.jpg',
                    statut: 'actif'
                },
                {
                    id: 'svc_2',
                    nom: 'Conception & gestion de bases de donnees',
                    description: 'Conception SQL et NoSQL, optimisation des requetes, migration de donnees et maintenance performante.',
                    prix: 500,
                    categorie: 'Base de donnees',
                    icon: 'fa-database',
                    image: 'assets/images/services/base-donnees.jpg',
                    statut: 'actif'
                },
                {
                    id: 'svc_3',
                    nom: 'Securite informatique',
                    description: 'Audit de securite complet, tests d intrusion, protection des donnees et strategies de cybersecurite.',
                    prix: 700,
                    categorie: 'Securite',
                    icon: 'fa-shield-alt',
                    image: 'assets/images/services/securite-informatique.jpg',
                    statut: 'actif'
                },
                {
                    id: 'svc_4',
                    nom: 'Consultation & assistance technique',
                    description: 'Conseil en strategie IT, support technique personnalise, accompagnement et formation des equipes.',
                    prix: 600,
                    categorie: 'Consultation',
                    icon: 'fa-headset',
                    image: 'assets/images/services/consultation-it.jpg',
                    statut: 'actif'
                }
            ];
            localStorage.setItem('services', JSON.stringify(services));
        }
        
        const grid = document.getElementById('pricingGrid');
        if (grid) {
            grid.innerHTML = services
                .filter(s => s.statut === 'actif')
                .map(service => `
                    <div class="pricing-card">
                        <div class="service-image-wrapper">
                            <img src="${service.image || 'assets/images/services/default.jpg'}" alt="${service.nom}" class="service-image" />
                        </div>
                        <div class="service-icon">
                            <i class="fas ${service.icon || 'fa-cog'}"></i>
                        </div>
                        <h3>${service.nom}</h3>
                        <p class="service-description">${service.description}</p>
                        <div class="service-price">${service.prix} $</div>
                        <button class="btn-primary btn-add-cart" onclick="addToCart('${service.id}')">
                            <i class="fas fa-cart-plus"></i> Selectionner
                        </button>
                    </div>
                `).join('');
        }
    };

    // Testimonials
    function loadTestimonials() {
        const container = document.getElementById('testimonialsGrid');
        if (!container) return;
        
        const testimonials = [
            {
                id: 1,
                nom: 'Building 4s.',
                poste: 'CEO, StartUp Digital',
                commentaire: 'Kazo_Tech a transforme notre presence en ligne. Leur equipe est professionnelle et reactive.',
                note: 5,
                photo: 'assets/images/testimonials/building-4s.jpg'
            },
            {
                id: 2,
                nom: 'Naldika Fr.',
                poste: 'Directrice IT',
                commentaire: 'Un service de securite informatique irreprochable. Nous dormons sur nos deux oreilles.',
                note: 5,
                photo: 'assets/images/testimonials/naldika-fr.jpg'
            },
            {
                id: 3,
                nom: 'Dudley Jo.',
                poste: 'Responsable SI',
                commentaire: 'La gestion de notre base de donnees a ete optimisee. Des resultats impressionnants.',
                note: 5,
                photo: 'assets/images/testimonials/dudley-jo.jpg'
            }
        ];
        
        container.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">
                        <img src="${t.photo}" alt="${t.nom}" />
                    </div>
                    <div class="testimonial-author">
                        <h4>${t.nom}</h4>
                        <span>${t.poste}</span>
                    </div>
                </div>
                <div class="testimonial-stars">
                    ${'<i class="fas fa-star"></i>'.repeat(t.note)}
                </div>
                <p class="testimonial-text">"${t.commentaire}"</p>
            </div>
        `).join('');
    }

    // Team
    function loadTeam() {
        const container = document.getElementById('teamGrid');
        if (!container) return;
        
        const team = [
            {
                nom: 'Alexandra Christine O.',
                poste: 'CEO & Fondatrice',
                description: 'Expert en strategie digitale et innovation',
                photo: 'assets/images/team/christine.jpg',
                linkedin: '#',
                twitter: '#'
            },
            {
                nom: 'Bensly JOSEPH',
                poste: 'Directeur Technique',
                description: 'Specialiste en architecture logicielle',
                photo: 'assets/images/team/bensly.jpg',
                linkedin: '#',
                twitter: '#'
            },
            {
                nom: 'Arly JEAN',
                poste: 'Responsable Securite',
                description: 'Expert en cybersecurite et protection des donnees',
                photo: 'assets/images/team/arly.jpg',
                linkedin: '#',
                twitter: '#'
            }
        ];
        
        container.innerHTML = team.map(member => `
            <div class="team-member">
                <div class="member-photo">
                    <img src="${member.photo}" alt="${member.nom}" />
                </div>
                <h3>${member.nom}</h3>
                <p class="member-title">${member.poste}</p>
                <p class="member-desc">${member.description}</p>
                <div class="member-social">
                    <a href="${member.linkedin}"><i class="fab fa-linkedin"></i></a>
                    <a href="${member.twitter}"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        `).join('');
    }

    // Contact form
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
            messageEl.textContent = 'Votre message a ete envoye avec succes !';
            messageEl.style.display = 'block';

            this.reset();

            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        });
    }

    // Panier (Cart)
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + (item.prix || 0), 0);

        const cartContainer = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const paymentItems = document.getElementById('paymentItems');
        const paymentTotal = document.getElementById('paymentTotal');

        if (cartContainer) {
            if (cart.length === 0) {
                cartContainer.innerHTML = `
                    <div class="empty-cart-animated">
                        <div class="cart-icon">🛒</div>
                        <h3>Votre panier est vide</h3>
                        <p>Explorez nos services et trouvez celui qui vous convient.</p>
                        <a href="pricing.html" class="btn-primary">
                            <i class="fas fa-shopping-bag"></i> Decouvrir nos services
                        </a>
                    </div>
                `;
            } else {
                cartContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        ${item.image ? 
                            `<img src="${item.image}" alt="${item.nom}" class="cart-item-image" />` :
                            `<div class="cart-item-image-placeholder">
                                <i class="fas fa-cog"></i>
                            </div>`
                        }
                        <div class="cart-item-info">
                            <h4>${item.nom || 'Service'}</h4>
                            ${item.description ? `<p class="cart-item-desc">${item.description}</p>` : ''}
                        </div>
                        <div class="cart-item-price">${item.prix || 0} $</div>
                        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Retirer">
                            <i class="fas fa-trash"></i>
                        </button>
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
                            <h4>${item.nom || 'Service'}</h4>
                        </div>
                        <div class="cart-item-price">${item.prix || 0} $</div>
                    </div>
                `).join('');
            }
        }

        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            if (cart.length === 0) {
                checkoutBtn.style.opacity = '0.5';
                checkoutBtn.style.pointerEvents = 'none';
                checkoutBtn.setAttribute('disabled', 'true');
            } else {
                checkoutBtn.style.opacity = '1';
                checkoutBtn.style.pointerEvents = 'auto';
                checkoutBtn.removeAttribute('disabled');
            }
        }
    }

    window.addToCart = function(serviceId) {
        const user = getCurrentUser();
        if (!user) {
            if (confirm('Vous devez etre connecte pour ajouter des services. Voulez-vous vous connecter ?')) {
                window.location.href = 'signin.html';
            }
            return;
        }

        const services = JSON.parse(localStorage.getItem('services')) || [];
        const service = services.find(s => s.id === serviceId);
        if (!service) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.find(item => item.id === serviceId)) {
            alert('Ce service est deja dans votre panier.');
            return;
        }

        cart.push({
            id: service.id,
            nom: service.nom,
            prix: service.prix,
            image: service.image || '',
            description: service.description
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        alert(`"${service.nom}" a ete ajoute a votre panier !`);
    };

    window.removeFromCart = function(serviceId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== serviceId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Paiement
    window.switchPaymentMethod = function(method) {
        document.querySelectorAll('.payment-method').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.method === method);
        });
        document.querySelectorAll('.payment-details').forEach(detail => {
            detail.classList.toggle('active', detail.id === method + 'Payment');
        });
    };

    window.processPayPal = function() { processPayment('PayPal'); };
    window.processStripe = function() { processPayment('Stripe'); };

    function processPayment(method) {
        const user = getCurrentUser();
        if (!user) {
            alert('Vous devez etre connecte pour effectuer un paiement.');
            window.location.href = 'signin.html';
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.prix || 0), 0);

        if (!confirm(`Paiement de ${total.toFixed(2)} $ via ${method} ?`)) return;

        setTimeout(() => {
            const transactionId = 'TXN-' + Date.now();

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push({
                id: 'order_' + Date.now(),
                clientId: user.id,
                clientNom: `${user.prenom} ${user.nom}`,
                items: cart,
                total: total,
                date: new Date().toISOString(),
                statut: 'paye',
                method: method
            });
            localStorage.setItem('orders', JSON.stringify(orders));

            const payments = JSON.parse(localStorage.getItem('payments')) || [];
            cart.forEach(item => {
                payments.push({
                    id: 'pay_' + Date.now(),
                    clientId: user.id,
                    clientNom: `${user.prenom} ${user.nom}`,
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
        }, 2000);
    }

    // Modal functions
    window.closeModal = function() {
        document.getElementById('confirmationModal')?.classList.remove('open');
        document.getElementById('editServiceModal')?.classList.remove('open');
    };

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('open');
        }
    });

    // Diagramme (Chart)
    function loadServiceChart() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        if (orders.length === 0) {
            createDefaultStats();
        }
        
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = function() {
                createChart();
            };
            document.head.appendChild(script);
        } else {
            createChart();
        }
    }

    function createChart() {
        const canvas = document.getElementById('serviceChart');
        if (!canvas) return;
        
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const services = JSON.parse(localStorage.getItem('services')) || [];
        
        const serviceCount = {};
        const serviceColors = {};
        
        const colorMap = {
            'Developpement': '#2183e9',
            'Base de donnees': '#28a745',
            'Securite': '#dc3545',
            'Consultation': '#ffc107',
            'Infrastructure': '#6f42c1'
        };
        
        services.forEach(s => {
            serviceCount[s.nom] = 0;
            serviceColors[s.nom] = colorMap[s.categorie] || '#6c757d';
        });
        
        orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const name = item.nom || item.service || 'Service';
                    if (serviceCount.hasOwnProperty(name)) {
                        serviceCount[name]++;
                    } else {
                        serviceCount[name] = 1;
                        serviceColors[name] = '#6c757d';
                    }
                });
            }
        });
        
        const hasData = Object.values(serviceCount).some(val => val > 0);
        if (!hasData) {
            createDefaultStats();
            setTimeout(createChart, 100);
            return;
        }
        
        const labels = Object.keys(serviceCount);
        const data = Object.values(serviceCount);
        const backgroundColors = labels.map(label => serviceColors[label] || '#6c757d');
        const total = data.reduce((sum, val) => sum + val, 0);
        
        const totalElement = document.getElementById('chartTotal');
        if (totalElement) totalElement.textContent = total;
        
        if (total === 0) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#6c757d';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Aucune donnee', canvas.width / 2, canvas.height / 2);
            const legendContainer = document.getElementById('chartLegend');
            if (legendContainer) {
                legendContainer.innerHTML = `
                    <div style="text-align:center;color:var(--text-gray);padding:20px;">
                        <i class="fas fa-info-circle"></i> Aucun service commande pour le moment
                    </div>
                `;
            }
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        if (window.serviceChartInstance) {
            window.serviceChartInstance.destroy();
        }
        
        window.serviceChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1500
                }
            }
        });
        
        const legendContainer = document.getElementById('chartLegend');
        if (legendContainer) {
            legendContainer.innerHTML = labels.map((label, index) => {
                const value = data[index];
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                const color = backgroundColors[index];
                return `
                    <div class="legend-item" onclick="filterByService('${label}')">
                        <span class="legend-color" style="background: ${color};"></span>
                        <span class="legend-label">${label}</span>
                        <span class="legend-value">${value}</span>
                        <span class="legend-percent">${percentage}%</span>
                    </div>
                `;
            }).join('');
        }
    }

    function filterByService(serviceName) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const clients = [];
        
        orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                const found = order.items.some(item => 
                    (item.nom || item.service) === serviceName
                );
                if (found) {
                    clients.push(order.clientNom || 'Client');
                }
            }
        });
        
        if (clients.length > 0) {
            alert(`Clients ayant pris "${serviceName}":\n\n${clients.join('\n')}`);
        } else {
            alert(`Aucun client n a pris "${serviceName}" pour le moment.`);
        }
    }

    // Initialisation
    renderNavigation();
    updateLoginButton();
    loadServicesPreview();
    loadServices();
    loadTestimonials();
    loadTeam();
    updateCartDisplay();

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchAuthTab(this.dataset.tab);
        });
    });

    if (document.getElementById('adminStats')) {
        protectAdminPage();
        loadAdminStats();
        loadAdminClients();
        loadAdminServices();
        loadAdminPayments();
        loadAdminMessages();
        loadAdminUsers();
        loadAdminSettings();
        setTimeout(loadServiceChart, 800);
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

    document.getElementById('checkoutBtn')?.addEventListener('click', function(e) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            e.preventDefault();
            alert('Vous devez etre connecte pour proceder au paiement.');
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

});
