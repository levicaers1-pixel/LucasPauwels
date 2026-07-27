# Lucas Pauwels Golf - Award-Winning Website

A premium, golf-themed website designed for rising star Lucas Pauwels to attract sponsors and showcase his journey in professional golf.

## Features

### Design
- **Elegant Golf Theme**: Deep green and gold color palette inspired by luxury golf courses
- **Modern Animations**: Smooth scroll effects, floating golf balls, and interactive elements
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Clean Layout**: Single-page design with clear sections for easy navigation

### Sections
1. **Hero Section**
   - Animated golf ball icon
   - Compelling tagline with typing effect
   - Call-to-action buttons
   - Scroll indicator

2. **About Section**
   - Image stack with hover effects
   - Personal story and achievements
   - Animated achievement cards

3. **Statistics Section**
   - Circular progress charts
   - Animated counters
   - Golf performance metrics

4. **Sponsorship Section**
   - Three-tier sponsorship packages
   - Benefits and features for each tier
   - Current sponsors showcase

5. **Contact Section**
   - Contact information
   - Social media links
   - Working contact form with validation

### Animations & Effects
- Floating golf ball background
- Scroll-triggered reveal animations
- Hover effects on cards and buttons
- Smooth scrolling navigation
- Parallax effects
- 3D tilt effects on sponsorship cards

## Quick Start

### Option 1: Open Directly
Simply open the `index.html` file in your web browser.

### Option 2: Local Server
For best results, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
LucasPauwels-Golf/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive JavaScript
└── README.md           # This file
```

## Customization

### Update Personal Information
Edit the following in `index.html`:
- Name and tagline in the hero section
- Bio text in the about section
- Statistics values in the stats section
- Contact information in the contact section
- Social media links

### Update Images
Replace the placeholder divs with actual images:
```html
<!-- Replace this -->
<div class="placeholder-img golf-action-1"></div>

<!-- With this -->
<img src="path/to/your-image.jpg" alt="Lucas Pauwels Golf">
```

### Add Sponsor Logos
Update the sponsor logos section:
```html
<div class="sponsor-logos">
    <img src="sponsor1.png" alt="Sponsor 1" class="sponsor-logo">
    <img src="sponsor2.png" alt="Sponsor 2" class="sponsor-logo">
</div>
```

### Update Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-dark: #1a2e2e;
    --primary-green: #2d5a5a;
    --accent-gold: #c8a86b;
    /* ... */
}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome for Android)

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations, Custom Properties)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Playfair Display, Montserrat)

## Performance Tips

1. **Optimize Images**: Compress images before adding them
2. **Lazy Loading**: Use the `loading="lazy"` attribute for images
3. **Minify**: Minify CSS and JS for production

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Design Inspiration: Premium golf and sports websites

## License

This project is free to use for personal and commercial purposes. Attribution is appreciated but not required.

---

**Designed with passion for the game of golf.**

*Driving Ambition. Perfecting Precision. Chasing Greatness.*
