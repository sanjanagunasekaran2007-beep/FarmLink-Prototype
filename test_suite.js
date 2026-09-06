const fs = require('fs');

const html = fs.readFileSync('FarmLink-Prototype/index.html', 'utf8');
const css = fs.readFileSync('FarmLink-Prototype/styles.css', 'utf8');
const js = fs.readFileSync('FarmLink-Prototype/app.js', 'utf8');

console.log('=== RUNNING IN-DEPTH AUTOMATED VERIFICATION SUITE ===');

let passCount = 0;
let failCount = 0;

function check(name, condition) {
  if (condition) {
    console.log(`[✓ PASS] ${name}`);
    passCount++;
  } else {
    console.error(`[✗ FAIL] ${name}`);
    failCount++;
  }
}

// 1. Color Palette Tokens in styles.css
check('CSS defines --primary-forest: #1F5135', css.includes('--primary-forest: #1F5135'));
check('CSS defines --primary-green: #4F8F5B', css.includes('--primary-green: #4F8F5B'));
check('CSS defines --fresh-leaf: #73A96B', css.includes('--fresh-leaf: #73A96B'));
check('CSS defines --harvest-gold: #D9A441', css.includes('--harvest-gold: #D9A441'));
check('CSS defines --warm-amber: #E8A23A', css.includes('--warm-amber: #E8A23A'));
check('CSS defines --market-blue: #4F8FA8', css.includes('--market-blue: #4F8FA8'));
check('CSS defines --ai-lavender: #7C6FA6', css.includes('--ai-lavender: #7C6FA6'));
check('CSS defines --warm-cream: #FAF7EF', css.includes('--warm-cream: #FAF7EF'));
check('CSS defines --soft-sage: #DCEBDD', css.includes('--soft-sage: #DCEBDD'));
check('CSS defines --soft-green-surface: #EEF5EC', css.includes('--soft-green-surface: #EEF5EC'));
check('CSS defines --text-main: #24332A', css.includes('--text-main: #24332A'));
check('CSS defines --text-secondary: #657168', css.includes('--text-secondary: #657168'));
check('CSS defines --border-color: #D9E1D8', css.includes('--border-color: #D9E1D8'));

// 2. Crop card distinct styling in CSS
check('CSS defines .market-card-tomato', css.includes('.market-card-tomato'));
check('CSS defines .market-card-onion', css.includes('.market-card-onion'));
check('CSS defines .market-card-wheat', css.includes('.market-card-wheat'));
check('CSS defines .market-card-cotton', css.includes('.market-card-cotton'));
check('CSS defines .market-card-potato', css.includes('.market-card-potato'));

// 3. Attention Cards in HTML
check('HTML has card-ai-attention', html.includes('card-ai-attention'));
check('HTML has card-offer-attention', html.includes('card-offer-attention'));
check('HTML has card-logistics-attention', html.includes('card-logistics-attention'));
check('HTML has card-payment-attention', html.includes('card-payment-attention'));

// 4. Hero Section in HTML
check('HTML has ai-advice-card', html.includes('ai-advice-card'));
check('HTML has ai-advice-title', html.includes('ai-advice-title'));
check('HTML has ai-metrics-row', html.includes('ai-metrics-row'));

// 5. Canonical Data in JS
check('JS has FL-2026-0003', js.includes('FL-2026-0003'));
check('JS has FreshFoods', js.includes('FreshFoods'));
check('JS has SHIP-2026-0002', js.includes('SHIP-2026-0002'));
check('JS has PAY-2026-0001', js.includes('PAY-2026-0001'));
check('JS has 9876543210 / 123456', js.includes('9876543210') && js.includes('123456'));

// 6. Mobile Responsiveness in CSS
check('CSS has @media (max-width: 1024px)', css.includes('@media (max-width: 1024px)'));
check('CSS has @media (max-width: 768px)', css.includes('@media (max-width: 768px)'));
check('CSS has @media (max-width: 480px)', css.includes('@media (max-width: 480px)'));
check('CSS has overflow-x: hidden on body', css.includes('overflow-x: hidden'));
check('CSS has mobile-bottom-nav', css.includes('.mobile-bottom-nav'));

// 7. Microinteractions & Accessibility
check('CSS has prefers-reduced-motion', css.includes('@media (prefers-reduced-motion: reduce)'));
check('CSS has button focus-visible', css.includes(':focus-visible'));
check('CSS has badgePulse animation', css.includes('@keyframes badgePulse'));

console.log('=====================================================');
console.log(`TOTAL PASSED: ${passCount} | TOTAL FAILED: ${failCount}`);

if (failCount > 0) process.exit(1);
