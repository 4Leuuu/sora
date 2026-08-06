import { z } from 'zod'

export const animeSchema = z.object({
  id: z.number(),
  title: z.object({
    romaji: z.string().nullable(),
    english: z.string().nullable(),
  }),
  description: z.string().nullable(),
  seasonYear: z.number().nullable(),
  format: z.string().nullable(),
  coverImage: z.object({
    extraLarge: z.string(),
  }),
  bannerImage: z.string().nullable(),
  averageScore: z.number().nullable(),
  episodes: z.number().nullable(),
  genres: z.array(z.string()),
  status: z.string().nullable(),
});

export const AnimeDetailSchema = z.object({
  Media: z.object({
    id: z.number(),
    idMal: z.number().nullable().optional(),
    title: z.object({
      romaji: z.string().nullable().optional(),
      english: z.string().nullable().optional(),
      native: z.string().nullable().optional(),
      userPreferred: z.string().nullable().optional(),
    }),
    type: z.string().nullable().optional(),
    format: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    description: z.string().nullable().optional(),

    startDate: z.object({
      year: z.number().nullable().optional(),
      month: z.number().nullable().optional(),
      day: z.number().nullable().optional(),
    }).nullable().optional(),
    endDate: z.object({
      year: z.number().nullable().optional(),
      month: z.number().nullable().optional(),
      day: z.number().nullable().optional(),
    }).nullable().optional(),

    season: z.string().nullable().optional(),
    seasonYear: z.number().nullable().optional(),
    episodes: z.number().nullable().optional(),
    duration: z.number().nullable().optional(),
    countryOfOrigin: z.string().nullable().optional(),
    source: z.string().nullable().optional(),

    coverImage: z.object({
      extraLarge: z.string().nullable().optional(),
      large: z.string().nullable().optional(),
      medium: z.string().nullable().optional(),
      color: z.string().nullable().optional(),
    }).nullable().optional(),
    bannerImage: z.string().nullable().optional(),

    trailer: z.object({
      id: z.string().nullable().optional(),
      site: z.string().nullable().optional(),
      thumbnail: z.string().nullable().optional(),
    }).nullable().optional(),

    genres: z.array(z.string()).nullable().optional().default([]),
    tags: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable().optional(),
        rank: z.number().nullable().optional(),
        isMediaSpoiler: z.boolean().nullable().optional(),
      })
    ).nullable().optional().default([]),

    averageScore: z.number().nullable().optional(),
    meanScore: z.number().nullable().optional(),
    popularity: z.number().nullable().optional(),
    favourites: z.number().nullable().optional(),
    trending: z.number().nullable().optional(),

    nextAiringEpisode: z.object({
      id: z.number(),
      airingAt: z.number(),
      timeUntilAiring: z.number(),
      episode: z.number(),
    }).nullable().optional(),

    studios: z.object({
      edges: z.array(
        z.object({
          isMain: z.boolean().nullable().optional(),
          node: z.object({
            id: z.number(),
            name: z.string(),
          }),
        })
      ).nullable().optional().default([]),
    }).nullable().optional(),

    externalLinks: z.array(
      z.object({
        id: z.number(),
        url: z.string(),
        site: z.string(),
        icon: z.string().nullable().optional(),
        color: z.string().nullable().optional(),
      })
    ).nullable().optional().default([]),

    relations: z.object({
      edges: z.array(
        z.object({
          relationType: z.string().nullable().optional(),
          node: z.object({
            id: z.number(),
            title: z.object({
              userPreferred: z.string().nullable().optional(),
            }).nullable().optional(),
            format: z.string().nullable().optional(),
            type: z.string().nullable().optional(),
            status: z.string().nullable().optional(),
            coverImage: z.object({
              medium: z.string().nullable().optional(),
            }).nullable().optional(),
          }),
        })
      ).nullable().optional().default([]),
    }).nullable().optional(),

    characters: z.object({
      edges: z.array(
        z.object({
          role: z.string().nullable().optional(),
          node: z.object({
            id: z.number(),
            name: z.object({
              full: z.string().nullable().optional(),
            }).nullable().optional(),
            image: z.object({
              medium: z.string().nullable().optional(),
            }).nullable().optional(),
          }),
          voiceActors: z.array(
            z.object({
              id: z.number(),
              name: z.object({
                full: z.string().nullable().optional(),
              }).nullable().optional(),
              image: z.object({
                medium: z.string().nullable().optional(),
              }).nullable().optional(),
            })
          ).nullable().optional().default([]),
        })
      ).nullable().optional().default([]),
    }).nullable().optional(),
  }),
});

export const responseSchema = z.object({
  Page: z.object({
    pageInfo: z.object({
      hasNextPage: z.boolean(),
    }),
    media: z.array(animeSchema),
  }),
})

export type AnimeDetail = z.infer<typeof AnimeDetailSchema>;
export type Anime = z.infer<typeof animeSchema>;
export type Response = z.infer<typeof responseSchema>;