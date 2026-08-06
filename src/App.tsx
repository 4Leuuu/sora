import { useState } from "react";
import AnimeGrid from "./components/anime-grid";
import Hero from "./components/hero"
import Tagsbar from "./components/tagsbar"
import { useTrendingAnimes } from "./hooks/animes"
import Navbar from "./components/navbar";


export function App() {
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ tagsTerm, setTagsTerm ] = useState<string>("");

  const { data: response, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = useTrendingAnimes(searchTerm, tagsTerm);
  const animes = response?.pages.flatMap((page) => page.animes);

  return (
    <main>
      <Navbar onSearchChange={setSearchTerm} />
      <div className="max-w-6xl mx-auto">  
        <Tagsbar tagsTerm={tagsTerm} setTagsTerm={setTagsTerm} />
        { (!searchTerm && !tagsTerm) && 
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
