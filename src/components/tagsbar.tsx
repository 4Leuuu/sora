import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { useSearch } from "@/store/media"

export default function Tagsbar() {
    const { genre, setGenre, setSort, sort } = useSearch();
    
    const genreCollection = [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Ecchi",
      "Fantasy",
      "Horror",
      "Mahou Shoujo",
      "Mecha",
      "Music",
      "Mystery",
      "Psychological",
      "Romance",
      "Sci-Fi",
      "Slice of Life",
      "Sports",
      "Supernatural",
      "Thriller"
    ]

    const sortCollection = [
    { value: "POPULARITY", label: "Mais Populares" },
    { value: "LATEST", label: "Mais Recentes" },
    { value: "RATING", label: "Melhores Avaliados" },
    { value: "TITLE_ASC", label: "Nome (A-Z)" },
    { value: "TITLE_DESC", label: "Nome (Z-A)" },
    ] as const;

    function handleClick(item: string) {
        if(genre == item) {
            setGenre("");
        } else {
            setGenre(item);
        }
    }

    return (
        <section>
            <ScrollArea className="w-full m-4 py-4">
                <div className="flex items-center gap-2">
                    { sortCollection.map(({ value, label }) => (
                        <Button variant={sort == value ? "default" : "secondary"} onClick={() => setSort(value)}>{label}</Button>
                        ))
                    }
                    <Button variant="secondary" className="space-x-4">Minha Lista <Badge>0</Badge></Button>
                    <Separator orientation="vertical" />
                    { genreCollection.map((item) => (
                        <Button variant={genre == item ? "default" : "secondary"} onClick={() => handleClick(item)} key={item}>{item}</Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    )
}