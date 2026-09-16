const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

const replacements = [
  { from: /divide-\[#(?:D5C9B5|DCE2D9|D9DCD5|D9D8CF)\]/gi, to: 'divide-farm-border' },
  { from: /ring-\[#(?:164A36|245B5A|285943|24352D)\]/gi, to: 'ring-farm-brand' },
  { from: /ring-\[#(?:C66B45|A86645|B96E4B)\]/gi, to: 'ring-farm-terracotta' },
  { from: /ring-\[#(?:D9A441|B88A32|B8A05A)\]/gi, to: 'ring-farm-gold' },
  { from: /ring-\[#(?:F6E7B8|F1E8CF)\]/gi, to: 'ring-farm-gold-soft' },
  { from: /placeholder-\[#(?:66736A|5F6861|8A9189)\]/gi, to: 'placeholder-farm-text-muted' },
  { from: /fill-\[#(?:164A36|245B5A|285943|24352D)\]/gi, to: 'fill-farm-brand' },
  { from: /fill-\[#(?:D9A441|B88A32|B8A05A)\]/gi, to: 'fill-farm-gold' },
  { from: /fill-\[#(?:C66B45|A86645|B96E4B)\]/gi, to: 'fill-farm-terracotta' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      count += processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const rep of replacements) {
        if (rep.from.test(content)) {
          content = content.replace(rep.from, rep.to);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned final: ${path.relative(srcDir, fullPath)}`);
        count++;
      }
    }
  }

  return count;
}

console.log('Final sweep of ring, divide, and placeholder tokens...');
const updatedFiles = processDirectory(srcDir);
console.log(`Total files cleaned in final sweep: ${updatedFiles}`);
