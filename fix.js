const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix circles that are just r='8' solid dots
html = html.replace(/<circle\s+cx=\"(\d+)\"\s+cy=\"(\d+)\"\s+r=\"8\"\s+fill=\"(#[a-fA-F0-9]+)\"\s*\/>/g,
    '<circle cx=\"$1\" cy=\"$2\" r=\"10\" fill=\"white\" stroke=\"$3\" stroke-width=\"4\" />\n            <circle cx=\"$1\" cy=\"$2\" r=\"4\" fill=\"$3\" />');

// 2. Standardize sizes in Title vs Date
// We want Title: font-size="17" font-weight="600" fill="#3a3030"
// We want Date: font-size="14" fill="COLOR"
// Replacing bold/large dates with standard date style:
html = html.replace(/font-size=\"17\"\s+font-weight=\"700\"\s+fill=\"(#[a-fA-F0-9]+)\"/g, 'font-size=\"14\" fill=\"$1\"');

// Let's replace "font-size="17" fill="#3a3030"" with "font-size="17" font-weight="600" fill="#3a3030""
// Since regex is simple, let's fix the titles that might be missing font-weight="600"
html = html.split('\n').map(line => {
    if (line.includes('fill=\"#3a3030\"') && line.includes('font-size=\"17\"') && !line.includes('font-weight=\"')) {
        return line.replace(/fill=\"#3a3030\"/, 'font-weight=\"600\" fill=\"#3a3030\"');
    }
    return line;
}).join('\n');

html = html.split('\n').map(line => {
    if (line.includes('fill=\"#2D8B7A\"') && line.includes('font-size=\"17\"')) {
        return line.replace(/font-size=\"17\"/, 'font-size=\"14\"');
    }
    if (line.includes('fill=\"#4A7BB7\"') && line.includes('font-size=\"17\"')) {
        return line.replace(/font-size=\"17\"/, 'font-size=\"14\"');
    }
    if (line.includes('fill=\"#C07640\"') && line.includes('font-size=\"17\"') && !line.includes('font-weight=\"600\"')) {
        return line.replace(/font-size=\"17\"/, 'font-size=\"14\"');
    }
    return line;
}).join('\n');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Format standardized.');
