const fs = require('fs');

const html = fs.readFileSync('FarmLink-Prototype/index.html', 'utf8');
const css = fs.readFileSync('FarmLink-Prototype/styles.css', 'utf8');
const js = fs.readFileSync('FarmLink-Prototype/app.js', 'utf8');

console.log('=== COMPREHENSIVE FARMLINK VERIFICATION ===');

const tests = [
  // Splash checks
  { name: 'Splash Screen element (#app-splash-screen)', ok: html.includes('id="app-splash-screen"') },
  { name: 'Splash Growing Sprout SVG', ok: html.includes('splash-agri-svg') },
  { name: 'Splash Progress Bar & Status Text', ok: html.includes('splash-progress-fill') && html.includes('splash-status-message') },
  
  // Views
  { name: 'Auth View (#view-auth)', ok: html.includes('id="view-auth"') },
  { name: 'Dashboard View (#view-dashboard)', ok: html.includes('id="view-dashboard"') },
  { name: 'Market Intelligence View (#view-market)', ok: html.includes('id="view-market"') },
  { name: 'My Lots View (#view-lots)', ok: html.includes('id="view-lots"') },
  { name: 'Buyers View (#view-buyers)', ok: html.includes('id="view-buyers"') },
  { name: 'Offers View (#view-offers)', ok: html.includes('id="view-offers"') },
  { name: 'Logistics View (#view-logistics)', ok: html.includes('id="view-logistics"') },
  { name: 'Payments View (#view-payments)', ok: html.includes('id="view-payments"') },
  { name: 'Profile View (#view-profile)', ok: html.includes('id="view-profile"') },
  
  // Tinted card classes
  { name: 'Attention Cards (AI, Offer, Logistics, Payment)', ok: html.includes('card-ai-attention') && html.includes('card-offer-attention') && html.includes('card-logistics-attention') && html.includes('card-payment-attention') },
  { name: 'Market Crop Cards (Tomato, Onion, Wheat, Cotton, Potato)', ok: html.includes('market-card-tomato') && html.includes('market-card-onion') && html.includes('market-card-wheat') && html.includes('market-card-cotton') && html.includes('market-card-potato') },
  
  // Canonical data in JS
  { name: 'Canonical Lot FL-2026-0003', ok: js.includes('FL-2026-0003') },
  { name: 'Canonical Buyer FreshFoods', ok: js.includes('FreshFoods') },
  { name: 'Canonical Shipment SHIP-2026-0002', ok: js.includes('SHIP-2026-0002') },
  { name: 'Canonical Payment PAY-2026-0001', ok: js.includes('PAY-2026-0001') },
  { name: 'AI Recommendation 93% Confidence', ok: js.includes('93%') && js.includes('₹31–₹32/kg') },
  { name: 'Demo Credentials 9876543210 / 123456', ok: html.includes('9876543210') && html.includes('123456') },

  // Mobile Bottom Navigation
  { name: 'Mobile Bottom Navigation (#mobile-bottom-nav)', ok: html.includes('mobile-bottom-nav') }
];

let allOk = true;
tests.forEach(t => {
  console.log(`[${t.ok ? '✓ PASS' : '✗ FAIL'}] ${t.name}`);
  if (!t.ok) allOk = false;
});

console.log('===========================================');
console.log('ALL COMPREHENSIVE TESTS PASSED:', allOk);
process.exit(allOk ? 0 : 1);
