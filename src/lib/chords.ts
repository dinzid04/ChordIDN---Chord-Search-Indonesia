export const CHORD_IMG: Record<string, string> = {
  'A': '/img/chords/A-chord.jpg',
  'B': '/img/chords/B.1.gif',
  'C': '/img/chords/C-chord.jpg',
  'D': '/img/chords/d-chord.jpg',
  'E': '/img/chords/E-Chord.jpg',
  'F': '/img/chords/F-chord.jpg',
  'G': '/img/chords/G-chord.jpg',
  'Am': '/img/chords/Am-chord.gif',
  'Bm': '/img/chords/b-minor-chord01.gif',
  'Cm': '/img/chords/c-minor-chord01.gif',
  'Dm': '/img/chords/d-minor-chord01.gif',
  'Em': '/img/chords/e-minor-chord01.gif',
  'Fm': '/img/chords/f-minor-chord01.gif',
  'Gm': '/img/chords/g-minor-chord01.gif',
  'Bb': '/img/chords/Bb-chord.jpg',
  'C#': '/img/chords/C_.png',
  'D#': '/img/chords/D-CIS.jpg',
  'F#': '/img/chords/Fcis-chord.jpg',
  'G#': '/img/chords/gciss.jpg',
  'A#': '/img/chords/Acis-chord.jpg',
  'Bbm': '/img/chords/bbm-chord.jpg',
  'C#m': '/img/chords/Ccism-chord.jpg',
  'D#m': '/img/chords/D_m.png',
  'F#m': '/img/chords/F_m.png',
  'G#m': '/img/chords/G_m.png',
  'A#m': '/img/chords/Acism-chord.png',
  'A7': '/img/chords/general.jpg',
  'B7': '/img/chords/Btujuh-Basic.png',
  'C7': '/img/chords/Ctujuh-Chord.jpg',
  'D7': '/img/chords/Dtujuh-Basic.png',
  'E7': '/img/chords/Etujuh-Chord.jpg',
  'F7': '/img/chords/Ftujuh-Chord.jpg',
  'G7': '/img/chords/Gtujuh-Chord.jpg',
  'G/B': '/img/chords/GB-Chord.jpg',
};

export function normalizeChordKey(chord: string) {
  if (!chord) return null;
  let c = chord.trim();
  if (/^G\/B$/i.test(c)) return 'G/B';
  const m = c.match(/^([A-G])([#b]?)(.*)$/);
  if (!m) return null;
  let letter = m[1].toUpperCase();
  const acc = m[2] || '';
  const suffix = m[3] || '';
  let key = letter + acc;
  if (suffix) {
    const isMinor = /^(m|min)/i.test(suffix);
    const isSeven = /^7/.test(suffix);
    if (isSeven) key += '7';
    else if (isMinor) key += 'm';
  }
  return key;
}

export function chordImage(chord: string) {
  const key = normalizeChordKey(chord);
  if (!key) return null;
  const path = CHORD_IMG[key];
  return path ? 'https://chordtela.web.id' + path : null;
}
