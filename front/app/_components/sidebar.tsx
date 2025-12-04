"use client"
import { Box, Calendar, Layers, MapPin, Trash2, User, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {

    const abas = [
        {texto:"Pesquisadores", link:"/pesquisadores", icon:<User/>},
        {texto:"Bairros", link:"/bairros", icon:<MapPin/>},
        {texto:"Coletas", link:"/coletas", icon:<Trash2/>},
        {texto:"Equipes", link:"/equipes", icon:<UsersRound/>},
        {texto:"[OFF] Pesquisas", link:"/pesquisas", icon:<Calendar/>},
        {texto:"Unidades", link:"/unidades", icon:<Box/>},
        // ...
    ]

    const pathname = usePathname()

    return (
        <nav className="flex flex-col justify-between w-80 bg-azul-sidebar">

            {/* Parte Superior */}
            <div>

                {/* Cabeçalho */}
                <div className="flex items-center justify-start gap-4 border-b border-borda-sidebar h-20">

                    {/* Icone */}
                    <div className="ml-6 p-3 rounded-lg bg-texto-sidebar">
                        <Layers size={30} className="text-azul-sidebar"/>
                    </div>

                    {/* Titulo */}
                    <div>
                        <h1 className="text-xl text-white font-bold">
                            SIG-NAEP
                        </h1>

                        <h2 className="text-sm text-white">
                            UnB • Itapoã
                        </h2>
                    </div>

                </div>

                {/* Abas */}
                <div className="h-full mt-6">
                    {abas.map((aba, index)=>(

                        <Link
                            key={index}
                            href={aba.link}
                            className={
                                "flex gap-3 p-3 m-2 rounded-lg duration-150 hover:bg-[#1d63d3] text-gray-300 hover:text-white "
                                + (pathname.endsWith(aba.link) ? "text-white bg-[#1d63d3]" : "")
                            }
                        >
                            {aba.icon}
                            {aba.texto}
                        </Link>

                    ))}
                </div>

            </div>

            {/* Mini-Footer */}
            <div className="flex flex-col justify-center items-center border-t border-borda-sidebar h-20">
                <p className="text-sm text-gray-400">NAEP/UnB @ 2025</p>
                <p className="text-sm text-gray-400">Versão 0.1</p>
            </div>

        </nav>
    )
}