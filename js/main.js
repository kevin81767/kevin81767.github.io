// Modern Hacker Theme JavaScript with Interactive Terminal

// Theme switcher functionality
const themes = {
    professional: {
        name: 'Professional',
        class: '',
        prompt: '➜',
        colors: {
            user: '#4f46e5',
            host: '#06b6d4',
            path: '#10b981',
            git: '#f59e0b'
        }
    },
    blueOcean: {
        name: 'Blue Ocean',
        class: 'blue-ocean',
        prompt: '🌊',
        colors: {
            user: '#0ea5e9',
            host: '#3b82f6',
            path: '#8b5cf6',
            git: '#10b981'
        }
    },
    warmPro: {
        name: 'Warm Professional',
        class: 'warm-pro',
        prompt: '🔥',
        colors: {
            user: '#7c3aed',
            host: '#f59e0b',
            path: '#06b6d4',
            git: '#10b981'
        }
    }
};

// Skills data for terminal display
const skillsData = {
    'Programming Languages': {
        'HTML/CSS': 100,
        'JavaScript': 90,
        'PHP': 90,
        'Python': 75,
        'Java': 70,
        'C++': 65,
        'Ruby': 60
    },
    'Frameworks & Libraries': {
        'React': 85,
        'Node.js': 80,
        'Laravel': 85,
        'Django': 70,
        'Vue.js': 75
    },
    'Cybersecurity': {
        'Penetration Testing': 95,
        'Vulnerability Assessment': 90,
        'Web App Security': 95,
        'Mobile Security': 85,
        'OSINT': 80,
        'Reverse Engineering': 75
    },
    'Tools & Technologies': {
        'Git': 90,
        'Docker': 75,
        'Linux': 95,
        'MySQL': 85,
        'MongoDB': 70
    }
};

// Terminal commands - modified to use ./ prefix
const terminalCommands = {
    './help': () => `Available commands:
  ./help          - Show this help message
  ./whoami        - Display user information
  ./skills        - Show technical skills
  ./projects      - List recent projects
  ./contact       - Show contact information
  ./clear         - Clear terminal
  ./neofetch      - System information
  ./ls            - List directory contents
  ./pwd           - Print working directory
  ./cat <file>    - Display file contents
  ./theme <name>  - Change theme (agnoster, powerlevel10k, dracula)`,

    './whoami': () => 'kermin@l',

    './skills': () => {
        let output = 'Technical Skills Overview:\n\n';
        Object.entries(skillsData).forEach(([category, skills]) => {
            output += `${category}:\n`;
            Object.entries(skills).forEach(([skill, level]) => {
                const bar = '█'.repeat(Math.floor(level / 10)) + '░'.repeat(10 - Math.floor(level / 10));
                output += `  ${skill.padEnd(20)} [${bar}] ${level}%\n`;
            });
            output += '\n';
        });
        return output;
    },

    './projects': () => `Recent Projects:
  • MeetMe Platform - Car & house rental platform (PHP, MySQL)
  • Herbmadz Satellite - Satellite services website (HTML5, CSS3, JS)
  • Security Audit Tools - Custom penetration testing scripts
  • Portfolio Website - This cybersecurity-themed portfolio

Use './cat project_name' for more details.`,

    './contact': () => `Contact Information:
  Email: kevin@hackbox.dev
  Phone: +250 784 438 186
  Location: Kigali, Rwanda

  Social Links:
  • LinkedIn: linkedin.com/in/kevin-nyawakira-558307129/
  • GitHub: github.com/kevin81767
  • Instagram: @kerminal_`,

    './neofetch': () => `                   -\`                kermin@l
                  .o+\`                 -----------------
                 \`ooo/                OS: Kali Linux x86_64
                \`+oooo:               Host: Kermin@l Terminal
               \`+oooooo:              Kernel: 5.15.0-kali
               -+oooooo+:             Uptime: 2 hours, 42 mins
             \`/:-:++oooo+:            Packages: 2847 (dpkg)
            \`/++++/+++++++:           Shell: zsh 5.8.1
           \`/++++++++++++++:          Resolution: 1920x1080
          \`/+++ooooooooooooo/\`        Terminal: kermin@l-term
         ./ooosssso++osssssso+\`       CPU: Intel i7-10700K (16) @ 3.80GHz
        .oossssso-\`\`\`\`/ossssss+\`      GPU: NVIDIA GeForce RTX 3070
       -osssssso.      :ssssssso.     Memory: 4.2GiB / 32.0GiB
      :osssssss/        osssso+++.    
     /ossssssss/        +ssssooo/-    Specialization: Cybersecurity
   \`/ossssso+/:-        -:/+osssso+-  Status: Available for hire
  \`+sso+:-\`                 \`.-/+oso: 
 \`++:.                           \`-/+/
 .\`                                 \`/`,

    './ls': () => `total 42
drwxr-xr-x 2 kevin kevin 4096 Dec 15 10:30 .
drwxr-xr-x 3 kevin kevin 4096 Dec 15 10:30 ..
-rwxr-xr-x 1 kevin kevin  256 Dec 15 10:30 cybersecurity.sh
-rwxr-xr-x 1 kevin kevin  512 Dec 15 10:30 web_development.py
-rwxr-xr-x 1 kevin kevin  128 Dec 15 10:30 penetration_testing.rb
-rwxr-xr-x 1 kevin kevin 1024 Dec 15 10:30 projects/
-rwxr-xr-x 1 kevin kevin  64 Dec 15 10:30 skills
-rw-r--r-- 1 kevin kevin  256 Dec 15 10:30 README.md`,

    './pwd': () => '/home/kevin',

    './clear': () => 'CLEAR_TERMINAL',
    
    './theme': () => `Usage: ./theme <name>
Available themes: agnoster, powerlevel10k, dracula`,
};

let currentTheme = 'agnoster';
let terminalHistory = [];
let historyIndex = -1;

// Create full-page matrix background - enhanced to cover entire page
function createMatrixBackground() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-background';
    document.body.insertBefore(matrixBg, document.body.firstChild);

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createColumn() {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        const columnText = Array.from({length: 40}, () => 
            characters[Math.floor(Math.random() * characters.length)]
        ).join('\n');
        
        column.textContent = columnText;
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 15 + 10) + 's';
        column.style.animationDelay = Math.random() * 5 + 's';
        column.style.opacity = Math.random() * 0.4 + 0.1; // Lower opacity for better readability
        
        if (Math.random() < 0.1) {
            column.classList.add('bright');
        }
        
        matrixBg.appendChild(column);
        
        setTimeout(() => {
            column.remove();
        }, 25000); // Longer duration for full-page coverage
    }

    // Create initial columns - more columns for full page
    for (let i = 0; i < 50; i++) {
        setTimeout(createColumn, i * 150);
    }

    // Continuously create new columns
    setInterval(createColumn, 400);
}

// Create interactive terminal
function createInteractiveTerminal() {
    const typewriter = document.getElementById('typewriter');
    const output = document.getElementById('output');
    const terminalBody = typewriter.closest('.terminal-body');
    
    if (!typewriter || !output) return;

    // Clear existing content
    output.innerHTML = '';
    typewriter.style.display = 'none';

    // Create terminal interface
    const terminalInterface = document.createElement('div');
    terminalInterface.innerHTML = `
        <div class="output success">Welcome to Kermin@l Terminal v2.1.0</div>
        <div class="output info">Type './help' for available commands</div>
        <div class="output">Last login: ${new Date().toLocaleString()}</div>
        <br>
    `;
    
    output.appendChild(terminalInterface);
    
    // Create input line
    createInputLine();
    
    function createInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';

        const currentThemeKey = themeKeys[currentThemeIndex] || 'professional';
        const theme = themes[currentThemeKey];
        inputLine.innerHTML = `
            <div class="zsh-prompt">
                <span class="zsh-user">kermin</span>
                <span class="zsh-at">@</span>
                <span class="zsh-host">l</span>
                <span class="zsh-path">:~</span>
                <span class="zsh-arrow">${theme.prompt}</span>
            </div>
            <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
        `;
        
        output.appendChild(inputLine);
        
        const input = inputLine.querySelector('.terminal-input');
        input.focus();
        
        input.addEventListener('keydown', handleCommand);
        
        // Auto-scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    function handleCommand(e) {
        if (e.key === 'Enter') {
            const command = e.target.value.trim();
            const inputLine = e.target.closest('.terminal-line');
            
            // Add command to history
            if (command) {
                terminalHistory.unshift(command);
                historyIndex = -1;
            }
            
            // Display command
            inputLine.querySelector('.terminal-input').style.display = 'none';
            const commandSpan = document.createElement('span');
            commandSpan.textContent = command;
            commandSpan.style.color = 'var(--text-primary)';
            inputLine.appendChild(commandSpan);
            
            // Process command
            processCommand(command);
            
            // Create new input line
            setTimeout(createInputLine, 100);
            
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < terminalHistory.length - 1) {
                historyIndex++;
                e.target.value = terminalHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                e.target.value = terminalHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                e.target.value = '';
            }
        }
    }
    
    function processCommand(command) {
        const args = command.split(' ');
        const cmd = args[0];
        
        if (cmd === './clear') {
            output.innerHTML = '';
            return;
        }
        
        if (cmd === './theme') {
            if (args[1] && themes[args[1]]) {
                applyTheme(args[1]);
                addOutput(`Theme changed to ${themes[args[1]].name}`, 'success');
                localStorage.setItem('selectedTheme', args[1]);
            } else {
                addOutput(`Usage: ./theme <name>\nAvailable themes: agnoster, powerlevel10k, dracula`, 'info');
            }
            return;
        }
        
        if (terminalCommands[cmd]) {
            const result = terminalCommands[cmd]();
            
            if (result === 'interactive_skills_display') {
                displayInteractiveSkills();
            } else {
                addOutput(result);
            }
        } else if (cmd === './cat') {
            const filename = args[1];
            if (!filename) {
                addOutput(`Usage: ./cat <filename>`, 'error');
            } else {
                addOutput(`cat: ${filename}: No such file or directory`, 'error');
            }
        } else if (command) {
            addOutput(`Command not found: ${command}. Type './help' for available commands.`, 'error');
        }
    }
    
    function addOutput(text, type = '') {
        const outputDiv = document.createElement('div');
        outputDiv.className = `output ${type}`;
        outputDiv.textContent = text;
        output.appendChild(outputDiv);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    function displayInteractiveSkills() {
        const skillsDiv = document.createElement('div');
        skillsDiv.className = 'skill-display';
        
        Object.entries(skillsData).forEach(([category, skills]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category-terminal';
            categoryDiv.textContent = category;
            skillsDiv.appendChild(categoryDiv);
            
            Object.entries(skills).forEach(([skill, level]) => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item-terminal';
                skillItem.innerHTML = `
                    <span class="skill-name-terminal">${skill}</span>
                    <span class="skill-level-terminal">${level}%</span>
                `;
                skillsDiv.appendChild(skillItem);
                
                const skillBar = document.createElement('div');
                skillBar.className = 'skill-bar-terminal';
                const skillProgress = document.createElement('div');
                skillProgress.className = 'skill-progress-terminal';
                skillProgress.style.width = '0%';
                skillBar.appendChild(skillProgress);
                skillsDiv.appendChild(skillBar);
                
                // Animate skill bar
                setTimeout(() => {
                    skillProgress.style.width = level + '%';
                }, 100);
            });
            
            skillsDiv.appendChild(document.createElement('br'));
        });
        
        output.appendChild(skillsDiv);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

// Apply theme function
function applyTheme(themeName) {
    const root = document.documentElement;
    currentTheme = themeName;
    
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
    // Create matrix background - now covering the entire page
    createMatrixBackground();
    
    // Apply saved theme (removed visual theme switcher)
    const savedTheme = localStorage.getItem('selectedTheme') || 'agnoster';
    applyTheme(savedTheme);
    
    // Loading screen handling
    const loadingScreen = document.getElementById('loadingScreen') || document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Initialize interactive terminal after loading
                setTimeout(createInteractiveTerminal, 500);
            }, 500);
        }, 3500);
    } else {
        createInteractiveTerminal();
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
    %cWelcome to Kevin's Digital Domain
    %cCybersecurity Expert & Full-Stack Developer
    %cCurrent Theme: Professional

    %cType './help' for available commands...
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

// Theme Switcher Implementation
let currentThemeIndex = 0;
const themeKeys = Object.keys(themes);

function switchTheme() {
    // Remove current theme class
    const currentThemeKey = themeKeys[currentThemeIndex];
    if (themes[currentThemeKey].class) {
        document.documentElement.classList.remove(themes[currentThemeKey].class);
    }

    // Move to next theme
    currentThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
    const newThemeKey = themeKeys[currentThemeIndex];

    // Apply new theme class
    if (themes[newThemeKey].class) {
        document.documentElement.classList.add(themes[newThemeKey].class);
    }

    // Save theme preference
    localStorage.setItem('preferred-theme', newThemeKey);

    // Show theme change notification
    showThemeNotification(themes[newThemeKey].name);
}

function showThemeNotification(themeName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <i class="fas fa-palette"></i>
        <span>Theme switched to: ${themeName}</span>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-glass);
        border: 2px solid var(--border-accent);
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 25px var(--glow-primary);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-mono);
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize theme switcher
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', switchTheme);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && themes[savedTheme]) {
        currentThemeIndex = themeKeys.indexOf(savedTheme);
        if (themes[savedTheme].class) {
            document.documentElement.classList.add(themes[savedTheme].class);
        }
    }
}

// Initialize particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#4f46e5", "#06b6d4", "#10b981"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4f46e5",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initParticles();
});
