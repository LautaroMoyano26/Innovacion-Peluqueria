"use strict";
class LandingPageApp {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.contactForm = document.getElementById('contactForm');
        this.ctaButton = document.getElementById('ctaButton');
        this.header = document.querySelector('.header');
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselPrev = document.getElementById('carouselPrev');
        this.carouselNext = document.getElementById('carouselNext');
        this.carouselDots = document.getElementById('carouselDots');
        this.currentSlide = 0;
        this.init();
    }
    init() {
        this.setupMenuToggle();
        this.setupSmoothScroll();
        this.setupContactForm();
        this.setupCTAButton();
        this.setupScrollEffects();
        this.setupAnimationsOnScroll();
        this.setupCarousel();
    }
    setupMenuToggle() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => {
                this.navMenu?.classList.toggle('active');
                this.animateMenuIcon();
            });
            const menuLinks = this.navMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu?.classList.remove('active');
                    this.resetMenuIcon();
                });
            });
            document.addEventListener('click', (e) => {
                const target = e.target;
                if (!target.closest('.navbar')) {
                    this.navMenu?.classList.remove('active');
                    this.resetMenuIcon();
                }
            });
        }
    }
    animateMenuIcon() {
        if (this.menuToggle) {
            const spans = this.menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.navMenu?.classList.contains('active')) {
                    if (index === 0)
                        span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1)
                        span.style.opacity = '0';
                    if (index === 2)
                        span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
                else {
                    this.resetMenuIcon();
                }
            });
        }
    }
    resetMenuIcon() {
        if (this.menuToggle) {
            const spans = this.menuToggle.querySelectorAll('span');
            spans.forEach((span) => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    setupContactForm() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
    }
    handleFormSubmit() {
        if (!this.contactForm)
            return;
        const formData = {
            name: this.contactForm.querySelector('input[type="text"]')?.value || '',
            email: this.contactForm.querySelector('input[type="email"]')?.value || '',
            phone: this.contactForm.querySelector('input[type="tel"]')?.value || '',
            message: this.contactForm.querySelector('textarea')?.value || ''
        };
        if (!this.validateForm(formData)) {
            this.showNotification('Por favor, completa todos los campos correctamente.', 'error');
            return;
        }
        this.showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
        this.contactForm.reset();
        console.log('Datos del formulario:', formData);
    }
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[\d\s-()]+$/;
        return (data.name.length > 0 &&
            emailRegex.test(data.email) &&
            phoneRegex.test(data.phone) &&
            data.message.length > 0);
    }
    setupCTAButton() {
        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', () => {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
            this.handleScrollPosition();
        });
    }
    handleHeaderScroll() {
        if (!this.header)
            return;
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            this.header.style.padding = '10px 0';
            this.header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        }
        else {
            this.header.style.padding = '15px 0';
            this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    handleScrollPosition() {
        const scrollPosition = { y: window.scrollY };
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.2);
            icon.style.transform = `translateY(${scrollPosition.y * speed}px)`;
        });
    }
    setupAnimationsOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        const animateElements = document.querySelectorAll('.service-card, .feature-item, .gallery-item, .contact-item');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    setupCarousel() {
        if (!this.carouselTrack || !this.carouselPrev || !this.carouselNext || !this.carouselDots)
            return;
        const slides = this.carouselTrack.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        this.carouselPrev.addEventListener('click', () => {
            this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
            this.updateCarousel();
        });
        this.carouselNext.addEventListener('click', () => {
            this.currentSlide = (this.currentSlide + 1) % totalSlides;
            this.updateCarousel();
        });
        const dots = this.carouselDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentSlide = index;
                this.updateCarousel();
            });
        });
        setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % totalSlides;
            this.updateCarousel();
        }, 5000);
    }
    updateCarousel() {
        if (!this.carouselTrack || !this.carouselDots)
            return;
        const slides = this.carouselTrack.querySelectorAll('.carousel-slide');
        const dots = this.carouselDots.querySelectorAll('.dot');
        slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
            else {
                slide.classList.remove('active');
            }
        });
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
            else {
                dot.classList.remove('active');
            }
        });
    }
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        const styles = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 30px;
            background: ${type === 'success' ? '#4dd9d9' : '#ff6b6b'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;
        notification.setAttribute('style', styles);
        if (!document.querySelector('#notification-styles')) {
            const animationStyle = document.createElement('style');
            animationStyle.id = 'notification-styles';
            animationStyle.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(animationStyle);
        }
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        new LandingPageApp();
        console.log('🎨 Innovación Peluquería Unisex - Landing Page iniciada');
    }, 100);
});
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
//# sourceMappingURL=app.js.map