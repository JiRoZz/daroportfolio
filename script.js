// DOM elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navLinks = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const talkBtn = document.getElementById('talkBtn');
const talkModal = document.getElementById('talkModal');
const closeModal = document.querySelector('.close-modal');
const navItems = document.querySelectorAll('.nav-link');
// const contactForm = document.getElementById('contactForm');
const talkForm = document.getElementById('talkForm');

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Update active nav link
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
    });
});

// Modal functionality
talkBtn.addEventListener('click', () => {
    talkModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    talkModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === talkModal) {
        talkModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        console.log('Contact Form Submission:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}


if (talkForm) {
    talkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = talkForm.querySelector('input[type="text"]').value;
        const email = talkForm.querySelector('input[type="email"]').value;
        const project = talkForm.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        console.log('Talk Form Submission:', { name, email, project });
        
        // Show success message
        alert('Thank you for your request! I will contact you soon to discuss your project.');
        
        // Reset form and close modal
        talkForm.reset();
        talkModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, message } = data;
    
    // Send email to yourself
    MailApp.sendEmail({
      to: "jirouvu05@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nTimestamp: ${new Date()}`,
      replyTo: email
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Email sent successfully!" }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
function sendEmail() {
    const contactForm = document.getElementById('contactForm');
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    function encodeURIComponentStrict(str) {
        return encodeURIComponent(str).replace(/'/g, "%27").replace(/"/g, "%22");
    }
}
// Text Animation on Scroll
const animateElements = document.querySelectorAll('.animate-text');

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target;
            const textContent = text.textContent;
            text.textContent = '';
            text.style.borderRight = '2px solid ' + getComputedStyle(text).getPropertyValue('--primary-color');
            
            // Type out the text character by character
            let i = 0;
            const typeWriter = () => {
                if (i < textContent.length) {
                    text.textContent += textContent.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50); // Adjust speed here (lower = faster)
                } else {
                    text.style.borderRight = 'none';
                }
            };
            
            // Start typing after a short delay
            setTimeout(typeWriter, 300);
            
            // Stop observing after animation starts
            textObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all animate-text elements
animateElements.forEach(element => {
    textObserver.observe(element);
});

// Alternative: Simple fade-in animation for all elements
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Add fade-in class to all sections
document.querySelectorAll('section').forEach(section => {
    fadeInObserver.observe(section);
});

// Also observe project cards and service cards
document.querySelectorAll('.project-card, .service-card').forEach(card => {
    fadeInObserver.observe(card);
});
// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .service-card, .logo-item').forEach(el => {
    observer.observe(el);
});
// Skills Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills animation
    initSkillsAnimation();
    
    // Add click to show details functionality
    setupSkillDetails();
    
    // Add skill level descriptions
    addSkillDescriptions();
});

function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-level');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    // Reset all skill bars to 0
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Reset all percentages to invisible
    skillPercentages.forEach(percent => {
        percent.style.opacity = '0';
    });
    
    // Animate when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skill');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-level');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width') + '%';
        
        // Animate bar
        setTimeout(() => {
            bar.style.width = width;
            
            // Show percentage with delay
            setTimeout(() => {
                skillPercentages[index].style.opacity = '1';
                skillPercentages[index].textContent = bar.getAttribute('data-width') + '%';
                
                // Count up animation for percentage
                countUpPercentage(skillPercentages[index], parseInt(bar.getAttribute('data-width')));
            }, 500);
        }, index * 200);
    });
}

function countUpPercentage(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, stepTime);
}

function setupSkillDetails() {
    const skillItems = document.querySelectorAll('.logo-item');
    
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skillName = this.querySelector('.logo-text').textContent;
            const skillPercentage = this.querySelector('.skill-percentage').textContent;
            
            // Create or show skill details
            showSkillDetails(skillName, skillPercentage, this);
        });
    });
}

function showSkillDetails(skillName, percentage, element) {
    // Remove existing details if any
    const existingDetails = document.querySelector('.skill-details');
    if (existingDetails) {
        existingDetails.remove();
    }
    
    // Get skill color
    const skillColor = getComputedStyle(element.querySelector('.logo-icon')).color;
    
    // Create details element
    const details = document.createElement('div');
    details.className = 'skill-details';
    details.innerHTML = `
        <div class="details-content">
            <h3>${skillName}</h3>
            <div class="details-progress">
                <div class="progress-circle">
                    <svg width="100" height="100">
                        <circle cx="50" cy="50" r="45" stroke="#eee" stroke-width="8" fill="none"/>
                        <circle class="progress-circle-fill" cx="50" cy="50" r="45" stroke="${skillColor}" stroke-width="8" fill="none" 
                                stroke-dasharray="283" stroke-dashoffset="283"/>
                    </svg>
                    <span class="progress-value">${percentage}</span>
                </div>
            </div>
            <p class="skill-description">${getSkillDescription(skillName)}</p>
            <button class="close-details">Close</button>
        </div>
    `;
    
    // Style the details
    details.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    document.body.appendChild(details);
    
    // Animate circle progress
    setTimeout(() => {
        const circle = details.querySelector('.progress-circle-fill');
        const percentageNum = parseInt(percentage);
        const offset = 283 - (283 * percentageNum / 100);
        circle.style.strokeDashoffset = offset;
    }, 100);
    
    // Close button
    details.querySelector('.close-details').addEventListener('click', () => {
        details.remove();
    });
    
    // Close on background click
    details.addEventListener('click', (e) => {
        if (e.target === details) {
            details.remove();
        }
    });
}

function addSkillDescriptions() {
    const descriptions = {
        'HTML5': 'Semantic markup, forms, accessibility',
        'CSS3': 'Responsive design, animations, flexbox/grid',
        'JavaScript': 'DOM manipulation, ES6+, async programming',
        'CapCut': 'Video editing, transitions, effects',
        'Canva': 'Graphic design, social media content',
        'VS Code': 'Extensions, debugging, Git integration'
    };
    
    const skillItems = document.querySelectorAll('.logo-item');
    skillItems.forEach(item => {
        const skillName = item.querySelector('.logo-text').textContent;
        const description = descriptions[skillName];
        
        if (description) {
            const descElement = document.createElement('div');
            descElement.className = 'skill-description-small';
            descElement.textContent = description;
            descElement.style.cssText = `
                font-size: 12px;
                color: #666;
                margin-top: 10px;
                opacity: 0.8;
            `;
            item.appendChild(descElement);
        }
    });
}
// Auto-calculate skill rank based on percentage
function calculateRank(percentage) {
    if (percentage >= 90) return { level: "EXPERT", class: "rank-expert" };
    if (percentage >= 75) return { level: "ADVANCED", class: "rank-advanced" };
    if (percentage >= 60) return { level: "INTERMEDIATE", class: "rank-intermediate" };
    if (percentage >= 40) return { level: "BEGINNER", class: "rank-beginner" };
    return { level: "NEWBIE", class: "rank-beginner" };
}

// Add rank badges dynamically
function addSkillRanks() {
    const skillItems = document.querySelectorAll('.logo-item');
    
    skillItems.forEach(item => {
        const skillLevel = item.querySelector('.skill-level');
        const percentage = parseInt(skillLevel.getAttribute('data-width') || 
                                   skillLevel.style.width.replace('%', ''));
        
        const rank = calculateRank(percentage);
        
        // Create rank badge
        const rankBadge = document.createElement('div');
        rankBadge.className = `skill-rank-badge ${rank.class}`;
        rankBadge.textContent = rank.level;
        
        // Add experience years based on rank
        const experienceYears = getExperienceYears(percentage);
        const experienceText = document.createElement('div');
        experienceText.className = 'skill-experience';
        experienceText.textContent = `${experienceYears} years`;
        
        // Add to skill item
        item.insertBefore(rankBadge, item.firstChild);
        item.appendChild(experienceText);
        
        // Add tooltip with description
        addRankTooltip(item, rank.level, percentage);
    });
}

function getExperienceYears(percentage) {
    if (percentage >= 90) return "3+";
    if (percentage >= 75) return "2-3";
    if (percentage >= 60) return "1-2";
    if (percentage >= 40) return "0.5-1";
    return "< 0.5";
}

function addRankTooltip(item, rank, percentage) {
    const descriptions = {
        "EXPERT": "Master level with deep knowledge",
        "ADVANCED": "Strong practical experience",
        "INTERMEDIATE": "Comfortable with core concepts",
        "BEGINNER": "Learning the basics",
        "NEWBIE": "Just starting out"
    };
    
    item.setAttribute('title', `${rank} - ${percentage}% - ${descriptions[rank]}`);
}

// Run when page loads
document.addEventListener('DOMContentLoaded', addSkillRanks);

function getSkillDescription(skillName) {
    const descriptions = {
        'HTML5': 'Expert in semantic HTML5 markup, creating accessible and SEO-friendly web structures.',
        'CSS3': 'Proficient in modern CSS including Flexbox, Grid, animations, and responsive design.',
        'JavaScript': 'Building interactive web applications with modern JavaScript (ES6+) and DOM manipulation.',
        'CapCut': 'Video editing and creating engaging content with transitions and special effects.',
        'Canva': 'Designing graphics, social media content, and marketing materials.',
        'VS Code': 'Using advanced features, extensions, and debugging tools for efficient development.'
    };
    
    return descriptions[skillName] || 'Skill description not available.';
}
// // Call when skills section is in view
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             animateSkillBars();
//         }
//     });
// }, { threshold: 0.5 });

const skillsSection = document.getElementById('skill');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Observe the hero logos container
const heroLogos = document.querySelector('.hero-logos');
if (heroLogos) {
    skillBarObserver.observe(heroLogos);
}
// Function for Coming Soon project
// function showComingSoon() {
//     alert("This project is currently in development. Check back soon!");
// }

// Optional: Add click tracking for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const projectTitle = this.querySelector('h4').textContent;
        console.log(`Project clicked: ${projectTitle}`);
        
        // You could add analytics tracking here
        // Example: trackProjectView(projectTitle);
    });
});
