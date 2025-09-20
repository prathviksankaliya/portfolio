# Professional Portfolio - React + Vite

A modern, responsive portfolio website built with React and Vite, featuring dynamic content management through JSON files.

## 🚀 Features

- **Static Frontend, Dynamic Content**: Update your portfolio content by editing JSON files - no code changes needed!
- **Fully Responsive**: Looks great on all devices
- **Modern Design**: Clean, professional design with smooth animations
- **Fast Performance**: Built with Vite for lightning-fast development and optimized production builds
- **Easy to Deploy**: Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/       # Reusable components (Navbar, Footer)
│   ├── pages/            # Page components
│   ├── styles/           # CSS files for styling
│   ├── data/            # JSON files for content management
│   │   ├── profile.json     # Personal info, social links, about
│   │   ├── skills.json      # Technical skills
│   │   ├── experience.json  # Work experience
│   │   ├── projects.json    # Portfolio projects
│   │   ├── education.json   # Education & certifications
│   │   └── services.json    # Services offered
│   └── hooks/           # Custom React hooks
└── public/              # Static assets (images, resume PDF)
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📝 Content Management

All content is managed through JSON files in the `src/data/` directory. Simply edit these files to update your portfolio:

### 1. Profile Information (`profile.json`)
- Personal details (name, title, email, phone, location)
- Social media links
- About section content
- Resume PDF link

### 2. Skills (`skills.json`)
- Organized by categories (Frontend, Backend, Tools)
- Each skill has a proficiency level (0-100)

### 3. Experience (`experience.json`)
- Work history with company, position, duration
- Responsibilities and technologies used

### 4. Projects (`projects.json`)
- Portfolio projects with descriptions
- Technologies used
- Live demo and GitHub links
- Featured projects appear on homepage

### 5. Education (`education.json`)
- Educational background
- Certifications and achievements

### 6. Services (`services.json`)
- Services you offer
- Displayed in the About page

## 🖼️ Adding Images

1. Place images in the `public/images/` directory
2. Reference them in JSON files as `/images/filename.jpg`
3. For profile avatar: Update `avatar` field in `profile.json`
4. For project images: Update `image` field in each project

## 📄 Adding Your Resume

1. Place your resume PDF in the `public/` directory
2. Update the `resume` field in `profile.json` to `/your-resume.pdf`

## 🎨 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #667eea;    /* Main theme color */
  --secondary-color: #764ba2;   /* Secondary theme color */
  /* ... other variables */
}
```

### Styling
Each page has its own CSS file in `src/styles/` for easy customization.

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will auto-deploy on push

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📱 Features by Page

- **Home**: Hero section, about preview, featured projects
- **About**: Full bio, education, certifications, services
- **Experience**: Timeline view of work history
- **Projects**: Filterable project gallery with modal details
- **Skills**: Visual skill bars and proficiency levels
- **Contact**: Contact form and social links

## 🔧 Technologies Used

- React 18
- Vite
- React Router DOM
- React Icons
- CSS3 with custom properties
- JSON for content management

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. If you build something cool, share it!

## 💡 Tips for Content Updates

1. **Keep images optimized**: Use compressed images for better performance
2. **Update regularly**: Keep your experience and projects current
3. **Test responsiveness**: Check how content looks on mobile after updates
4. **Backup JSON files**: Keep copies of your JSON files before major changes

## 🐛 Troubleshooting

- **Images not showing**: Check file paths start with `/` and files exist in `public/`
- **Build errors**: Run `npm install` to ensure all dependencies are installed
- **Content not updating**: Hard refresh browser (Ctrl+F5) or clear cache

---

Built with ❤️ using React + Vite