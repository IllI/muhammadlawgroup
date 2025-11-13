// Contact Form Handler
(function() {
  'use strict';

  // Form validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
      message: 'Please enter a valid name (2-100 characters)'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    phone: {
      required: false,
      pattern: /^[\d\s\-\(\)\+]+$/,
      message: 'Please enter a valid phone number'
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
      message: 'Please enter a message (10-1000 characters)'
    }
  };

  // Validate single field
  function validateField(field, value) {
    const rules = validationRules[field];
    if (!rules) return { valid: true };

    // Check required
    if (rules.required && (!value || value.trim() === '')) {
      return { valid: false, message: rules.message };
    }

    // Skip other validations if field is optional and empty
    if (!rules.required && (!value || value.trim() === '')) {
      return { valid: true };
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
      return { valid: false, message: rules.message };
    }

    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
      return { valid: false, message: rules.message };
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      return { valid: false, message: rules.message };
    }

    return { valid: true };
  }

  // Show error message
  function showError(formGroup, message) {
    formGroup.classList.add('has-error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('active');
    }
  }

  // Clear error message
  function clearError(formGroup) {
    formGroup.classList.remove('has-error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('active');
    }
  }

  // Show form status message
  function showStatus(form, type, message) {
    const statusElement = form.querySelector('.form-status');
    if (statusElement) {
      statusElement.className = 'form-status ' + type;
      statusElement.textContent = message;
    }
  }

  // Clear form status message
  function clearStatus(form) {
    const statusElement = form.querySelector('.form-status');
    if (statusElement) {
      statusElement.className = 'form-status';
      statusElement.textContent = '';
    }
  }

  // Initialize form
  function initializeForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Add real-time validation on blur
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        const formGroup = this.closest('.form-group');
        if (!formGroup) return;

        const fieldName = this.name;
        const value = this.value;

        // Skip validation for optional select if not selected
        if (this.tagName === 'SELECT' && !validationRules[fieldName]?.required && value === '') {
          clearError(formGroup);
          return;
        }

        const validation = validateField(fieldName, value);
        if (!validation.valid) {
          showError(formGroup, validation.message);
        } else {
          clearError(formGroup);
        }
      });

      // Clear error on focus
      input.addEventListener('focus', function() {
        const formGroup = this.closest('.form-group');
        if (formGroup) {
          clearError(formGroup);
        }
      });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      clearStatus(form);

      // Validate all fields
      let isValid = true;
      const formData = new FormData(form);
      
      inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const fieldName = input.name;
        const value = input.value;

        // Skip validation for optional fields
        if (!validationRules[fieldName]) return;

        const validation = validateField(fieldName, value);
        if (!validation.valid) {
          showError(formGroup, validation.message);
          isValid = false;
        } else {
          clearError(formGroup);
        }
      });

      if (!isValid) {
        showStatus(form, 'error', 'Please correct the errors above and try again.');
        return;
      }

      // Disable submit button
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      // Include checkbox values in form data
      const marketingConsent = form.querySelector('input[name="marketingConsent"]');
      const nonMarketingConsent = form.querySelector('input[name="nonMarketingConsent"]');
      
      if (marketingConsent && marketingConsent.checked) {
        formData.set('marketingConsent', 'yes');
      } else {
        formData.set('marketingConsent', 'no');
      }
      
      if (nonMarketingConsent && nonMarketingConsent.checked) {
        formData.set('nonMarketingConsent', 'yes');
      } else {
        formData.set('nonMarketingConsent', 'no');
      }

      // Submit form via AJAX
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes('Mail Sent Successfully') || data.includes('success')) {
          showStatus(form, 'success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
          form.reset();
          
          // Reset labels for floating label effect
          inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
              clearError(formGroup);
            }
          });
        } else {
          showStatus(form, 'error', 'Sorry, there was an error sending your message. Please try again or call us directly at 872-762-3030.');
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
        showStatus(form, 'error', 'Sorry, there was an error sending your message. Please try again or call us directly at 872-762-3030.');
      })
      .finally(() => {
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      });
    });
  }

  // Initialize forms when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeForm('contactForm');
      initializeForm('chatForm');
    });
  } else {
    initializeForm('contactForm');
    initializeForm('chatForm');
  }

})();
