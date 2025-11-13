/**
 * Practice Areas Card Expansion
 */

document.addEventListener('DOMContentLoaded', function() {
  const practiceCards = document.querySelectorAll('.practice-card');
  
  practiceCards.forEach(card => {
    const learnMoreLink = card.querySelector('.learn-more');
    const paragraph = card.querySelector('p');
    
    if (learnMoreLink && paragraph) {
      learnMoreLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle expanded state
        card.classList.toggle('expanded');
        
        // Update link text
        if (card.classList.contains('expanded')) {
          learnMoreLink.innerHTML = 'Show Less ↑';
        } else {
          learnMoreLink.innerHTML = 'Learn More →';
        }
      });
    }
  });
});
