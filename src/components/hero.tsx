import type { Anime } from "@/schemas/anilist";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

export default function Hero({ animes, isLoading }: { animes: Anime[], isLoading: boolean}) {
    const anime = animes?.[0]
    const description = anime?.description || "Não há sinopse disponível."
    return (
        <div className="mt-8 rounded-2xl border overflow-hidden shadow-2xl group mx-4">
            { isLoading ?
                <Skeleton className="w-full h-94.75" />
                :
                <div className="relative">
                    <div className="z-1 absolute bg-center bg-cover inset-0 opacity-30 group-hover:scale-105 duration-500" style={{ backgroundImage: `url(${anime?.bannerImage || anime?.coverImage?.extraLarge})` }}/>
                    <div className="z-2 absolute inset-0 bg-linear-to-t from-background to-transparent" />
                    
                    <div className="relative z-3 p-4 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-end">
                        <img 
                            src={ anime?.coverImage?.extraLarge } 
                            alt={ anime?.title?.english || anime?.title?.romaji || "" }
                            className="rounded-3xl w-full max-w-75 shrink-0" 
                        />

                        <div className="flex flex-col gap-2 flex-1 w-full">
                            <div className="flex gap-2 flex-wrap items-center">
                                <Badge variant="destructive">Em Alta!</Badge>
                                <Badge>★ {anime?.averageScore ? (anime?.averageScore / 10).toFixed(1) : "N/A"}</Badge>
                                <p className="text-muted-foreground text-sm">{anime?.format} • {anime?.seasonYear}</p>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-semibold">{ anime?.title?.english || anime?.title?.romaji }</h2>
                            <p dangerouslySetInnerHTML={{ __html: anime?.description || description || "" }} className="text-muted-foreground line-clamp-3 text-sm sm:text-base" />
                            
                            <Button className="w-full sm:w-2xs mt-2" size="lg">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                </svg>
                                Ver Detalhes & Trailer
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}