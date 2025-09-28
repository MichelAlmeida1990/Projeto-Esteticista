// Ultra-Optimized Performance Script
// Resolves all loading issues

(function() {
    'use strict';
    
    // Critical DOM elements
    const elements = {
        loadingScreen: document.getElementById('loadingScreen'),
        mainContent: document.getElementById('mainContent'),
        progressBar: document.querySelector('.progress-bar'),
        hamburger: document.querySelector('.hamburger'),
        navMenu: document.querySelector('.nav-menu'),
        header: document.querySelector('.header')
    };
    
    // Performance optimized loading screen
    class FastLoadingScreen {
        constructor() {
            this.progress = 0;
            this.isComplete = false;
            this.init();
        }
        
        init() {
            // Ensure DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.startLoading());
            } else {
                this.startLoading();
            }
        }
        
        startLoading() {
            // Fast, realistic progress
            const progressInterval = setInterval(() => {
                this.progress += Math.random() * 20 + 10;
                
                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(progressInterval);
                    this.completeLoading();
                }
                
                if (elements.progressBar) {
                    elements.progressBar.style.width = this.progress + '%';
                }
            }, 50);
            
            // Force completion after 1.5 seconds max
            setTimeout(() => {
                if (!this.isComplete) {
                    this.progress = 100;
                    if (elements.progressBar) {
                        elements.progressBar.style.width = '100%';
                    }
                    this.completeLoading();
                }
            }, 1500);
        }
        
        completeLoading() {
            if (this.isComplete) return;
            this.isComplete = true;
            
            // Ultra-fast transition
            if (elements.loadingScreen) {
                elements.loadingScreen.style.opacity = '0';
                elements.loadingScreen.style.pointerEvents = 'none';
            }
            
            if (elements.mainContent) {
                elements.mainContent.style.opacity = '1';
            }
            
            // Remove loading screen from DOM
            setTimeout(() => {
                if (elements.loadingScreen && elements.loadingScreen.parentNode) {
                    elements.loadingScreen.parentNode.removeChild(elements.loadingScreen);
                }
            }, 300);
        }
    }
    
    // Optimized mobile menu
    function initMobileMenu() {
        if (!elements.hamburger || !elements.navMenu) return;
        
        elements.hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu on link click
        elements.navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                elements.hamburger.classList.remove('active');
                elements.navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Ultra-optimized scroll handler
    function initScrollEffects() {
        let ticking = false;
        let lastScrollY = 0;
        
        function updateOnScroll() {
            const scrollY = window.pageYOffset;
            
            // Header background change
            if (elements.header) {
                elements.header.style.background = scrollY > 100 ? 
                    'rgba(3, 31, 95, 0.98)' : 'rgba(3, 31, 95, 0.95)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Optimized smooth scrolling
    function initSmoothScrolling() {
        document.addEventListener('click', function(e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Simple intersection observer for animations
    function initAnimations() {
        if (!('IntersectionObserver' in window)) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements with a small delay to prevent blocking
        setTimeout(function() {
            document.querySelectorAll('.service-card, .expertise-item, .cert-item, .differential-card').forEach(function(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                observer.observe(el);
            });
        }, 100);
    }
    
    // Simple testimonials slider
    function initTestimonials() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0) return;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (slides[n]) slides[n].classList.add('active');
            if (dots[n]) dots[n].classList.add('active');
        }
        
        // Auto-advance
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Dot navigation
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Simple FAQ accordion
    function initFAQ() {
        document.addEventListener('click', function(e) {
            const question = e.target.closest('.faq-question');
            if (!question) return;
            
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    }
    
    // Contact form handler
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message') || 'Não informado'
            };
            
            const serviceNames = {
                'limpeza-pele': 'Limpeza de Pele',
                'microagulhamento': 'Microagulhamento',
                'peeling-mandelico': 'Peeling Mandélico',
                'drenagem-linfatica': 'Drenagem Linfática',
                'drenagem-gestante': 'Drenagem para Gestantes',
                'drenagem-pos-operatorio': 'Drenagem Pós-Operatório'
            };
            
            const serviceName = serviceNames[data.service] || data.service;
            const message = `Olá! Gostaria de solicitar um orçamento:\n\n*Nome:* ${data.name}\n*E-mail:* ${data.email}\n*Telefone:* ${data.phone}\n*Serviço:* ${serviceName}\n*Mensagem:* ${data.message}\n\nAguardo seu contato!`;
            
            const whatsappURL = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            
            // Success message
            const successMsg = document.createElement('div');
            successMsg.textContent = '✅ Solicitação enviada com sucesso!';
            successMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:15px 20px;border-radius:8px;z-index:10000;font-weight:600;';
            document.body.appendChild(successMsg);
            
            setTimeout(() => successMsg.remove(), 3000);
            this.reset();
        });
    }
    
    // Simple logo hover effect
    function initLogo() {
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            logoContainer.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
    
    // Modern Gallery with Lightbox
    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return;
        
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay');
                const title = overlay.querySelector('h4').textContent;
                const description = overlay.querySelector('p').textContent;
                
                openLightbox(img.src, img.alt, title, description);
            });
        });
    }
    
    function openLightbox(src, alt, title, description) {
        const lightbox = document.createElement('div');
        lightbox.className = 'modern-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-image-container">
                    <img src="${src}" alt="${alt}" class="lightbox-image">
                </div>
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });
        
        // Close handlers
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const overlay = lightbox.querySelector('.lightbox-overlay');
        
        function closeLightbox() {
            lightbox.classList.add('closing');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
        
        // ESC key
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    // Modern Profile Image Effects
    function initProfileEffects() {
        const profileImage = document.querySelector('.profile-3d-image');
        if (!profileImage) return;
        
        const container = profileImage.parentElement;
        
        // Remove old effects and add new modern ones
        container.addEventListener('mouseenter', function() {
            profileImage.style.transform = 'scale(1.05) rotateY(5deg)';
            profileImage.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        container.addEventListener('mouseleave', function() {
            profileImage.style.transform = 'scale(1) rotateY(0deg)';
            profileImage.style.filter = 'brightness(1) contrast(1)';
        });
        
        // Add click functionality
        container.addEventListener('click', function() {
            openLightbox(
                profileImage.src, 
                profileImage.alt,
                'Juliana Daiane',
                'Esteticista com 15 anos de experiência especializada em atendimento domiciliar'
            );
        });
        
        // Add cursor pointer
        container.style.cursor = 'pointer';
    }
    
    // Initialize everything
    function init() {
        new FastLoadingScreen();
        initMobileMenu();
        initScrollEffects();
        initSmoothScrolling();
        initAnimations();
        initTestimonials();
        initFAQ();
        initContactForm();
        initLogo();
        initGallery();
        initProfileEffects();
    }
    
    // Start initialization
    init();
    
})();
