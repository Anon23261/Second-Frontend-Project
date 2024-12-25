document.addEventListener('DOMContentLoaded', () => { 
    console.log('Document is fully loaded and parsed');

    // Navigation highlighting
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Tool card interactions
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.learn-more');
        learnMoreBtn.addEventListener('click', () => {
            const toolName = card.querySelector('h3').textContent;
            showToolModal(toolName);
        });
    });

    // Newsletter subscription
    const subscribeForm = document.querySelector('.newsletter-form');
    const emailInput = document.getElementById('email');
    const subscribeBtn = document.getElementById('subscribe');

    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateEmail(emailInput.value)) {
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tool-card').forEach(card => {
        observer.observe(card);
        card.classList.add('animate-on-scroll');
    });
});

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showToolModal(toolName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${toolName}</h3>
            <p>Detailed information about ${toolName} coming soon!</p>
            <button class="close-modal">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

// Add these styles to your CSS file
const styles = document.createElement('style');
styles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        transform: translateY(100px);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.success {
        background-color: var(--accent-color);
    }
    
    .notification.error {
        background-color: var(--primary-color);
    }
    
    .notification.show {
        transform: translateY(0);
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    
    .modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }
    
    .modal.show .modal-content {
        transform: scale(1);
    }
    
    .close-modal {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(styles);
