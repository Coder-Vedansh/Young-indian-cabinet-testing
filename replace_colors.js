const fs = require('fs');
const path = require('path');

const replacements = {
  '#081B33': '#09090b', // Dark Blue -> Deep Slate
  '#C89B2A': '#00e5ff', // Gold -> Neon Cyan
  '#F7F3EA': '#ffffff', // Ivory -> Pure White
  '#D97706': '#a855f7', // Orange/Gold -> Neon Purple
  '#0F6B4B': '#00e5ff', // Emerald -> Neon Cyan
  '#040e1b': '#000000', // Darker blue -> Black
  '#0a192f': '#09090b', // Dark blue -> Deep Slate
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const [oldColor, newColor] of Object.entries(replacements)) {
    // case insensitive replace
    const regex = new RegExp(oldColor, 'gi');
    content = content.replace(regex, newColor);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log(`Successfully updated colors in ${modifiedCount} files.`);
