# L P Golf - Clean Modern Website

A minimal, professional, and anonymous website for a rising golf professional.

## Features

### Design
- **Clean & Minimal**: Dark background with neon green accents
- **Professional**: Sleek typography and spacing
- **Anonymous**: Uses "L P" instead of full name
- **Modern**: Subtle animations and hover effects

### Sections
1. **Hero** - Large "L P" branding with floating golf ball
2. **About** - Journey and achievements
3. **Stats** - 6 key golf statistics with animated progress bars
4. **Sponsors** - 3-tier sponsorship packages
5. **Contact** - Form and contact information

### Statistics
- Driving Distance: 295 yds
- Driving Accuracy: 78%
- Greens in Regulation: 72%
- Putting Average: 29.5/round
- Scrambling: 68%
- Scoring Average: 71.2/round

## Quick Start

### Open Directly
Open `index.html` in any browser.

### Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

### GitHub Pages
1. Go to repository Settings
2. Click "Pages"
3. Select "main" branch and "/ (root)" folder
4. Click Save
5. Site will be live at: `https://levicaers1-pixel.github.io/LucasPauwels/`

## Customization

### Update Stats
Edit the stat cards in `index.html`:
```html
<div class="stat-card">
    <div class="stat-icon">...</div>
    <div class="stat-info">
        <span class="stat-label">Driving Distance</span>
        <div class="stat-value">295<span class="stat-unit">yds</span></div>
    </div>
    <div class="stat-bar">
        <div class="stat-progress" style="--progress: 92%;"></div>
    </div>
</div>
```

### Add Images
Replace placeholders with actual images:
```html
<img src="your-image.jpg" alt="Golf" loading="lazy">
```

### Update Contact Info
Edit the contact section in `index.html`:
```html
<div class="contact-text">
    <h5>Email</h5>
    <p>your@email.com</p>
</div>
```

## Technologies
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## License
Free to use for personal and commercial purposes.
