# Muhammad Law Group - V2 Staging Environment

## Purpose

This directory contains the redesigned Muhammad Law Group homepage in a staging environment for review and testing before production deployment. The v2 site implements modern UI/UX patterns, improved accessibility, and enhanced user engagement features.

## Accessing the Staging Site

The staging site can be accessed at: `https://yourdomain.com/v2/`

**Note:** A prominent orange banner at the top of the page indicates this is a staging environment.

## Key Features

### New Components
- **Sticky Navigation**: Persistent header with dropdown menus and quick contact access
- **Hero Section**: Full-width hero with dual CTAs for immediate engagement
- **Floating Social Bar**: Left-side social media links (desktop only)
- **Chat Widget**: Bottom-right consultation bubble with modal form
- **Practice Areas Grid**: Seven practice area cards with hover effects
- **Attorney Spotlight**: Professional bio section with LinkedIn integration
- **Enhanced Contact Section**: Two-column layout with office info and contact form

### Design Improvements
- Modern color palette (MLG Navy #0b2545, MLG Gold #d2a649)
- Responsive layouts for mobile, tablet, and desktop viewports
- WCAG AA accessibility compliance
- Optimized images and performance
- Semantic HTML5 structure

## Differences from Production Site

### Visual Changes
- New navigation structure with dropdown menus
- Full-width hero section with background image
- Practice areas displayed as grid cards instead of list
- Floating social media bar (desktop)
- Chat widget for quick consultation requests
- Alternating section backgrounds for visual hierarchy

### Functional Changes
- Sticky navigation that changes on scroll
- Interactive dropdown menus
- Modal-based chat widget
- Enhanced form validation with inline error messages
- Responsive mobile menu with hamburger icon

### Technical Changes
- Component-based SCSS architecture
- Modular JavaScript files
- Lazy loading for below-fold images
- Relative asset paths within v2 directory
- Shared backend form handler with production

## Testing Checklist

### Visual Review
- [ ] Verify all text content matches approved copy
- [ ] Check that all images load correctly
- [ ] Confirm color scheme matches brand guidelines
- [ ] Review typography and spacing consistency
- [ ] Verify staging banner is visible

### Functionality Testing
- [ ] Test navigation dropdown menus
- [ ] Verify sticky navigation behavior on scroll
- [ ] Test chat widget modal open/close
- [ ] Submit test contact form (main section)
- [ ] Submit test contact form (chat modal)
- [ ] Click all "Learn More" links
- [ ] Test social media links (open in new tab)
- [ ] Verify phone number links work on mobile

### Responsive Testing
- [ ] Test on mobile phone (320px - 767px)
- [ ] Test on tablet (768px - 1023px)
- [ ] Test on desktop (1024px+)
- [ ] Verify mobile hamburger menu works
- [ ] Confirm social bar hidden on mobile
- [ ] Check that chat widget doesn't obscure CTAs
- [ ] Verify all buttons are easily tappable on mobile

### Accessibility Testing
- [ ] Navigate site using keyboard only
- [ ] Test with screen reader (if available)
- [ ] Verify all images have alt text
- [ ] Check color contrast ratios
- [ ] Confirm form labels are properly associated
- [ ] Verify ARIA labels on interactive elements

### Performance Testing
- [ ] Check page load time (target: under 2 seconds)
- [ ] Verify images are optimized
- [ ] Test on slower network connections
- [ ] Check for console errors in browser

## Known Limitations

- Social media links currently point to placeholder URLs (need to be updated with actual profiles)
- Attorney bio and photo are placeholder content (need final content from firm)
- Office address and hours need to be verified for accuracy
- LinkedIn profile URL needs to be updated with actual profile

## Launch Checklist

Before moving v2 to production, complete the following:

### Content Updates
- [ ] Replace all placeholder social media URLs with actual profiles
- [ ] Update attorney bio with final approved text
- [ ] Replace attorney photo with final professional headshot
- [ ] Verify office address, phone, email, and hours are correct
- [ ] Update LinkedIn profile URL
- [ ] Review and approve all practice area descriptions

### Technical Preparation
- [ ] Remove staging banner from HTML
- [ ] Update all internal links to work in root directory
- [ ] Test contact form submissions in production environment
- [ ] Set up 301 redirects from old URLs if needed
- [ ] Update sitemap.xml with new page structure
- [ ] Submit updated sitemap to search engines

### Final Testing
- [ ] Complete full QA testing in production environment
- [ ] Test contact form with real email addresses
- [ ] Verify analytics tracking is working
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Perform final accessibility audit
- [ ] Run Lighthouse performance audit

### Deployment Steps
1. Backup current production site
2. Copy v2 files to root directory (or deploy via your hosting method)
3. Update asset paths if necessary
4. Test all functionality in production
5. Monitor contact form submissions for first 24 hours
6. Check analytics for any issues

## File Structure

```
v2/
├── index.html              # Main homepage
├── css/
│   ├── styles.css          # Compiled CSS
│   ├── styles.css.map      # Source map
│   └── styles.min.css      # Minified CSS
├── scss/                   # SCSS source files
│   ├── _variables.scss     # Colors, fonts, breakpoints
│   ├── _navigation.scss    # Navigation component
│   ├── _hero.scss          # Hero section
│   ├── _social-bar.scss    # Social media bar
│   ├── _chat-widget.scss   # Chat widget
│   ├── _practice-areas.scss # Practice area cards
│   ├── _sections.scss      # About, Why Choose, Attorney, Contact
│   ├── _utilities.scss     # Helper classes
│   └── styles.scss         # Main SCSS file
├── js/
│   ├── main.js             # Main JavaScript
│   ├── navigation.js       # Navigation interactions
│   ├── chat-widget.js      # Chat widget functionality
│   └── contact-form.js     # Form validation and submission
├── img/
│   ├── hero/               # Hero background images
│   ├── practice-areas/     # Practice area icons
│   ├── team/               # Attorney photos
│   └── general/            # Other images
├── vendor/
│   └── jquery/             # jQuery library
└── README.md               # This file
```

## Backend Integration

The contact forms use the existing backend handler at `../mail/contact_me.php`. This ensures consistency with the production site and requires no changes to the email delivery system.

### Form Endpoints
- Main contact form: `../mail/contact_me.php`
- Chat modal form: `../contact_me.php` (alternative path)

Both forms submit the same data structure:
- `name` (required)
- `email` (required)
- `phone` (optional)
- `practiceArea` (optional, from dropdown)
- `message` (required)

## Support and Questions

For questions about the staging site or to report issues:
- Review this README for guidance
- Check browser console for JavaScript errors
- Verify all asset paths are loading correctly
- Contact the development team with specific issues

## Version History

- **v2.0** - Initial staging release with complete redesign
  - New navigation and hero section
  - Practice areas grid layout
  - Floating social bar and chat widget
  - Enhanced contact section
  - Full responsive design
  - Accessibility improvements
