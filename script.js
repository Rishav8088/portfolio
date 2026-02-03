// ============================================
// Portfolio — Interactive / Creative
// ============================================

(function () {
    'use strict';

    const NAV_OFFSET = 80;

    // ============================================
    // Hero typing effect
    // ============================================

    const heroCommand1 = document.getElementById('heroCommand1');
    const heroOutput1 = document.getElementById('heroOutput1');
    const heroCommand2 = document.getElementById('heroCommand2');
    const heroOutput2 = document.getElementById('heroOutput2');
    const heroCursor = document.getElementById('heroCursor');
    const heroCursor2 = document.getElementById('heroCursor2');

    const COMMANDS = [
        { cmd: 'whoami', out: 'Rishabh Shrestha' },
        { cmd: 'role', out: 'Android · Flutter · Spring Boot Developer' }
    ];
    const TYPE_SPEED = 70;
    const PAUSE_AFTER_CMD = 400;
    const PAUSE_AFTER_OUT = 600;
    const LOOP_DELAY = 2500;

    function typeChar(el, char) {
        if (!el) return;
        el.textContent += char;
    }
    function typeString(el, str, speed) {
        return new Promise(resolve => {
            let i = 0;
            const tick = () => {
                if (i < str.length) {
                    el.textContent += str[i++];
                    setTimeout(tick, speed);
                } else resolve();
            };
            tick();
        });
    }
    function clearEl(el) {
        if (el) el.textContent = '';
    }

    function runTypingSequence() {
        if (!heroCommand1 || !heroOutput1 || !heroCommand2 || !heroOutput2) return;
        clearEl(heroCommand1);
        clearEl(heroOutput1);
        clearEl(heroCommand2);
        clearEl(heroOutput2);
        if (heroCursor) heroCursor.style.opacity = '1';
        if (heroCursor2) heroCursor2.style.opacity = '0';

        (async function run() {
            while (true) {
                await typeString(heroCommand1, COMMANDS[0].cmd, TYPE_SPEED);
                if (heroCursor) heroCursor.style.opacity = '0';
                await new Promise(r => setTimeout(r, PAUSE_AFTER_CMD));
                await typeString(heroOutput1, COMMANDS[0].out, TYPE_SPEED - 20);
                await new Promise(r => setTimeout(r, PAUSE_AFTER_OUT));
                if (heroCursor2) heroCursor2.style.opacity = '1';
                await typeString(heroCommand2, COMMANDS[1].cmd, TYPE_SPEED);
                if (heroCursor2) heroCursor2.style.opacity = '0';
                await new Promise(r => setTimeout(r, PAUSE_AFTER_CMD));
                await typeString(heroOutput2, COMMANDS[1].out, TYPE_SPEED - 20);
                await new Promise(r => setTimeout(r, LOOP_DELAY));
                clearEl(heroCommand1);
                clearEl(heroOutput1);
                clearEl(heroCommand2);
                clearEl(heroOutput2);
                if (heroCursor) heroCursor.style.opacity = '1';
            }
        })();
    }
    if (heroCommand1) runTypingSequence();

    // ============================================
    // Scroll progress bar
    // ============================================

    const scrollProgressBar = document.getElementById('scrollProgressBar');
    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? (window.pageYOffset / h) * 100 : 0;
        scrollProgressBar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    // ============================================
    // Command palette (? key)
    // ============================================

    const commandPalette = document.getElementById('commandPalette');
    const commandPaletteList = document.getElementById('commandPaletteList');
    const commandPaletteBackdrop = document.getElementById('commandPaletteBackdrop');
    const shortcutHint = document.getElementById('shortcutHint');

    const PALETTE_ITEMS = [
        { href: '#hero', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#architecture', label: 'Architecture' },
        { href: '#experience', label: 'Experience' },
        { href: '#education', label: 'Education' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' }
    ];

    if (commandPaletteList) {
        PALETTE_ITEMS.forEach((item, i) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            a.dataset.index = String(i);
            a.addEventListener('click', (e) => {
                e.preventDefault();
                closeCommandPalette();
                const target = document.querySelector(item.href);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
            li.appendChild(a);
            commandPaletteList.appendChild(li);
        });
    }

    let paletteSelected = 0;
    function openCommandPalette() {
        if (!commandPalette) return;
        commandPalette.classList.add('open');
        commandPalette.setAttribute('aria-hidden', 'false');
        paletteSelected = 0;
        updatePaletteSelection();
    }
    function closeCommandPalette() {
        if (!commandPalette) return;
        commandPalette.classList.remove('open');
        commandPalette.setAttribute('aria-hidden', 'true');
    }
    function updatePaletteSelection() {
        const links = commandPaletteList ? commandPaletteList.querySelectorAll('a') : [];
        links.forEach((a, i) => a.classList.toggle('selected', i === paletteSelected));
    }
    function movePaletteSelection(delta) {
        const links = commandPaletteList ? commandPaletteList.querySelectorAll('a') : [];
        if (links.length === 0) return;
        paletteSelected = (paletteSelected + delta + links.length) % links.length;
        updatePaletteSelection();
        links[paletteSelected].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function activatePaletteSelection() {
        const links = commandPaletteList ? commandPaletteList.querySelectorAll('a') : [];
        if (links[paletteSelected]) links[paletteSelected].click();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (commandPalette && commandPalette.classList.contains('open')) closeCommandPalette();
            else openCommandPalette();
            return;
        }
        if (commandPalette && commandPalette.classList.contains('open')) {
            if (e.key === 'Escape') { e.preventDefault(); closeCommandPalette(); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); movePaletteSelection(1); return; }
            if (e.key === 'ArrowUp') { e.preventDefault(); movePaletteSelection(-1); return; }
            if (e.key === 'Enter') { e.preventDefault(); activatePaletteSelection(); return; }
        }
    });
    if (commandPaletteBackdrop) commandPaletteBackdrop.addEventListener('click', closeCommandPalette);
    if (shortcutHint) shortcutHint.addEventListener('click', openCommandPalette);

    // ============================================
    // Terminal toast
    // ============================================

    const terminalToast = document.getElementById('terminalToast');
    const terminalToastText = document.getElementById('terminalToastText');
    function showToast(message, duration) {
        if (!terminalToast || !terminalToastText) return;
        terminalToastText.textContent = message;
        terminalToast.classList.add('show');
        terminalToast.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            terminalToast.classList.remove('show');
            terminalToast.setAttribute('aria-hidden', 'true');
        }, duration || 2200);
    }

    // ============================================
    // Code-driven navigation
    // ============================================

    const navCodeToggle = document.getElementById('navCodeToggle');
    const navCodeMenu = document.getElementById('navCodeMenu');
    const navCodeLinks = document.querySelectorAll('.nav-code-link');
    const navCode = document.getElementById('navCode');

    if (navCodeToggle && navCodeMenu) {
        navCodeToggle.addEventListener('click', () => {
            navCodeMenu.classList.toggle('active');
            navCodeToggle.classList.toggle('active');
            navCodeToggle.setAttribute('aria-expanded', navCodeMenu.classList.contains('active'));
        });
    }

    navCodeLinks.forEach(link => {
        link.addEventListener('click', () => {
            navCodeMenu.classList.remove('active');
            navCodeToggle?.classList.remove('active');
            if (navCodeToggle) navCodeToggle.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) navCode?.classList.add('scrolled');
        else navCode?.classList.remove('scrolled');
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('.section[id], #hero');
        let currentId = '';
        const scrollY = window.pageYOffset + NAV_OFFSET + 100;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (!id) return;
            if (section.offsetTop <= scrollY) currentId = id;
        });

        navCodeLinks.forEach(link => {
            const href = link.getAttribute('href');
            const targetId = href && href.startsWith('#') ? href.slice(1) : '';
            link.classList.toggle('active', targetId === currentId);
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);

    // ============================================
    // Smooth Scrolling
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // Hero profile image parallax (cursor reaction)
    // ============================================

    const heroProfileWrap = document.getElementById('heroProfileWrap');
    const heroProfileImg = document.getElementById('heroProfileImg');
    if (heroProfileWrap) {
        document.addEventListener('mousemove', (e) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const x = (e.clientX / w - 0.5) * 12;
            const y = (e.clientY / h - 0.5) * 12;
            heroProfileWrap.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(0)`;
        });
        heroProfileWrap.addEventListener('mouseleave', () => {
            heroProfileWrap.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
        });
    }

    // ============================================
    // Hero Canvas (Particles / Code-inspired)
    // ============================================

    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let animationId;

        function setSize() {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        }

        const particles = [];
        const particleCount = 60;
        const connectionDistance = 120;

        function createParticles() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.5 + 0.5
                });
            }
        }

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(34, 211, 238, 0.18)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 * (1 - dist / connectionDistance)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(draw);
        }

        setSize();
        createParticles();
        draw();

        window.addEventListener('resize', () => {
            setSize();
            createParticles();
        });
    }

    // ============================================
    // Scroll to top button
    // ============================================

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.pageYOffset > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // Custom Cursor (optional, mouse only)
    // ============================================

    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorVisible) {
            cursorVisible = true;
            document.body.classList.add('using-mouse');
        }
        const isLink = e.target.closest('a') || e.target.closest('button');
        cursorDot?.classList.toggle('on-link', !!isLink);
        cursorRing?.classList.toggle('on-link', !!isLink);
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        document.body.classList.remove('using-mouse');
    });

    function animateCursor() {
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
        if (cursorRing) {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ============================================
    // Contact Form
    // ============================================

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
            const accessKey = accessKeyInput && accessKeyInput.value ? accessKeyInput.value.trim() : '';
            if (!accessKey || accessKey === 'YOUR_ACCESS_KEY') {
                showToast('Contact form not configured. Add your Web3Forms access key.', 4000);
                return;
            }
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            showToast('Sending message...', 1500);
            const formData = new FormData(contactForm);
            formData.set('subject', 'Portfolio contact from ' + (formData.get('name') || 'Someone'));
            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.success) {
                    showToast('Message sent. I\'ll reply to your email.', 2500);
                    contactForm.reset();
                } else {
                    showToast('Failed to send: ' + (data.message || 'Please try again.'), 4000);
                }
            } catch (err) {
                showToast('Network error. Please try again.', 4000);
            }
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }

    // ============================================
    // Footer Year
    // ============================================

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============================================
    // Metric Counter (About)
    // ============================================

    const metricEl = document.querySelector('.metric-value[data-count]');
    if (metricEl) {
        const target = parseInt(metricEl.getAttribute('data-count'), 10) || 0;
        const duration = 1500;
        const start = performance.now();

        function updateCount(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(easeOut * target);
            metricEl.textContent = value;
            if (progress < 1) requestAnimationFrame(updateCount);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCount);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        if (metricEl.closest('.section-about')) observer.observe(metricEl.closest('.section-about'));
    }

    // ============================================
    // Scroll-triggered animations (fade-in)
    // ============================================

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });

    // ============================================
    // Initial state + onboarding hint
    // ============================================

    updateActiveNav();
    setTimeout(() => showToast('Press ? to jump to a section', 3500), 4000);
})();
