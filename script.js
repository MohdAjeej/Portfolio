// =====================================
// Navigation & Mobile Menu
// =====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// =====================================
// Smooth Scroll for Navigation Links
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================
// Active Navigation Link Highlighting
// =====================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// =====================================
// Animated Skill Bars
// =====================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target;
            const progress = skillProgress.getAttribute('data-progress');
            skillProgress.style.width = `${progress}%`;
            
            // Add percentage display (optional)
            const skillName = skillProgress.closest('.skill-item').querySelector('.skill-name');
            if (!skillProgress.nextElementSibling || 
                !skillProgress.nextElementSibling.classList.contains('skill-percentage')) {
                const percentage = document.createElement('span');
                percentage.textContent = `${progress}%`;
                percentage.classList.add('skill-percentage');
                percentage.style.cssText = `
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: 0.9rem;
                    color: var(--text-color);
                    font-weight: 600;
                `;
                skillName.style.position = 'relative';
                skillName.parentElement.style.position = 'relative';
                skillName.parentElement.appendChild(percentage);
            }
            
            observer.unobserve(skillProgress);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, observerOptions);

document.querySelectorAll('.skill-progress').forEach(progress => {
    skillObserver.observe(progress);
});

// =====================================
// Fade-in Animation on Scroll
// =====================================
const fadeInElements = document.querySelectorAll('.stat-item, .timeline-item, .project-card, .achievement-card');

const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                entry.target.style.opacity = '1';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
};

const fadeObserver = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    fadeObserver.observe(element);
});

// =====================================
// Typing Animation Enhancement
// =====================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    // Already animated via CSS, but we can enhance it
    setTimeout(() => {
        typingText.style.borderRight = 'none';
    }, 3000);
}

// =====================================
// Contact Form Handling
// =====================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('user_name').value.trim();
        const email = document.getElementById('user_email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !subject || !message) {
            return;
        }
        
        // Create mailto link with form data
        const mailtoLink = `mailto:azizpathan882002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 100);
    });
}

// =====================================
// Back to Top Button
// =====================================
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================
// Particle Effect Enhancement
// =====================================
const createFloatingShape = () => {
    const shape = document.createElement('div');
    const size = Math.random() * 20 + 10;
    const colors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'];
    
    shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '10%'};
        left: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 15}s infinite ease-in-out;
    `;
    
    document.querySelector('.home').appendChild(shape);
    
    setTimeout(() => {
        shape.remove();
    }, 20000);
};

// Create floating shapes periodically
setInterval(createFloatingShape, 3000);

// =====================================
// Project Image Lazy Loading
// =====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================================
// Dynamic Resume Download
// =====================================
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Resume')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Create a temporary link to download
            const link = document.createElement('a');
            link.href = btn.getAttribute('href');
            link.download = 'Mohd_Ajeej_Resume.pdf';
            link.click();
        });
    }
});

// =====================================
// Console Welcome Message
// =====================================
console.log('%c👋 Welcome to My Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLooking for the code? Check out the repository on GitHub!', 'font-size: 14px; color: #6b7280;');

// =====================================
// Page Load Complete
// =====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✨ Portfolio Loaded Successfully!', 'font-size: 16px; color: #10b981; font-weight: bold;');
});

