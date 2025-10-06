// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

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

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Form submission
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

// Product Search Functionality
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

// Visitor Counter
function updateVisitorCount() {
  let count = localStorage.getItem('visitorCount');
  if (!count) {
    count = 0;
  }
  count = parseInt(count) + 1;
  localStorage.setItem('visitorCount', count);
  
  const visitCountElement = document.getElementById('visitCount');
  if (visitCountElement) {
    visitCountElement.textContent = count;
  }
}

// Animation on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.feature-card, .product-card, .partner-card, .testimonial-card, .offer-card');
  
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
  
  // Initialize functions
  updateVisitorCount();
});

// Certificate animation
const certificateCard = document.querySelector('.certificate-card');
if (certificateCard) {
  certificateCard.addEventListener('mouseenter', function() {
    this.style.transform = 'perspective(1000px) rotateY(0deg)';
  });
  
  certificateCard.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateY(-5deg)';
  });
}

// Add CSS for animations and additional styles
const additionalStyles = `
.feature-card,
.product-card,
.partner-card,
.testimonial-card,
.offer-card {
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

.stock-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 10px;
}

.stock-badge.in-stock {
  background: #4CAF50;
  color: white;
}

.stock-badge.out-of-stock {
  background: #f44336;
  color: white;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.close {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${additionalStyles}</style>`);
