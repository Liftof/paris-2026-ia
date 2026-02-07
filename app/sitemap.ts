import { candidatesData } from '@/lib/data'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paris2026.fr'

  const candidatePages = candidatesData.map((candidate) => ({
    url: `${baseUrl}/candidats/${candidate.slug}`,
    lastModified: new Date('2026-02-07'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/methodologie`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comparateur`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...candidatePages,
  ]
}
