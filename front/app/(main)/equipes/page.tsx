import { FormEquipe } from "@/app/(main)/equipes/_components/form_equipe";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { equipes_exemplo, pesquisadores_exemplo } from "@/lib/exemplos";
import { Search } from "lucide-react";
import { LinhaEquipe } from "./_components/linha_equipe";
import { Header } from "@/app/_components/header";
import { Equipe, Pesquisador } from "@/lib/interfaces";

export default async function Home() {

    // Busca equipes do BD
    async function getEquipes(): Promise<Equipe[]> {

        // ##----------------------------------------------------##
        //  Inserir aqui chamada de API real

        const result:Equipe[] = equipes_exemplo  // <---- aqui
        // ##----------------------------------------------------##

        return result;
    }

    // Busca pesquisadores do BD
    async function getPesquisadores(): Promise<Pesquisador[]> {

        // ##----------------------------------------------------##
        //  Inserir aqui chamada de API real

        const result:Pesquisador[] = pesquisadores_exemplo  // <---- aqui
        // ##----------------------------------------------------##

        return result;
    }

    const equipes = await getEquipes();
    const pesquisadores = await getPesquisadores();

    return (
        <div className="px-5 pt-6">

            {/* Header */}
            <Header
                titulo="Equipes"
                subtitulo="Gerencie as equipes e seus responsáveis"
            />

            {/* Busca e nova equipe */}
            <section className="flex justify-between mt-8">

                <div className="flex items-center w-[35%] border border-gray-300 rounded-xl pl-3">
                    <Search className="text-gray-400"/>
                    <input
                        className="w-full h-full placeholder-gray-400 indent-3"
                        placeholder="Buscar por nome (não implementado)"
                    />
                </div>

                {/* Adicionar Equipe */}
                <Dialog>
                    <DialogTrigger className="cursor-pointer text-white bg-azul-sidebar rounded-md py-2 px-5 h-max">
                        + Nova Equipe
                    </DialogTrigger>

                    <FormEquipe
                        tipo="criar"
                        pesquisadores={pesquisadores}
                    />
                </Dialog>

            </section>

            {/* Tabela */}
            <section className="mt-6 max-h-[400px] overflow-y-scroll">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <Table>
                        {/* Cabeçalho */}
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="indent-3">Nome</TableHead>
                                <TableHead>Pesquisador Responsável</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Linhas */}
                        <TableBody>
                            {equipes.map((equipe, index) => (
                                <LinhaEquipe
                                    key={index}
                                    equipe={equipe}
                                    pesquisadores={pesquisadores}
                                />
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </section>

        </div>
    );
}
