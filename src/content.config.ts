import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const cars = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cars' }),
  schema: z.object({
    short: z.string(),            // nav pill: "S14 240SX"
    code: z.string(),             // sticker badge: "S14"
    name: z.string(),             // big title: "S14 KA-T"
    year: z.string(),             // "1995 NISSAN 240SX"
    status: z.string(),           // "IN BUILD"
    statusColor: z.enum(['yellow', 'green', 'cyan', 'pink', 'teal']),
    color: z.enum(['cyan', 'pink', 'teal']), // card / badge colour
    blurb: z.string(),            // one-liner on the home card
    tagline: z.string(),          // longer line on the car page
    tags: z.array(z.string()).default([]),
    order: z.number(),
    hero: z.object({ src: z.string(), alt: z.string(), credit: z.string().optional() }).optional(),
    stats: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    specs: z.array(z.object({
      title: z.string(),
      color: z.enum(['cyan', 'green', 'pink']),
      rows: z.array(z.object({ k: z.string(), v: z.string() })),
    })).default([]),
    gallery: z.array(z.object({ src: z.string(), alt: z.string(), credit: z.string().optional(), tall: z.boolean().optional() })).default([]),
  }),
});

const log = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    car: z.string(),              // id of a car: s14 | 350z
    topic: z.string(),            // "PAINT"
    summary: z.string(),
    date: z.coerce.date().optional(),
    order: z.number().default(0), // tie-break / fallback while entries have no date; higher = newer
    photo: z.object({ src: z.string(), alt: z.string() }).optional(),
    video: z.string().optional(),  // YouTube video id, embedded on the entry page
  }),
});

const partners = defineCollection({
  loader: file('./src/data/partners.json'),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    width: z.number(),
    height: z.number(),
  }),
});

export const collections = { cars, log, partners };
