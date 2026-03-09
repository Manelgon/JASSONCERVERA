const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const circles = html.match(/<circle[^>]*>/g) || [];
circles.forEach(c => {
    const rMatch = c.match(/r="(\d+)"/);
    if (rMatch) {
        const r = parseInt(rMatch[1]);
        if (r > 20) {
            console.log(c);
        }
    }
});
