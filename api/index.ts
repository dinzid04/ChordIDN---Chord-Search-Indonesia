import express from 'express';
import * as cheerio from 'cheerio';

const app = express();
const BASE = 'https://chordtela.web.id';

async function get(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  return res.text();
}

app.get('/api/youtube', async (req, res) => {
  try {
    const q = encodeURIComponent(req.query.q as string);
    const r = await fetch(`https://www.youtube.com/results?search_query=${q}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
    });
    const html = await r.text();
    const match = html.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (match && match[1]) {
      res.json({ videoId: match[1] });
    } else {
      res.json({ videoId: null });
    }
  } catch (error: any) {
    res.json({ videoId: null });
  }
});

app.get('/api/home', async (req, res) => {
  try {
    const html = await get(BASE + '/');
    const $ = cheerio.load(html);

    const listItems = (sel: string) =>
      $(sel)
        .map((i, el) => {
          const a = $(el).find('a[href*="/chord/"]').first();
          return {
            rank: i + 1,
            title: a.find('span').first().text().trim() || a.text().trim().replace(/\s+/g, ' '),
            artist: $(el).find('span').last().text().trim(),
            url: BASE + a.attr('href'),
            path: a.attr('href')
          };
        })
        .get()
        .filter((x) => x.url && x.rank);

    const latest = listItems('main main ul li');
    
    const footer: Record<string, any[]> = {};
    $('footer .grid > div').each((i, el) => {
      const h = $(el).find('h3').first().text().trim();
      if (!h) return;
      const links = $(el)
        .find('a[href*="/chord/"]')
        .map((k, a) => ({ 
          title: $(a).text().trim().replace(/\s+/g, ' '), 
          url: BASE + $(a).attr('href'),
          path: $(a).attr('href')
        }))
        .get();
      if (links.length) footer[h] = links;
    });

    const popArtists = $('footer a[href*="/artis/"]')
      .map((i, a) => ({ 
        name: $(a).text().trim().replace(/\s+/g, ' '), 
        url: BASE + $(a).attr('href'),
        path: $(a).attr('href')
      }))
      .get()
      .filter((x) => x.name && x.url && !x.url.includes('/group/') && !x.url.endsWith('/artis'))
      .slice(0, 30);

    const browseGroups = $('footer a[href*="/artis/group/"]')
      .map((i, a) => ({ 
        group: $(a).text().trim().replace(/\s+/g, ' '), 
        url: BASE + $(a).attr('href'),
        path: $(a).attr('href')
      }))
      .get()
      .filter((x) => x.group);

    res.json({
      page: 'home',
      latest_songs: latest,
      sections: footer,
      popular_artists: popArtists,
      browse_by_artist: browseGroups,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q as string || '';
    const page = parseInt(req.query.page as string) || 1;
    const q = encodeURIComponent(query.trim());
    
    const html = await get(`${BASE}/search?q=${q}&page=${page}`);
    const $ = cheerio.load(html);

    const header = $('main main h1').first().text().trim();
    const results = $('main main ul li')
      .map((i, el) => {
        const a = $(el).find('a[href*="/chord/"]').first();
        return {
          rank: i + 1,
          title: (a.find('span').first().text().trim() || a.text().trim().replace(/\s+/g, ' ')),
          artist: $(el).find('span').last().text().trim(),
          url: BASE + $(a).attr('href'),
          path: $(a).attr('href') || ''
        };
      })
      .get()
      .filter((x) => x.url && x.path);

    const pageNums = [...new Set(
      $('a[href*="page="]')
        .map((i, a) => {
          const href = $(a).attr('href');
          const m = href ? href.match(/page=(\d+)/) : null;
          return m ? parseInt(m[1], 10) : null;
        })
        .get()
        .filter(Boolean)
    )] as number[];
    
    const totalPages = pageNums.length ? Math.max(...pageNums) : 1;
    const hasNext = page < totalPages;

    res.json({
      page: 'search',
      query: query.trim(),
      search_page: page,
      total_pages: totalPages,
      has_next: hasNext,
      header: header,
      message: results.length === 0 ? 'chord tidak ditemukan!' : undefined,
      count: results.length,
      next_page: hasNext ? page + 1 : null,
      results: results,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/detail', async (req, res) => {
  try {
    let urlPath = req.query.url as string || '';
    if (!urlPath) throw new Error('URL required');
    
    if (urlPath.startsWith('http')) {
      urlPath = new URL(urlPath).pathname;
    }
    if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;
    
    const url = BASE + urlPath;
    const html = await get(url);
    const $ = cheerio.load(html);

    const h1 = $('h1').text().trim().replace(/^Kunci Gitar\s*/i, '').replace(/\s*Chord Dasar$/i, '').trim();
    const $chordBox = $('.chord-container').first().length ? $('.chord-container').first() : $('pre').first();
    const preText = $chordBox.text();

    let capo = '';
    const capoMatch = preText.match(/Capo\s*(?:di\s*)?fret\s*(\d+)/i) || preText.match(/Capo\s*♪?\s*fret\s*(\d+)/i);
    if (capoMatch) capo = 'fret ' + capoMatch[1];

    const cleanPre = (txt: string) => txt.split(/={0,3}\s*\[\[\[\s*ORIGINAL CHORD\s*\]\]\]\s*={0,3}|===ORIGINAL CHORD===/i)[0].trim();
    const origText = preText.split(/={0,3}\s*\[\[\[\s*ORIGINAL CHORD\s*\]\]\]\s*={0,3}|===ORIGINAL CHORD===/i)[1]
      ? preText.split(/={0,3}\s*\[\[\[\s*ORIGINAL CHORD\s*\]\]\]\s*={0,3}|===ORIGINAL CHORD===/i)[1].trim()
      : '';

    const extractChords = (txt: string) => [...new Set([...txt.matchAll(/\b([A-G][#b]?(?:m|maj|min|dim|aug|sus|add|7|9|11|13)?(?:\([^)]*\))?)/g)].map((m) => m[1]))].slice(0, 60);

    let artist = '';
    let artistUrl = '';
    let artistPath = '';
    $('nav a[href*="/artis/"]').each((i, a) => {
      const t = $(a).text().trim();
      if (t && t !== 'Daftar Artis' && t !== 'Beranda') {
        artist = t; 
        artistUrl = BASE + $(a).attr('href');
        artistPath = $(a).attr('href') || '';
      }
    });
    
    if (!artist) {
      const parts = urlPath.split('/').filter(Boolean);
      artist = parts[1] ? parts[1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';
      artistUrl = BASE + '/artis/' + (parts[1] || '');
      artistPath = '/artis/' + (parts[1] || '');
    }

    artist = artist.replace(/^\.\.\.\s*/, '').replace(/\s+/g, ' ').trim();

    const artistCollection: any[] = [];
    $('h2').each((i, h) => {
      if (/Chord Lain dari/i.test($(h).text())) {
        $(h).closest('div').find('a[href*="/chord/"]').each((k, a) => {
          artistCollection.push({ 
            title: $(a).find('span').first().text().trim() || $(a).text().trim().replace(/\s+/g, ' '), 
            url: BASE + $(a).attr('href'),
            path: $(a).attr('href') || ''
          });
        });
      }
    });

    const related: any[] = [];
    $('h2').each((i, h) => {
      if (/Rekomendasi Chord Lainnya/i.test($(h).text())) {
        $(h).closest('div').find('a[href*="/chord/"]').each((k, a) => {
          related.push({ 
            title: $(a).find('span').first().text().trim() || $(a).text().trim().replace(/\s+/g, ' '), 
            url: BASE + $(a).attr('href'),
            path: $(a).attr('href') || ''
          });
        });
      }
    });

    const txt = preText.replace(/\n{3,}/g, '\n\n').trim();

    res.json({
      page: 'detail',
      url: url,
      title: h1,
      artist: artist,
      artist_path: artistPath,
      capo: capo,
      chords: extractChords(cleanPre(preText)),
      original_chords: extractChords(origText),
      chord_text: cleanPre(txt),
      original_chord_text: origText,
      artist_collection: artistCollection.filter((x) => x.title && x.url && !x.url.endsWith(urlPath)),
      related: related.filter((x) => x.title && x.url && !x.url.endsWith(urlPath)),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/artist', async (req, res) => {
  try {
    let slug = req.query.slug as string || '';
    if (!slug) throw new Error('Slug required');
    const url = slug.startsWith('http') ? slug : BASE + '/artis/' + slug.replace(/^\/+artis\/?/, '');
    const html = await get(url);
    const $ = cheerio.load(html);

    let name = $('h1').text().trim() || '';
    let songCount = '';
    const stat = $('main main .bg-rose-600 span').first().text().trim();
    if (stat) songCount = stat.replace(/\s+/g, ' ');

    const songs = $('main main ul li')
      .map((i, el) => {
        const a = $(el).find('a[href*="/chord/"]').first();
        return {
          rank: i + 1,
          title: (a.find('span').first().text().trim() || a.text().trim().replace(/\s+/g, ' ')),
          url: BASE + a.attr('href'),
          path: a.attr('href')
        };
      })
      .get()
      .filter((x) => x.url);

    if (!name) {
      $('nav a[href*="/artis/"]').each((i, a) => {
        const t = $(a).text().trim();
        if (t && t !== 'Daftar Artis' && t !== 'Beranda') name = t;
      });
    }
    if (!name) name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    res.json({ page: 'artist', artist: name, song_count: songCount, url, songs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/artists', async (req, res) => {
  try {
    let group = req.query.group as string || 'ALL';
    const g = ('' + group).trim().toUpperCase();
    const slug = g === '0-9' ? '0-9' : g === '#' ? '#' : g === 'ALL' ? '' : /^[A-Z]$/.test(g) ? g : null;
    
    const url = slug ? `${BASE}/artis/group/${slug}` : `${BASE}/artis`;
    const html = await get(url);
    const $ = cheerio.load(html);

    const groups = $('a[href*="/artis/group/"]')
      .map((i, a) => ({ group: $(a).text().trim().replace(/\s+/g, ' '), url: BASE + $(a).attr('href'), path: $(a).attr('href') }))
      .get()
      .filter((x) => x.group);

    const artists = $('main main ul li')
      .map((i, el) => {
        const a = $(el).find('a[href*="/artis/"]').first();
        const cnt = $(el).find('span').last().text().trim().replace(/\s+/g, ' ');
        return { 
          rank: i + 1, 
          name: (a.find('span').first().text().trim() || a.text().trim().replace(/\s+/g, ' ')), 
          song_count: cnt, 
          url: BASE + a.attr('href'),
          path: a.attr('href')
        };
      })
      .get()
      .filter((x) => x.url && x.url.includes('/artis/') && !x.url.includes('/group/'));

    res.json({ page: 'artists', group: slug || 'ALL', url, total: $('main main p').text().trim().slice(0, 120), groups, artists });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


export default app;
