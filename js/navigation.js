/**
 * Navigation Component
 * Handles sticky navigation, scroll effects, and dropdown interactions
 */

(function() {
  'use strict';

  // Configuration
  const SCROLL_THRESHOLD = 100;
  const ANIMATION_DURATION = 200;

  // DOM Elements
  const nav = document.getElementById('mainNav');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownItems = document.querySelectorAll('.has-dropdown');

  /**
   * Handle scroll events to add/remove scrolled class
   */
  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /**
   * Toggle mobile menu
   */
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  /**
   * Handle dropdown interactions for desktop
   */
  function initDropdowns() {
    dropdownItems.forEach(item => {
      const link = item.querySelector('a');
      
      // Desktop: hover behavior
      if (window.innerWidth >= 768) {
        item.addEventListener('mouseenter', function() {
          this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
          this.classList.remove('active');
        });
      }
      
      // Mobile: click behavior
      link.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
          e.preventDefault();
          const parent = this.parentElement;
          
          // Close other dropdowns
          dropdownItems.forEach(otherItem => {
            if (otherItem !== parent) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          parent.classList.toggle('active');
        }
      });
    });
  }

  /**
   * Close mobile menu when clicking on a link
   */
  function initMobileMenuLinks() {
    const navLinks = navMenu.querySelectorAll('a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only close menu for non-dropdown parent links on mobile
        if (window.innerWidth < 768 && !this.parentElement.classList.contains('has-dropdown')) {
          mobileMenuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });
  }

  /**
   * Close mobile menu when clicking outside
   */
  function handleOutsideClick(e) {
    if (window.innerWidth < 768) {
      if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close all dropdowns
        dropdownItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Remove active class from dropdowns
      dropdownItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  }

  /**
   * Initialize navigation
   */
  function init() {
    // Set initial scroll state
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize mobile menu links
    initMobileMenuLinks();
    
    // Handle outside clicks
    document.addEventListener('click', handleOutsideClick);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
