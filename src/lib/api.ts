export async function fetchHome() {
  const res = await fetch('/api/home');
  if (!res.ok) throw new Error('Failed to fetch home');
  return res.json();
}

export async function fetchSearch(query: string, page: number = 1) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch search');
  return res.json();
}

export async function fetchDetail(path: string) {
  const res = await fetch(`/api/detail?url=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error('Failed to fetch detail');
  return res.json();
}

export async function fetchArtist(slug: string) {
  const res = await fetch(`/api/artist?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error('Failed to fetch artist');
  return res.json();
}

export async function fetchArtistsGroup(group: string) {
  const res = await fetch(`/api/artists?group=${encodeURIComponent(group)}`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}
