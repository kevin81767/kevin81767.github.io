// Modern Hacker Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3500);

    // Typewriter effect for hero section
    const typewriter = document.getElementById('typewriter');
    const output = document.getElementById('output');
    
    const commands = [
        'whoami',
        'cat /etc/passwd | grep kevin',
        'ls -la /home/kevin/skills/',
        'sudo ./hack_the_planet.sh'
    ];
    
    const responses = [
        'kevin_nyawakira',
        'kevin:x:1000:1000:Kevin Nyawakira,,,:/home/kevin:/bin/bash',
        'total 42\ndrwxr-xr-x 2 kevin kevin 4096 Dec 15 10:30 .\ndrwxr-xr-x 3 kevin kevin 4096 Dec 15 10:30 ..\n-rwxr-xr-x 1 kevin kevin  256 Dec 15 10:30 cybersecurity.sh\n-rwxr-xr-x 1 kevin kevin  512 Dec 15 10:30 web_development.py\n-rwxr-xr-x 1 kevin kevin  128 Dec 15 10:30 penetration_testing.rb',
        'Access granted. Welcome to the matrix, Kevin.\nCybersecurity Expert | Full-Stack Developer\nSpecializing in: Penetration Testing, Web Security, Mobile Security\nStatus: Available for hire'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeEffect() {
        if (isWaiting) return;
        
        const currentCommand = commands[commandIndex];
        
        if (!isDeleting && charIndex <= currentCommand.length) {
            typewriter.textContent = currentCommand.substring(0, charIndex);
            charIndex++;
            
            if (charIndex > currentCommand.length) {
                isWaiting = true;
                setTimeout(() => {
                    // Show response
                    const responseDiv = document.createElement('div');
                    responseDiv.innerHTML = responses[commandIndex].replace(/\n/g, '<br>');
                    responseDiv.style.color = '#00ff88';
                    responseDiv.style.marginBottom = '15px';
                    output.appendChild(responseDiv);
                    
                    // Add new prompt line
                    const newPrompt = document.createElement('div');
                    newPrompt.innerHTML = '<span style="color: #00ff88;">kevin@hackbox:~$</span> ';
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
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

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
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
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

    // Matrix rain effect enhancement
    function createMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) return;

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = Math.random() * 100 + '%';
            span.style.animationDelay = Math.random() * 20 + 's';
            span.style.fontSize = Math.random() * 10 + 10 + 'px';
            span.style.color = `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.1})`;
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
            span.style.animation = `matrixFall ${Math.random() * 10 + 10}s linear infinite`;
            matrixContainer.appendChild(span);
        }
    }

    // Initialize matrix rain
    setTimeout(createMatrixRain, 4000);

    // Add typing sound effect (optional)
    function playTypingSound() {
        // You can add audio here if desired
        // const audio = new Audio('path/to/typing-sound.mp3');
        // audio.volume = 0.1;
        // audio.play();
    }

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
            scanLine.style.background = '#00ff88';
            scanLine.style.animation = 'scanLine 1s ease-in-out';
            this.parentElement.appendChild(scanLine);
            
            setTimeout(() => {
                scanLine.remove();
            }, 1000);
        });
    });

    // Console welcome message
    console.log(`
    ██╗  ██╗███████╗██╗   ██╗██╗███╗   ██╗
    ██║ ██╔╝██╔════╝██║   ██║██║████╗  ██║
    █████╔╝ █████╗  ██║   ██║██║██╔██╗ ██║
    ██╔═██╗ ██╔══╝  ╚██╗ ██╔╝██║██║╚██╗██║
    ██║  ██╗███████╗ ╚████╔╝ ██║██║ ╚████║
    ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝
    
    Welcome to Kevin's Digital Domain
    Cybersecurity Expert & Full-Stack Developer
    
    Type 'help' for available commands...
    `);
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
`;
document.head.appendChild(style);
