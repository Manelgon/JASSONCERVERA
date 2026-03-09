const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace font-size="15" -> "17"
html = html.replace(/font-size=\"15\"/g, 'font-size=\"17\"');

// Replace font-size="12" -> "14"
html = html.replace(/font-size=\"12\"/g, 'font-size=\"14\"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Replaced correctly!');
