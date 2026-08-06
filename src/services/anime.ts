import { AnimeDetailSchema, responseSchema, type Anime, type AnimeDetail } from '@/schemas/anilist'
import { fetchGraphQL, fetchGraphQLDetail } from './anilist'

const GET_TRENDING_ANIMES = `
  query ($page: Int, $search: String, $genre: String) {
    Page(page: $page, perPage: 12) {
      pageInfo {
        hasNextPage
      }
      media(
        type: ANIME, 
        sort: [TRENDING_DESC], 
        search: $search, 
        genre: $genre, 
      ) {
        id
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        description
        bannerImage
        averageScore
        episodes
        genres
        status
        seasonYear
        format
      }
    }
  }
`

const GET_ANIME_BY_ID = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      idMal
      title {
        romaji
        english
        native
        userPreferred
      }
      type
      format
      status
      description(asHtml: false)
      
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      
      season
      seasonYear
      episodes
      duration 
      countryOfOrigin
      source 
      
      coverImage {
        extraLarge
        large
        medium
      }
      bannerImage
      
      trailer {
        id
        site
        thumbnail
      }
      
      genres
      tags {
        id
        name
        description
        rank 
        isMediaSpoiler
      }
      
      averageScore 
      meanScore
      popularity 
      favourites
      trending
      
      nextAiringEpisode {
        id
        airingAt
        timeUntilAiring
        episode
      }
      
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
      
      externalLinks {
        id
        url
        site
        icon
        color
      }

      relations {
        edges {
          relationType
          node {
            id
            title {
              userPreferred
            }
            format
            type
            status
            coverImage {
              medium
            }
          }
        }
      }

      characters(sort: [ROLE, RELEVANCE]) {
        edges {
          role # MAIN ou SUPPORTING
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
          voiceActors(language: JAPANESE, sort: [RELEVANCE]) {
            id
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }
    }
  }
`

export async function getTrendingAnimes(page = 1, search?: string, genre?: string): Promise<{animes: Anime[], hasNextPage: boolean}> {
  const variables = {
    page,
    search: search?.trim() ? search.trim() : undefined,
    genre: genre?.trim() ? genre.trim() : undefined,
  }

  const data = await fetchGraphQL(GET_TRENDING_ANIMES, variables);
  const parsed = responseSchema.parse(data);
  return {
    animes: parsed.Page.media,
    hasNextPage: parsed.Page.pageInfo.hasNextPage
  }
}


export async function getAnimeById(mediaId: number): Promise<AnimeDetail> {

  const variables = {
    id: mediaId
  }

  const data: AnimeDetail = await fetchGraphQLDetail(GET_ANIME_BY_ID, variables);
  const parsed = AnimeDetailSchema.parse(data);
  return parsed
}