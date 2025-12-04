import { Header } from "@/app/_components/header";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { FormColeta } from "./_components/form_coleta";
import { LinhaColeta } from "./_components/linha_coleta";
import { getColetas } from "@/services/api_coleta";
import { getBairros } from "@/services/api_bairro";
import { getUnidades } from "@/services/api_unidade";

export default async function Page() {

    const coletas = await getColetas();
    const bairros = await getBairros();
    const unidades = await getUnidades();

    return (
        <div className="px-5 pt-6">

            {/* Header */}
            <Header
                titulo="Coletas"
                subtitulo="Gerencie as coletas de resíduos realizadas"
            />

            {/* Busca e nova coleta */}
            <section className="flex justify-between mt-8">

                <div className="flex items-center w-[35%] border border-gray-300 rounded-xl pl-3">
                    <Search className="text-gray-400" />
                    <input
                        className="w-full h-full placeholder-gray-400 indent-3"
                        placeholder="Buscar por descrição..."
                    />
                </div>

                {/* Adicionar Coleta */}
                <Dialog>
                    <DialogTrigger className="cursor-pointer text-white bg-azul-sidebar rounded-md py-2 px-5 h-max">
                        + Nova Coleta
                    </DialogTrigger>

                    <FormColeta
                        tipo="criar"
                        bairros={bairros}
                        unidades={unidades}
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
                                <TableHead className="indent-3">Descrição</TableHead>
                                <TableHead>Qtd (kg)</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Bairro</TableHead>
                                <TableHead>Unidade de Tratamento</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Linhas */}
                        <TableBody>
                            {coletas.map((coleta, index) => (
                                <LinhaColeta
                                    key={index}
                                    coleta={coleta}
                                    bairros={bairros}
                                    unidades={unidades}
                                />
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </section>

        </div>
    );
}