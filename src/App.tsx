import { useState } from "react";
import AnimeGrid from "./components/anime-grid";
import Hero from "./components/hero"
import Tagsbar from "./components/tagsbar"
import { useTrendingAnimes } from "./hooks/animes"
import Navbar from "./components/navbar";
import { useSearch } from "./store/media";


export function App() {
  const [ searchTerm, setSearchTerm ] = useState<string>("");

  const { genre, sort } = useSearch() 
  console.log(sort)
  const { data: response, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = useTrendingAnimes(searchTerm, genre!, sort);
  const animes = response?.pages.flatMap((page) => page.animes);

  return (
    <main>
      <Navbar onSearchChange={setSearchTerm} />
      <div className="max-w-6xl mx-auto">  
        <Tagsbar/>
        { (!searchTerm && !genre) && 
          <Hero animes={animes!} isLoading={isLoading} />
        }
        <AnimeGrid 
          animes={animes!} 
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
        />
      </div> 
    </main>
  )
}

export default App
