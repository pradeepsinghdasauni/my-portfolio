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
       2. Modal Logic & Data (UPDATED CASE STUDIES)
       ========================================= */
    
    const caseStudies = {
        1: {
            title: "E-Commerce Scale-Up",
            subtitle: "Fashion & Retail",
            challenge: "A boutique fashion brand was stagnant with a ROAS ceiling of 2.5x. Despite increasing budget, they couldn't scale profitable revenue and suffered from a high CPA of $45.",
            strategy: "Restructured the account to leverage Performance Max (PMax) with asset group segmentation based on product margins. Implemented dynamic remarketing and utilized customer match lists to exclude past purchasers from top-of-funnel ads.",
            results: "Achieved a <span class='results-text'>400% ROAS</span> within 90 days. Reduced CPA to <span class='results-text'>$22</span> while scaling monthly revenue by <span class='results-text'>150%</span>."
        },
        2: {
            title: "SaaS Lead Gen",
            subtitle: "B2B Technology",
            challenge: "A B2B SaaS company was receiving high traffic but low-quality leads. The sales team was overwhelmed with unqualified prospects, driving up the actual Cost Per Qualified Lead (CPQL).",
            strategy: "Shifted from 'Maximize Clicks' to 'Maximize Conversions' with Target CPA. Crucially, I implemented Offline Conversion Import (OCT) to feed 'Sales Qualified Lead' data back into Google Ads, optimizing for deal quality rather than just volume.",
            results: "Lead volume stabilized, but quality surged. Cost Per Qualified Lead dropped by <span class='results-text'>30%</span> and the sales close rate <span class='results-text'>doubled</span> in Q3."
        },
        3: {
            title: "Technical Account Rescue",
            subtitle: "Policy & Tracking",
            challenge: "A high-value advertiser faced imminent suspension due to 'Circumventing Systems' policy flags and suffered from broken GTM tracking that underreported conversions by 40%.",
            strategy: "Conducted a forensic audit of the site code and account history. Debugged the GTM container to fire distinct conversion events and drafted a precise, technical appeal to Google Policy teams citing specific rectifications.",
            results: "Account reinstated within <span class='results-text'>48 hours</span>. Data discrepancy reduced to <span class='results-text'>&lt;5%</span>, restoring client confidence and accurate attribution."
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
       3. Typing Animation for Hero Title
       ========================================= */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent = originalText.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
                heroTitle.innerHTML = originalText.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                heroTitle.textContent = originalText;
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    /* =========================================
       4. Enhanced Scroll Reveal Animation with Stagger
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // Stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       5. Parallax Effect for Hero Image
       ========================================= */
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }


    /* =========================================
       7. Animated Skill Tags on Hover
       ========================================= */
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    /* =========================================
       8. Enhanced Timeline Animation
       ========================================= */
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        timelineObserver.observe(item);
    });

    /* =========================================
       9. Smooth Header Scroll Effect
       ========================================= */
    let lastScroll = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });

    /* =========================================
       10. Animated Project Cards with 3D Effect
       ========================================= */
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });


    /* =========================================
       11. Mobile Menu Toggle
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

    /* =========================================
       12. Creative Features: Scroll Progress & Custom Cursor
       ========================================= */
    
    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    });

    // Custom Cursor
    const customCursor = document.getElementById('custom-cursor');
    
    // Check if device supports hover (basically if it's not touch)
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            if (customCursor) {
                customCursor.style.left = e.clientX + 'px';
                customCursor.style.top = e.clientY + 'px';
            }
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .cert-card, .skill-tag');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (customCursor) customCursor.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                if (customCursor) customCursor.classList.remove('hover-active');
            });
        });
    }

    /* =========================================
       13. Floating Happy Emoji on Hire Me Button
       ========================================= */
    const hireMeBtn = document.querySelector('.hire-me-btn');
    const emojis = ['😊', '😄', '😃', '🎉', '✨', '🚀'];
    
    if (hireMeBtn) {
        let emojiTimeout;
        
        hireMeBtn.addEventListener('mouseenter', () => {
            // Clear any existing timeout
            clearTimeout(emojiTimeout);
            
            // Create multiple emojis
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createFloatingEmoji(hireMeBtn, emojis[Math.floor(Math.random() * emojis.length)]);
                }, i * 200);
            }
        });
        
        hireMeBtn.addEventListener('mouseleave', () => {
            clearTimeout(emojiTimeout);
        });
    }
    
    function createFloatingEmoji(button, emoji) {
        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiElement.className = 'floating-emoji';
        
        const buttonRect = button.getBoundingClientRect();
        const randomX = (Math.random() - 0.5) * 60;
        
        emojiElement.style.position = 'fixed';
        emojiElement.style.fontSize = '2rem';
        emojiElement.style.pointerEvents = 'none';
        emojiElement.style.zIndex = '10000';
        emojiElement.style.left = buttonRect.left + buttonRect.width / 2 + randomX + 'px';
        emojiElement.style.top = buttonRect.top + buttonRect.height / 2 + 'px';
        emojiElement.style.transform = 'translate(-50%, -50%)';
        emojiElement.style.opacity = '0';
        
        document.body.appendChild(emojiElement);
        
        // Trigger animation
        requestAnimationFrame(() => {
            emojiElement.style.animation = `floatEmoji 1.5s ease-out forwards`;
        });
        
        // Remove element after animation
        setTimeout(() => {
            if (emojiElement.parentNode) {
                emojiElement.remove();
            }
        }, 1500);
    }
});