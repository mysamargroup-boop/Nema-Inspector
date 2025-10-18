const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

fs.readFile(sitemapPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading sitemap.xml:', err);
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const updatedSitemap = data.replace(/<lastmod>.*<\/lastmod>/, `<lastmod>${today}</lastmod>`);

  fs.writeFile(sitemapPath, updatedSitemap, 'utf8', (err) => {
    if (err) {
      console.error('Error writing sitemap.xml:', err);
      return;
    }
    console.log('sitemap.xml updated successfully.');
  });
});
