const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export function transposeChord(chord: string, steps: number): string {
  if (!steps) return chord;
  const m = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!m) return chord;
  let root = m[1];
  if (root.includes('b')) {
    const flatToSharp: Record<string, string> = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };
    root = flatToSharp[root] || root;
  }
  const rootIdx = NOTES.indexOf(root);
  if (rootIdx === -1) return chord;
  return NOTES[(rootIdx + steps + 12) % 12] + m[2];
}

export function transposeText(text: string, steps: number): string {
  if (!steps) return text;
  return text.replace(/\b([A-G][#b]?(?:(?:maj|min|dim|aug|sus|add|m)\d*|\d+)*)(?=[\s()\-/,:;]|$)/g, (full) => {
    const t = transposeChord(full, steps);
    return t === full ? full : t;
  });
}
