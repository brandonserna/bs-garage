import { getCollection, type CollectionEntry } from 'astro:content';

export async function getCars() {
  return (await getCollection('cars')).sort((a, b) => a.data.order - b.data.order);
}

/** Newest first: dated entries by date, undated by `order` (higher = newer). */
export async function getLog() {
  const t = (e: CollectionEntry<'log'>) => e.data.date?.getTime() ?? 0;
  return (await getCollection('log')).sort((a, b) => t(b) - t(a) || b.data.order - a.data.order);
}
