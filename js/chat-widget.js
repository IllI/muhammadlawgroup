/**
 * Chat Widget Functionality
 * Handles chat button interactions and modal display
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const chatButton = document.querySelector('.chat-button');
    const chatModal = document.getElementById('chatModal');
    const modalClose = document.querySelector('.modal-close');
    const chatForm = document.getElementById('chatForm');

    if (!chatButton || !chatModal) {
      console.warn('Chat widget elements not found');
      return;
    }

    /**
     * Open modal with animation
     */
    function openModal() {
      chatModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus first input field
      setTimeout(function() {
        const firstInput = chatModal.querySelector('input[type="text"]');
        if (firstInput) {
          firstInput.focus();
        }
      }, 300);
    }

    /**
     * Close modal with animation
     */
    function closeModal() {
      chatModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
      
      // Reset form if it exists
      if (chatForm) {
        chatForm.reset();
      }
    }

    /**
     * Handle chat button click
     */
    chatButton.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });

    /**
     * Handle modal close button click
     */
    if (modalClose) {
      modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    }

    /**
     * Handle click outside modal content
     */
    chatModal.addEventListener('click', function(e) {
      if (e.target === chatModal) {
        closeModal();
      }
    });

    /**
     * Handle escape key to close modal
     */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && chatModal.classList.contains('active')) {
        closeModal();
      }
    });

    /**
     * Handle form submission
     */
    if (chatForm) {
      chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(chatForm);
        
        // Basic validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
          alert('Please fill in all required fields');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Submit form via AJAX
        fetch(chatForm.action, {
          method: 'POST',
          body: formData
        })
        .then(function(response) {
          if (response.ok) {
            // Success
            alert('Thank you for your message! We will get back to you soon.');
            closeModal();
          } else {
            // Error
            alert('There was an error sending your message. Please try again or call us directly.');
          }
        })
        .catch(function(error) {
          console.error('Form submission error:', error);
          alert('There was an error sending your message. Please try again or call us directly.');
        });
      });
    }

  });

})();
