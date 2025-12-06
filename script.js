document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       0. Force Scroll to Top
       ========================================= */
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    /* =========================================
       1. Modal Logic & Dummy Data (Crucial)
       ========================================= */
    
    // Dummy Data for Case Studies
    const caseStudies = {
        1: {
            title: "E-Commerce Fashion Scale-Up",
            problem: "This fashion brand was struggling with a high CPA ($45) and stagnant sales despite increasing their ad budget. Their existing campaigns were too broad and lacked audience segmentation.",
            solution: "We restructured the account to focus on high-margin product categories using Performance Max (PMax) campaigns with specific audience signals. We also implemented dynamic remarketing to capture cart abandoners.",
            results: "<span class='results-text'>+400% ROAS</span> within 3 months. CPA dropped to <span class='results-text'>$22</span>. Monthly revenue grew by <span class='results-text'>150%</span>."
        },
        2: {
            title: "SaaS Lead Generation",
            problem: "A B2B software company was generating plenty of clicks but very few qualified leads. Their Cost Per Lead (CPL) was unsustainable at over $150.",
            solution: "We shifted the strategy from broad keywords to high-intent 'solution' and 'competitor' terms. We also optimized the landing page copy to address specific pain points and added a pre-qualification step in the lead form.",
            results: "Lead quality increased significantly. CPL decreased by <span class='results-text'>-30%</span>. The sales team reported a <span class='results-text'>2x higher</span> close rate."
        },
        3: {
            title: "Local Service Dominance",
            problem: "A multi-location dental clinic was losing market share to competitors. They had low visibility in local search results and were missing out on phone calls.",
            solution: "We launched hyper-local Search campaigns targeting 'near me' keywords and optimized their Google Business Profile. We also utilized call-only ads during business hours.",
            results: "Phone calls increased by <span class='results-text'>+250%</span> in the first month. They achieved the <span class='results-text'>#1 ad position</span> for their top 5 service keywords."
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalResults = document.getElementById('modal-results');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    // Function to open modal
    const openModal = (id) => {
        const data = caseStudies[id];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalProblem.textContent = data.problem;
        modalSolution.textContent = data.solution;
        modalResults.innerHTML = data.results; // Changed to innerHTML to render spans

        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Event Listeners for Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });

    // Event Listeners for Closing
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });


    /* =========================================
       2. Scroll Reveal Animation
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
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================
       3. Mobile Menu Toggle
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a'); // Select all nav links

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // Toggle body scroll
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a nav link is clicked (for single-page navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            });
        });
    }
});