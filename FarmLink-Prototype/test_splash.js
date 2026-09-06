const fs = require('fs');

const html = fs.readFileSync('FarmLink-Prototype/index.html', 'utf8');
const css = fs.readFileSync('FarmLink-Prototype/styles.css', 'utf8');
const js = fs.readFileSync('FarmLink-Prototype/app.js', 'utf8');

console.log('=== VERIFYING SPLASH SCREEN IMPLEMENTATION ===');

const checks = [
  { name: 'HTML Splash container', pass: html.includes('id="app-splash-screen"') },
  { name: 'HTML Brand Title (FarmLink)', pass: html.includes('class="splash-title"') },
  { name: 'HTML Tagline (Intelligent Agricultural Marketplace)', pass: html.includes('Intelligent Agricultural Marketplace') },
  { name: 'HTML Growing Sprout SVG', pass: html.includes('class="splash-agri-svg"') && html.includes('agri-stem') },
  { name: 'HTML Status Message container', pass: html.includes('id="splash-status-message"') },
  { name: 'HTML Progress Fill bar', pass: html.includes('id="splash-progress-fill"') },
  { name: 'HTML Progress Text percent', pass: html.includes('id="splash-progress-text"') },
  { name: 'CSS Splash Screen styles', pass: css.includes('.app-splash-screen') },
  { name: 'CSS Splash Fade-out transition', pass: css.includes('.app-splash-screen.fade-out') },
  { name: 'CSS Agriculture SVG animations', pass: css.includes('@keyframes stemGrow') && css.includes('@keyframes leafUnfurlLeft') },
  { name: 'CSS Accessibility prefers-reduced-motion', pass: css.includes('@media (prefers-reduced-motion: reduce)') },
  { name: 'JS Splash Sequence function', pass: js.includes('runSplashScreenSequence') },
  { name: 'JS Message update function', pass: js.includes('updateSplashMessage') },
  { name: 'JS Progress update function', pass: js.includes('updateSplashProgress') },
  { name: 'JS Session storage for returning users', pass: js.includes('farmlink_splash_seen') },
  { name: 'JS Rotation messages present', pass: js.includes("Checking today's market trends...") && js.includes('FarmLink is ready.') }
];

let allPassed = true;
checks.forEach(c => {
  console.log(`[${c.pass ? 'PASS' : 'FAIL'}] ${c.name}`);
  if (!c.pass) allPassed = false;
});

console.log('==============================================');
console.log('ALL SPLASH CHECKS PASSED:', allPassed);
process.exit(allPassed ? 0 : 1);
