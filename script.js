// Mobile menu toggle functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on navigation links
document.querySelectorAll(".nav-link").forEach(n => 
    n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Sticky navbar with shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Animation on scroll functionality
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Image error handling
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x200?text=Image+Coming+Soon';
            this.alt = 'Image coming soon';
        });
    });
}

// Visitor counter
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount');
    if (!count) {
        count = 0;
    }
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    // You can display this somewhere in your footer if needed
    console.log(`Total visitors: ${count}`);
}

// Product search functionality
function initProductSearch() {
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            let resultsFound = false;
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDesc = card.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                    resultsFound = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show message if no results found
            const noResults = document.getElementById('noResults');
            if (!resultsFound && searchTerm) {
                if (!noResults) {
                    const noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'noResults';
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.innerHTML = `<p>No products found matching "${searchTerm}". Please try a different search term.</p>`;
                    document.querySelector('.product-grid').parentNode.insertBefore(noResultsMsg, document.querySelector('.view-all'));
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    }
}

// Image modal functionality
function initImageModal() {
    // Create modal element if it doesn't exist
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="close-modal">&times;</span>
            <div class="modal-content">
                <img class="modal-image" id="modalImg">
                <div class="modal-caption" id="modalCaption"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Add click event to all gallery and product images
    const images = document.querySelectorAll('.gallery-item img, .product-image img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openModal(this);
        });
    });

    function openModal(imgElement) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        const modalCaption = document.getElementById('modalCaption');
        
        modal.style.display = 'block';
        modalImg.src = imgElement.src;
        modalCaption.textContent = imgElement.alt;
        
        // Close modal when clicking X
        document.querySelector('.close-modal').addEventListener('click', closeModal);
        
        // Close modal when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    }

    function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
    }
}

// Form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// WhatsApp click tracking
function initWhatsAppTracking() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('WhatsApp link clicked');
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .product-card, .partner-card, .gallery-item');
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize all functions
    handleImageErrors();
    updateVisitorCount();
    initProductSearch();
    initImageModal();
    initContactForm();
    initWhatsAppTracking();
    
    // Add CSS for animations
    const animationStyles = `
        .feature-card,
        .product-card,
        .partner-card,
        .gallery-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .no-results {
            text-align: center;
            padding: 40px;
            background: #f8f8f8;
            border-radius: 10px;
            margin: 20px 0;
            border: 2px dashed #ddd;
        }
        
        .no-results p {
            color: #666;
            font-size: 1.1rem;
            margin: 0;
        }
        
        .image-modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            position: relative;
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
            top: 50%;
            transform: translateY(-50%);
            animation: zoomIn 0.3s ease;
        }
        
        @keyframes zoomIn {
            from { transform: translateY(-50%) scale(0.8); }
            to { transform: translateY(-50%) scale(1); }
        }
        
        .modal-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
            z-index: 2001;
        }
        
        .close-modal:hover {
            color: #bbb;
        }
        
        .modal-caption {
            text-align: center;
            color: #ccc;
            padding: 10px 0;
            font-size: 1.1rem;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
});

// Additional utility functions

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading state to images
function addImageLoadingStates() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transition = 'opacity 0.3s ease';
            });
        }
    });
}

// Initialize loading states
addImageLoadingStates();

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        updateVisitorCount,
        initProductSearch
    };
}
