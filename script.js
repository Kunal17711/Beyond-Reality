document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    const hoverables = document.querySelectorAll('a, button, .note-card, .framework-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    });

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Live Data Feed Logic
    const liveFeed = document.getElementById('live-feed');
    if (liveFeed) {
        const dataStrings = [
            "Signal detected: Sector 7-Alpha",
            "Recalculating CMB B-mode...",
            "Photon decay anomaly detected",
            "Brane proximity: 0.004 Mpc",
            "Resonance shift: +12.4 Hz",
            "Sector 12: Silent",
            "Dark flow acceleration: +0.2%",
            "Entropy gradient stabilizing",
            "New horizon coordinate: 42.0",
            "Baryon density: Stable"
        ];

        setInterval(() => {
            const entry = document.createElement('div');
            entry.className = 'feed-entry';
            entry.textContent = `> ${dataStrings[Math.floor(Math.random() * dataStrings.length)]}`;
            liveFeed.prepend(entry);
            
            if (liveFeed.children.length > 8) {
                liveFeed.removeChild(liveFeed.lastChild);
            }
        }, 3000);
    }

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate metrics bars
                if (entry.target.classList.contains('metrics-container')) {
                    const bars = entry.target.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-target');
                        bar.style.width = targetWidth;
                    });
                }
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-text');

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Hero Parallax Effect
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0005})`;
        }
        
        // Navbar scroll effect
        const nav = document.querySelector('#main-nav');
        if (scrolled > 50) {
            nav.style.padding = '0.8rem 0';
            nav.style.backgroundColor = 'var(--glass)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.padding = '1.5rem 0';
            nav.style.backgroundColor = 'transparent';
            nav.style.backdropFilter = 'none';
        }
    });

    // Form submission handling
    const form = document.getElementById('exploration-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const input = form.querySelector('input');
            
            button.textContent = 'Mission Joined';
            button.style.backgroundColor = '#34c759'; // Apple green
            input.value = '';
            input.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for joining the exploration. We will reach out when the next horizon is sighted.');
            }, 500);
        });
    }

    // Add styles for the reveal animation in JS to keep CSS clean
    const style = document.createElement('style');
    style.textContent = `
        .reveal, .reveal-text {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active, .reveal-text.active {
            opacity: 1;
            transform: translateY(0);
        }
        .stat-card.reveal { transition-delay: 0.2s; }
        .note-card.reveal:nth-child(2) { transition-delay: 0.2s; }
        .note-card.reveal:nth-child(3) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
});

// ============================================================
// MOBILE PANEL TOGGLE — Shows/Hides data cards on simulators
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const uiOverlay = document.getElementById('ui-overlay');
    
    if (uiOverlay && window.innerWidth <= 768) {
        // Create the floating toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'panel-toggle-btn';
        toggleBtn.innerHTML = '📊';
        toggleBtn.title = 'Toggle Info Panel';
        
        // Add styles dynamically
        const btnStyle = document.createElement('style');
        btnStyle.textContent = `
            #panel-toggle-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                width: 55px;
                height: 55px;
                border-radius: 50%;
                background: rgba(0,0,0,0.8);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 5px 20px rgba(0,0,0,0.5);
                transition: all 0.3s ease;
            }
            #panel-toggle-btn.active {
                background: rgba(94, 92, 230, 0.9);
                transform: scale(1.1);
            }
            #ui-overlay {
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
            }
            #ui-overlay.hidden {
                transform: translateX(-120%);
                opacity: 0;
                pointer-events: none;
            }
        `;
        document.head.appendChild(btnStyle);
        document.body.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            uiOverlay.classList.toggle('hidden');
            toggleBtn.classList.toggle('active');
            toggleBtn.innerHTML = uiOverlay.classList.contains('hidden') ? '🔭' : '📊';
        });
    }
});
