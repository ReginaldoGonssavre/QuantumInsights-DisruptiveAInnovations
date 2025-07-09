const translations = {
    "pt-BR": {
        "app_title": "Quantum Insights - Consultoria e Conteúdo em Tecnologia Quântica",
        "nav_services": "Serviços",
        "nav_about": "Sobre",
        "nav_contact": "Contato",
        "nav_login": "Login",
        "nav_register": "Registrar",
        "nav_dashboard": "Dashboard",
        "nav_logout": "Sair",
        "hero_title": "Desvende o Potencial Quântico para o Seu Negócio",
        "hero_subtitle": "Consultoria e Conteúdo Educacional em Tecnologia Quântica para Empresas em Campinas e Região.",
        "hero_cta": "Fale Conosco",
        "hero_nav_feature1": "IA Quântica",
        "hero_nav_feature2": "Otimização",
        "hero_nav_feature3": "Criptografia",
        "hero_nav_solution1": "Soluções Empresariais",
        "hero_nav_solution2": "Pesquisa & Desenvolvimento",
        "hero_nav_solution3": "Treinamento Personalizado",
        "login_title": "Login",
        "login_button": "Entrar",
        "login_no_account": "Não tem uma conta?",
        "login_register_link": "Registre-se aqui",
        "register_title": "Registrar",
        "register_button": "Registrar",
        "register_has_account": "Já tem uma conta?",
        "register_login_link": "Faça login aqui",
        "dashboard_title": "Seu Dashboard",
        "dashboard_welcome": "Bem-vindo(a), ",
        "dashboard_license": "Seu tipo de licença: ",
        "dashboard_free_content_btn": "Ver Conteúdo Gratuito",
        "dashboard_premium_content_btn": "Ver Conteúdo Premium",
        "dashboard_upgrade_btn": "Atualizar para Premium",
        "services_title": "Nossos Serviços",
        "ebook_title": "E-book Exclusivo",
        "ebook_description": "\"Introdução à Computação Quântica para Otimização Logística\"",
        "minicourse_title": "Mini-curso Online",
        "minicourse_description": "\"Quantum para Startups: Como Aplicar na Prática\"",
        "consulting_title": "Consultoria Rápida",
        "consulting_description": "Análise de 1 hora para identificar oportunidades quânticas em seus processos.",
        "learn_more": "Saiba Mais",
        "schedule_now": "Agende Agora",
        "about_title": "Sobre a Quantum Insights",
        "about_paragraph1": "Somos uma iniciativa focada em democratizar o acesso à tecnologia quântica para empresas, especialmente PMEs. Acreditamos que a computação quântica e a inteligência artificial são ferramentas poderosas para otimização, segurança e inovação em diversos setores. Com base em Campinas, conectamos o conhecimento acadêmico com as necessidades do mercado, oferecendo soluções práticas e acessíveis.",
        "about_paragraph2": "Nosso objetivo é capacitar sua equipe e seu negócio a explorar as vantagens competitivas que a era quântica oferece.",
        "contact_title": "Entre em Contato",
        "contact_subtitle": "Interessado em saber como a tecnologia quântica pode transformar seu negócio? Preencha o formulário abaixo ou entre em contato diretamente.",
        "contact_name_placeholder": "Seu Nome",
        "contact_email_placeholder": "Seu E-mail",
        "contact_message_placeholder": "Sua Mensagem",
        "contact_button": "Enviar Mensagem",
        "footer_copyright": "© 2023 Quantum Insights. Todos os direitos reservados."
    },
    "en-US": {
        "app_title": "Quantum Insights - Quantum Technology Consulting & Content",
        "nav_services": "Services",
        "nav_about": "About",
        "nav_contact": "Contact",
        "nav_login": "Login",
        "nav_register": "Register",
        "nav_dashboard": "Dashboard",
        "nav_logout": "Logout",
        "hero_title": "Unlock the Quantum Potential for Your Business",
        "hero_subtitle": "Quantum Technology Consulting and Educational Content for Businesses in Campinas and Region.",
        "hero_cta": "Contact Us",
        "hero_nav_feature1": "Quantum AI",
        "hero_nav_feature2": "Optimization",
        "hero_nav_feature3": "Cryptography",
        "hero_nav_solution1": "Enterprise Solutions",
        "hero_nav_solution2": "Research & Development",
        "hero_nav_solution3": "Custom Training",
        "login_title": "Login",
        "login_button": "Login",
        "login_no_account": "Don't have an account?",
        "login_register_link": "Register here",
        "register_title": "Register",
        "register_button": "Register",
        "register_has_account": "Already have an account?",
        "register_login_link": "Login here",
        "dashboard_title": "Your Dashboard",
        "dashboard_welcome": "Welcome, ",
        "dashboard_license": "Your license type: ",
        "dashboard_free_content_btn": "View Free Content",
        "dashboard_premium_content_btn": "View Premium Content",
        "dashboard_upgrade_btn": "Upgrade to Premium",
        "services_title": "Our Services",
        "ebook_title": "Exclusive E-book",
        "ebook_description": "\"Introduction to Quantum Computing for Logistics Optimization\"",
        "minicourse_title": "Online Mini-course",
        "minicourse_description": "\"Quantum for Startups: How to Apply in Practice\"",
        "consulting_title": "Quick Consulting",
        "consulting_description": "1-hour analysis to identify quantum opportunities in your processes.",
        "learn_more": "Learn More",
        "schedule_now": "Schedule Now",
        "about_title": "About Quantum Insights",
        "about_paragraph1": "We are an initiative focused on democratizing access to quantum technology for businesses, especially SMEs. We believe that quantum computing and artificial intelligence are powerful tools for optimization, security, and innovation across various sectors. Based in Campinas, we connect academic knowledge with market needs, offering practical and accessible solutions.",
        "about_paragraph2": "Our goal is to empower your team and your business to explore the competitive advantages that the quantum era offers.",
        "contact_title": "Contact Us",
        "contact_subtitle": "Interested in learning how quantum technology can transform your business? Fill out the form below or contact us directly.",
        "contact_name_placeholder": "Your Name",
        "contact_email_placeholder": "Your Email",
        "contact_message_placeholder": "Your Message",
        "contact_button": "Send Message",
        "footer_copyright": "© 2023 Quantum Insights. All rights reserved."
    }
};

let currentLanguage = localStorage.getItem('language') || 'pt-BR';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });

    // Update language select display
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        Array.from(langSelect.options).forEach(option => {
            if (option.value === currentLanguage) {
                option.textContent = translations[currentLanguage][option.value === 'pt-BR' ? 'language_portuguese' : 'language_english'] || option.textContent;
            } else {
                option.textContent = translations[currentLanguage][option.value === 'pt-BR' ? 'language_portuguese' : 'language_english'] || option.textContent;
            }
        });
    }
}

// Authentication and UI Logic
const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your backend URL

async function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const messageDiv = document.getElementById('auth-message');

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = 'Registro bem-sucedido! Faça login agora.';
            messageDiv.style.color = 'green';
            showSection('auth-forms');
            document.getElementById('login-form-container').style.display = 'block';
            document.getElementById('register-form-container').style.display = 'none';
        } else {
            messageDiv.textContent = data.detail || 'Erro no registro.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
        messageDiv.textContent = 'Erro de conexão. Tente novamente.';
        messageDiv.style.color = 'red';
    }
    messageDiv.style.display = 'block';
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const messageDiv = document.getElementById('auth-message');

    try {
        const form_data = new URLSearchParams();
        form_data.append('username', email);
        form_data.append('password', password);

        const response = await fetch(`${API_BASE_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form_data.toString(),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('access_token', data.access_token);
            updateAuthUI();
            showSection('dashboard');
            messageDiv.style.display = 'none';
        } else {
            messageDiv.textContent = data.detail || 'Erro no login.';
            messageDiv.style.color = 'red';
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        messageDiv.textContent = 'Erro de conexão. Tente novamente.';
        messageDiv.style.color = 'red';
        messageDiv.style.display = 'block';
    }
}

function handleLogout() {
    localStorage.removeItem('access_token');
    updateAuthUI();
    showSection('hero'); // Go back to hero section after logout
}

async function fetchUserInfo() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-license').textContent = user.license_type;
        } else {
            console.error('Failed to fetch user info');
            handleLogout(); // Log out if token is invalid
        }
    }
    catch (error) {
        console.error('Error fetching user info:', error);
    }
}

async function getProtectedContent(endpoint, displayElementId) {
    const token = localStorage.getItem('access_token');
    const contentDisplay = document.getElementById(displayElementId);
    if (!token) {
        contentDisplay.textContent = 'Por favor, faça login para acessar este conteúdo.';
        contentDisplay.style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            contentDisplay.textContent = data.message;
            contentDisplay.style.color = 'green';
        } else {
            contentDisplay.textContent = data.detail || 'Erro ao carregar conteúdo.';
            contentDisplay.style.color = 'red';
        }
    } catch (error) {
        console.error(`Erro ao obter ${endpoint} content:`, error);
        contentDisplay.textContent = 'Erro de conexão ao tentar obter conteúdo.';
        contentDisplay.style.color = 'red';
    }
}

async function handleUpgradeLicense() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/upgrade_license`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            fetchUserInfo(); // Refresh user info after upgrade
        } else {
            alert(data.detail || 'Erro ao atualizar licença.');
        }
    } catch (error) {
        console.error('Erro ao atualizar licença:', error);
        alert('Erro de conexão ao tentar atualizar licença.');
    }
}

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // Special handling for auth forms
    if (sectionId === 'auth-forms') {
        const hash = window.location.hash;
        if (hash === '#register') {
            document.getElementById('login-form-container').style.display = 'none';
            document.getElementById('register-form-container').style.display = 'block';
        } else {
            document.getElementById('login-form-container').style.display = 'block';
            document.getElementById('register-form-container').style.display = 'none';
        }
    }
}

function updateAuthUI() {
    const token = localStorage.getItem('access_token');
    if (token) {
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('register-link').style.display = 'none';
        document.getElementById('dashboard-link').style.display = 'inline';
        document.getElementById('logout-link').style.display = 'inline';
        fetchUserInfo();
    } else {
        document.getElementById('login-link').style.display = 'inline';
        document.getElementById('register-link').style.display = 'inline';
        document.getElementById('dashboard-link').style.display = 'none';
        document.getElementById('logout-link').style.display = 'none';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    updateAuthUI();

    // Set initial language select value
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = currentLanguage;
        langSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // Navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = event.target.getAttribute('href').substring(1);
            if (targetId && targetId !== 'login' && targetId !== 'register' && targetId !== 'dashboard' && targetId !== 'logout') {
                showSection(targetId);
            } else if (targetId === 'login' || targetId === 'register') {
                showSection('auth-forms');
            } else if (targetId === 'dashboard') {
                showSection('dashboard');
            } else if (targetId === 'logout') {
                handleLogout();
            }
        });
    });

    // Auth form switches
    document.getElementById('switch-to-register').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('login-form-container').style.display = 'none';
        document.getElementById('register-form-container').style.display = 'block';
        document.getElementById('auth-message').style.display = 'none';
    });

    document.getElementById('switch-to-login').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('register-form-container').style.display = 'none';
        document.getElementById('login-form-container').style.display = 'block';
        document.getElementById('auth-message').style.display = 'none';
    });

    // Form submissions
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Dashboard buttons
    document.getElementById('get-free-content').addEventListener('click', () => getProtectedContent('/content/free', 'content-display'));
    document.getElementById('get-premium-content').addEventListener('click', () => getProtectedContent('/content/premium', 'content-display'));
    document.getElementById('upgrade-license').addEventListener('click', handleUpgradeLicense);

    // Initial section display based on hash or default
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('hero');
    }
});