const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Restore halos by replacing translucent circles
// Pattern: <g ...> <circle r="18" fill="transparent" /> ... <circle stroke="COLOR" ... />
html = html.replace(
    /(<g class="metro-station"[^>]*>[\s\S]*?)<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="18"\s+fill="transparent"\s*\/>([\s\S]*?<circle[^>]*stroke="([^"]+)"[^>]*>)/g,
    (match, gStart, cx, cy, rest, color) => {
        // Use fill-opacity="0.12" for a subtle but visible halo
        return `${gStart}<circle cx="${cx}" cy="${cy}" r="18" fill="${color}" fill-opacity="0.12" />${rest}`;
    }
);

fs.writeFileSync('index.html', html);
console.log("Halos restored successfully.");
