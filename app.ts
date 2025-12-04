// ===== INTERFACES =====
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface ScrollPosition {
    y: number;
}

// Declaración global para Feather Icons
declare const feather: {
    replace: () => void;
};

// ===== CLASE PRINCIPAL DE LA APLICACIÓN =====
class LandingPageApp {
    private menuToggle: HTMLElement | null;
    private navMenu: HTMLElement | null;
    private contactForm: HTMLFormElement | null;
    private ctaButton: HTMLElement | null;
    private header: HTMLElement | null;
    private carouselTrack: HTMLElement | null;
    private carouselPrev: HTMLElement | null;
    private carouselNext: HTMLElement | null;
    private carouselDots: HTMLElement | null;
    private currentSlide: number;

    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.contactForm = document.getElementById('contactForm') as HTMLFormElement;
        this.ctaButton = document.getElementById('ctaButton');
        this.header = document.querySelector('.header');
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselPrev = document.getElementById('carouselPrev');
        this.carouselNext = document.getElementById('carouselNext');
        this.carouselDots = document.getElementById('carouselDots');
        this.currentSlide = 0;
        
        this.init();
    }

    private init(): void {
        this.setupMenuToggle();
        this.setupSmoothScroll();
        this.setupContactForm();
        this.setupCTAButton();
        this.setupScrollEffects();
        this.setupAnimationsOnScroll();
        this.setupCarousel();
    }

    // ===== MENU MÓVIL =====
    private setupMenuToggle(): void {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => {
                this.navMenu?.classList.toggle('active');
                this.animateMenuIcon();
            });

            // Cerrar menú al hacer clic en un enlace
            const menuLinks = this.navMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu?.classList.remove('active');
                    this.resetMenuIcon();
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.navbar')) {
                    this.navMenu?.classList.remove('active');
                    this.resetMenuIcon();
                }
            });
        }
    }

    private animateMenuIcon(): void {
        if (this.menuToggle) {
            const spans = this.menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.navMenu?.classList.contains('active')) {
                    if (index === 0) (span as HTMLElement).style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) (span as HTMLElement).style.opacity = '0';
                    if (index === 2) (span as HTMLElement).style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    this.resetMenuIcon();
                }
            });
        }
    }

    private resetMenuIcon(): void {
        if (this.menuToggle) {
            const spans = this.menuToggle.querySelectorAll('span');
            spans.forEach((span) => {
                (span as HTMLElement).style.transform = '';
                (span as HTMLElement).style.opacity = '';
            });
        }
    }

    // ===== SCROLL SUAVE =====
    private setupSmoothScroll(): void {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const targetId = (link as HTMLAnchorElement).getAttribute('href');
                if (targetId) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===== FORMULARIO DE CONTACTO =====
    private setupContactForm(): void {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e: Event) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
    }

    private handleFormSubmit(): void {
        if (!this.contactForm) return;

        const formData: ContactFormData = {
            name: (this.contactForm.querySelector('input[type="text"]') as HTMLInputElement)?.value || '',
            email: (this.contactForm.querySelector('input[type="email"]') as HTMLInputElement)?.value || '',
            phone: (this.contactForm.querySelector('input[type="tel"]') as HTMLInputElement)?.value || '',
            message: (this.contactForm.querySelector('textarea') as HTMLTextAreaElement)?.value || ''
        };

        // Validación básica
        if (!this.validateForm(formData)) {
            this.showNotification('Por favor, completa todos los campos correctamente.', 'error');
            return;
        }

        // Simular envío del formulario
        this.showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
        this.contactForm.reset();
        
        // Aquí podrías integrar con un servicio de backend real
        console.log('Datos del formulario:', formData);
    }

    private validateForm(data: ContactFormData): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[\d\s-()]+$/;

        return (
            data.name.length > 0 &&
            emailRegex.test(data.email) &&
            phoneRegex.test(data.phone) &&
            data.message.length > 0
        );
    }

    // ===== BOTÓN CTA =====
    private setupCTAButton(): void {
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

    // ===== EFECTOS DE SCROLL =====
    private setupScrollEffects(): void {
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
            this.handleScrollPosition();
        });
    }

    private handleHeaderScroll(): void {
        if (!this.header) return;

        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            this.header.style.padding = '10px 0';
            this.header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        } else {
            this.header.style.padding = '15px 0';
            this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }

    private handleScrollPosition(): void {
        const scrollPosition: ScrollPosition = { y: window.scrollY };
        
        // Efecto parallax para los iconos flotantes
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.2);
            (icon as HTMLElement).style.transform = `translateY(${scrollPosition.y * speed}px)`;
        });
    }

    // ===== ANIMACIONES AL HACER SCROLL =====
    private setupAnimationsOnScroll(): void {
        const observerOptions: IntersectionObserverInit = {
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

        // Observar elementos que queremos animar
        const animateElements = document.querySelectorAll(
            '.service-card, .feature-item, .gallery-item, .contact-item'
        );
        
        animateElements.forEach((el, index) => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateY(30px)';
            (el as HTMLElement).style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });

        // Estilo para elementos animados
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== CAROUSEL =====
    private setupCarousel(): void {
        if (!this.carouselTrack || !this.carouselPrev || !this.carouselNext || !this.carouselDots) return;

        const slides = this.carouselTrack.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        // Botón anterior
        this.carouselPrev.addEventListener('click', () => {
            this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
            this.updateCarousel();
        });

        // Botón siguiente
        this.carouselNext.addEventListener('click', () => {
            this.currentSlide = (this.currentSlide + 1) % totalSlides;
            this.updateCarousel();
        });

        // Dots
        const dots = this.carouselDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentSlide = index;
                this.updateCarousel();
            });
        });

        // Auto-play cada 5 segundos
        setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % totalSlides;
            this.updateCarousel();
        }, 5000);
    }

    private updateCarousel(): void {
        if (!this.carouselTrack || !this.carouselDots) return;

        const slides = this.carouselTrack.querySelectorAll('.carousel-slide');
        const dots = this.carouselDots.querySelectorAll('.dot');

        // Actualizar slides
        slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar dots
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ===== NOTIFICACIONES =====
    private showNotification(message: string, type: 'success' | 'error'): void {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos de notificación
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

        // Agregar animación
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

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

}

// ===== INICIALIZAR APLICACIÓN =====
window.addEventListener('DOMContentLoaded', () => {
    // Pequeño delay para asegurar que Feather Icons se cargue primero
    setTimeout(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        new LandingPageApp();
        
        console.log('🎨 Innovación Peluquería Unisex - Landing Page iniciada');
    }, 100);
});

// ===== PRELOADER (OPCIONAL) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
