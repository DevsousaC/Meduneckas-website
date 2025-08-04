// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Timeline steps animation
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-focus');
    }
  });
}, observerOptions);

// Observe all timeline steps
document.querySelectorAll('.step').forEach(step => {
  observer.observe(step);
});

// Form handling functions
function showMessage(formId, message, type) {
  const messageDiv = document.getElementById(formId + 'Message');
  messageDiv.classList.add(`message`)
  messageDiv.classList.add(`${type}`)
  messageDiv.textContent = `${message}`;
  setTimeout(() => {
    messageDiv.classList.remove(`${type}`)
    messageDiv.classList.add(`message`)
    messageDiv.textContent = ``;
  }, 5000);
}

function setButtonLoading(buttonId, isLoading) {
  const button = document.getElementById(buttonId);
  if (isLoading) {
    button.innerHTML = '<span class="loading"></span> Enviando...';
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}
// E-book form submission
document.getElementById('ebookForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  setButtonLoading('ebookBtn', true);
  
  
  try { 
    const response = await fetch('https://formspree.io/f/meozlwqq', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showMessage('ebook', 'E-book enviado com sucesso! Verifique seu e-mail.', 'success');
      contactForm.reset();
      this.reset();
      document.getElementById('ebookBtn').textContent = 'Baixar E-book gratuito';
        
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
            'value': 1.0,
            'currency': 'BRL'
        });
      }

      setTimeout(() => {
        const link = document.createElement('a');
        
        link.href = './src/archives/e-book.pdf'; 
        
        link.download = 'Guia-Pratico-Defesa-Medica-Meduneckas.pdf'; 
        
        document.body.appendChild(link);
        
        link.click();
        
        document.body.removeChild(link);
      }, 500);

    } else {
      showMessage('ebook', 'Erro no download. Entre em contato via WhatsApp e solicite.', 'error');
      contactForm.reset();
      this.reset();
      document.getElementById('ebookBtn').textContent = 'Baixar E-book gratuito';
    }
  } catch (error) {
    showMessage('ebook', 'Erro no download. Entre em contato via WhatsApp e solicite.', 'error');
    document.getElementById('ebookBtn').textContent = 'Baixar E-book gratuito';
  }
  
  setButtonLoading('ebookBtn', false);
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  setButtonLoading('contactBtn', true);
  
  try { 
    const response = await fetch('https://formspree.io/f/xdkdljjv', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showMessage('contact', 'Solicitação enviada! Entraremos em contato em até 2 horas.', 'success');
      contactForm.reset();
      this.reset();
      document.getElementById('contactBtn').textContent = 'Solicitar Análise Confidencial';
        
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'BRL'
        });
      }
    } else {
      showMessage('contact', 'Erro no envio. Entre em contato via WhatsApp para análise imediata.', 'error');
      contactForm.reset();
      this.reset();
      document.getElementById('contactBtn').textContent = 'Solicitar Análise Confidencial';
    }
  } catch (error) {
    showMessage('contact', 'Erro no envio. Entre em contato via WhatsApp para análise imediata.', 'error');
    document.getElementById('contactBtn').innerHTML = 'Solicitar Análise Confidencial';
  }
  
  setButtonLoading('contactBtn', false);
});

// Modal functions
function openPrivacyModal() {
  document.getElementById('privacyModal').style.display = 'block';
}
function openTermsModal() {
  document.getElementById('termsModal').style.display = 'block';
}
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
// Close modal when clicking outside
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
}
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
// Accessibility improvements
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  }
});
// Performance optimization - Lazy load animations
function initializeAnimations() {
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  // Add initial styles and observe elements
  document.querySelectorAll('.pillar, .conversion-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
  });
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeAnimations();
  
  // Preload critical resources
  const criticalImages = [
      './src/images/professional-image.jpg'
  ];
  
  criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
  });
});