import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Fix circles that are just r='8' solid dots
# Example: <circle cx="70" cy="75" r="8" fill="#B38645" /> -> triple circle
html = re.sub(
    r'<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="8"\s+fill="(#[A-Fa-f0-9]+)"\s*/>',
    r'<circle cx="\1" cy="\2" r="18" fill="transparent" />\n            <circle cx="\1" cy="\2" r="10" fill="white" stroke="\3" stroke-width="4" />\n            <circle cx="\1" cy="\2" r="4" fill="\3" />',
    html
)

# Also there might be cases where r="18" fill="transparent" was already there, so we might duplicate it.
# Let's clean up any double transparent circles:
html = re.sub(r'(<circle cx="\d+" cy="\d+" r="18" fill="transparent" />\s*){2,}', r'\1', html)

# 2. Fix fonts
# We want titles to be font-size="17" font-weight="600" fill="#3a3030"
# We want dates to be font-size="14" fill="COLOR"

# Replace bold/large colored dates with size 14 unbolded colored dates:
html = re.sub(
    r'font-size="17"\s+font-weight="700"\s+fill="(#[A-Fa-f0-9]+)"',
    r'font-size="14" fill="\1"',
    html
)

# For titles that have fill="#3a3030" but missing font-weight="600":
html = re.sub(
    r'font-size="17"\s+fill="#3a3030"',
    r'font-size="17" font-weight="600" fill="#3a3030"',
    html
)

# For any colored text that is size 17, make it 14 (except #3a3030 which is dark grey for titles)
colors = ['#B38645', '#2D8B7A', '#4A7BB7', '#C07640', '#7B5EA7']
for color in colors:
    # Need to be careful not to replace stroke colors, only fills in text
    # But font-size="17" fill="COLOR" is specific enough
    html = html.replace(f'font-size="17" fill="{color}"', f'font-size="14" fill="{color}"')
    html = html.replace(f'font-size="17" font-weight="600" fill="{color}"', f'font-size="14" fill="{color}"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done")
