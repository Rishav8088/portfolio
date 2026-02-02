# Portfolio Website - Rishabh Shrestha

A modern, professional one-page portfolio website showcasing expertise in Android Development, Flutter Development, and Java Spring Boot.

## 🚀 Features

- **Modern Dark Theme** - Professional IT/software engineering theme with tech-style accent colors
- **Fully Responsive** - Mobile-first design that works on all devices
- **Smooth Animations** - Scroll-triggered animations and smooth transitions
- **Clean Architecture** - Semantic HTML5, CSS Grid/Flexbox, and vanilla JavaScript
- **Performance Optimized** - Lightweight and fast-loading

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All styling and responsive design
├── script.js           # JavaScript for interactivity and animations
├── CNAME               # Custom domain configuration (for GitHub Pages)
├── .nojekyll           # Disable Jekyll processing
├── README.md           # This file
├── .github/
│   └── workflows/
│       └── static.yml  # GitHub Actions workflow for deployment
└── public/
    └── assets/
        └── images/
            └── profileImage  # Your profile image (add your image here)
```

## 🛠️ Setup Instructions

### Local Development

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Add your profile image**
   - Place your profile image at: `public/assets/images/profileImage`
   - Supported formats: JPG, PNG, WebP
   - Recommended size: 400x400px or larger (square aspect ratio)

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Then visit `http://localhost:8000` in your browser

### Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio website"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select `GitHub Actions` (the workflow will handle deployment)
   - Click **Save**
   - Your site will be available at: `https://<username>.github.io/portfolio`

3. **Using Custom Domain (Optional)**
   - Edit the `CNAME` file and replace `yourdomain.com` with your actual domain
   - Push the changes to GitHub
   - In your domain registrar, add a CNAME record:
     - **Type**: CNAME
     - **Name**: www (or @ for root domain)
     - **Value**: `<username>.github.io`
   - For root domain (apex domain), you may need to use A records instead:
     - Add A records pointing to GitHub Pages IPs:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
   - GitHub will automatically detect the CNAME file and configure SSL for your custom domain

### Customize Content

- **Personal Information**: Edit the `index.html` file to update:
  - Phone number
  - Email address
  - LinkedIn profile URL
  - Location
  - Reference contact information

- **Projects**: Update project details in the Projects section:
  - Project names and descriptions
  - Features list
  - Technology stack badges
  - Google Play Store links

- **Experience**: Modify the Experience timeline section with your actual work history

- **Skills**: Add or remove skills in the Skills section

- **Colors**: Customize colors in `style.css` by modifying CSS variables:
  ```css
  :root {
      --primary-color: #00d4ff;
      --secondary-color: #00ff88;
      --accent-color: #0066ff;
      /* ... */
  }
  ```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

- **Hero Section**: Animated title rotation, profile image with hover effects
- **About Section**: Two-column layout with professional summary
- **Experience Timeline**: Vertical timeline with hover animations
- **Projects**: Card-based layout with featured project highlighting
- **Skills**: Categorized badges with hover effects
- **Education**: Grid layout with hover animations
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Scroll Animations**: Elements fade in as you scroll
- **Mobile Menu**: Hamburger menu for mobile devices

## 📝 Notes

- The profile image path is set to `public/assets/images/profileImage` - make sure to add your image there
- All links (LinkedIn, Play Store, etc.) are placeholder URLs - update them with your actual links
- Contact information (phone, email) uses placeholder values - update with your real information
- The website uses Google Fonts (Inter and Fira Code) - requires internet connection for fonts to load

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **Google Fonts** - Inter and Fira Code fonts

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Rishabh Shrestha**
- Mobile Application Developer
- Android Developer / Flutter Developer / Java Spring Boot Developer

---

Built with ❤️ using HTML, CSS & JavaScript
