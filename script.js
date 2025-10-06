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

// Image Modal Functionality
function openModal(imgElement) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  
  modal.style.display = 'block';
  modalImg.src = imgElement.src;
  modalCaption.textContent = imgElement.alt;
  
  // Close modal when clicking X
  document.querySelector('.close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Close modal with ESC key
  document.addEventListener('keydown', function closeOnEsc(e) {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
      document.removeEventListener('keydown', closeOnEsc);
    }
  });
}

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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.feature-card, .product-card, .partner-card, .testimonial-card, .offer-card, .gallery-item');
  
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
  
  // Initialize functions
  updateVisitorCount();
  handleImageErrors();
});

// Add CSS for animations and additional styles
const additionalStyles = `
.feature-card,
.product-card,
.partner-card,
.testimonial-card,
.offer-card,
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
`;

document.head.insertAdjacentHTML('beforeend', `<style>${additionalStyles}</style>`);
