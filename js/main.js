/**
 * Main JavaScript Entry Point
 * Muhammad Law Group - V2 Homepage
 * 
 * This file serves as the main entry point for all JavaScript functionality.
 * Individual component scripts (navigation.js, chat-widget.js, contact-form.js)
 * are self-initializing and handle their own DOM ready events.
 */

(function() {
  'use strict';

  /**
   * Global configuration
   */
  const config = {
    version: '2.0.0',
    environment: 'staging',
    debug: true
  };

  /**
   * Log initialization message
   */
  function logInit() {
    if (config.debug) {
      console.log('%c Muhammad Law Group V2 ', 'background: #0b2545; color: #d2a649; font-weight: bold; padding: 4px 8px;');
      console.log('Version:', config.version);
      console.log('Environment:', config.environment);
    }
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or empty
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Calculate offset for fixed navigation
          const navHeight = document.getElementById('mainNav')?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Initialize lazy loading for images
   */
  function initLazyLoading() {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback: load all images immediately
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  /**
   * Add staging environment banner
   */
  function initStagingBanner() {
    if (config.environment === 'staging') {
      const banner = document.createElement('div');
      banner.className = 'staging-banner';
      banner.innerHTML = '<strong>STAGING ENVIRONMENT</strong> - This is a preview version for review purposes only';
      banner.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #d2a649; color: #0b2545; text-align: center; padding: 8px; font-size: 14px; font-weight: bold; z-index: 10000; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
      
      // Adjust body padding to account for banner
      document.body.style.paddingTop = '40px';
      
     // document.body.insertBefore(banner, document.body.firstChild);
    }
  }

  /**
   * Handle external links (open in new tab)
   */
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      const currentDomain = window.location.hostname;
      
      // Check if link is external
      if (href && !href.includes(currentDomain)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /**
   * Initialize all global functionality
   */
  function init() {
    logInit();
    initSmoothScroll();
    initLazyLoading();
    initStagingBanner();
    initExternalLinks();
    
    if (config.debug) {
      console.log('Main initialization complete');
    }
  }

  /**
   * Initialize when DOM is ready
   * Component-specific scripts (navigation, chat-widget, contact-form) 
   * handle their own initialization
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose config to window for debugging purposes
  if (config.debug) {
    window.MLG = window.MLG || {};
    window.MLG.config = config;
  }

})();
