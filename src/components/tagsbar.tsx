import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

interface TagsbarProps {
    tagsTerm: string
    setTagsTerm: (value: string) => void
}

export default function Tagsbar({tagsTerm, setTagsTerm}: TagsbarProps) {
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

    function handleClick(item: string) {
        if(tagsTerm == item) {
            setTagsTerm("");
        } else {
            setTagsTerm(item);
        }
    }

    return (
        <section>
            <ScrollArea className="w-full m-4 py-4">
                <div className="flex items-center gap-2">
                    <Button variant="secondary">Populares</Button>
                    <Button variant="secondary" className="space-x-4">Minha Lista <Badge>0</Badge></Button>
                    <Separator orientation="vertical" />
                    { genreCollection.map((item) => (
                        <Button variant={tagsTerm == item ? "default" : "secondary"} onClick={() => handleClick(item)} key={item}>{item}</Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    )
}