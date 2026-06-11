/* ============================================================
   KERMINAL OS — boot, window manager, interactive terminal
   ============================================================ */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function isMobile() { return window.matchMedia('(max-width: 760px)').matches; }

    var desktop = document.getElementById('desktop');
    var windowsHost = document.getElementById('windows');
    var sbApps = document.getElementById('sbApps');

    /* ============================================================
       CONTENT
       ============================================================ */

    var ABOUT_TEXT = [
        'Passionate Application Security Engineer with expertise in vulnerability',
        'assessment, penetration testing, and DevSecOps integration. Former web',
        'developer turned security specialist with a proven track record of building',
        'custom security tools and automating security processes.',
        '',
        'Experienced in red team assessments, security research, and training teams',
        'on offensive security principles. Currently exploring AI applications in',
        'cybersecurity and developing innovative solutions for security automation.',
        'Based in Kigali, Rwanda, working at IREMBO as an Application Security Engineer.'
    ].join('\n');

    var PROJECTS = [
        { name: 'Bambda That!', desc: 'AI-powered GPT that converts plain English queries into precise Bambda filters for Burp Suite.', tags: ['AI', 'GPT', 'Burp Suite'] },
        { name: 'K-command', desc: 'Flask-based web application providing a unified interface for reconnaissance, fuzzing, and scanning tools.', tags: ['Python', 'Flask', 'Recon'] },
        { name: 'subPull', desc: 'Bash script combining popular subdomain enumeration tools with Telegram integration.', tags: ['Bash', 'OSINT', 'Automation'] },
        { name: 'lazy-BBH', desc: 'Comprehensive Bash installer for a complete web application security testing environment.', tags: ['Bash', 'Bug Bounty', 'Tooling'] },
        { name: '.onion Resume', desc: 'Personal resume deployed as a Tor hidden service demonstrating privacy-focused web technologies.', tags: ['Tor', 'Privacy', 'Web'] },
        { name: 'Intore Security Lab', desc: 'Co-founded cybersecurity company specializing in red team assessments and penetration testing.', tags: ['Red Team', 'Pentesting', 'Consulting'] }
    ];

    var SKILL_BARS = [
        { name: 'Python', level: 95 },
        { name: 'Bash', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'SQL', level: 80 }
    ];

    var SKILL_GROUPS = [
        { title: 'offensive-security', items: ['Penetration Testing', 'Vulnerability Assessment', 'Red Team Operations', 'OSINT & Recon', 'SAST / DAST', 'AI Security Research'] },
        { title: 'tooling', items: ['Burp Suite', 'OWASP ZAP', 'Nmap', 'Metasploit', 'SQLMap', 'MobSF', 'Maltego', 'Shodan'] },
        { title: 'infrastructure', items: ['Docker', 'AWS', 'Linux Administration', 'Network Security', 'Tor Networks', 'CI/CD Pipeline Security', 'DevSecOps'] }
    ];

    function esc(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function aboutHTML() {
        return '' +
        '<p class="app-h">$ cat about.md</p>' +
        '<h2 class="app-title">Kevin Nyawakira</h2>' +
        '<div class="about-row">' +
            '<img class="about-pic" src="images/Nyawakira-Kevin-pp.jpeg" alt="Kevin Nyawakira">' +
            '<div>' +
                '<p>Passionate <strong>Application Security Engineer</strong> with expertise in vulnerability assessment, penetration testing, and DevSecOps integration. Former web developer turned security specialist with a proven track record of building custom security tools and automating security processes.</p>' +
                '<p>Experienced in red team assessments, security research, and training teams on offensive security principles. Currently exploring AI applications in cybersecurity and developing innovative solutions for security automation. Based in Kigali, Rwanda, working at <strong>IREMBO</strong> as an Application Security Engineer.</p>' +
            '</div>' +
        '</div>' +
        '<div class="stat-row">' +
            '<div class="stat-box"><b>8+</b><span>years experience</span></div>' +
            '<div class="stat-box"><b>75+</b><span>projects completed</span></div>' +
            '<div class="stat-box"><b>150+</b><span>security assessments</span></div>' +
        '</div>' +
        '<div class="app-actions">' +
            '<a class="btn btn-primary" href="kevinNyawakira_CV.pdf" download>download CV</a>' +
            '<button class="btn btn-ghost" data-open="contact">get in touch</button>' +
        '</div>';
    }

    function projectsHTML() {
        var rows = PROJECTS.map(function (p, i) {
            return '<article class="proj">' +
                '<div class="proj-head"><span class="idx">0' + (i + 1) + '</span><h3>' + esc(p.name) + '</h3></div>' +
                '<p>' + esc(p.desc) + '</p>' +
                '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
            '</article>';
        }).join('');
        return '<p class="app-h">$ ls ~/projects --sort=impact</p>' +
            '<h2 class="app-title">Projects</h2>' +
            '<div class="proj-list">' + rows + '</div>' +
            '<div class="app-actions"><a class="btn btn-ghost" href="https://github.com/kevin81767" target="_blank" rel="noopener">more on github ↗</a></div>';
    }

    function experienceHTML() {
        return '' +
        '<p class="app-h">$ tail -f experience.log</p>' +
        '<h2 class="app-title">Experience</h2>' +
        '<div class="xp-list">' +
            '<div class="xp"><span class="xp-date">2022 — present</span>' +
                '<h3>Application Security Engineer</h3><p class="xp-org">IREMBO · Kigali, Rwanda</p>' +
                '<ul><li>Security testing, code reviews, and vulnerability assessments across web and mobile platforms</li>' +
                '<li>Integrating security into the development lifecycle alongside engineering teams (DevSecOps)</li>' +
                '<li>Designing automated security processes and custom tools for vulnerability discovery</li>' +
                '<li>Establishing security standards and best practices across development teams</li></ul></div>' +
            '<div class="xp"><span class="xp-date">2021 — present</span>' +
                '<h3>Instructor &amp; AppSec Engineer<span class="xp-tag">part-time</span></h3><p class="xp-org">SHIELD TECH HUB · Kigali, Rwanda</p>' +
                '<ul><li>Training on offensive security principles and vulnerability management</li>' +
                '<li>Guiding companies through vulnerability discovery, triage, and remediation</li>' +
                '<li>Supporting startups with DevSecOps practices and hands-on security tooling</li></ul></div>' +
            '<div class="xp"><span class="xp-date">2019 — 2021</span>' +
                '<h3>Co-Founder, CTO &amp; Chief Hacking Officer</h3><p class="xp-org">INTORE SECURITY LAB · Remote</p>' +
                '<ul><li>Led red team assessments and penetration testing engagements for a diverse client base</li>' +
                '<li>Built custom exploits and security assessment tools</li>' +
                '<li>Established security testing methodologies and ran technical operations</li></ul></div>' +
            '<div class="xp"><span class="xp-date">2016 — 2021</span>' +
                '<h3>Lead Developer</h3><p class="xp-org">IRIS HUB · Remote</p>' +
                '<ul><li>End-to-end custom digital solutions and full-stack web applications for early-stage startups</li>' +
                '<li>Led development teams and defined technical architecture for scalable applications</li></ul></div>' +
        '</div>' +
        '<div class="award-row">' +
            '<div class="award-box"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' +
                '<div><h4>Overall Winner &amp; Best Attacker</h4><p>CyberStars Rwanda · 2018</p></div></div>' +
            '<div class="award-box"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>' +
                '<div><h4>2nd Place</h4><p>Rwanda National Cybersecurity Competition · 2018</p></div></div>' +
        '</div>';
    }

    function skillsHTML() {
        var bars = SKILL_BARS.map(function (s) {
            return '<div class="bar-item"><span class="bn">' + esc(s.name) + '</span>' +
                '<div class="bar-track"><div class="bar-fill" data-w="' + s.level + '"></div></div>' +
                '<span class="bv">' + s.level + '%</span></div>';
        }).join('');
        var groups = SKILL_GROUPS.map(function (g) {
            return '<div class="skill-cat"><h3><span class="tilde">~/</span>' + esc(g.title) + '</h3>' +
                '<div class="chips">' + g.items.map(function (i) { return '<span class="chip">' + esc(i) + '</span>'; }).join('') + '</div></div>';
        }).join('');
        return '<p class="app-h">$ ./scan_skills.sh --all</p>' +
            '<h2 class="app-title">Arsenal</h2>' +
            '<div class="skill-cat"><h3><span class="tilde">~/</span>languages</h3><div class="bar-list">' + bars + '</div></div>' +
            groups;
    }

    function pressHTML() {
        function item(src, title, href) {
            var arrow = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>';
            if (href) return '<a class="press-item" href="' + href + '" target="_blank" rel="noopener"><span class="press-src">' + src + '</span><span class="press-t">' + title + '</span>' + arrow + '</a>';
            return '<div class="press-item"><span class="press-src">' + src + '</span><span class="press-t">' + title + '</span><span></span></div>';
        }
        return '<p class="app-h">$ grep -r "kevin" ./media/</p>' +
            '<h2 class="app-title">Press</h2>' +
            '<div class="press-list">' +
            item('MINICT', 'The winners of Cyber Stars of Rwanda competition rewarded by the Ministry', 'https://minict.prod.risa.rw/news-detail/the-winners-of-cyber-stars-of-rwanda-competition-rewarded-by-the-ministry') +
            item('CyberStars', 'CyberStars of Rwanda 2018 — Overall Winner &amp; Best Attacker', 'https://cyberstars.pro/cyberstars-of-rwanda-2018/') +
            item('New Times', 'Cybersecurity efforts mobilise local innovative solutions') +
            item('IGIHE', '12 students compete in cybersecurity defense competition') +
            item('CyberRanges', 'CyberStars of Rwanda 2018 — event report') +
            item('IGIHE', 'How to stay safe from cyber attacks in today’s world') +
            '</div>';
    }

    function contactHTML() {
        return '' +
        '<p class="app-h">$ ./contact.sh --establish-connection</p>' +
        '<h2 class="app-title">Get in touch</h2>' +
        '<p class="contact-lede">Ready to secure your digital assets — or break them first, with permission?</p>' +
        '<div class="contact-rows">' +
            '<a class="c-row" href="mailto:knyawakira@gmail.com"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>knyawakira@gmail.com</a>' +
            '<a class="c-row" href="tel:+250784438186"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+250 784 438 186</a>' +
            '<span class="c-row"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Kigali, Rwanda</span>' +
        '</div>' +
        '<div class="socials">' +
            '<a href="https://github.com/kevin81767" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg></a>' +
            '<a href="https://www.linkedin.com/in/kevin-nyawakira-558307129/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>' +
            '<a href="https://www.instagram.com/kerminal_/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>' +
            '<a href="https://www.facebook.com/nyawakira.kevin" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.8V24C19.62 23.09 24 18.1 24 12.07z"/></svg></a>' +
        '</div>';
    }

    /* ============================================================
       APP REGISTRY
       ============================================================ */

    var APPS = {
        terminal:   { title: 'kevin@kerminal: ~ — zsh', w: 660, h: 440, terminal: true },
        about:      { title: 'about.md', w: 600, h: 540, html: aboutHTML },
        projects:   { title: '~/projects', w: 560, h: 560, html: projectsHTML },
        experience: { title: 'experience.log', w: 620, h: 580, html: experienceHTML },
        skills:     { title: 'scan_skills.sh', w: 560, h: 560, html: skillsHTML },
        press:      { title: '~/media', w: 620, h: 460, html: pressHTML },
        contact:    { title: 'contact.sh', w: 480, h: 460, html: contactHTML }
    };
    var APP_ORDER = ['terminal', 'about', 'projects', 'experience', 'skills', 'press', 'contact'];

    /* ============================================================
       WINDOW MANAGER
       ============================================================ */

    var wm = {
        wins: {},
        zTop: 10,
        cascade: 0,

        open: function (id) {
            var app = APPS[id];
            if (!app) return false;
            var w = this.wins[id];
            if (w) {
                if (w.minimized) this.restore(id);
                this.focus(id);
                return true;
            }

            var win = document.createElement('section');
            win.className = 'win' + (app.terminal ? ' win-terminal' : '');
            win.setAttribute('data-app', id);
            win.setAttribute('aria-label', app.title);

            var dw = desktop.clientWidth, dh = desktop.clientHeight;
            var ww = Math.min(app.w, dw - 40), wh = Math.min(app.h, dh - 40);
            var x = Math.max(16, Math.round((dw - ww) / 2) + (this.cascade % 5) * 34 - 68);
            var y = Math.max(14, Math.round((dh - wh) / 2.4) + (this.cascade % 5) * 26 - 40);
            this.cascade++;

            win.style.width = ww + 'px';
            win.style.height = wh + 'px';
            win.style.left = x + 'px';
            win.style.top = y + 'px';

            win.innerHTML =
                '<header class="win-bar">' +
                    '<div class="tl">' +
                        '<button class="t-close" aria-label="Close"></button>' +
                        '<button class="t-min" aria-label="Minimize"></button>' +
                        '<button class="t-max" aria-label="Maximize"></button>' +
                    '</div>' +
                    '<span class="win-title">' + app.title + '</span>' +
                '</header>' +
                '<div class="win-body"></div>';

            var body = win.querySelector('.win-body');
            if (app.terminal) {
                buildTerminal(body);
            } else {
                body.innerHTML = app.html();
            }

            windowsHost.appendChild(win);
            this.wins[id] = { el: win, minimized: false, maximized: false };

            // events
            var self = this;
            win.addEventListener('pointerdown', function () { self.focus(id); });
            win.querySelector('.t-close').addEventListener('click', function (e) { e.stopPropagation(); self.close(id); });
            win.querySelector('.t-min').addEventListener('click', function (e) { e.stopPropagation(); self.minimize(id); });
            win.querySelector('.t-max').addEventListener('click', function (e) { e.stopPropagation(); self.toggleMax(id); });
            win.querySelector('.win-bar').addEventListener('dblclick', function () { self.toggleMax(id); });
            makeDraggable(win, win.querySelector('.win-bar'));

            // buttons inside content that open other apps
            body.addEventListener('click', function (e) {
                var t = e.target.closest('[data-open]');
                if (t) self.open(t.getAttribute('data-open'));
            });

            requestAnimationFrame(function () {
                requestAnimationFrame(function () { win.classList.add('shown'); });
            });

            this.focus(id);

            if (id === 'skills') animateBars(body);
            if (app.terminal) setTimeout(focusTermInput, 80);

            syncStatusBar();
            return true;
        },

        close: function (id) {
            var w = this.wins[id];
            if (!w) return false;
            var self = this;
            w.el.classList.add('closing');
            setTimeout(function () { w.el.remove(); }, reduceMotion ? 0 : 200);
            delete this.wins[id];
            syncStatusBar();
            return true;
        },

        minimize: function (id) {
            var w = this.wins[id];
            if (!w) return;
            w.minimized = true;
            w.el.classList.add('closing');
            setTimeout(function () { if (w.minimized) w.el.style.display = 'none'; }, reduceMotion ? 0 : 200);
            syncStatusBar();
        },

        restore: function (id) {
            var w = this.wins[id];
            if (!w) return;
            w.minimized = false;
            w.el.style.display = '';
            requestAnimationFrame(function () { w.el.classList.remove('closing'); });
            syncStatusBar();
        },

        toggleMax: function (id) {
            var w = this.wins[id];
            if (!w) return;
            w.maximized = !w.maximized;
            w.el.classList.toggle('maxed', w.maximized);
            this.focus(id);
        },

        focus: function (id) {
            var w = this.wins[id];
            if (!w) return;
            this.zTop++;
            w.el.style.zIndex = this.zTop;
            Object.keys(this.wins).forEach(function (k) {
                this.wins[k].el.classList.toggle('active', k === id);
            }, this);
            this.activeId = id;
            if (APPS[id].terminal && !isMobile()) focusTermInput();
            syncStatusBar();
        }
    };

    function makeDraggable(win, handle) {
        var sx, sy, ox, oy, dragging = false;

        handle.addEventListener('pointerdown', function (e) {
            if (e.target.closest('button')) return;
            if (win.classList.contains('maxed') || isMobile()) return;
            dragging = true;
            sx = e.clientX; sy = e.clientY;
            ox = win.offsetLeft; oy = win.offsetTop;
            win.classList.add('dragging');
            handle.setPointerCapture(e.pointerId);
        });

        handle.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var nx = ox + (e.clientX - sx);
            var ny = oy + (e.clientY - sy);
            var maxX = desktop.clientWidth - 80;
            var maxY = desktop.clientHeight - 42;
            nx = Math.max(80 - win.offsetWidth, Math.min(nx, maxX));
            ny = Math.max(0, Math.min(ny, maxY));
            win.style.left = nx + 'px';
            win.style.top = ny + 'px';
        });

        function release() {
            if (!dragging) return;
            dragging = false;
            win.classList.remove('dragging');
        }
        handle.addEventListener('pointerup', release);
        handle.addEventListener('pointercancel', release);
    }

    function animateBars(scope) {
        var fills = scope.querySelectorAll('.bar-fill');
        setTimeout(function () {
            fills.forEach(function (f) { f.style.width = f.getAttribute('data-w') + '%'; });
        }, reduceMotion ? 0 : 250);
    }

    /* ---------- status bar ---------- */

    function syncStatusBar() {
        sbApps.innerHTML = '';
        APP_ORDER.forEach(function (id, i) {
            var b = document.createElement('button');
            var w = wm.wins[id];
            var suffix = '';
            if (w && !w.minimized && wm.activeId === id) suffix = '*';
            else if (w && w.minimized) suffix = '-';
            b.className = 'sb-app' +
                (w ? ' open' : '') +
                (w && w.minimized ? ' min' : '') +
                (w && wm.activeId === id && !w.minimized ? ' active' : '');
            b.textContent = i + ':' + id + suffix;
            b.addEventListener('click', function () {
                if (w && w.minimized) { wm.restore(id); wm.focus(id); }
                else if (w && wm.activeId === id) { wm.minimize(id); }
                else wm.open(id);
            });
            sbApps.appendChild(b);
        });
    }

    /* ============================================================
       TERMINAL
       ============================================================ */

    var termScroll = null;
    var termInput = null;
    var history = [];
    var histIdx = -1;

    var FILES = {
        'about.md': ABOUT_TEXT,
        'experience.log': '[2022-now]  Application Security Engineer @ IREMBO\n[2021-now]  Instructor & AppSec Engineer @ SHIELD TECH HUB\n[2019-2021] Co-Founder, CTO & CHO @ INTORE SECURITY LAB\n[2016-2021] Lead Developer @ IRIS HUB\n\n(open experience  →  full details in a window)',
        'contact.sh': '#!/bin/bash\n# reach kevin\nEMAIL="knyawakira@gmail.com"\nPHONE="+250 784 438 186"\nLOCATION="Kigali, Rwanda"\nGITHUB="github.com/kevin81767"\nLINKEDIN="linkedin.com/in/kevin-nyawakira-558307129"',
        'README.md': 'KERMINAL OS — the portfolio of Kevin Nyawakira.\nType `help` to see what this shell can do.\nTip: `open projects` launches a window. `matrix` is fun.',
        'CV.pdf': null
    };

    function tEl(cls, text) {
        var p = document.createElement('p');
        p.className = 't-line' + (cls ? ' ' + cls : '');
        if (text != null) p.textContent = text;
        return p;
    }

    function print(text, cls) {
        if (text == null) return;
        String(text).split('\n').forEach(function (line) {
            termScroll.insertBefore(tEl(cls, line), inputLineEl());
        });
        scrollTerm();
    }

    function printHTML(html) {
        var div = document.createElement('div');
        div.className = 't-line';
        div.innerHTML = html;
        termScroll.insertBefore(div, inputLineEl());
        scrollTerm();
    }

    function inputLineEl() {
        return termScroll.querySelector('.t-input-line');
    }

    function scrollTerm() {
        if (termScroll) termScroll.scrollTop = termScroll.scrollHeight;
    }

    function focusTermInput() {
        if (termInput) termInput.focus({ preventScroll: true });
    }

    function promptHTML() {
        return '<span class="t-prompt-user">kevin</span><span class="t-prompt-sep">@</span>' +
               '<span class="t-prompt-user">kerminal</span><span class="t-prompt-sep">:</span>' +
               '<span class="t-prompt-path">~</span><span class="t-prompt-sign">$</span>';
    }

    function buildTerminal(body) {
        termScroll = document.createElement('div');
        termScroll.className = 'term-scroll';

        // welcome
        var wel = document.createElement('div');
        wel.innerHTML =
            '<p class="t-line t-ok">Welcome to KERMINAL OS v3.0 (zsh 5.9)</p>' +
            '<p class="t-line t-muted">Kevin Nyawakira — Application Security Engineer &amp; Security Researcher</p>' +
            '<p class="t-line t-muted">Type <span class="t-ok">help</span> or click a command:</p>' +
            '<div class="t-chips">' +
                ['help', 'neofetch', 'open projects', 'skills', 'cat about.md', 'contact', 'matrix'].map(function (c) {
                    return '<button class="t-chip" data-cmd="' + c + '">' + c + '</button>';
                }).join('') +
            '</div>' +
            '<p class="t-line">&nbsp;</p>';
        termScroll.appendChild(wel);

        // input line
        var line = document.createElement('div');
        line.className = 't-input-line';
        line.innerHTML = promptHTML();
        termInput = document.createElement('input');
        termInput.className = 't-input';
        termInput.type = 'text';
        termInput.setAttribute('autocomplete', 'off');
        termInput.setAttribute('autocapitalize', 'off');
        termInput.setAttribute('autocorrect', 'off');
        termInput.setAttribute('spellcheck', 'false');
        termInput.setAttribute('aria-label', 'terminal input');
        line.appendChild(termInput);
        termScroll.appendChild(line);

        body.appendChild(termScroll);

        termScroll.addEventListener('click', function (e) {
            var chip = e.target.closest('.t-chip');
            if (chip) { runCommand(chip.getAttribute('data-cmd')); return; }
            if (!window.getSelection().toString()) focusTermInput();
        });

        termInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var v = termInput.value;
                termInput.value = '';
                runCommand(v);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (histIdx < history.length - 1) { histIdx++; termInput.value = history[histIdx]; }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (histIdx > 0) { histIdx--; termInput.value = history[histIdx]; }
                else { histIdx = -1; termInput.value = ''; }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                tabComplete();
            } else if (e.key === 'l' && e.ctrlKey) {
                e.preventDefault();
                COMMANDS.clear.fn([]);
            } else if (e.key === 'c' && e.ctrlKey && !window.getSelection().toString()) {
                printHTML(promptHTML() + '<span>' + esc(termInput.value) + '</span><span class="t-muted">^C</span>');
                termInput.value = '';
            }
        });
    }

    function tabComplete() {
        var v = termInput.value;
        if (!v) return;
        var parts = v.split(' ');
        var pool;
        if (parts.length === 1) {
            pool = Object.keys(COMMANDS);
        } else if (parts[0] === 'open' || parts[0] === 'close') {
            pool = APP_ORDER;
        } else if (parts[0] === 'cat') {
            pool = Object.keys(FILES);
        } else { return; }
        var last = parts[parts.length - 1].toLowerCase();
        var matches = pool.filter(function (c) { return c.indexOf(last) === 0; });
        if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            termInput.value = parts.join(' ') + (parts.length === 1 && (matches[0] === 'open' || matches[0] === 'cat' || matches[0] === 'close') ? ' ' : '');
        } else if (matches.length > 1) {
            print(matches.join('   '), 't-muted');
        }
    }

    /* ---------- commands ---------- */

    var NEOFETCH =
        '<pre class="t-line" style="margin:0;line-height:1.45"><span class="t-ok">' +
        '██╗  ██╗\n' +
        '██║ ██╔╝   </span>kevin<span class="t-muted">@</span>kerminal<span class="t-muted">\n' +
        '</span><span class="t-ok">█████╔╝    </span><span class="t-muted">──────────────────────────────</span>\n' +
        '<span class="t-ok">██╔═██╗    </span><span class="t-cyan">OS</span>: KERMINAL OS v3.0 x86_64\n' +
        '<span class="t-ok">██║  ██╗   </span><span class="t-cyan">Role</span>: AppSec Engineer @ IREMBO\n' +
        '<span class="t-ok">╚═╝  ╚═╝   </span><span class="t-cyan">Base</span>: Kigali, Rwanda\n' +
        '           <span class="t-cyan">Uptime</span>: 8+ years in security\n' +
        '           <span class="t-cyan">Packages</span>: 75+ projects, 150+ assessments\n' +
        '           <span class="t-cyan">Shell</span>: zsh 5.9 · kerminal-term\n' +
        '           <span class="t-cyan">Specialty</span>: pentesting · DevSecOps · automation\n' +
        '           <span class="t-cyan">Status</span>: <span class="t-ok">available — say hi</span></pre>';

    var COMMANDS = {
        help: { desc: 'show this help', fn: function () {
            var rows = [
                ['help', 'show this help'],
                ['whoami', 'who is kevin?'],
                ['neofetch', 'system / profile info'],
                ['ls', 'list files & apps'],
                ['cat <file>', 'print a file (try about.md)'],
                ['open <app>', 'open a window: ' + APP_ORDER.slice(1).join(', ')],
                ['close <app>', 'close a window'],
                ['skills', 'technical skills with bars'],
                ['projects', 'list projects'],
                ['experience', 'career history'],
                ['contact', 'how to reach me'],
                ['social', 'links'],
                ['cv', 'download my CV'],
                ['theme <dark|light>', 'switch theme'],
                ['matrix', 'follow the white rabbit'],
                ['history', 'command history'],
                ['clear', 'clear terminal (Ctrl+L)'],
                ['exit', 'close terminal']
            ];
            print(rows.map(function (r) { return '  ' + r[0].padEnd(20) + r[1]; }).join('\n'), 't-muted');
        }},

        whoami: { desc: '', fn: function () {
            print('kevin — application security engineer & security researcher', '');
            print('former web developer · red teamer · builder of security tools', 't-muted');
        }},

        neofetch: { desc: '', fn: function () { printHTML(NEOFETCH); } },

        ls: { desc: '', fn: function () {
            printHTML(
                '<p class="t-line"><span class="t-cyan">apps/</span>      ' +
                APP_ORDER.slice(1).map(function (a) { return '<button class="t-chip" data-cmd="open ' + a + '">' + a + '</button>'; }).join(' ') + '</p>'
            );
            print(Object.keys(FILES).join('   '), '');
        }},

        cat: { desc: '', fn: function (args) {
            var f = args[0];
            if (!f) { print('usage: cat <file>', 't-err'); return; }
            if (f === 'CV.pdf') { COMMANDS.cv.fn([]); return; }
            if (FILES[f] != null) { print(FILES[f], ''); }
            else print('cat: ' + f + ': No such file or directory', 't-err');
        }},

        open: { desc: '', fn: function (args) {
            var a = (args[0] || '').toLowerCase();
            if (!a) { print('usage: open <' + APP_ORDER.join('|') + '>', 't-err'); return; }
            if (a === 'cv') { COMMANDS.cv.fn([]); return; }
            if (wm.open(a)) print('[ok] ' + a + ' opened', 't-ok');
            else print('open: no app named "' + a + '"', 't-err');
        }},

        close: { desc: '', fn: function (args) {
            var a = (args[0] || '').toLowerCase();
            if (wm.close(a)) print('[ok] ' + a + ' closed', 't-ok');
            else print('close: "' + a + '" is not open', 't-err');
        }},

        skills: { desc: '', fn: function () {
            var out = SKILL_BARS.map(function (s) {
                var full = Math.round(s.level / 10);
                return '<div class="t-bar-row"><span class="t-bar-name">' + esc(s.name) + '</span>' +
                    '<span class="t-bar-track">' + '█'.repeat(full) + '<span class="dimmed">' + '█'.repeat(10 - full) + '</span></span>' +
                    '<span class="t-muted"> ' + s.level + '%</span></div>';
            }).join('');
            printHTML(out);
            print('\nfocus areas: ' + SKILL_GROUPS[0].items.join(' · '), 't-muted');
            printHTML('<p class="t-line t-muted">full arsenal → <button class="t-chip" data-cmd="open skills">open skills</button></p>');
        }},

        projects: { desc: '', fn: function () {
            PROJECTS.forEach(function (p, i) {
                printHTML('<p class="t-line"><span class="t-ok">' + (i + 1) + '.</span> <b>' + esc(p.name) + '</b> <span class="t-muted">— ' + esc(p.desc) + '</span></p>');
            });
            printHTML('<p class="t-line t-muted">details → <button class="t-chip" data-cmd="open projects">open projects</button></p>');
        }},

        experience: { desc: '', fn: function () {
            print(FILES['experience.log'], '');
        }},

        contact: { desc: '', fn: function () {
            printHTML('<p class="t-line">email     <a class="t-link" href="mailto:knyawakira@gmail.com">knyawakira@gmail.com</a></p>' +
                      '<p class="t-line">phone     <a class="t-link" href="tel:+250784438186">+250 784 438 186</a></p>' +
                      '<p class="t-line">location  Kigali, Rwanda</p>');
            printHTML('<p class="t-line t-muted">window → <button class="t-chip" data-cmd="open contact">open contact</button></p>');
        }},

        social: { desc: '', fn: function () {
            printHTML('<p class="t-line">github    <a class="t-link" href="https://github.com/kevin81767" target="_blank" rel="noopener">github.com/kevin81767</a></p>' +
                      '<p class="t-line">linkedin  <a class="t-link" href="https://www.linkedin.com/in/kevin-nyawakira-558307129/" target="_blank" rel="noopener">kevin-nyawakira</a></p>' +
                      '<p class="t-line">instagram <a class="t-link" href="https://www.instagram.com/kerminal_/" target="_blank" rel="noopener">@kerminal_</a></p>');
        }},

        cv: { desc: '', fn: function () {
            print('[ok] downloading kevinNyawakira_CV.pdf ...', 't-ok');
            var a = document.createElement('a');
            a.href = 'kevinNyawakira_CV.pdf';
            a.download = 'kevinNyawakira_CV.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }},

        theme: { desc: '', fn: function (args) {
            var t = (args[0] || '').toLowerCase();
            if (t !== 'dark' && t !== 'light') {
                t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            }
            setTheme(t);
            print('[ok] theme → ' + t, 't-ok');
        }},

        matrix: { desc: '', fn: function () {
            print('Wake up, Neo...', 't-ok');
            burstMatrix();
        }},

        history: { desc: '', fn: function () {
            print(history.slice().reverse().map(function (h, i) { return '  ' + (i + 1) + '  ' + h; }).join('\n') || '  (empty)', 't-muted');
        }},

        clear: { desc: '', fn: function () {
            var line = inputLineEl();
            termScroll.innerHTML = '';
            termScroll.appendChild(line);
            focusTermInput();
        }},

        exit: { desc: '', fn: function () {
            print('logout', 't-muted');
            setTimeout(function () { wm.close('terminal'); }, 250);
        }},

        pwd: { desc: '', fn: function () { print('/home/kevin', ''); } },
        date: { desc: '', fn: function () { print(new Date().toString(), ''); } },
        uname: { desc: '', fn: function () { print('KerminalOS 3.0.0-kerminal x86_64 GNU/Linux', ''); } },
        echo: { desc: '', fn: function (args) { print(args.join(' '), ''); } },

        sudo: { desc: '', fn: function (args) {
            if (args.join(' ').indexOf('rm -rf') !== -1) {
                print('nice try.', 't-err');
                print('this incident has been reported to kevin.', 't-warn');
            } else {
                print('kevin is already root here. you, however, are a guest :)', 't-warn');
            }
        }},

        hack: { desc: '', fn: function () {
            var steps = ['[*] enumerating targets...', '[*] bypassing firewall...', '[*] escalating privileges...', '[+] access granted. just kidding — always get authorization first.'];
            var i = 0;
            (function next() {
                if (i >= steps.length) return;
                print(steps[i], i === steps.length - 1 ? 't-ok' : 't-muted');
                i++;
                setTimeout(next, reduceMotion ? 0 : 450);
            })();
        }}
    };

    // aliases
    COMMANDS.about = { desc: '', fn: function () { print(ABOUT_TEXT, ''); } };
    COMMANDS.man = COMMANDS.help;

    function runCommand(raw) {
        var cmd = (raw || '').trim();
        printHTML(promptHTML() + '<span>' + esc(cmd) + '</span>');
        if (!cmd) { scrollTerm(); return; }

        history.unshift(cmd);
        histIdx = -1;

        var parts = cmd.split(/\s+/);
        var name = parts[0].toLowerCase();
        if (name.indexOf('./') === 0) name = name.slice(2); // legacy ./cmd style
        var args = parts.slice(1);

        if (COMMANDS[name]) {
            COMMANDS[name].fn(args);
        } else if (APPS[name]) {
            wm.open(name);
            print('[ok] ' + name + ' opened', 't-ok');
        } else {
            print('zsh: command not found: ' + name + '  (try `help`)', 't-err');
        }
        scrollTerm();
        focusTermInput();
    }

    /* ============================================================
       MATRIX RAIN (desktop wallpaper + easter-egg burst)
       ============================================================ */

    var rainBoost = 0; // 0..1 extra intensity

    (function initRain() {
        var canvas = document.getElementById('rain');
        if (!canvas || reduceMotion) { if (canvas) canvas.remove(); return; }

        var ctx = canvas.getContext('2d');
        var chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}[]$#';
        var fontSize = 14;
        var columns = 0, drops = [];
        var lastFrame = 0;
        var FRAME_MS = 95;

        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = desktop.clientWidth * dpr;
            canvas.height = desktop.clientHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            columns = Math.floor(desktop.clientWidth / fontSize);
            drops = [];
            for (var i = 0; i < columns; i++) drops[i] = Math.floor(Math.random() * -90);
            ctx.font = fontSize + 'px "JetBrains Mono", monospace';
        }

        function cssVar(name) {
            return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        }

        function draw(ts) {
            requestAnimationFrame(draw);
            if (document.hidden) return;
            var frameMs = rainBoost > 0 ? 50 : FRAME_MS;
            if (ts - lastFrame < frameMs) return;
            lastFrame = ts;

            var w = desktop.clientWidth, h = desktop.clientHeight;
            ctx.clearRect(0, 0, w, h);

            var col = cssVar('--rain-color');
            var baseA = parseFloat(cssVar('--rain-alpha')) || 0.25;
            var a = Math.min(1, baseA + rainBoost * 0.6);
            var density = rainBoost > 0 ? 1 : 3; // every column when bursting, sparse otherwise

            for (var i = 0; i < columns; i++) {
                if (rainBoost === 0 && i % density !== 1) continue;
                var y = drops[i] * fontSize;
                if (y > 0 && y < h + 6 * fontSize) {
                    for (var t = 0; t < 7; t++) {
                        var ty = y - t * fontSize;
                        if (ty < 0 || ty > h) continue;
                        var fade = (1 - t / 7) * a;
                        ctx.fillStyle = 'rgba(' + col + ',' + fade.toFixed(3) + ')';
                        ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * fontSize, ty);
                    }
                }
                drops[i]++;
                if (y > h && Math.random() > (rainBoost > 0 ? 0.92 : 0.985)) {
                    drops[i] = Math.floor(Math.random() * -40);
                }
            }
        }

        resize();
        window.addEventListener('resize', resize);
        requestAnimationFrame(draw);
    })();

    function burstMatrix() {
        if (reduceMotion) return;
        rainBoost = 1;
        desktop.classList.add('matrix-burst');
        setTimeout(function () {
            rainBoost = 0;
            desktop.classList.remove('matrix-burst');
        }, 6000);
    }

    /* ============================================================
       THEME + CLOCK + DESKTOP ICONS
       ============================================================ */

    function setTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
    }

    document.getElementById('themeToggle').addEventListener('click', function () {
        setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    (function clock() {
        var el = document.getElementById('sbClock');
        function tick() {
            var d = new Date();
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var hh = String(d.getHours()).padStart(2, '0');
            var mm = String(d.getMinutes()).padStart(2, '0');
            el.innerHTML = '<span class="sb-date">' + days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + '&nbsp;&nbsp;</span>' + hh + ':' + mm;
        }
        tick();
        setInterval(tick, 15000);
    })();

    document.querySelectorAll('.dicon[data-open]').forEach(function (b) {
        b.addEventListener('click', function () { wm.open(b.getAttribute('data-open')); });
    });

    /* ============================================================
       BOOT SEQUENCE
       ============================================================ */

    (function boot() {
        var bootEl = document.getElementById('boot');
        var linesEl = document.getElementById('bootLines');
        var fill = document.getElementById('bootFill');

        var LINES = [
            ['kerminal bios v3.0 — initializing', false],
            ['cpu: caffeine-fueled @ 3.80GHz ............ [ok]', true],
            ['loading profile: kevin_nyawakira .......... [ok]', true],
            ['mounting /skills /projects /experience ..... [ok]', true],
            ['starting security daemons .................. [ok]', true],
            ['establishing secure connection ............. [ok]', true],
            ['access granted — welcome', true]
        ];

        function openInitial() {
            if (isMobile()) {
                wm.open('terminal');
            } else {
                wm.open('about');
                wm.open('terminal');
                var dw = desktop.clientWidth, dh = desktop.clientHeight;
                var ab = wm.wins.about.el, tm = wm.wins.terminal.el;
                ab.style.left = Math.max(380, dw - ab.offsetWidth - 140) + 'px';
                ab.style.top = Math.max(24, Math.round((dh - ab.offsetHeight) / 2) - 10) + 'px';
                tm.style.left = Math.max(20, Math.round(dw * 0.045)) + 'px';
                tm.style.top = Math.max(24, Math.round((dh - tm.offsetHeight) / 2) + 16) + 'px';
            }
            syncStatusBar();
        }

        function finish(fast) {
            bootEl.classList.add('done');
            setTimeout(function () { bootEl.classList.add('hidden'); }, fast ? 0 : 460);
            sessionStorage.setItem('booted', '1');
            openInitial();
        }

        if (reduceMotion || sessionStorage.getItem('booted')) {
            bootEl.classList.add('hidden');
            finish(true);
            return;
        }

        var skipped = false;
        function skip() {
            if (skipped) return;
            skipped = true;
            finish(false);
            document.removeEventListener('keydown', skip);
            bootEl.removeEventListener('click', skip);
        }
        document.addEventListener('keydown', skip);
        bootEl.addEventListener('click', skip);

        var i = 0;
        (function next() {
            if (skipped) return;
            if (i >= LINES.length) { setTimeout(function () { if (!skipped) skip(); }, 420); return; }
            var p = document.createElement('p');
            var txt = LINES[i][0];
            if (LINES[i][1] && txt.indexOf('[ok]') !== -1) {
                p.innerHTML = esc(txt.replace(' [ok]', ' ')) + '<span class="ok">[ok]</span>';
            } else {
                p.textContent = txt;
            }
            linesEl.appendChild(p);
            i++;
            fill.style.width = Math.round((i / LINES.length) * 100) + '%';
            setTimeout(next, 170 + Math.random() * 160);
        })();
    })();

    /* keep windows on screen when viewport changes */
    window.addEventListener('resize', function () {
        Object.keys(wm.wins).forEach(function (id) {
            var el = wm.wins[id].el;
            if (el.classList.contains('maxed')) return;
            var maxX = Math.max(0, desktop.clientWidth - 120);
            var maxY = Math.max(0, desktop.clientHeight - 60);
            if (el.offsetLeft > maxX) el.style.left = maxX + 'px';
            if (el.offsetTop > maxY) el.style.top = maxY + 'px';
        });
    });
})();
