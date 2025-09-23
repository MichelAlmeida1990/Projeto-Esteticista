// Modern JavaScript - 2024/2025 Best Practices
(function() {
    'use strict';

    // DOM Elements Cache
    const elements = {
        loadingScreen: null,
        mainContent: null,
        navbar: null,
        navToggle: null,
        navMenu: null,
        navLinks: null,
        tabBtns: null,
        tabContents: null,
        galleryItems: null,
        testimonialCards: null,
        navDots: null,
        contactForm: null,
        profileImages: null
    };

    // State Management
    const state = {
        currentTestimonial: 0,
        isMenuOpen: false,
        isLoading: true
    };

    // Initialize DOM elements
    function initElements() {
        elements.loadingScreen = document.getElementById('loadingScreen');
        elements.mainContent = document.getElementById('mainContent');
        elements.navbar = document.getElementById('navbar');
        elements.navToggle = document.getElementById('navToggle');
        elements.navMenu = document.getElementById('navMenu');
        elements.navLinks = document.querySelectorAll('.nav-link');
        elements.tabBtns = document.querySelectorAll('.tab-btn');
        elements.tabContents = document.querySelectorAll('.tab-content');
        elements.galleryItems = document.querySelectorAll('.gallery-item');
        elements.testimonialCards = document.querySelectorAll('.testimonial-card');
        elements.navDots = document.querySelectorAll('.nav-dot');
        elements.contactForm = document.getElementById('contactForm');
        elements.profileImages = document.querySelectorAll('.profile-image');
    }

    // Modern Loading Screen
    class LoadingScreen {
        constructor() {
            this.duration = 10000;
            this.init();
        }

        init() {
            // Initialize loading logo interactions
            this.initLoadingLogoEffects();
            
            // Simulate loading process
            setTimeout(() => {
                this.hide();
            }, this.duration);
        }
        
        initLoadingLogoEffects() {
            const loadingLogo = document.getElementById('loadingCursiveLogo');
            if (!loadingLogo) return;
            
            // Auto wave animation every 3 seconds
            setInterval(() => {
                this.startLoadingWave(loadingLogo);
            }, 3000);
            
            // Click for color wave
            loadingLogo.addEventListener('click', () => {
                this.startLoadingColorWave(loadingLogo);
            });
            
            // Random letter sparkle
            setInterval(() => {
                this.randomLoadingSparkle(loadingLogo);
            }, 2000);
        }
        
        startLoadingWave(logo) {
            const letters = logo.querySelectorAll('.loading-letter');
            
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(-8px) scale(1.15)';
                    letter.style.color = this.getRandomPinkColor();
                    letter.style.textShadow = `0 8px 20px ${this.getRandomPinkColor()}60`;
                    
                    setTimeout(() => {
                        letter.style.transform = '';
                        letter.style.color = '';
                        letter.style.textShadow = '';
                    }, 600);
                }, index * 80);
            });
        }
        
        startLoadingColorWave(logo) {
            const letters = logo.querySelectorAll('.loading-letter');
            
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.color = this.getRandomPinkColor();
                    letter.style.transform = 'translateY(-10px) scale(1.2) rotate(5deg)';
                    letter.style.textShadow = `0 10px 25px ${this.getRandomPinkColor()}70`;
                    
                    setTimeout(() => {
                        letter.style.color = '';
                        letter.style.transform = '';
                        letter.style.textShadow = '';
                    }, 800);
                }, index * 100);
            });
        }
        
        randomLoadingSparkle(logo) {
            const letters = logo.querySelectorAll('.loading-letter');
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            
            randomLetter.style.color = this.getRandomPinkColor();
            randomLetter.style.transform = 'translateY(-12px) scale(1.3) rotate(10deg)';
            randomLetter.style.textShadow = `0 12px 30px ${this.getRandomPinkColor()}80`;
            
            setTimeout(() => {
                randomLetter.style.color = '';
                randomLetter.style.transform = '';
                randomLetter.style.textShadow = '';
            }, 1200);
        }
        
        getRandomPinkColor() {
            const pinkColors = [
                '#f4a6cd', // primary-rose
                '#ec4899', // deep-rose
                '#be185d', // dusty-rose
                '#e879f9', // lavender
                '#fca5a5', // coral
                '#f9a8d4', // rose-pink
                '#d8b4fe'  // mauve
            ];
            return pinkColors[Math.floor(Math.random() * pinkColors.length)];
        }

        hide() {
            if (elements.loadingScreen) {
                elements.loadingScreen.classList.add('hidden');
                elements.mainContent.classList.add('loaded');
                state.isLoading = false;
                
                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    if (elements.loadingScreen && elements.loadingScreen.parentNode) {
                        elements.loadingScreen.parentNode.removeChild(elements.loadingScreen);
                    }
                }, 500);
            }
        }
    }

    // Navigation Controller
    class Navigation {
        constructor() {
            this.init();
        }

        init() {
            this.bindEvents();
            this.handleScroll();
        }

        bindEvents() {
            // Mobile menu toggle
            if (elements.navToggle) {
                elements.navToggle.addEventListener('click', () => this.toggleMenu());
            }

            // Navigation links
            elements.navLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleNavClick(e));
            });

            // Scroll event with throttling
            let scrollTimer = null;
            window.addEventListener('scroll', () => {
                if (scrollTimer) return;
                scrollTimer = setTimeout(() => {
                    this.handleScroll();
                    scrollTimer = null;
                }, 16); // ~60fps
            });

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (state.isMenuOpen && !elements.navMenu.contains(e.target) && !elements.navToggle.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }

        toggleMenu() {
            state.isMenuOpen = !state.isMenuOpen;
            elements.navMenu.classList.toggle('active');
            elements.navToggle.classList.toggle('active');
        }

        closeMenu() {
            state.isMenuOpen = false;
            elements.navMenu.classList.remove('active');
            elements.navToggle.classList.remove('active');
        }

        handleNavClick(e) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    // Update active nav link
                    elements.navLinks.forEach(link => link.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu
                    this.closeMenu();
                }
            }
        }

        handleScroll() {
            const scrollY = window.scrollY;
            
            // Add scrolled class to navbar
            if (elements.navbar) {
                elements.navbar.classList.toggle('scrolled', scrollY > 50);
            }

            // Update active nav link based on scroll position
            this.updateActiveNavLink();
        }

        updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (scrollPos >= top && scrollPos <= bottom) {
                    elements.navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        }
    }

    // Services Tabs Controller
    class ServicesTabs {
        constructor() {
            this.init();
        }

        init() {
            if (elements.tabBtns.length === 0) return;

            elements.tabBtns.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleTabClick(e));
            });
        }

        handleTabClick(e) {
            const targetTab = e.currentTarget.getAttribute('data-tab');
            
            // Update active tab button
            elements.tabBtns.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Update active tab content
            elements.tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        }
    }

    // Modern Gallery with Lightbox
    class Gallery {
        constructor() {
            this.lightbox = null;
            this.init();
        }

        init() {
            if (elements.galleryItems.length === 0) return;

            elements.galleryItems.forEach(item => {
                item.addEventListener('click', () => this.openLightbox(item));
            });

            // Also handle profile images
            elements.profileImages.forEach(img => {
                img.parentElement.style.cursor = 'pointer';
                img.parentElement.addEventListener('click', () => this.openProfileLightbox(img));
            });
        }

        openLightbox(item) {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            const title = overlay ? overlay.querySelector('h4')?.textContent || 'Resultado' : 'Resultado';
            const description = overlay ? overlay.querySelector('p')?.textContent || 'Tratamento realizado' : 'Tratamento realizado';

            this.createLightbox(img.src, img.alt, title, description);
        }

        openProfileLightbox(img) {
            const isMainProfile = img.src.includes('14.07.38.jpeg');
            const title = 'Juliana Dayane';
            const description = isMainProfile ? 
                'Esteticista especializada há 15 anos em atendimento domiciliar' : 
                'Profissional dedicada ao cuidado e bem-estar das clientes';

            this.createLightbox(img.src, img.alt, title, description);
        }

        createLightbox(src, alt, title, description) {
            // Remove existing lightbox
            this.closeLightbox();

            // Create lightbox HTML
            this.lightbox = document.createElement('div');
            this.lightbox.className = 'lightbox';
            this.lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Fechar">&times;</button>
                    <img src="${src}" alt="${alt}" class="lightbox-image">
                    <div class="lightbox-info" style="padding: 2rem; text-align: center; background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);">
                        <h3 style="color: #031f5f; font-size: 1.5rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif;">${title}</h3>
                        <p style="color: #6b7280; font-size: 1rem; line-height: 1.6;">${description}</p>
                    </div>
                </div>
            `;

            document.body.appendChild(this.lightbox);
            document.body.style.overflow = 'hidden';

            // Animate in
            requestAnimationFrame(() => {
                this.lightbox.classList.add('active');
            });

            // Bind close events
            this.bindLightboxEvents();
        }

        bindLightboxEvents() {
            if (!this.lightbox) return;

            const closeBtn = this.lightbox.querySelector('.lightbox-close');
            
            // Close button
            closeBtn.addEventListener('click', () => this.closeLightbox());
            
            // Click outside to close
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });

            // Escape key
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        }

        closeLightbox() {
            if (this.lightbox) {
                this.lightbox.classList.remove('active');
                setTimeout(() => {
                    if (this.lightbox && this.lightbox.parentNode) {
                        this.lightbox.parentNode.removeChild(this.lightbox);
                        this.lightbox = null;
                        document.body.style.overflow = 'auto';
                    }
                }, 300);
            }
        }
    }

    // Testimonials Slider
    class TestimonialsSlider {
        constructor() {
            this.autoSlideInterval = null;
            this.init();
        }

        init() {
            if (elements.testimonialCards.length === 0) return;

            // Bind navigation dots
            elements.navDots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Start auto-slide
            this.startAutoSlide();

            // Pause on hover
            const slider = document.querySelector('.testimonials-slider');
            if (slider) {
                slider.addEventListener('mouseenter', () => this.stopAutoSlide());
                slider.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }

        goToSlide(index) {
            // Update current testimonial
            elements.testimonialCards[state.currentTestimonial].classList.remove('active');
            elements.navDots[state.currentTestimonial].classList.remove('active');

            state.currentTestimonial = index;

            elements.testimonialCards[state.currentTestimonial].classList.add('active');
            elements.navDots[state.currentTestimonial].classList.add('active');
        }

        nextSlide() {
            const nextIndex = (state.currentTestimonial + 1) % elements.testimonialCards.length;
            this.goToSlide(nextIndex);
        }

        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }

        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }
    }

    // Contact Form Handler
    class ContactForm {
        constructor() {
            this.init();
        }

        init() {
            if (!elements.contactForm) return;

            elements.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        handleSubmit(e) {
            e.preventDefault();

            const formData = new FormData(elements.contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message') || ''
            };

            // Validate form
            if (!this.validateForm(data)) return;

            // Create WhatsApp message
            const whatsappMessage = this.createWhatsAppMessage(data);
            const whatsappURL = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Reset form
            elements.contactForm.reset();

            // Show success message
            this.showSuccessMessage();
        }

        validateForm(data) {
            const errors = [];

            if (!data.name.trim()) errors.push('Nome é obrigatório');
            if (!data.phone.trim()) errors.push('Telefone é obrigatório');
            if (!data.service) errors.push('Selecione um serviço');

            if (errors.length > 0) {
                alert('Por favor, corrija os seguintes erros:\n' + errors.join('\n'));
                return false;
            }

            return true;
        }

        createWhatsAppMessage(data) {
            const serviceNames = {
                'limpeza': 'Limpeza de Pele',
                'microagulhamento': 'Microagulhamento',
                'peeling': 'Peeling Mandélico',
                'drenagem': 'Drenagem Linfática',
                'drenagem-gestante': 'Drenagem para Gestantes',
                'drenagem-pos': 'Drenagem Pós-Operatório'
            };

            let message = `Olá Juliana! 👋\n\n`;
            message += `Gostaria de agendar uma consulta:\n\n`;
            message += `👤 *Nome:* ${data.name}\n`;
            message += `📱 *Telefone:* ${data.phone}\n`;
            message += `💆‍♀️ *Serviço:* ${serviceNames[data.service] || data.service}\n`;

            if (data.message.trim()) {
                message += `💬 *Mensagem:* ${data.message}\n`;
            }

            message += `\nAguardo seu retorno! 😊`;

            return message;
        }

        showSuccessMessage() {
            // Create success notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #031f5f 0%, #00afee 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                font-weight: 600;
                transform: translateX(100%);
                transition: transform 0.3s ease-out;
            `;
            notification.textContent = 'Redirecionando para o WhatsApp...';

            document.body.appendChild(notification);

            // Animate in
            requestAnimationFrame(() => {
                notification.style.transform = 'translateX(0)';
            });

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }

    // Lazy Loading for Images
    class LazyImageLoader {
        constructor() {
            this.observer = null;
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            this.observer.unobserve(entry.target);
                        }
                    });
                }, {
                    rootMargin: '50px'
                });

                // Observe all lazy images
                const lazyImages = document.querySelectorAll('img[loading="lazy"]');
                lazyImages.forEach(img => this.observer.observe(img));
            }
        }

        loadImage(img) {
            img.classList.add('loaded');
        }
    }

    // Advanced Scroll Animations
    class ScrollAnimations {
        constructor() {
            this.observer = null;
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            
                            if (element.hasAttribute('data-animate')) {
                                element.classList.add('animate');
                            } else {
                                element.style.opacity = '1';
                                element.style.transform = 'translateY(0)';
                            }
                            
                            // Add stagger delay for grid items
                            if (element.classList.contains('expertise-item')) {
                                const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                                setTimeout(() => {
                                    element.classList.add('animate');
                                }, delay);
                            }
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                // Observe elements for animation
                const animateElements = document.querySelectorAll('.service-card, .gallery-item, .contact-card, .expertise-item, [data-animate]');
                animateElements.forEach(el => {
                    if (!el.hasAttribute('data-animate')) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    }
                    this.observer.observe(el);
                });
            }
        }
    }

    // Tilt Effect for Profile Card
    class TiltEffect {
        constructor() {
            this.init();
        }

        init() {
            const tiltElements = document.querySelectorAll('[data-tilt]');
            
            tiltElements.forEach(element => {
                element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
                element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, element));
            });
        }

        handleMouseMove(e, element) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }

        handleMouseLeave(e, element) {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
    }

    // Parallax Effect
    class ParallaxEffect {
        constructor() {
            this.init();
        }

        init() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            if (parallaxElements.length === 0) return;
            
            let ticking = false;
            
            const updateParallax = () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const rate = scrolled * -0.5;
                    element.style.transform = `translateY(${rate}px)`;
                });
                
                ticking = false;
            };
            
            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', requestTick);
        }
    }

    // Interactive Elements
    class InteractiveElements {
        constructor() {
            this.init();
        }

        init() {
            this.addHoverEffects();
            this.addClickEffects();
            this.addTypingEffect();
            this.addLogoInteractions();
        }

        addHoverEffects() {
            // Add magnetic effect to buttons
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'translate(0px, 0px)';
                });
            });
        }

        addClickEffects() {
            // Add ripple effect to clickable elements
            const clickableElements = document.querySelectorAll('.btn, .nav-link, .tab-btn');
            
            clickableElements.forEach(element => {
                element.addEventListener('click', (e) => {
                    const ripple = document.createElement('span');
                    const rect = element.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.6);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                        z-index: 1000;
                    `;
                    
                    element.style.position = 'relative';
                    element.style.overflow = 'hidden';
                    element.appendChild(ripple);
                    
                    setTimeout(() => {
                        if (ripple.parentNode) {
                            ripple.parentNode.removeChild(ripple);
                        }
                    }, 600);
                });
            });
            
            // Add ripple animation to CSS
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        addTypingEffect() {
            const heroTitle = document.querySelector('.hero-title .title-main');
            if (!heroTitle) return;
            
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing after loading screen
            setTimeout(typeWriter, 3000);
        }

        addLogoInteractions() {
            const cursiveLogos = document.querySelectorAll('.cursive-logo');
            
            cursiveLogos.forEach(logo => {
                // Wave animation on click
                logo.addEventListener('click', () => {
                    logo.classList.add('wave-animation');
                    setTimeout(() => {
                        logo.classList.remove('wave-animation');
                    }, 2500);
                });
                
                // Gradient text on double click
                logo.addEventListener('dblclick', () => {
                    logo.classList.toggle('gradient-text');
                });
                
                // Color wave on mouse enter
                logo.addEventListener('mouseenter', () => {
                    this.startColorWave(logo);
                });
                
                // Random letter animation every 10 seconds
                setInterval(() => {
                    this.randomLetterAnimation(logo);
                }, 10000);
            });
        }

        startColorWave(logo) {
            const letters = logo.querySelectorAll('.logo-letter');
            
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.color = this.getRandomPinkColor();
                    letter.style.transform = 'translateY(-2px) scale(1.05)';
                    letter.style.textShadow = `0 3px 10px ${this.getRandomPinkColor()}40`;
                    
                    setTimeout(() => {
                        letter.style.color = '';
                        letter.style.transform = '';
                        letter.style.textShadow = '';
                    }, 800);
                }, index * 100);
            });
        }

        randomLetterAnimation(logo) {
            const letters = logo.querySelectorAll('.logo-letter');
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            
            randomLetter.style.color = this.getRandomPinkColor();
            randomLetter.style.transform = 'translateY(-5px) scale(1.2) rotate(10deg)';
            randomLetter.style.textShadow = `0 5px 15px ${this.getRandomPinkColor()}60`;
            
            setTimeout(() => {
                randomLetter.style.color = '';
                randomLetter.style.transform = '';
                randomLetter.style.textShadow = '';
            }, 1000);
        }

        getRandomPinkColor() {
            const pinkColors = [
                '#f4a6cd', // primary-rose
                '#ec4899', // deep-rose
                '#be185d', // dusty-rose
                '#e879f9', // lavender
                '#fca5a5', // coral
                '#f9a8d4', // rose-pink
                '#d8b4fe'  // mauve
            ];
            return pinkColors[Math.floor(Math.random() * pinkColors.length)];
        }
    }

    // Main Application Controller
    class App {
        constructor() {
            this.components = {};
            this.init();
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            // Initialize DOM elements
            initElements();

            // Initialize components
            this.components.loadingScreen = new LoadingScreen();
            this.components.navigation = new Navigation();
            this.components.servicesTabs = new ServicesTabs();
            this.components.gallery = new Gallery();
            this.components.testimonials = new TestimonialsSlider();
            this.components.contactForm = new ContactForm();
            this.components.lazyLoader = new LazyImageLoader();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.tiltEffect = new TiltEffect();
            this.components.parallaxEffect = new ParallaxEffect();
            this.components.interactiveElements = new InteractiveElements();

            // Performance monitoring
            this.monitorPerformance();
        }

        monitorPerformance() {
            // Log performance metrics
            window.addEventListener('load', () => {
                if ('performance' in window) {
                    const perfData = performance.timing;
                    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`Page loaded in ${loadTime}ms`);
                }
            });
        }
    }

    // Letter Animation System
    class LetterAnimator {
        constructor() {
            this.letters = document.querySelectorAll('.letter');
            this.isAnimating = false;
            this.init();
        }

        init() {
            if (this.letters.length === 0) return;
            
            // Add click event to trigger letter animation
            const titleMain = document.getElementById('title-main');
            const titleSub = document.getElementById('title-sub');
            
            if (titleMain) {
                titleMain.addEventListener('click', () => this.animateLetters('title-main'));
            }
            
            if (titleSub) {
                titleSub.addEventListener('click', () => this.animateLetters('title-sub'));
            }
        }

        animateLetters(targetId) {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            const targetElement = document.getElementById(targetId);
            const letters = targetElement.querySelectorAll('.letter');
            
            // Animate each letter with delay
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.animation = 'letterDisappear 0.8s ease-in-out both';
                    
                    // Reset animation after it completes
                    setTimeout(() => {
                        letter.style.animation = '';
                    }, 800);
                }, index * 100); // 100ms delay between each letter
            });
            
            // Reset animation lock after all letters finish
            setTimeout(() => {
                this.isAnimating = false;
            }, letters.length * 100 + 800);
        }
    }

    // 💕 Sistema de Corações Flutuantes
    class FloatingHearts {
        constructor() {
            this.container = document.getElementById('floatingHearts');
            this.hearts = [];
            this.maxHearts = 15;
            this.heartSymbols = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤'];
            this.sizes = ['small', 'medium', 'large'];
            this.init();
        }
        
        init() {
            // Criar corações iniciais
            this.createInitialHearts();
            
            // Gerar novos corações periodicamente - MAIS LENTO
            setInterval(() => {
                this.createHeart();
            }, 4000); // Novo coração a cada 4 segundos
            
            // Limpar corações antigos
            setInterval(() => {
                this.cleanupHearts();
            }, 10000); // Limpeza a cada 10 segundos
        }
        
        createInitialHearts() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.createHeart();
                }, i * 1000);
            }
        }
        
        createHeart() {
            if (this.hearts.length >= this.maxHearts) return;
            
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            // Escolher símbolo aleatório
            const symbol = this.heartSymbols[Math.floor(Math.random() * this.heartSymbols.length)];
            heart.textContent = symbol;
            
            // Escolher tamanho aleatório
            const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
            heart.classList.add(size);
            
            // Posição horizontal aleatória
            const leftPosition = Math.random() * 100;
            heart.style.left = leftPosition + '%';
            
            // Adicionar ao container
            this.container.appendChild(heart);
            
            // Adicionar à lista de corações
            this.hearts.push(heart);
            
            // Remover após animação - AJUSTADO PARA VELOCIDADE MAIS LENTA
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
                const index = this.hearts.indexOf(heart);
                if (index > -1) {
                    this.hearts.splice(index, 1);
                }
            }, 13000); // Tempo baseado na animação mais longa (12s)
        }
        
        cleanupHearts() {
            // Remover corações que não estão mais visíveis
            this.hearts = this.hearts.filter(heart => {
                if (!heart.parentNode) return false;
                
                const rect = heart.getBoundingClientRect();
                if (rect.top > window.innerHeight) {
                    heart.parentNode.removeChild(heart);
                    return false;
                }
                return true;
            });
        }
        
        // Método para pausar/retomar corações
        pause() {
            this.hearts.forEach(heart => {
                heart.style.animationPlayState = 'paused';
            });
        }
        
        resume() {
            this.hearts.forEach(heart => {
                heart.style.animationPlayState = 'running';
            });
        }
    }

    // Initialize the application
    new App();
    
    // Initialize letter animator after DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new LetterAnimator();
    });
    
    // Initialize floating hearts after loading screen
    window.addEventListener('load', function() {
        setTimeout(() => {
            window.floatingHearts = new FloatingHearts();
        }, 4000); // Iniciar após o loading screen
    });
    
    // Pausar corações quando a página não está visível (performance)
    document.addEventListener('visibilitychange', function() {
        if (window.floatingHearts) {
            if (document.hidden) {
                window.floatingHearts.pause();
            } else {
                window.floatingHearts.resume();
            }
        }
    });

})();
