// Modern Hacker Theme JavaScript

// Theme switcher functionality
const themes = {
    agnoster: {
        name: 'Agnoster',
        class: ''
    },
    powerlevel10k: {
        name: 'Powerlevel10k',
        class: 'powerlevel10k'
    },
    dracula: {
        name: 'Dracula',
        class: 'dracula'
    }
};

// Add theme switcher to page
function createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.innerHTML = `
        <div id="theme-switcher" style="
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 10px;
            font-family: var(--font-mono);
            font-size: 12px;
        ">
            <label style="color: var(--text-secondary); margin-right: 10px;">Theme:</label>
            <select id="theme-select" style="
                background: var(--bg-tertiary);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                padding: 4px 8px;
                font-family: var(--font-mono);
                font-size: 11px;
            ">
                <option value="agnoster">Agnoster</option>
                <option value="powerlevel10k">Powerlevel10k</option>
                <option value="dracula">Dracula</option>
            </select>
        </div>
    `;
    document.body.appendChild(switcher);

    // Theme switcher functionality
    const themeSelect = document.getElementById('theme-select');
    const savedTheme = localStorage.getItem('selectedTheme') || 'agnoster';
    
    // Apply saved theme
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;
    
    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        applyTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });
}

function applyTheme(themeName) {
    const root = document.documentElement;
    
    // Remove all theme classes
    Object.values(themes).forEach(theme => {
        if (theme.class) root.classList.remove(theme.class);
    });
    
    // Apply selected theme class
    if (themes[themeName] && themes[themeName].class) {
        root.classList.add(themes[themeName].class);
    }
    
    // Update terminal prompts based on theme
    updateTerminalPrompts(themeName);
}

function updateTerminalPrompts(themeName) {
    const prompts = document.querySelectorAll('.section-prompt');
    
    const promptStyles = {
        agnoster: '➜ ',
        powerlevel10k: ' ',
        dracula: '🧛 '
    };
    
    prompts.forEach(prompt => {
        const text = prompt.textContent;
        const cleanText = text.replace(/^[➜🧛]\s*/, '');
        prompt.textContent = (promptStyles[themeName] || '➜ ') + cleanText;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Create theme switcher
    createThemeSwitcher();
    
    // Loading screen - handle both possible IDs
    const loadingScreen = document.getElementById('loadingScreen') || document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 3500);
    } else {
        // If no loading screen found, just continue
        console.log('No loading screen found, continuing...');
    }

    // Typewriter effect for hero section
    const typewriter = document.getElementById('typewriter');
    const output = document.getElementById('output');
    
    if (typewriter && output) {
        const commands = [
            'whoami',
            'cat /etc/passwd | grep kevin',
            'ls -la /home/kevin/skills/',
            'sudo ./hack_the_planet.sh'
        ];
        
        const responses = [
            'kevin_nyawakira',
            'kevin:x:1000:1000:Kevin Nyawakira,,,:/home/kevin:/bin/bash',
            `total 42
drwxr-xr-x 2 kevin kevin 4096 Dec 15 10:30 .
drwxr-xr-x 3 kevin kevin 4096 Dec 15 10:30 ..
-rwxr-xr-x 1 kevin kevin  256 Dec 15 10:30 cybersecurity.sh
-rwxr-xr-x 1 kevin kevin  512 Dec 15 10:30 web_development.py
-rwxr-xr-x 1 kevin kevin  128 Dec 15 10:30 penetration_testing.rb`,
            `Access granted. Welcome to the matrix, Kevin.
Cybersecurity Expert | Full-Stack Developer
Specializing in: Penetration Testing, Web Security, Mobile Security
Status: Available for hire`
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        let isWaiting = false;
        
        function typeEffect() {
            if (isWaiting) return;
            
            const currentCommand = commands[commandIndex];
            
            if (charIndex <= currentCommand.length) {
                typewriter.textContent = currentCommand.substring(0, charIndex);
                charIndex++;
                
                if (charIndex > currentCommand.length) {
                    isWaiting = true;
                    setTimeout(() => {
                        // Show response
                        const responseDiv = document.createElement('div');
                        responseDiv.innerHTML = responses[commandIndex].replace(/\n/g, '<br>');
                        responseDiv.style.color = 'var(--output-color)';
                        responseDiv.style.marginBottom = '15px';
                        output.appendChild(responseDiv);
                        
                        // Add new prompt line
                        const newPrompt = document.createElement('div');
                        newPrompt.innerHTML = '<span style="color: var(--prompt-color);">kevin@hackbox:~$</span> ';
                        output.appendChild(newPrompt);
                        
                        commandIndex++;
                        charIndex = 0;
                        typewriter.textContent = '';
                        isWaiting = false;
                        
                        if (commandIndex >= commands.length) {
                            commandIndex = 0;
                            setTimeout(() => {
                                output.innerHTML = '';
                            }, 5000);
                        }
                    }, 1000);
                }
            }
        }
        
        // Start typewriter effect after loading
        setTimeout(() => {
            setInterval(typeEffect, 100);
        }, 4000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
    }

    // Animate skill bars when in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 200);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Add glitch effect to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Matrix rain effect
    function createMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) return;

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        // Clear existing characters
        matrixContainer.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = Math.random() * 100 + '%';
            span.style.animationDelay = Math.random() * 20 + 's';
            span.style.fontSize = Math.random() * 10 + 10 + 'px';
            span.style.color = `var(--primary-color)`;
            span.style.opacity = Math.random() * 0.5 + 0.1;
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
            span.style.animation = `matrixFall ${Math.random() * 10 + 10}s linear infinite`;
            matrixContainer.appendChild(span);
        }
    }

    // Initialize matrix rain
    setTimeout(createMatrixRain, 4000);

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add scan line effect to images
    document.querySelectorAll('.portfolio-image img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            const scanLine = document.createElement('div');
            scanLine.style.position = 'absolute';
            scanLine.style.top = '0';
            scanLine.style.left = '0';
            scanLine.style.width = '100%';
            scanLine.style.height = '2px';
            scanLine.style.background = 'var(--primary-color)';
            scanLine.style.animation = 'scanLine 1s ease-in-out';
            this.parentElement.appendChild(scanLine);
            
            setTimeout(() => {
                scanLine.remove();
            }, 1000);
        });
    });

    // Console welcome message with theme styling
    const currentTheme = localStorage.getItem('selectedTheme') || 'agnoster';
    console.log(`
    %c██╗  ██╗███████╗██╗   ██╗██╗███╗   ██╗
    ██║ ██╔╝██╔════╝██║   ██║██║████╗  ██║
    █████╔╝ █████╗  ██║   ██║██║██╔██╗ ██║
    ██╔═██╗ ██╔══╝  ╚██╗ ██╔╝██║██║╚██╗██║
    ██║  ██╗███████╗ ╚████╔╝ ██║██║ ╚████║
    ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝
    
    %cWelcome to Kevin's Digital Domain
    %cCybersecurity Expert & Full-Stack Developer
    %cCurrent Theme: ${themes[currentTheme].name}
    
    %cType 'help' for available commands...
    `, 
    'color: #268bd2; font-weight: bold;',
    'color: #2aa198; font-size: 16px;',
    'color: #859900;',
    'color: #b58900;',
    'color: #93a1a1;'
    );
});

// Add CSS for glitch animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes matrixFall {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes scanLine {
        0%, 100% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);
