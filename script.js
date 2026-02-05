// =====================================
// Navigation & Mobile Menu
// =====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.7)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
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
        color: var(--text-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// =====================================
// Skills Tab Switching
// =====================================
const skillTabs = document.querySelectorAll('.skill-tab');
const skillGrids = document.querySelectorAll('.skills-grid');

if (skillTabs.length > 0) {
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all skill grids
            skillGrids.forEach(grid => {
                grid.classList.remove('active');
            });
            
            // Show selected category grid
            const selectedGrid = document.querySelector(`.skills-grid[data-category="${category}"]`);
            if (selectedGrid) {
                setTimeout(() => {
                    selectedGrid.classList.add('active');
                    // Animate skill bars for visible skills
                    animateVisibleSkillBars(selectedGrid);
                }, 50);
            }
        });
    });
}

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
            const skillFill = entry.target.querySelector('.skill-fill');
            const skillBar = entry.target;
            if (skillFill && skillBar) {
                const progress = skillBar.getAttribute('data-progress');
                skillFill.style.width = `${progress}%`;
                observer.unobserve(skillBar);
            }
        }
    });
};

const animateVisibleSkillBars = (container) => {
    const skillBars = container.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const skillFill = bar.querySelector('.skill-fill');
        if (skillFill) {
            const progress = bar.getAttribute('data-progress');
            skillFill.style.width = '0';
            setTimeout(() => {
                skillFill.style.width = `${progress}%`;
            }, 100);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, observerOptions);

document.querySelectorAll('.skill-bar').forEach(bar => {
    skillObserver.observe(bar);
});

// Initialize first tab's skill bars
if (skillGrids.length > 0) {
    const activeGrid = document.querySelector('.skills-grid.active');
    if (activeGrid) {
        animateVisibleSkillBars(activeGrid);
    }
}

// =====================================
// Fade-in Animation on Scroll
// =====================================
const fadeInElements = document.querySelectorAll('.stat-card, .spec-card, .project-item, .exp-item, .skill-item');

const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create mailto link with form data
        const mailtoLink = `mailto:azizpathan882002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;
        
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
    background: linear-gradient(135deg, #2563EB, #1E40AF);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
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
// Console Welcome Message
// =====================================
console.log('%c👋 Welcome to My Portfolio!', 'font-size: 20px; font-weight: bold; color: #3B82F6;');
console.log('%cLooking for the code? Check out the repository on GitHub!', 'font-size: 14px; color: #CBD5E1;');

// =====================================
// Page Load Complete
// =====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✨ Portfolio Loaded Successfully!', 'font-size: 16px; color: #3B82F6; font-weight: bold;');
});
