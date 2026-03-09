const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Restore halos
const regex = /(<g class="metro-station"[^>]*>[\s\S]*?)<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="18"\s+fill="transparent"\s*\/>([\s\S]*?<circle[^>]*stroke="([^"]+)"[^>]*>)/g;

html = html.replace(regex, (match, gStart, cx, cy, rest, color) => {
    return `${gStart}<circle cx="${cx}" cy="${cy}" r="18" fill="${color}" fill-opacity="0.12" />${rest}`;
});

fs.writeFileSync(indexPath, html);
console.log("Halos restored in index.html");
