import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
// Load Markdown and MDX files in the `src/content/blog/` directory.
loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
// Type-check frontmatter using a schema
schema: ({ image }) =>
z.object({
title: z.string().min(5),
description: z.string().min(10).max(300),
// Transform string to Date object
pubDate: z.coerce.date(),
updatedDate: z.coerce.date().optional(),
heroImage: image().optional(),
tags: z.array(z.string()).optional().default([]),
featured: z.boolean().optional().default(false),
featuredOrder: z.number().optional(),
lang: z.enum(['en', 'es']).default('en'),
isTranslation: z.boolean().optional().default(false),
}),
});

export const collections = { blog };