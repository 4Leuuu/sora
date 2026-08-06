import type { Anime } from "@/schemas/anilist";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "./ui/badge";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogContent } from "./ui/dialog";
import AnimeDetails from "./anime-details";

export default function AnimeGrid({ animes, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading }: { animes?: Anime[], hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: () => void, isLoading: boolean}) {
    const [ mediaId, setMediaId ] = useState<number | null>(null);
    const { ref, inView } = useInView({
        threshold: 0
    })

    useEffect(() => {
        if(inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <section className="mt-8 px-4">
            <div className="mb-4">
                <h3 className="text-2xl font-semibold">Animes em destaque</h3>
                <p className="text-sm text-muted-foreground">Mostrando os títulos mais acessados na comunidade do AniList</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 ">
                { isLoading ?
                Array.from({length: 12}).map((_, index) => (
                    <Skeleton className="max-w-sm h-120" key={index}/>
                ))
                    :
                    animes!.map((anime) => (
                        <Card className="max-w-sm pt-0 border hover:border-primary duration-500 hover:-translate-y-2 hover:shadow-2xl" onClick={() => setMediaId(anime.id)}>
                            <img
                                src={anime.coverImage.extraLarge}
                                alt={ anime.title.english || anime.title.romaji || "Anime sem nome"}
                                className="w-full object-cover h-90"
                            />
                            <CardHeader className="p-1">
                                <CardTitle className="font-semibold line-clamp-1">{ anime.title.english || anime.title.romaji }</CardTitle>
                                <CardDescription>
                                    {anime.format || "???"} • {anime.seasonYear || "????"}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="space-x-2 flex items-center justify-center">
                                {   
                                    anime.genres.slice(0, 2).map((genre) => (
                                        <Badge key={genre}>{genre}</Badge>
                                    ))
                                }
                            </CardFooter>
                        </Card>  
                    ))
                }
                { isFetchingNextPage && 
                    Array.from({length: 12}).map((_, index) => (
                        <Skeleton className="max-w-sm h-120" key={index}/>
                    ))
                }
            </div>

            <Dialog 
                open={mediaId !== null} 
                onOpenChange={(open) => !open && setMediaId(null)}
            >
                <DialogContent 
                    showCloseButton={false}
                    className="p-0 overflow-hidden max-w-[50vw] max-h-[70vh] overflow-y-auto no-scrollbar"    
                >
                    {mediaId && <AnimeDetails mediaId={mediaId} />}
                </DialogContent>
            </Dialog>

            <div className="text-center text-sm text-muted-foreground mt-8 py-4" ref={ref}>
                {isFetchingNextPage ? "Carregando..." : hasNextPage ? "Desça para carregar mais animes" : "Não há mais animes para mostrar"}
            </div>
        </section>
    );
}
