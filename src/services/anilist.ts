import type { Anime, AnimeDetail } from "@/schemas/anilist"

const ANILIST_URL = 'https://graphql.anilist.co'

export async function fetchGraphQL(query: string, variables?: Record<string, unknown>): Promise<Anime> {
  const response = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error('Falha ao comunicar com a API do AniList')
  }

  const json = await response.json()
  return json.data
}

export async function fetchGraphQLDetail(query: string, variables?: Record<string, unknown>): Promise<AnimeDetail> {
  const response = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error('Falha ao comunicar com a API do AniList')
  }

  const json = await response.json()
  return json.data
}