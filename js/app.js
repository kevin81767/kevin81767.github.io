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
        'Passionate Senior Application Security Engineer with expertise in vulnerability',
        'assessment, penetration testing, and DevSecOps integration. Former web',
        'developer turned security specialist with a proven track record of building',
        'custom security tools and automating security processes.',
        '',
        'Experienced in red team assessments, security research, and training teams',
        'on offensive security principles. Currently exploring AI applications in',
        'cybersecurity and developing innovative solutions for security automation.',
        'Based in Kigali, Rwanda, working at IREMBO as a Senior Application Security Engineer.'
    ].join('\n');

    var EXPERIENCE_LOG = '[2022-now]  Senior Application Security Engineer @ IREMBO\n[2021-now]  Instructor & AppSec Engineer @ SHIELD TECH HUB\n[2019-2021] Co-Founder, CTO & CHO @ INTORE SECURITY LAB\n[2016-2021] Lead Developer @ IRIS HUB\n\n(open experience  →  full details in a window)';
    var CONTACT_SH = '#!/bin/bash\n# reach kevin\nEMAIL="knyawakira@gmail.com"\nPHONE="+250 784 438 186"\nLOCATION="Kigali, Rwanda"\nGITHUB="github.com/kevin81767"\nLINKEDIN="linkedin.com/in/kevin-nyawakira-558307129"';

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
                '<p>Passionate <strong>Senior Application Security Engineer</strong> with expertise in vulnerability assessment, penetration testing, and DevSecOps integration. Former web developer turned security specialist with a proven track record of building custom security tools and automating security processes.</p>' +
                '<p>Experienced in red team assessments, security research, and training teams on offensive security principles. Currently exploring AI applications in cybersecurity and developing innovative solutions for security automation. Based in Kigali, Rwanda, working at <strong>IREMBO</strong> as a Senior Application Security Engineer.</p>' +
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
                '<h3>Senior Application Security Engineer</h3><p class="xp-org">IREMBO · Kigali, Rwanda</p>' +
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
        experience: { title: 'experience.log', w: 620, h: 580, html: experienceHTML },
        skills:     { title: 'scan_skills.sh', w: 560, h: 560, html: skillsHTML },
        press:      { title: '~/media', w: 620, h: 460, html: pressHTML },
        contact:    { title: 'contact.sh', w: 480, h: 460, html: contactHTML }
    };
    var APP_ORDER = ['terminal', 'about', 'experience', 'skills', 'press', 'contact'];
    // "finder" is the pseudo-app for browsing directories (projects, skills, media…)

    /* ============================================================
       WINDOW MANAGER (generic — apps, Finder & document windows)
       ============================================================ */

    var wm = {
        wins: {},
        zTop: 10,
        cascade: 0,
        activeId: null,

        // Low-level: create a window from a spec.
        // spec = { title, className, w, h, build(body, win), onOpen(body, win), dynamic, sbLabel }
        spawn: function (id, spec) {
            var existing = this.wins[id];
            if (existing) {
                if (existing.minimized) this.restore(id);
                this.focus(id);
                return existing;
            }

            var win = document.createElement('section');
            win.className = 'win' + (spec.className ? ' ' + spec.className : '');
            win.setAttribute('data-app', id);
            win.setAttribute('aria-label', spec.title);

            var dw = desktop.clientWidth, dh = desktop.clientHeight;
            var ww = Math.min(spec.w || 560, dw - 40), wh = Math.min(spec.h || 480, dh - 40);
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
                    '<span class="win-title">' + esc(spec.title) + '</span>' +
                '</header>' +
                '<div class="win-body"></div>' +
                '<span class="win-resize" aria-hidden="true"></span>';

            var body = win.querySelector('.win-body');
            spec.build(body, win);

            windowsHost.appendChild(win);
            this.wins[id] = {
                el: win, minimized: false, maximized: false,
                title: spec.title, dynamic: !!spec.dynamic,
                sbLabel: spec.sbLabel || spec.title
            };

            var self = this;
            win.addEventListener('pointerdown', function () { self.focus(id); });
            win.querySelector('.t-close').addEventListener('click', function (e) { e.stopPropagation(); self.close(id); });
            win.querySelector('.t-min').addEventListener('click', function (e) { e.stopPropagation(); self.minimize(id); });
            win.querySelector('.t-max').addEventListener('click', function (e) { e.stopPropagation(); self.toggleMax(id); });
            win.querySelector('.win-bar').addEventListener('dblclick', function (e) { if (!e.target.closest('button')) self.toggleMax(id); });
            makeDraggable(win, win.querySelector('.win-bar'));
            makeResizable(win, win.querySelector('.win-resize'));

            requestAnimationFrame(function () {
                requestAnimationFrame(function () { win.classList.add('shown'); });
            });

            this.focus(id);
            if (spec.onOpen) spec.onOpen(body, win);
            syncStatusBar();
            return this.wins[id];
        },

        // Open a registered app by id.
        open: function (id) {
            var app = APPS[id];
            if (!app) return false;
            this.spawn(id, {
                title: app.title,
                className: app.terminal ? 'win-terminal' : '',
                w: app.w, h: app.h,
                sbLabel: id,
                build: function (body) {
                    if (app.terminal) buildTerminal(body);
                    else body.innerHTML = app.html();
                },
                onOpen: function (body) {
                    if (id === 'skills') animateBars(body);
                    if (app.terminal) setTimeout(focusTermInput, 80);
                    body.addEventListener('click', function (e) {
                        var t = e.target.closest('[data-open]');
                        if (t) { e.preventDefault(); wm.open(t.getAttribute('data-open')); }
                    });
                }
            });
            return true;
        },

        close: function (id) {
            var w = this.wins[id];
            if (!w) return false;
            w.el.classList.add('closing');
            setTimeout(function () { w.el.remove(); }, reduceMotion ? 0 : 200);
            delete this.wins[id];
            if (this.activeId === id) this.activeId = null;
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
            if (APPS[id] && APPS[id].terminal && !isMobile()) focusTermInput();
            syncStatusBar();
        }
    };

    function makeDraggable(win, handle) {
        var sx, sy, ox, oy, dragging = false, lastX = 0;

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
            lastX = e.clientX;
            var nx = ox + (e.clientX - sx);
            var ny = oy + (e.clientY - sy);
            var maxX = desktop.clientWidth - 80;
            var maxY = desktop.clientHeight - 42;
            nx = Math.max(80 - win.offsetWidth, Math.min(nx, maxX));
            ny = Math.max(0, Math.min(ny, maxY));
            win.style.left = nx + 'px';
            win.style.top = ny + 'px';
            // edge snap hint
            win.classList.toggle('snap-hint', e.clientY <= 4 || e.clientX <= 4 || e.clientX >= desktop.clientWidth - 4);
        });

        function release(e) {
            if (!dragging) return;
            dragging = false;
            win.classList.remove('dragging', 'snap-hint');
            // snap-to-edge (desktop only)
            var y = e ? e.clientY : 999, x = e ? e.clientX : 999;
            if (y <= 4) { snapWin(win, 'max'); }
            else if (x <= 4) { snapWin(win, 'left'); }
            else if (x >= desktop.clientWidth - 4) { snapWin(win, 'right'); }
        }
        handle.addEventListener('pointerup', release);
        handle.addEventListener('pointercancel', function () { dragging = false; win.classList.remove('dragging', 'snap-hint'); });
    }

    function snapWin(win, mode) {
        var dw = desktop.clientWidth, dh = desktop.clientHeight;
        win.classList.remove('maxed');
        if (mode === 'max') { win.classList.add('maxed'); return; }
        win.style.top = '10px';
        win.style.height = (dh - 20) + 'px';
        win.style.width = (dw / 2 - 14) + 'px';
        win.style.left = (mode === 'right' ? dw / 2 + 4 : 10) + 'px';
    }

    function makeResizable(win, handle) {
        if (!handle) return;
        var sx, sy, ow, oh, resizing = false;
        handle.addEventListener('pointerdown', function (e) {
            if (win.classList.contains('maxed') || isMobile()) return;
            e.stopPropagation();
            resizing = true;
            sx = e.clientX; sy = e.clientY;
            ow = win.offsetWidth; oh = win.offsetHeight;
            win.classList.add('dragging');
            handle.setPointerCapture(e.pointerId);
        });
        handle.addEventListener('pointermove', function (e) {
            if (!resizing) return;
            var nw = Math.max(320, Math.min(ow + (e.clientX - sx), desktop.clientWidth - win.offsetLeft - 6));
            var nh = Math.max(180, Math.min(oh + (e.clientY - sy), desktop.clientHeight - win.offsetTop - 6));
            win.style.width = nw + 'px';
            win.style.height = nh + 'px';
        });
        function stop() { resizing = false; win.classList.remove('dragging'); }
        handle.addEventListener('pointerup', stop);
        handle.addEventListener('pointercancel', stop);
    }

    function animateBars(scope) {
        var fills = scope.querySelectorAll('.bar-fill');
        setTimeout(function () {
            fills.forEach(function (f) { f.style.width = f.getAttribute('data-w') + '%'; });
        }, reduceMotion ? 0 : 250);
    }

    /* ============================================================
       VIRTUAL FILE SYSTEM  +  FINDER  +  DOCUMENT VIEWER
       ============================================================ */

    function fileSVG(kind, size) {
        size = size || 38;
        var folder = "<path d='M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z'/>";
        var doc = "<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><path d='M14 2v6h6'/>";
        var term = "<rect x='2' y='4' width='20' height='16' rx='2'/><path d='m7 9 3 3-3 3M13 15h4'/>";
        var pdf = "<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><path d='M14 2v6h6'/><path d='M9 13h6M9 17h4' stroke-width='1.7'/>";
        var url = "<path d='M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1'/><path d='M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1'/>";
        var body = kind === 'dir' ? folder
            : (kind === 'shell' || kind === 'python') ? term
            : kind === 'pdf' ? pdf
            : kind === 'url' ? url
            : doc;
        return "<svg class='fic fic-" + kind + "' viewBox='0 0 24 24' width='" + size + "' height='" + size +
            "' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'>" + body + "</svg>";
    }

    // --- project files (paired with PROJECTS by index) ---
    var PROJECT_META = [
        { slug: 'bambda-that.md',  kind: 'markdown', size: '12 KB', date: 'Mar 2025', link: 'https://github.com/kevin81767' },
        { slug: 'k-command.py',    kind: 'python',   size: '48 KB', date: 'Nov 2024', link: 'https://github.com/kevin81767' },
        { slug: 'subpull.sh',      kind: 'shell',    size: '6 KB',  date: 'Aug 2024', link: 'https://github.com/kevin81767' },
        { slug: 'lazy-bbh.sh',     kind: 'shell',    size: '9 KB',  date: 'Jun 2024', link: 'https://github.com/kevin81767' },
        { slug: 'onion-resume.md', kind: 'markdown', size: '4 KB',  date: 'Feb 2024', link: 'https://github.com/kevin81767' },
        { slug: 'intore-lab.md',   kind: 'markdown', size: '7 KB',  date: '2019',     link: 'https://github.com/kevin81767' }
    ];

    var MEDIA = [
        { name: 'minict-award.url',      src: 'MINICT',      title: 'The winners of Cyber Stars of Rwanda competition rewarded by the Ministry', href: 'https://minict.prod.risa.rw/news-detail/the-winners-of-cyber-stars-of-rwanda-competition-rewarded-by-the-ministry' },
        { name: 'cyberstars-2018.url',   src: 'CyberStars',  title: 'CyberStars of Rwanda 2018 — Overall Winner & Best Attacker', href: 'https://cyberstars.pro/cyberstars-of-rwanda-2018/' },
        { name: 'newtimes.md',           src: 'New Times',   title: 'Cybersecurity efforts mobilise local innovative solutions' },
        { name: 'igihe-competition.md',  src: 'IGIHE',       title: '12 students compete in cybersecurity defense competition' },
        { name: 'cyberranges-report.md', src: 'CyberRanges', title: 'CyberStars of Rwanda 2018 — event report' },
        { name: 'igihe-safety.md',       src: 'IGIHE',       title: 'How to stay safe from cyber attacks in today’s world' }
    ];

    function docShell(inner) { return '<div class="doc">' + inner + '</div>'; }

    function projectDoc(p, m) {
        return docShell(
            '<div class="doc-head">' + fileSVG(m.kind, 44) +
                '<div><h2 class="doc-title">' + esc(p.name) + '</h2>' +
                '<p class="doc-sub mono">' + m.kind + ' · ' + m.size + ' · modified ' + m.date + '</p></div></div>' +
            '<p class="doc-body">' + esc(p.desc) + '</p>' +
            '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
            '<div class="app-actions"><a class="btn btn-primary" href="' + m.link + '" target="_blank" rel="noopener">view on github ↗</a>' +
            '<button class="btn btn-ghost" data-open="contact">discuss it</button></div>'
        );
    }

    function skillDoc(title, items) {
        return docShell(
            '<div class="doc-head">' + fileSVG('list', 44) + '<div><h2 class="doc-title">~/' + esc(title) + '</h2>' +
            '<p class="doc-sub mono">' + items.length + ' entries</p></div></div>' +
            '<div class="chips">' + items.map(function (i) { return '<span class="chip">' + esc(i) + '</span>'; }).join('') + '</div>'
        );
    }

    function mediaDoc(item) {
        return docShell(
            '<div class="doc-head">' + fileSVG(item.href ? 'url' : 'markdown', 44) +
            '<div><h2 class="doc-title">' + esc(item.src) + '</h2><p class="doc-sub mono">press mention</p></div></div>' +
            '<p class="doc-body">' + esc(item.title) + '</p>' +
            (item.href ? '<div class="app-actions"><a class="btn btn-primary" href="' + item.href + '" target="_blank" rel="noopener">read article ↗</a></div>'
                       : '<p class="doc-sub mono">offline archive — no live link</p>')
        );
    }

    // --- build the tree ---
    var projectChildren = {};
    PROJECTS.forEach(function (p, i) {
        var m = PROJECT_META[i];
        projectChildren[m.slug] = {
            type: 'file', kind: m.kind, size: m.size, date: m.date,
            text: p.name + '\n\n' + p.desc + '\n\ntags: ' + p.tags.join(', ') + '\nrepo: ' + m.link,
            doc: projectDoc(p, m)
        };
    });

    var skillChildren = { 'scan_skills.sh': { type: 'file', kind: 'shell', size: '2 KB', date: '2025', appId: 'skills', text: '# run: opens the animated skill scan\nopen skills' } };
    skillChildren['languages.cfg'] = { type: 'file', kind: 'list', size: '1 KB', date: '2025',
        text: SKILL_BARS.map(function (s) { return s.name + ' = ' + s.level + '%'; }).join('\n'),
        doc: skillDoc('languages', SKILL_BARS.map(function (s) { return s.name + ' — ' + s.level + '%'; })) };
    SKILL_GROUPS.forEach(function (g) {
        skillChildren[g.title + '.list'] = { type: 'file', kind: 'list', size: '1 KB', date: '2025',
            text: g.items.join('\n'), doc: skillDoc(g.title, g.items) };
    });

    var mediaChildren = {};
    MEDIA.forEach(function (item) {
        mediaChildren[item.name] = {
            type: 'file', kind: item.href ? 'url' : 'markdown', size: '2 KB', date: '2018',
            href: item.href || null, text: item.src + ': ' + item.title + (item.href ? '\n' + item.href : ''),
            doc: mediaDoc(item)
        };
    });

    var trashChildren = {
        'old_portfolio_2019.html': { type: 'file', kind: 'html', size: '820 KB', date: '2019',
            text: 'deprecated. do not restore. seriously.',
            doc: docShell('<div class="doc-head">' + fileSVG('html', 44) + '<div><h2 class="doc-title">old_portfolio_2019.html</h2><p class="doc-sub mono">deleted · 820 KB</p></div></div><p class="doc-body">bootstrap carousels, jQuery spaghetti, and a spinning logo. We do not speak of it. 💀</p>') },
        'jquery-3.1.1.min.js': { type: 'file', kind: 'js', size: '86 KB', date: '2019',
            text: '// you no longer need me',
            doc: docShell('<div class="doc-head">' + fileSVG('js', 44) + '<div><h2 class="doc-title">jquery-3.1.1.min.js</h2><p class="doc-sub mono">deleted · 86 KB</p></div></div><p class="doc-body">Replaced by ~950 lines of hand-written vanilla JS. No frameworks were harmed since.</p>') },
        'passwords.txt': { type: 'file', kind: 'text', size: '0 KB', date: 'never',
            text: 'nice try 😄',
            doc: docShell('<div class="doc-head">' + fileSVG('text', 44) + '<div><h2 class="doc-title">passwords.txt</h2><p class="doc-sub mono">0 bytes</p></div></div><p class="doc-body">nice try 😄 — a security engineer never stores plaintext credentials.</p>') }
    };

    var README_TEXT = 'KERMINAL OS — the portfolio of Kevin Nyawakira.\n\nThis is a fake operating system you can actually use.\n• Double-click folders to browse them.\n• Double-click files to open them.\n• Everything here is also reachable from the terminal (try `ls`, `cd projects`, `cat about.md`).\n• Press ⌘K / Ctrl+K for Spotlight search.';

    var VFS = {
        type: 'dir',
        children: {
            'about.md':       { type: 'file', kind: 'markdown', size: '3 KB',  date: '2025', appId: 'about', text: ABOUT_TEXT },
            'projects':       { type: 'dir', size: PROJECTS.length + ' items', date: '2025', children: projectChildren },
            'skills':         { type: 'dir', size: Object.keys(skillChildren).length + ' items', date: '2025', children: skillChildren },
            'experience.log': { type: 'file', kind: 'log', size: '5 KB', date: '2025', appId: 'experience', text: EXPERIENCE_LOG },
            'media':          { type: 'dir', size: MEDIA.length + ' items', date: '2018', children: mediaChildren },
            'contact.sh':     { type: 'file', kind: 'shell', size: '1 KB', date: '2025', appId: 'contact', text: CONTACT_SH },
            'CV.pdf':         { type: 'file', kind: 'pdf', size: '227 KB', date: '2025', download: 'kevinNyawakira_CV.pdf', text: '[binary] use `cv` to download' },
            'README.md':      { type: 'file', kind: 'markdown', size: '1 KB', date: '2025', text: README_TEXT,
                                doc: docShell('<div class="doc-head">' + fileSVG('markdown', 44) + '<div><h2 class="doc-title">README.md</h2><p class="doc-sub mono">markdown · 1 KB</p></div></div><pre class="doc-pre">' + esc(README_TEXT) + '</pre>') },
            '.trash':         { type: 'dir', hidden: true, size: '3 items', date: '2019', children: trashChildren }
        }
    };

    var FAVORITES = [
        { path: '~', label: 'kevin', kind: 'home' },
        { path: '~/projects', label: 'projects', kind: 'dir' },
        { path: '~/skills', label: 'skills', kind: 'dir' },
        { path: '~/media', label: 'media', kind: 'dir' },
        { path: '~/.trash', label: 'trash', kind: 'trash' }
    ];

    // --- path helpers ---
    function normalizePath(p) {
        p = (p || '~').trim();
        if (p === '' || p === '~' || p === '/') return '~';
        p = p.replace(/\/+$/, '');
        return p;
    }
    function resolvePath(p) {
        p = normalizePath(p);
        if (p === '~') return VFS;
        var segs = p.split('/');
        var node = VFS;
        for (var i = 1; i < segs.length; i++) {
            if (!node.children || !node.children[segs[i]]) return null;
            node = node.children[segs[i]];
        }
        return node;
    }
    function joinPath(dir, name) { return dir === '~' ? '~/' + name : dir + '/' + name; }
    function parentPath(p) { p = normalizePath(p); if (p === '~') return '~'; var s = p.split('/'); s.pop(); return s.length <= 1 ? '~' : s.join('/'); }
    function baseName(p) { p = normalizePath(p); if (p === '~') return 'kevin'; var s = p.split('/'); return s[s.length - 1]; }
    function prettyPath(p) { p = normalizePath(p); return p.replace('~', 'kevin').split('/').join(' ▸ '); }
    function unixPath(p) { p = normalizePath(p); return p === '~' ? '/home/kevin' : p.replace('~', '/home/kevin'); }

    // --- open a node by path ---
    function openNode(path, node) {
        node = node || resolvePath(path);
        if (!node) return false;
        if (node.type === 'dir') { openFinder(path); return true; }
        if (node.appId) { wm.open(node.appId); return true; }
        if (node.download) { downloadCV(); return true; }
        if (node.href) { window.open(node.href, '_blank', 'noopener'); return true; }
        openDoc(path, node);
        return true;
    }

    function downloadCV() {
        var a = document.createElement('a');
        a.href = 'kevinNyawakira_CV.pdf';
        a.download = 'kevinNyawakira_CV.pdf';
        document.body.appendChild(a); a.click(); a.remove();
    }

    // --- document viewer window ---
    function openDoc(path, node) {
        node = node || resolvePath(path);
        if (!node) return;
        var id = 'doc:' + path;
        wm.spawn(id, {
            title: baseName(path), className: 'win-doc', w: 520, h: 460, dynamic: true, sbLabel: baseName(path),
            build: function (body) {
                body.innerHTML = (typeof node.doc === 'function' ? node.doc() : node.doc) ||
                    docShell('<div class="doc-head">' + fileSVG(node.kind || 'text', 44) + '<div><h2 class="doc-title">' + esc(baseName(path)) + '</h2><p class="doc-sub mono">' + (node.kind || 'file') + '</p></div></div><pre class="doc-pre">' + esc(node.text || '(empty)') + '</pre>');
                body.addEventListener('click', function (e) {
                    var t = e.target.closest('[data-open]');
                    if (t) { e.preventDefault(); wm.open(t.getAttribute('data-open')); }
                });
            }
        });
    }

    // --- Finder ---
    var finderState = null;
    var finderEl = null;

    function finderShellHTML() {
        var favs = FAVORITES.map(function (f) {
            var ic = f.kind === 'home' ? '⌂' : f.kind === 'trash' ? '⌫' : '📁';
            return '<button class="fnd-fav" data-path="' + f.path + '"><span class="fav-ic">' + ic + '</span>' + esc(f.label) + '</button>';
        }).join('');
        return '<div class="finder">' +
            '<aside class="fnd-side">' +
                '<div class="fnd-side-h">Favorites</div>' + favs +
            '</aside>' +
            '<div class="fnd-main">' +
                '<div class="fnd-toolbar">' +
                    '<button class="fnd-nav fnd-back" title="Back">‹</button>' +
                    '<button class="fnd-nav fnd-fwd" title="Forward">›</button>' +
                    '<div class="fnd-crumbs"></div>' +
                    '<div class="fnd-view">' +
                        '<button data-v="icon" title="Icons">▦</button>' +
                        '<button data-v="list" title="List">☰</button>' +
                    '</div>' +
                '</div>' +
                '<div class="fnd-content" tabindex="0"></div>' +
                '<div class="fnd-status"></div>' +
            '</div>' +
        '</div>';
    }

    function openFinder(path) {
        path = normalizePath(path || '~');
        var node = resolvePath(path);
        if (!node || node.type !== 'dir') { path = '~'; }
        if (wm.wins['finder']) { finderNavigate(path, true); wm.focus('finder'); return; }
        finderState = { path: path, hist: [path], hIndex: 0, view: (finderState && finderState.view) || 'icon' };
        wm.spawn('finder', {
            title: 'Finder — ' + prettyPath(path), className: 'win-finder', w: 720, h: 480,
            dynamic: true, sbLabel: 'finder',
            build: function (body) {
                body.innerHTML = finderShellHTML();
                finderEl = body.querySelector('.finder');
                wireFinder();
            },
            onOpen: function () { renderFinder(); }
        });
    }

    function wireFinder() {
        finderEl.querySelectorAll('.fnd-fav').forEach(function (b) {
            b.addEventListener('click', function () { finderNavigate(b.getAttribute('data-path'), true); });
        });
        finderEl.querySelector('.fnd-back').addEventListener('click', function () {
            if (finderState.hIndex > 0) { finderState.hIndex--; finderNavigate(finderState.hist[finderState.hIndex], false); }
        });
        finderEl.querySelector('.fnd-fwd').addEventListener('click', function () {
            if (finderState.hIndex < finderState.hist.length - 1) { finderState.hIndex++; finderNavigate(finderState.hist[finderState.hIndex], false); }
        });
        finderEl.querySelectorAll('.fnd-view button').forEach(function (b) {
            b.addEventListener('click', function () { finderState.view = b.getAttribute('data-v'); renderFinder(); });
        });
        var content = finderEl.querySelector('.fnd-content');
        content.addEventListener('click', function (e) {
            var crumb = e.target.closest('.crumb');
            if (crumb) { finderNavigate(crumb.getAttribute('data-path'), true); return; }
            var it = e.target.closest('.fnd-item');
            if (!it) { clearFinderSel(); return; }
            selectFinderItem(it);
            if (isMobile()) openFinderItem(it);
        });
        content.addEventListener('dblclick', function (e) {
            var it = e.target.closest('.fnd-item');
            if (it) openFinderItem(it);
        });
        // breadcrumb clicks live in toolbar
        finderEl.querySelector('.fnd-crumbs').addEventListener('click', function (e) {
            var crumb = e.target.closest('.crumb');
            if (crumb) finderNavigate(crumb.getAttribute('data-path'), true);
        });
    }

    function clearFinderSel() {
        if (finderEl) finderEl.querySelectorAll('.fnd-item.sel').forEach(function (x) { x.classList.remove('sel'); });
    }
    function selectFinderItem(it) { clearFinderSel(); it.classList.add('sel'); }
    function openFinderItem(it) {
        var name = it.getAttribute('data-name');
        var childPath = joinPath(finderState.path, name);
        openNode(childPath);
    }

    function finderNavigate(path, push) {
        path = normalizePath(path);
        var node = resolvePath(path);
        if (!node || node.type !== 'dir') return;
        if (push) {
            finderState.hist = finderState.hist.slice(0, finderState.hIndex + 1);
            if (finderState.hist[finderState.hIndex] !== path) { finderState.hist.push(path); finderState.hIndex++; }
        }
        finderState.path = path;
        renderFinder();
        var rec = wm.wins['finder'];
        if (rec) {
            rec.el.querySelector('.win-title').textContent = 'Finder — ' + prettyPath(path);
        }
    }

    function renderFinder() {
        if (!finderEl) return;
        var node = resolvePath(finderState.path) || VFS;
        // crumbs
        var segs = normalizePath(finderState.path).split('/');
        var acc = '', crumbs = [];
        segs.forEach(function (s, i) {
            acc = i === 0 ? '~' : acc + '/' + s;
            crumbs.push('<button class="crumb" data-path="' + acc + '">' + esc(i === 0 ? 'kevin' : s) + '</button>');
        });
        finderEl.querySelector('.fnd-crumbs').innerHTML = crumbs.join('<span class="crumb-sep">›</span>');
        // nav buttons
        finderEl.querySelector('.fnd-back').disabled = finderState.hIndex <= 0;
        finderEl.querySelector('.fnd-fwd').disabled = finderState.hIndex >= finderState.hist.length - 1;
        // favorites active state
        finderEl.querySelectorAll('.fnd-fav').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-path') === finderState.path);
        });
        // content
        var names = Object.keys(node.children || {});
        var content = finderEl.querySelector('.fnd-content');
        content.className = 'fnd-content view-' + finderState.view;
        content.innerHTML = names.map(function (name) {
            var c = node.children[name];
            var kind = c.type === 'dir' ? 'dir' : (c.kind || 'file');
            if (finderState.view === 'list') {
                return '<div class="fnd-item" data-name="' + esc(name) + '">' +
                    '<span class="fi-ic">' + fileSVG(kind, 20) + '</span>' +
                    '<span class="fi-name">' + esc(name) + '</span>' +
                    '<span class="fi-kind mono">' + (c.type === 'dir' ? 'folder' : kind) + '</span>' +
                    '<span class="fi-size mono">' + (c.size || '—') + '</span>' +
                    '<span class="fi-date mono">' + (c.date || '') + '</span></div>';
            }
            return '<button class="fnd-item" data-name="' + esc(name) + '">' +
                '<span class="fi-ic">' + fileSVG(kind, 40) + '</span>' +
                '<span class="fi-name">' + esc(name) + '</span></button>';
        }).join('') || '<p class="fnd-empty mono">— empty —</p>';
        // status
        var caps = ['3.2 TB of exploits available', 'plenty of 0-days left', 'no malware detected', 'coffee: 12%'];
        finderEl.querySelector('.fnd-status').innerHTML =
            '<span>' + names.length + ' item' + (names.length === 1 ? '' : 's') + '</span>' +
            '<span class="mono">guest@kerminal · ' + caps[names.length % caps.length] + '</span>';
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
        // dynamic windows (Finder / documents) — appended after the fixed apps
        var n = APP_ORDER.length;
        Object.keys(wm.wins).forEach(function (id) {
            var w = wm.wins[id];
            if (!w.dynamic) return;
            var b = document.createElement('button');
            var suffix = (!w.minimized && wm.activeId === id) ? '*' : (w.minimized ? '-' : '');
            b.className = 'sb-app open' +
                (w.minimized ? ' min' : '') +
                (wm.activeId === id && !w.minimized ? ' active' : '');
            b.textContent = (n++) + ':' + w.sbLabel + suffix;
            b.addEventListener('click', function () {
                if (w.minimized) { wm.restore(id); wm.focus(id); }
                else if (wm.activeId === id) { wm.minimize(id); }
                else wm.focus(id);
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
    var cwd = '~';   // terminal working directory (into the VFS)

    var FILES = {
        'about.md': ABOUT_TEXT,
        'experience.log': EXPERIENCE_LOG,
        'contact.sh': CONTACT_SH,
        'README.md': 'KERMINAL OS — the portfolio of Kevin Nyawakira.\nType `help` to see what this shell can do.\nTip: `open projects` launches a Finder window. `matrix` is fun.',
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
               '<span class="t-prompt-path">' + esc(normalizePath(cwd)) + '</span><span class="t-prompt-sign">$</span>';
    }

    function updatePrompt() {
        var line = inputLineEl();
        if (!line) return;
        var pe = line.querySelector('.t-prompt');
        if (pe) pe.innerHTML = promptHTML();
    }

    function buildTerminal(body) {
        termScroll = document.createElement('div');
        termScroll.className = 'term-scroll';

        // welcome
        var wel = document.createElement('div');
        wel.innerHTML =
            '<p class="t-line t-ok">Welcome to KERMINAL OS v3.0 (zsh 5.9)</p>' +
            '<p class="t-line t-muted">Kevin Nyawakira — Senior Application Security Engineer &amp; Security Researcher</p>' +
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
        line.innerHTML = '<span class="t-prompt">' + promptHTML() + '</span>';
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
            pool = Object.keys(COMMANDS).filter(function (c) { return c.charAt(0) !== '_'; });
        } else if (parts[0] === 'close') {
            pool = APP_ORDER;
        } else if (parts[0] === 'cd' || parts[0] === 'ls' || parts[0] === 'cat' || parts[0] === 'open') {
            var node = resolvePath(cwd);
            pool = node && node.children ? Object.keys(node.children) : [];
        } else { return; }
        var last = parts[parts.length - 1].toLowerCase();
        var matches = pool.filter(function (c) { return c.toLowerCase().indexOf(last) === 0; });
        if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            termInput.value = parts.join(' ') + (parts.length === 1 ? ' ' : '');
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
        '<span class="t-ok">██║  ██╗   </span><span class="t-cyan">Role</span>: Senior Application Security Engineer @ IREMBO\n' +
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
                ['ls [dir]', 'list a directory'],
                ['cd <dir>', 'change directory (try cd projects)'],
                ['cat <file>', 'print a file (try about.md)'],
                ['open <file|dir>', 'open in Finder / a window'],
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
            print('kevin — senior application security engineer & security researcher', '');
            print('former web developer · red teamer · builder of security tools', 't-muted');
        }},

        neofetch: { desc: '', fn: function () { printHTML(NEOFETCH); } },

        // resolve an argument to a VFS path relative to cwd (supports ~, .., absolute)
        _resolveArg: function (a) {
            if (a == null || a === '') return cwd;
            if (a === '~' || a === '/') return '~';
            if (a === '..') return parentPath(cwd);
            if (a.charAt(0) === '~') return normalizePath(a);
            return joinPath(cwd, a);
        },

        ls: { desc: '', fn: function (args) {
            var p = COMMANDS._resolveArg(args[0]);
            var node = resolvePath(p);
            if (!node) { print('ls: ' + args[0] + ': No such file or directory', 't-err'); return; }
            if (node.type !== 'dir') { print(baseName(p), ''); return; }
            var names = Object.keys(node.children || {});
            if (!names.length) { print('(empty)', 't-muted'); return; }
            printHTML('<p class="t-line">' + names.map(function (n) {
                var c = node.children[n];
                var isDir = c.type === 'dir';
                return '<button class="t-chip" data-cmd="open ' + joinPath(p, n) + '">' + esc(n) + (isDir ? '/' : '') + '</button>';
            }).join(' ') + '</p>');
        }},

        cd: { desc: '', fn: function (args) {
            var p = COMMANDS._resolveArg(args[0]);
            var node = resolvePath(p);
            if (!node) { print('cd: no such file or directory: ' + args[0], 't-err'); return; }
            if (node.type !== 'dir') { print('cd: not a directory: ' + args[0], 't-err'); return; }
            cwd = normalizePath(p);
            updatePrompt();
        }},

        cat: { desc: '', fn: function (args) {
            var a = args[0];
            if (!a) { print('usage: cat <file>', 't-err'); return; }
            var p = COMMANDS._resolveArg(a);
            var node = resolvePath(p);
            if (!node) { print('cat: ' + a + ': No such file or directory', 't-err'); return; }
            if (node.type === 'dir') { print('cat: ' + a + ': Is a directory', 't-err'); return; }
            if (node.download) { downloadCV(); return; }
            print(node.text || '(binary file)', '');
        }},

        open: { desc: '', fn: function (args) {
            var a = args[0];
            if (!a) { print('usage: open <file|dir|app>', 't-err'); return; }
            if (a.toLowerCase() === 'cv') { downloadCV(); print('[ok] downloading CV ...', 't-ok'); return; }
            if (APPS[a.toLowerCase()]) { wm.open(a.toLowerCase()); print('[ok] ' + a + ' opened', 't-ok'); return; }
            var p = COMMANDS._resolveArg(a);
            var node = resolvePath(p);
            if (!node) { print('open: cannot open "' + a + '": no such file or app', 't-err'); return; }
            openNode(p, node);
            print('[ok] opened ' + baseName(p), 't-ok');
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

        pwd: { desc: '', fn: function () { print(unixPath(cwd), ''); } },
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
    document.querySelectorAll('.dicon[data-path]').forEach(function (b) {
        b.addEventListener('click', function () { openFinder(b.getAttribute('data-path')); });
    });

    /* ============================================================
       OS CHROME — menu bar, context menus, Get Info
       ============================================================ */

    function toggleTheme() { setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    function setFinderView(v) {
        if (!finderState) openFinder('~');
        finderState.view = v;
        if (finderEl) renderFinder();
        if (wm.wins['finder']) wm.focus('finder');
    }

    function aboutComputer() {
        var html = docShell(
            '<div class="doc-head">' + fileSVG('file', 44) + '<div><h2 class="doc-title">KERMINAL OS</h2><p class="doc-sub mono">version 3.0 · single-user</p></div></div>' +
            '<dl class="info-grid">' +
            '<dt>Machine</dt><dd>Kerminal Workstation</dd>' +
            '<dt>Processor</dt><dd>caffeine-fueled @ 3.80GHz</dd>' +
            '<dt>Memory</dt><dd>enough</dd>' +
            '<dt>Graphics</dt><dd>Matrix Rain Accelerator</dd>' +
            '<dt>Uptime</dt><dd>8+ years in security</dd>' +
            '<dt>Operator</dt><dd>kevin nyawakira</dd>' +
            '<dt>Role</dt><dd>Senior AppSec Engineer @ IREMBO</dd>' +
            '</dl>' +
            '<div class="app-actions"><button class="btn btn-ghost" data-open="contact">say hi</button></div>'
        );
        wm.spawn('about-computer', {
            title: 'About This Computer', className: 'win-doc', w: 420, h: 430, dynamic: true, sbLabel: 'about-mac',
            build: function (b) {
                b.innerHTML = html;
                b.addEventListener('click', function (e) { var t = e.target.closest('[data-open]'); if (t) { e.preventDefault(); wm.open(t.getAttribute('data-open')); } });
            }
        });
    }

    function getInfo(path, node) {
        node = node || resolvePath(path);
        if (!node) return;
        var kind = node.type === 'dir' ? 'Folder' : (node.kind || 'Document');
        var html = docShell(
            '<div class="doc-head">' + fileSVG(node.type === 'dir' ? 'dir' : (node.kind || 'file'), 44) +
            '<div><h2 class="doc-title">' + esc(baseName(path)) + '</h2><p class="doc-sub mono">' + esc(kind) + '</p></div></div>' +
            '<dl class="info-grid">' +
            '<dt>Kind</dt><dd>' + esc(kind) + '</dd>' +
            '<dt>Size</dt><dd>' + esc(node.size || '—') + '</dd>' +
            '<dt>Where</dt><dd>' + esc(unixPath(parentPath(path))) + '</dd>' +
            '<dt>Modified</dt><dd>' + esc(node.date || '—') + '</dd>' +
            (node.type === 'dir' ? '<dt>Items</dt><dd>' + Object.keys(node.children || {}).length + '</dd>' : '') +
            '</dl>'
        );
        wm.spawn('info:' + path, { title: 'Info — ' + baseName(path), className: 'win-doc', w: 340, h: 360, dynamic: true, sbLabel: 'info', build: function (b) { b.innerHTML = html; } });
    }

    // shared item builder for dropdowns + context menus
    function buildMenuItems(container, items, after) {
        container.innerHTML = '';
        items.forEach(function (it) {
            if (it.sep) { var s = document.createElement('div'); s.className = 'menu-sep'; container.appendChild(s); return; }
            var b = document.createElement('button');
            b.innerHTML = '<span>' + esc(it.label) + '</span>' + (it.key ? '<span class="mk">' + esc(it.key) + '</span>' : '');
            if (it.disabled) b.disabled = true;
            b.addEventListener('click', function (e) { e.stopPropagation(); if (it.act) it.act(); if (after) after(); });
            container.appendChild(b);
        });
    }

    var MENUS = [
        { label: '⌘ KERMINAL', brand: true, items: [
            { label: 'About This Computer', act: aboutComputer },
            { sep: true },
            { label: 'Toggle Theme', act: toggleTheme },
            { label: 'Enter the Matrix', act: function () { COMMANDS.matrix.fn([]); } }
        ]},
        { label: 'File', items: [
            { label: 'New Terminal Window', act: function () { wm.open('terminal'); } },
            { label: 'New Finder Window', act: function () { openFinder('~'); } },
            { sep: true },
            { label: 'Close Window', act: function () { if (wm.activeId) wm.close(wm.activeId); } }
        ]},
        { label: 'View', items: [
            { label: 'as Icons', act: function () { setFinderView('icon'); } },
            { label: 'as List', act: function () { setFinderView('list'); } },
            { sep: true },
            { label: 'Toggle Full Screen', act: function () { if (wm.activeId) wm.toggleMax(wm.activeId); } }
        ]},
        { label: 'Go', items: FAVORITES.map(function (f) { return { label: f.label === 'kevin' ? 'Home' : cap(f.label), act: function () { openFinder(f.path); } }; }) },
        { label: 'Help', items: [
            { label: 'README', act: function () { openNode('~/README.md'); } },
            { label: 'About This Computer', act: aboutComputer }
        ]}
    ];

    (function buildMenuBar() {
        var mb = document.getElementById('menubar');
        if (!mb) return;
        var openIdx = -1, pop = null;

        function closeMenu() {
            if (pop) { pop.remove(); pop = null; }
            if (openIdx >= 0 && MENUS[openIdx]._btn) MENUS[openIdx]._btn.classList.remove('open');
            openIdx = -1;
        }
        function openMenu(idx) {
            closeMenu();
            openIdx = idx;
            var btn = MENUS[idx]._btn;
            btn.classList.add('open');
            pop = document.createElement('div');
            pop.className = 'menu-pop';
            buildMenuItems(pop, MENUS[idx].items, closeMenu);
            document.body.appendChild(pop);
            var r = btn.getBoundingClientRect();
            pop.style.left = Math.min(r.left, window.innerWidth - pop.offsetWidth - 8) + 'px';
            pop.style.top = '26px';
        }

        MENUS.forEach(function (m, idx) {
            var btn = document.createElement('button');
            btn.className = 'mb-item' + (m.brand ? ' brand' : '');
            btn.textContent = m.label;
            btn.addEventListener('click', function (e) { e.stopPropagation(); (openIdx === idx) ? closeMenu() : openMenu(idx); });
            btn.addEventListener('mouseenter', function () { if (openIdx >= 0 && openIdx !== idx) openMenu(idx); });
            mb.appendChild(btn);
            m._btn = btn;
        });
        var spacer = document.createElement('div'); spacer.className = 'mb-spacer'; mb.appendChild(spacer);
        var right = document.createElement('div'); right.className = 'mb-right'; right.textContent = 'kevin@kerminal'; mb.appendChild(right);

        document.addEventListener('click', closeMenu);
    })();

    (function contextMenus() {
        var ctx = document.getElementById('ctxmenu');
        if (!ctx) return;
        function hide() { ctx.hidden = true; }
        function show(x, y, items) {
            buildMenuItems(ctx, items, hide);
            ctx.hidden = false;
            ctx.style.left = Math.min(x, window.innerWidth - ctx.offsetWidth - 8) + 'px';
            ctx.style.top = Math.min(y, window.innerHeight - ctx.offsetHeight - 8) + 'px';
        }
        document.addEventListener('click', hide);
        window.addEventListener('blur', hide);
        document.addEventListener('contextmenu', function (e) {
            var item = e.target.closest('.fnd-item');
            if (item && finderEl && finderEl.contains(item)) {
                e.preventDefault();
                var path = joinPath(finderState.path, item.getAttribute('data-name'));
                var node = resolvePath(path);
                var items = [
                    { label: 'Open', act: function () { openNode(path, node); } },
                    { label: 'Get Info', act: function () { getInfo(path, node); } }
                ];
                if (node && node.download) items.push({ sep: true }, { label: 'Download', act: downloadCV });
                if (node && node.href) items.push({ sep: true }, { label: 'Open Link', act: function () { window.open(node.href, '_blank', 'noopener'); } });
                show(e.clientX, e.clientY, items);
                return;
            }
            if (!e.target.closest('.win') && !e.target.closest('#menubar')) {
                e.preventDefault();
                show(e.clientX, e.clientY, [
                    { label: 'New Terminal Window', act: function () { wm.open('terminal'); } },
                    { label: 'New Finder Window', act: function () { openFinder('~'); } },
                    { sep: true },
                    { label: 'Toggle Theme', act: toggleTheme },
                    { label: 'Enter the Matrix', act: function () { COMMANDS.matrix.fn([]); } }
                ]);
            }
        });
    })();

    /* ============================================================
       DELIGHT — Spotlight, Quick Look, toasts
       ============================================================ */

    function iconKind(entry) {
        return entry.kind === 'folder' ? 'dir' : entry.kind === 'app' ? 'file' : entry.kind === 'cmd' ? 'shell' : entry.kind;
    }

    function buildSearchIndex() {
        var out = [];
        (function walk(node, path) {
            Object.keys(node.children || {}).forEach(function (name) {
                var c = node.children[name];
                var p = joinPath(path, name);
                out.push({ label: name, sub: unixPath(p), path: p, kind: c.type === 'dir' ? 'folder' : (c.kind || 'file') });
                if (c.type === 'dir') walk(c, p);
            });
        })(VFS, '~');
        APP_ORDER.forEach(function (id) { out.push({ label: id, sub: 'application', app: id, kind: 'app' }); });
        [['matrix', 'follow the white rabbit'], ['neofetch', 'system / profile info'], ['theme', 'toggle light / dark']]
            .forEach(function (c) { out.push({ label: c[0], sub: c[1], cmd: c[0], kind: 'cmd' }); });
        return out;
    }
    var SEARCH_INDEX = buildSearchIndex();

    function scoreEntry(hay, q) {
        hay = hay.toLowerCase();
        var i = hay.indexOf(q);
        if (i >= 0) return 100 - i;
        var qi = 0;
        for (var k = 0; k < hay.length && qi < q.length; k++) if (hay[k] === q[qi]) qi++;
        return qi === q.length ? 10 : -1;
    }

    function openEntry(e) {
        closeSpotlight();
        if (e.app) { wm.open(e.app); return; }
        if (e.cmd) {
            if (e.cmd === 'theme') { toggleTheme(); return; }
            wm.open('terminal'); setTimeout(function () { runCommand(e.cmd); }, 140); return;
        }
        if (e.path) openNode(e.path);
    }

    var spotlightSel = 0, spotlightHits = [];
    function renderSpotlight(q) {
        var list = document.getElementById('slResults');
        q = (q || '').trim().toLowerCase();
        if (!q) {
            spotlightHits = SEARCH_INDEX.filter(function (e) { return e.app || e.cmd || e.path && e.path.split('/').length <= 2; }).slice(0, 8);
        } else {
            spotlightHits = SEARCH_INDEX.map(function (e) { return { e: e, s: scoreEntry(e.label + ' ' + e.sub, q) }; })
                .filter(function (x) { return x.s >= 0; })
                .sort(function (a, b) { return b.s - a.s; })
                .slice(0, 9).map(function (x) { return x.e; });
        }
        spotlightSel = 0;
        if (!spotlightHits.length) { list.innerHTML = '<div class="sl-empty">no matches</div>'; return; }
        list.innerHTML = spotlightHits.map(function (e, i) {
            var tag = e.app ? 'app' : e.cmd ? 'cmd' : e.kind === 'folder' ? 'folder' : 'file';
            return '<div class="sl-row' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' +
                fileSVG(iconKind(e), 22) +
                '<div class="sl-main"><span class="sl-label">' + esc(e.label) + '</span><span class="sl-sub">' + esc(e.sub) + '</span></div>' +
                '<span class="sl-tag">' + tag + '</span></div>';
        }).join('');
    }
    function highlightSpotlight() {
        var rows = document.querySelectorAll('#slResults .sl-row');
        rows.forEach(function (r, i) { r.classList.toggle('active', i === spotlightSel); });
        if (rows[spotlightSel]) rows[spotlightSel].scrollIntoView({ block: 'nearest' });
    }
    function openSpotlight() {
        var sp = document.getElementById('spotlight');
        sp.hidden = false;
        var inp = document.getElementById('slInput');
        inp.value = '';
        renderSpotlight('');
        setTimeout(function () { inp.focus(); }, 20);
    }
    function closeSpotlight() { document.getElementById('spotlight').hidden = true; }
    function spotlightOpen() { return !document.getElementById('spotlight').hidden; }

    (function wireSpotlight() {
        var sp = document.getElementById('spotlight');
        var inp = document.getElementById('slInput');
        var list = document.getElementById('slResults');
        inp.addEventListener('input', function () { renderSpotlight(inp.value); });
        inp.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); spotlightSel = Math.min(spotlightSel + 1, spotlightHits.length - 1); highlightSpotlight(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); spotlightSel = Math.max(spotlightSel - 1, 0); highlightSpotlight(); }
            else if (e.key === 'Enter') { e.preventDefault(); if (spotlightHits[spotlightSel]) openEntry(spotlightHits[spotlightSel]); }
            else if (e.key === 'Escape') { e.preventDefault(); closeSpotlight(); }
        });
        list.addEventListener('click', function (e) {
            var row = e.target.closest('.sl-row');
            if (row) openEntry(spotlightHits[+row.getAttribute('data-i')]);
        });
        sp.addEventListener('click', function (e) { if (e.target === sp) closeSpotlight(); });
    })();

    // ---- Quick Look ----
    function quickLook(path) {
        var node = resolvePath(path);
        if (!node) return;
        var ql = document.getElementById('quicklook');
        var inner = node.type === 'dir'
            ? docShell('<div class="doc-head">' + fileSVG('dir', 44) + '<div><h2 class="doc-title">' + esc(baseName(path)) + '</h2><p class="doc-sub mono">folder · ' + Object.keys(node.children || {}).length + ' items</p></div></div>')
            : (typeof node.doc === 'function' ? node.doc() : node.doc) ||
              docShell('<div class="doc-head">' + fileSVG(node.kind || 'file', 44) + '<div><h2 class="doc-title">' + esc(baseName(path)) + '</h2><p class="doc-sub mono">' + (node.kind || 'file') + '</p></div></div><pre class="doc-pre">' + esc(node.text || '(empty)') + '</pre>');
        ql.innerHTML = '<div class="ql-card">' + inner + '</div><div class="ql-hint">Quick Look — press Space or Esc to close</div>';
        ql.hidden = false;
    }
    function closeQuickLook() { document.getElementById('quicklook').hidden = true; }
    function quickLookOpen() { return !document.getElementById('quicklook').hidden; }
    (function wireQuickLook() {
        var ql = document.getElementById('quicklook');
        ql.addEventListener('click', closeQuickLook);
    })();

    // ---- toasts ----
    function toast(msg, ms) {
        var host = document.getElementById('toasts');
        if (!host) return;
        var t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = '<svg class="ti" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/></svg><span>' + msg + '</span>';
        host.appendChild(t);
        setTimeout(function () { t.classList.add('leaving'); setTimeout(function () { t.remove(); }, 250); }, ms || 5200);
    }
    window.__toast = toast;

    // ---- global shortcuts ----
    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            spotlightOpen() ? closeSpotlight() : openSpotlight();
            return;
        }
        if (e.key === 'Escape') {
            if (spotlightOpen()) closeSpotlight();
            if (quickLookOpen()) closeQuickLook();
            return;
        }
        if (e.key === ' ' || e.code === 'Space') {
            var ae = document.activeElement;
            if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')) return;
            if (spotlightOpen()) return;
            if (quickLookOpen()) { e.preventDefault(); closeQuickLook(); return; }
            if (finderEl && finderState) {
                var sel = finderEl.querySelector('.fnd-item.sel');
                if (sel) { e.preventDefault(); quickLook(joinPath(finderState.path, sel.getAttribute('data-name'))); }
            }
        }
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
            if (!sessionStorage.getItem('tipShown') && !isMobile()) {
                sessionStorage.setItem('tipShown', '1');
                setTimeout(function () { if (window.__toast) window.__toast('Tip: press ⌘K (Ctrl+K) to search files, apps &amp; commands.'); }, 1600);
            }
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
