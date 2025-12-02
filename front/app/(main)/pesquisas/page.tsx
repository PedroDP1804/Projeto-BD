import { Header } from "@/app/_components/header";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { equipes_exemplo, frequencias_exemplo, pesquisas_exemplo, status_pesquisa_exemplo } from "@/lib/exemplos";
import { Equipe, Frequencia, Pesquisa, StatusPesquisa } from "@/lib/interfaces";
import { Search } from "lucide-react";
import { FormPesquisa } from "./_components/form_pesquisa";
import { LinhaPesquisa } from "./_components/linha_pesquisa";
export default async function Page() {

    // --- Buscas no Banco de Dados (Simuladas) ---

    async function getPesquisas(): Promise<Pesquisa[]> {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API

        const result:Pesquisa[] = pesquisas_exemplo //<---- aqui
        // ##----------------------------------------------------##
        return result
    }
    
    async function getEquipes(): Promise<Equipe[]> {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
    
        const result:Equipe[] = equipes_exemplo //<---- aqui
        // ##----------------------------------------------------##
        return result
    }
    
    async function getFrequencias(): Promise<Frequencia[]> {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
    
        const result:Frequencia[] = frequencias_exemplo //<---- aqui
        // ##----------------------------------------------------##
        return result
    }
    
    async function getStatusPesquisa(): Promise<StatusPesquisa[]> {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
    
        const result:StatusPesquisa[] = status_pesquisa_exemplo //<---- aqui
        // ##----------------------------------------------------##
        return result
    }

    const pesquisas = await getPesquisas();
    const equipes = await getEquipes();
    const frequencias = await getFrequencias();
    const listaStatus = await getStatusPesquisa();

    return (
        <div className="px-5 pt-6">

            <Header
                titulo="Pesquisas"
                subtitulo="Acompanhe o andamento e cronograma das pesquisas"
            />

            <section className="flex justify-between mt-8">

                {/* Barra de Busca */}
                <div className="flex items-center w-[35%] border border-gray-300 rounded-xl pl-3">
                    <Search className="text-gray-400" />
                    <input
                        className="w-full h-full placeholder-gray-400 indent-3"
                        placeholder="Buscar por descrição..."
                    />
                </div>

                {/* Botão Nova Pesquisa */}
                <Dialog>
                    <DialogTrigger className="cursor-pointer text-white bg-azul-sidebar rounded-md py-2 px-5 h-max">
                        + Nova Pesquisa
                    </DialogTrigger>

                    <FormPesquisa
                        tipo="criar"
                        equipes={equipes}
                        frequencias={frequencias}
                        listaStatus={listaStatus}
                    />
                </Dialog>

            </section>

            {/* Tabela de Dados */}
            <section className="mt-6 max-h-[400px] overflow-y-scroll">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="indent-3">Descrição</TableHead>
                                <TableHead>Início</TableHead>
                                <TableHead>Fim</TableHead>
                                <TableHead>Frequência</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Equipe</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {pesquisas.map((pesquisa, index) => (
                                <LinhaPesquisa
                                    key={index}
                                    pesquisa={pesquisa}
                                    equipes={equipes}
                                    frequencias={frequencias}
                                    listaStatus={listaStatus}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

        </div>
    );
}