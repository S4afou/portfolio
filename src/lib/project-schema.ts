import { z } from 'astro/zod';

export const publicationStatusSchema = z.enum(['published', 'pending', 'private']);

export const repoSchema = z
  .object({
    label: z.string().min(1),
    url: z.string().optional(),
    status: publicationStatusSchema,
  })
  .refine((repo) => repo.status !== 'published' || Boolean(repo.url), {
    message: 'A published Repository requires a url',
    path: ['url'],
  });

export const imageSchema = z.object({
  src: z.string().regex(/^\//, 'Image src must be an absolute site path beginning with /'),
  alt: z.string().min(1, 'Every image needs alt text'),
  caption: z.string().optional(),
});

export const metricSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  context: z.string().min(1),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(20).max(200),
  ownership: z.string().min(10),
  timeframe: z.string().min(4),
  stack: z.array(z.string().min(1)).min(2),
  problem: z.string().min(40),
  approach: z.array(z.string().min(20)).min(2),
  results: z.array(metricSchema).min(2),
  reflection: z.string().min(40),
  cover: imageSchema,
  gallery: z.array(imageSchema).default([]),
  repos: z.array(repoSchema).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
  draft: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type Repo = z.infer<typeof repoSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Metric = z.infer<typeof metricSchema>;
