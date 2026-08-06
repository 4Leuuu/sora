import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";

interface NavbarProps {
    onSearchChange: (value: string) => void
}

export default function Navbar({onSearchChange}: NavbarProps) {
    const [ term, setTerm ] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(term)
        }, 500)

        return () => clearTimeout(timer)
    }, [term])


    return (
        <header className="border-b">
            <div className="p-4 max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row sm:gap-0 items-center justify-between">
                <h1 className="text-primary text-4xl font-bold tracking-tight"><a href="/">sora</a></h1>
                <nav>
                    <InputGroup className="w-xs lg:w-xl">
                        <InputGroupInput 
                            placeholder="Buscar por nome do anime (ex: Solo Leveling, Naruto...)" 
                            value={term}
                            onChange={(e) => setTerm(e.target.value)} 
                        />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </nav>
                <Button variant="secondary" className="space-x-4 hidden md:block">Minha Lista <Badge>0</Badge></Button>
            </div>
        </header>
    )
}