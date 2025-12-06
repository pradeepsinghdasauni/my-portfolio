document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       0. Theme Toggle Logic (Dark Default)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Icons
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    // Check Local Storage (Default is Dark)
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = moonIcon; // Show Moon to switch back to Dark
            themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
    } else {
        // Default Dark
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = sunIcon; // Show Sun to switch to Light
            themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = moonIcon;
                themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = sunIcon;
                themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
            }
        });
    }

    /* =========================================
       1. Force Scroll to Top
       ========================================= */
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    /* =========================================
       2. Modal Logic & Data
       ========================================= */
    
    const caseStudies = {
        1: {
            title: "E-Commerce Scale-Up",
            subtitle: "Fashion & Retail",
            challenge: "A boutique fashion brand was struggling to scale spend profitably. Their CPA was high ($45) and sales volume was plateauing despite budget increases.",
            strategy: "Restructured the account to separate high-margin SKUs into dedicated Performance Max campaigns. Implemented dynamic remarketing and utilized customer match lists to exclude past purchasers from top-of-funnel ads.",
            results: "Achieved a <span class='results-text'>400% ROAS</span> within 90 days. Reduced CPA to <span class='results-text'>$22</span> while scaling monthly revenue by <span class='results-text'>150%</span>."
        },
        2: {
            title: "SaaS Lead Gen",
            subtitle: "B2B Technology",
            challenge: "A B2B SaaS company was generating high traffic but low-quality leads. The sales team was overwhelmed with unqualified prospects, driving up the Cost Per Qualified Lead.",
            strategy: "Shifted keyword strategy to focus on high-intent 'competitor' and 'solution' terms. Implemented offline conversion tracking (OCT) to optimize for 'Sales Qualified Leads' rather than just form fills.",
            results: "Lead volume remained steady, but lead quality improved drastically. Cost Per Qualified Lead dropped by <span class='results-text'>30%</span>, and the sales close rate <span class='results-text'>doubled</span>."
        },
        3: {
            title: "Local Dominance",
            subtitle: "Healthcare",
            challenge: "A multi-location dental practice was losing market share to aggressive local competitors. They had poor visibility in the 'Local Pack' and low call volumes.",
            strategy: "Launched hyper-local Search campaigns targeting 'near me' intent. Heavily optimized Google Business Profiles and ran Call-Only ads during peak business hours.",
            results: "Phone inquiries increased by <span class='results-text'>250%</span> in the first month. Secured the <span class='results-text'>#1 ad position</span> for core service keywords in 3 out of 4 locations."
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    
    const modalChallenge = document.getElementById('modal-challenge');
    const modalStrategy = document.getElementById('modal-strategy');
    const modalResults = document.getElementById('modal-results');
    
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    // Function to open modal
    const openModal = (id) => {
        const data = caseStudies[id];
        if (!data) return;

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
        
        if (modalChallenge) modalChallenge.textContent = data.challenge;
        if (modalStrategy) modalStrategy.textContent = data.strategy;
        if (modalResults) modalResults.innerHTML = data.results;

        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Event Listeners for Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });


    /* =========================================
       3. Scroll Reveal Animation
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================
       4. Mobile Menu Toggle
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});