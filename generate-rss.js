const fs = require('fs');
const RSS = require('rss');

const artists = fs.readFileSync('artists.txt', 'utf8').split('\n').filter(Boolean);

const feed = new RSS({
  title: 'Lidarr - Liste d\'artistes',
  description: 'Ajout automatique via flux RSS',
  feed_url: 'https://TON-UTILISATEUR.github.io/lidarr-rss/artists.xml',
  site_url: 'https://TON-UTILISATEUR.github.io/lidarr-rss/',
  language: 'fr'
});

artists.forEach((name, i) => {
  feed.item({
    title: name,
    guid: name.toLowerCase().replace(/\s/g, '-'),
    date: new Date(Date.now() - i * 60000) // Décaler chaque item de 1min pour éviter les doublons
  });
});

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/artists.xml', feed.xml({ indent: true }));
