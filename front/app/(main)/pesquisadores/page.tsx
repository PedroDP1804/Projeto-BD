import { FormPesquisador } from "@/app/(main)/pesquisadores/_components/form_pesquisador";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pesquisadores_exemplo } from "@/lib/exemplos";
import { Search } from "lucide-react";
import { LinhaPesquisador } from "./_components/linha_pesquisador";
import { Header } from "@/app/_components/header";
import { Pesquisador } from "@/lib/interfaces";

export default async function Home() {

    // Pega os Pesquisadores do BD
    async function getPesquisadores() {

        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API

        const result:Pesquisador[] = pesquisadores_exemplo //<---- aqui
        // ##----------------------------------------------------##
        
        return result
    }

    const pesquisadores = await getPesquisadores()

    return (
        <div className="px-5 pt-6">

            {/* Header */}
            <Header
                titulo="Pesquisadores"
                subtitulo="Gerencie os pesquisadores cadastrados no sistema"
            />

            {/* Busca e novo pesquisador */}
            <section className="flex justify-between mt-8">

                <div className="flex items-center w-[35%] border border-gray-300 rounded-xl pl-3">
                    <Search className="text-gray-400"/>
                    <input
                        className="w-full h-full placeholder-gray-400 indent-3"
                        placeholder="Buscar por nome (não implementado)"
                    />
                </div>

                {/* Adicionar Pesquisador */}
                <Dialog>

                    {/* Botão Editar */}
                    <DialogTrigger className="cursor-pointer text-white bg-azul-sidebar rounded-md py-2 px-5 h-max">
                        + Novo Pesquisador
                    </DialogTrigger>

                    
                    <FormPesquisador
                        tipo="criar"
                    />

                </Dialog>

            </section>

            {/* Tabela */}
            <section className="mt-6 max-h-[400px] overflow-y-scroll">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <Table>
                        {/* Cabeçalho da tabela */}
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="indent-3">Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>CPF</TableHead>
                                <TableHead>Data Nascimento</TableHead>
                                <TableHead>Telefone(s)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Linhas da tabela */}
                        <TableBody>
                                {pesquisadores.map((pesquisador, index) => (
                                    <LinhaPesquisador
                                        key={index}
                                        pesquisador={pesquisador}
                                    />
                                ))}
                        </TableBody>

                    </Table>
                </div>
            </section>

        </div>
    );
}
