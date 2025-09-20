// Generate demo images for projects
export const getDemoProjectImage = (title, index) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  ];

  const svgContent = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad${index})"/>
      <rect x="30" y="30" width="340" height="240" rx="20" fill="white" opacity="0.1"/>
      <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">${title}</text>
      <text x="200" y="180" font-family="Arial, sans-serif" font-size="14" fill="white" opacity="0.8" text-anchor="middle">Mobile Application</text>
    </svg>
  `;

  // Properly encode SVG with Unicode characters
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
};

export const getDemoPhoneImage = (title, index) => {
  const colors = [
    { primary: '#667eea', secondary: '#764ba2' },
    { primary: '#f093fb', secondary: '#f5576c' },
    { primary: '#4facfe', secondary: '#00f2fe' },
    { primary: '#43e97b', secondary: '#38f9d7' },
    { primary: '#fa709a', secondary: '#fee140' },
    { primary: '#30cfd0', secondary: '#330867' },
    { primary: '#a8edea', secondary: '#fed6e3' },
    { primary: '#ff9a9e', secondary: '#fecfef' },
  ];

  const color = colors[index % colors.length];
  const screenNumber = title.match(/Screen (\d+)/) ? title.match(/Screen (\d+)/)[1] : '';
  const appName = title.replace(/ - Screen \d+/, '');

  const svgContent = `
    <svg width="375" height="812" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phoneGrad${index}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.secondary};stop-opacity:1" />
        </linearGradient>
        <clipPath id="phoneScreen${index}">
          <rect x="0" y="0" width="375" height="812" rx="40" />
        </clipPath>
      </defs>
      
      <!-- Phone Background -->
      <rect width="375" height="812" fill="url(#phoneGrad${index})" clip-path="url(#phoneScreen${index})"/>
      
      <!-- Status Bar -->
      <rect x="0" y="0" width="375" height="44" fill="black" opacity="0.1"/>
      <text x="20" y="30" font-family="SF Pro Display, Arial" font-size="14" fill="white" font-weight="600">9:41</text>
      <text x="355" y="30" font-family="SF Pro Display, Arial" font-size="14" fill="white" text-anchor="end">100%</text>
      
      <!-- App Header -->
      <rect x="0" y="44" width="375" height="88" fill="white" opacity="0.15"/>
      <text x="187" y="95" font-family="SF Pro Display, Arial" font-size="20" font-weight="bold" fill="white" text-anchor="middle">${appName}</text>
      
      <!-- Content Area -->
      <g transform="translate(20, 160)">
        <!-- Card 1 -->
        <rect x="0" y="0" width="335" height="120" rx="15" fill="white" opacity="0.95"/>
        <rect x="15" y="15" width="60" height="60" rx="10" fill="${color.primary}" opacity="0.2"/>
        <rect x="90" y="20" width="150" height="12" rx="6" fill="${color.primary}" opacity="0.3"/>
        <rect x="90" y="40" width="200" height="8" rx="4" fill="#e0e0e0"/>
        <rect x="90" y="55" width="180" height="8" rx="4" fill="#e0e0e0"/>
        <text x="15" y="100" font-family="SF Pro Display, Arial" font-size="12" fill="#666">Feature ${screenNumber || '1'}</text>
        
        <!-- Card 2 -->
        <rect x="0" y="140" width="335" height="120" rx="15" fill="white" opacity="0.95"/>
        <rect x="15" y="155" width="60" height="60" rx="10" fill="${color.secondary}" opacity="0.2"/>
        <rect x="90" y="160" width="150" height="12" rx="6" fill="${color.secondary}" opacity="0.3"/>
        <rect x="90" y="180" width="200" height="8" rx="4" fill="#e0e0e0"/>
        <rect x="90" y="195" width="180" height="8" rx="4" fill="#e0e0e0"/>
        <text x="15" y="240" font-family="SF Pro Display, Arial" font-size="12" fill="#666">Feature ${(parseInt(screenNumber) || 1) + 1}</text>
        
        <!-- Card 3 -->
        <rect x="0" y="280" width="335" height="120" rx="15" fill="white" opacity="0.95"/>
        <rect x="15" y="295" width="60" height="60" rx="10" fill="${color.primary}" opacity="0.2"/>
        <rect x="90" y="300" width="150" height="12" rx="6" fill="${color.primary}" opacity="0.3"/>
        <rect x="90" y="320" width="200" height="8" rx="4" fill="#e0e0e0"/>
        <rect x="90" y="335" width="180" height="8" rx="4" fill="#e0e0e0"/>
        <text x="15" y="380" font-family="SF Pro Display, Arial" font-size="12" fill="#666">Feature ${(parseInt(screenNumber) || 1) + 2}</text>
        
        <!-- Stats Section -->
        <rect x="0" y="420" width="160" height="100" rx="15" fill="white" opacity="0.95"/>
        <text x="80" y="460" font-family="SF Pro Display, Arial" font-size="24" font-weight="bold" fill="${color.primary}" text-anchor="middle">98%</text>
        <text x="80" y="485" font-family="SF Pro Display, Arial" font-size="12" fill="#666" text-anchor="middle">Performance</text>
        
        <rect x="175" y="420" width="160" height="100" rx="15" fill="white" opacity="0.95"/>
        <text x="255" y="460" font-family="SF Pro Display, Arial" font-size="24" font-weight="bold" fill="${color.secondary}" text-anchor="middle">4.8</text>
        <text x="275" y="460" font-family="SF Pro Display, Arial" font-size="20" fill="${color.secondary}">★</text>
        <text x="255" y="485" font-family="SF Pro Display, Arial" font-size="12" fill="#666" text-anchor="middle">User Rating</text>
      </g>
      
      <!-- Bottom Navigation -->
      <rect x="0" y="732" width="375" height="80" fill="white" opacity="0.15"/>
      <g transform="translate(0, 750)">
        <rect x="37" y="0" width="30" height="30" rx="6" fill="white" opacity="0.3"/>
        <rect x="112" y="0" width="30" height="30" rx="6" fill="white" opacity="0.3"/>
        <rect x="187" y="0" width="30" height="30" rx="6" fill="white" opacity="0.5"/>
        <rect x="262" y="0" width="30" height="30" rx="6" fill="white" opacity="0.3"/>
        <rect x="337" y="0" width="30" height="30" rx="6" fill="white" opacity="0.3"/>
      </g>
      
      <!-- Home Indicator -->
      <rect x="157" y="799" width="60" height="4" rx="2" fill="white" opacity="0.5"/>
    </svg>
  `;

  // Properly encode SVG with Unicode characters
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
};

// Generate avatar placeholder
export const getAvatarPlaceholder = (name) => {
  const initials = name
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'JD';

  const svgContent = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#avatarGrad)"/>
      <text x="100" y="120" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
    </svg>
  `;

  // Properly encode SVG with Unicode characters
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
};