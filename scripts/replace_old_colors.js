const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

// Map of exact hex replacements in classNames
const replacements = [
  // Backgrounds
  { from: /bg-\[#(?:FFFDF7|FFFFFF|FDFBF7|FAF8F2|FFF8ED|F7F4EC)\]/gi, to: 'bg-farm-surface' },
  { from: /bg-\[#(?:F3EBDD|EDE5D8|E5DDCF|EBE3D5|F2EAE0|EEE9DE)\]/gi, to: 'bg-farm-surface-secondary' },
  { from: /bg-\[#(?:DCE8D7|E0EBDC|DFEBDD|E3ECE5|DFE9E1|E0E9DF)\]/gi, to: 'bg-farm-brand-soft' },
  { from: /bg-\[#(?:F3D6C4|F5DBD0|F2D6C6|F2E3DA|F1DED4)\]/gi, to: 'bg-farm-terracotta-soft' },
  { from: /bg-\[#(?:F6E7B8|F7EBBF|F5E6B5|F5EBD2|F1E8CF)\]/gi, to: 'bg-farm-gold-soft' },
  { from: /bg-\[#(?:DCEAF2|DFEBE9|E1ECF0|E2ECF2|E1EBEF)\]/gi, to: 'bg-farm-eucalyptus-soft' },
  { from: /bg-\[#(?:FBEBEB|FDE8E8|F9EBEA|F8E5E4)\]/gi, to: 'bg-farm-danger-soft' },
  { from: /bg-\[#(?:164A36|1F5135|245B5A|1A4231|285943|24352D|1F4635)\]/gi, to: 'bg-farm-brand' },
  { from: /bg-\[#(?:C66B45|B35835|A86645|B96E4B)\]/gi, to: 'bg-farm-terracotta' },
  { from: /bg-\[#(?:D9A441|B88A32|C2922E|B8A05A)\]/gi, to: 'bg-farm-gold' },
  { from: /bg-\[#(?:5C91B8|4C7896|3B6680|64899A)\]/gi, to: 'bg-farm-info' },
  { from: /bg-\[#(?:B94A48|B34B46|A63A35|B85B55)\]/gi, to: 'bg-farm-danger' },
  { from: /bg-\[#(?:39734D|4F805D|2E6B40)\]/gi, to: 'bg-farm-success' },

  // Text
  { from: /text-\[#(?:17211C|202923|1B241F|111A15|24352D)\]/gi, to: 'text-farm-text' },
  { from: /text-\[#(?:66736A|5F6861|556157|4E5950|657067)\]/gi, to: 'text-farm-text-secondary' },
  { from: /text-\[#(?:8A968E|7D847E|8F9B91|8A9189)\]/gi, to: 'text-farm-text-muted' },
  { from: /text-\[#(?:FFFDF7|FFFFFF|FAF8F2|F5F1E8)\]/gi, to: 'text-white' },
  { from: /text-\[#(?:164A36|1F5135|245B5A|1A4231|285943|24352D|34452F)\]/gi, to: 'text-farm-brand' },
  { from: /text-\[#(?:C66B45|B35835|A86645|B96E4B|7A3215|8A5A3B)\]/gi, to: 'text-farm-terracotta' },
  { from: /text-\[#(?:D9A441|B88A32|C2922E|B8A05A|694708)\]/gi, to: 'text-farm-gold' },
  { from: /text-\[#(?:5C91B8|4C7896|3B6680|64899A|1F4765)\]/gi, to: 'text-farm-info' },
  { from: /text-\[#(?:B94A48|B34B46|A63A35|B85B55|96302B)\]/gi, to: 'text-farm-danger' },
  { from: /text-\[#(?:39734D|4F805D|2E6B40)\]/gi, to: 'text-farm-success' },

  // Borders
  { from: /border-\[#(?:D5C9B5|DCE2D9|D9DCD5|E5DDD0|C8D1C5|D9D8CF)\]/gi, to: 'border-farm-border' },
  { from: /border-\[#(?:BFD4B8|BFC7BD|B5C2B2|B8B9AE)\]/gi, to: 'border-farm-border-strong' },
  { from: /border-\[#(?:E8BCA6|E6B8A0|F1DED4)\]/gi, to: 'border-farm-terracotta/40' },
  { from: /border-\[#(?:E4CC8B|E2C880|F1E8CF)\]/gi, to: 'border-farm-gold/40' },
  { from: /border-\[#(?:B6D3E3|B0CDE0|E1EBEF)\]/gi, to: 'border-farm-info/40' },
  { from: /border-\[#(?:164A36|1F5135|245B5A|285943|24352D)\]/gi, to: 'border-farm-brand' },
  { from: /border-\[#(?:C66B45|B35835|A86645|B96E4B)\]/gi, to: 'border-farm-terracotta' },
  { from: /border-\[#(?:D9A441|B88A32|C2922E|B8A05A)\]/gi, to: 'border-farm-gold' },
  { from: /border-\[#(?:5C91B8|4C7896|64899A)\]/gi, to: 'border-farm-info' },
  { from: /border-\[#(?:B94A48|B34B46|B85B55)\]/gi, to: 'border-farm-danger' },

  // Opacities & specifics
  { from: /bg-\[#FFFDF7\]\/10/gi, to: 'bg-white/10' },
  { from: /bg-\[#FFFDF7\]\/15/gi, to: 'bg-white/15' },
  { from: /bg-\[#FFFDF7\]\/20/gi, to: 'bg-white/20' },
  { from: /hover:bg-\[#FFFDF7\]\/20/gi, to: 'hover:bg-white/20' },
  { from: /hover:bg-\[#FFFDF7\]\/15/gi, to: 'hover:bg-white/15' },
  { from: /text-\[#DCE8E6\]/gi, to: 'text-farm-text-secondary' },
  { from: /text-\[#DCE8D7\]/gi, to: 'text-farm-brand-soft' },
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
        console.log(`Updated: ${path.relative(srcDir, fullPath)}`);
        count++;
      }
    }
  }

  return count;
}

console.log('Starting Forest Night token replacement in src/...');
const updatedFiles = processDirectory(srcDir);
console.log(`Total files updated: ${updatedFiles}`);
