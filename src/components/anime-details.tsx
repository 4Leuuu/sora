import { useDetailAnimes } from "@/hooks/animes"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, ExternalLink } from "lucide-react";

interface AnimeDetailsProps {
    mediaId: number
}

export default function AnimeDetails({ mediaId }: AnimeDetailsProps) {
    const { data: media } = useDetailAnimes(mediaId);
    const anime = media?.Media;
    const mainStudio = anime?.studios?.edges?.find((edge: any) => edge.isMain)?.node?.name || anime?.studios?.edges?.[0]?.node?.name;
    
    return (
        <section className="w-full max-h-[85vh] overflow-y-auto">
            <div className="relative w-full">
                <div 
                    className="bg-center bg-cover inset-0 opacity-40 h-48 w-full" 
                    style={{ backgroundImage: `url(${anime?.bannerImage || anime?.coverImage?.extraLarge})` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent h-48" />
                
                <div className="relative px-6 -mt-16 flex gap-4 items-end mb-4">
                    { anime?.coverImage?.large && (
                        <img 
                        src={anime.coverImage.large} 
                        alt="Capa" 
                        className="w-28 md:w-36 rounded-xl border-2 border-background shadow-xl shrink-0 object-cover"
                        />
                    )}
                    <div className="space-y-1.5 pb-2">
                        <div className="flex flex-wrap gap-2 items-center">
                        {anime?.status && <Badge>{anime.status}</Badge>}
                        {mainStudio && <Badge variant="outline">{mainStudio}</Badge>}
                        </div>
                        <h2 className="font-bold text-2xl md:text-3xl line-clamp-2">
                        {anime?.title?.english || anime?.title?.romaji || anime?.title?.userPreferred}
                        </h2>
                        {anime?.title?.native && (
                        <p className="text-xs text-muted-foreground">{anime.title.native}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 space-y-6">
                { anime?.nextAiringEpisode && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Próximo Lançamento
                    </span>
                    <span> Episódio <strong>{anime.nextAiringEpisode.episode}</strong></span>
                </div>
                )}

                <div className="border p-4 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-card/50">
                    <div>
                        <span className="text-muted-foreground text-xs font-semibold block">NOTA</span>
                        <p className="text-yellow-500 font-bold">★ {anime?.averageScore ? (anime.averageScore / 10).toFixed(1) : "N/A"}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground text-xs font-semibold block">FORMATO</span>
                        <p className="font-bold">{anime?.format || "N/A"}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground text-xs font-semibold block">EPISÓDIOS</span>
                        <p className="font-bold">{anime?.episodes ? `${anime.episodes} (${anime.duration || '?'}m)` : "N/A"}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground text-xs font-semibold block">TEMPORADA</span>
                        <p className="font-bold">{anime?.seasonYear ? `${anime.season || ''} ${anime.seasonYear}` : "N/A"}</p>
                    </div>
                </div>

                { anime?.genres && anime.genres.length > 0 && (
                    <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-2">GÊNEROS</p>
                        <div className="flex flex-wrap gap-2">
                        {anime.genres.map((genre: string) => (
                            <Badge key={genre} variant="secondary">{genre}</Badge>
                        ))}
                        </div>
                    </div>
                )}

                { anime?.trailer?.id && anime?.trailer?.site && (
                    <div className="w-full">
                        <p className="text-xs text-muted-foreground font-semibold mb-2">TRAILER OFICIAL</p>
                        <iframe
                        src={
                            anime.trailer.site === "youtube"
                            ? `https://www.youtube.com/embed/${anime.trailer.id}`
                            : `https://www.dailymotion.com/embed/video/${anime.trailer.id}`
                        }
                        title={`Trailer de ${anime?.title?.romaji}`}
                        className="w-full aspect-video rounded-xl border border-border shadow-md"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        />
                    </div>
                )}

                { anime?.description && (
                    <div className="w-full">
                        <p className="text-xs text-muted-foreground font-semibold mb-2">SINOPSE</p>
                        <div 
                        className="text-sm text-foreground/90 leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: anime.description }} 
                        />
                    </div>
                )}

                {anime?.characters?.edges && anime.characters.edges.length > 0 && (
                    <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-3">PERSONAGENS PRINCIPAIS</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {anime.characters.edges.slice(0, 6).map((edge: any) => (
                            <div key={edge.node.id} className="flex items-center gap-2 border p-2 rounded-lg bg-card/30">
                            {edge.node.image?.medium && (
                                <img 
                                src={edge.node.image.medium} 
                                alt={edge.node.name?.full} 
                                className="w-10 h-10 rounded-full object-cover shrink-0" 
                                />
                            )}
                            <div className="overflow-hidden">
                                <p className="text-xs font-semibold truncate">{edge.node.name?.full}</p>
                                <p className="text-[10px] text-muted-foreground capitalize">{edge.role?.toLowerCase()}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )}

                {anime?.tags && anime.tags.length > 0 && (
                <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-2">TAGS</p>
                    <div className="flex flex-wrap gap-1.5">
                    {anime.tags
                        .filter((tag: any) => !tag.isMediaSpoiler)
                        .slice(0, 8)
                        .map((tag: any) => (
                        <span key={tag.id} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                            #{tag.name}
                        </span>
                        ))}
                    </div>
                </div>
                )}

                { anime?.externalLinks && anime.externalLinks.length > 0 && (
                    <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-2">ONDE ENCONTRAR / LINKS</p>
                        <div className="flex flex-wrap gap-2">
                        {anime.externalLinks.map((link: any) => (
                            <a 
                            key={link.id} 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer"
                            >
                            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                                {link.site}
                                <ExternalLink className="w-3 h-3" />
                            </Button>
                            </a>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}