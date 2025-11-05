# Providence Backgammon Club Website

A classy, minimalist website for the Providence Backgammon Club, inspired by nycbackgammon.club with integrated Luma event management.

## Features

- **Modern, Elegant Design**: Classic backgammon-inspired color palette with smooth transitions
- **Responsive**: Mobile-first design that works beautifully on all devices
- **Fast**: Built with Vite for lightning-fast development and optimized production builds
- **Event Management**: Integrated with Luma for seamless event registration and calendar

## Design Philosophy

The site embodies the sophisticated, timeless nature of backgammon:
- Rich browns and golden accents inspired by traditional backgammon boards
- Clean serif typography for headers, modern sans-serif for body text
- Smooth transitions and subtle animations
- Accessible and user-friendly interface

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
pvdbgclub/
├── index.html              # Main HTML file
├── src/
│   ├── main.js            # Main JavaScript (smooth scrolling, animations)
│   ├── styles/
│   │   └── main.css       # All styles with design tokens
│   └── assets/
│       └── images/        # Images and media
├── public/                # Static assets
├── IMPLEMENTATION_PLAN.md # Staged development plan
└── package.json           # Dependencies and scripts
```

## Configuring Luma Integration

### Option 1: Embed Full Calendar

1. Go to your Luma calendar's manage page
2. Navigate to the "More" or "Settings" tab
3. Find "Embed Calendar" and copy the embed code
4. In `index.html`, find the `#luma-events` div (around line 78)
5. Paste your Luma embed code inside this div

Example:
```html
<div id="luma-events" class="luma-embed-container">
  <!-- Paste your Luma embed code here -->
  <iframe src="https://lu.ma/embed-calendar/..." ...></iframe>
</div>
```

### Option 2: Embed Individual Event Buttons

1. Go to a specific event on Luma
2. Navigate to "More" > "Embed Registration Button"
3. Copy the button embed code
4. Add it anywhere in your HTML where you want the button

The embed will be automatically styled to match the site's aesthetic.

### Customizing Luma Styles

Luma embeds can be customized via CSS. Key classes and IDs:
- `.luma-embed-container` - Container styling
- Luma-specific selectors can be targeted in `src/styles/main.css`

## Customization

### Colors

Edit the CSS custom properties in `src/styles/main.css`:

```css
:root {
  --color-primary: #8b4513;        /* Main brand color */
  --color-primary-dark: #654321;   /* Darker variant */
  --color-secondary: #daa520;      /* Accent color */
  --color-background: #faf8f3;     /* Page background */
  /* ... more variables ... */
}
```

### Content

Edit `index.html` directly to update:
- Club name and descriptions
- Contact information
- About section content
- Features and benefits

### Typography

Change fonts by updating the CSS custom properties:

```css
:root {
  --font-serif: 'Your Serif Font', serif;
  --font-sans: 'Your Sans Font', sans-serif;
}
```

Don't forget to add font links to the `<head>` in `index.html` if using web fonts.

## Deployment

### Netlify

1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel

1. Connect your GitHub repo to Vercel
2. Framework preset: Vite
3. Deploy!

### GitHub Pages

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a club website. If you're a member and want to suggest improvements, reach out to the club organizers.

## License

© 2025 Providence Backgammon Club. All rights reserved.

## Credits

- Design inspired by [NYC Backgammon Club](https://nycbackgammon.club)
- Event management by [Luma](https://lu.ma)
- Built with [Vite](https://vitejs.dev)
