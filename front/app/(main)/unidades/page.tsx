import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { LinhaUnidade } from "./_components/linha_unidade";
import { FormUnidade } from "./_components/form_unidade";
import { Search } from "lucide-react";
import { tipos_exemplo, unidades_exemplo } from "@/lib/exemplos";

// Interfaces ===========================
export interface TipoUnidade {
    id_tipo_unidade: number,
    tipo: string,
}

export interface Unidade {
    id_unidade?: number,
    nome: string,
    endereco: string,
    estado: string,
    cidade: string,
    rua: string,
    tipo: TipoUnidade,
}

export default async function Home() {
    
    async function getUnidades() {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API

        const result:Unidade[] = unidades_exemplo //<---- aqui
        // ##----------------------------------------------------##
        
        return result
    }

    async function getTipos() {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API

        const result:TipoUnidade[] = tipos_exemplo //<---- aqui
        // ##----------------------------------------------------##
        
        return result
    }

    const unidades = await getUnidades();
    const tipos = await getTipos();

    return (
        <div className="px-5 pt-6">

            {/* Header */}
            <section>
                <h1 className="text-3xl text-black font-semibold">Unidades de Tratamento</h1>
                <p className="text-gray-500 text-lg mt-1">
                    Gerencie as unidades cadastradas no sistema
                </p>
            </section>

            {/* Busca e adicionar */}
            <section className="flex justify-between mt-8">

                <div className="flex items-center w-[35%] border border-gray-300 rounded-xl pl-3">
                    <Search className="text-gray-400"/>
                    <input
                        className="w-full h-full placeholder-gray-400 indent-3"
                        placeholder="Buscar unidade (não implementado)"
                    />
                </div>

                {/* Adicionar Unidade */}
                <Dialog>
                    <DialogTrigger className="cursor-pointer text-white bg-azul-sidebar rounded-md py-2 px-5 h-max">
                        + Nova Unidade
                    </DialogTrigger>

                    <FormUnidade tipo="criar" tipos_unidade={tipos}/>
                </Dialog>
            </section>

            {/* Tabela */}
            <section className="mt-6 max-h-[400px] overflow-y-scroll">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="indent-3">Nome</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Endereço</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Cidade</TableHead>
                                <TableHead>Rua</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {unidades.map((u, index) => (
                                <LinhaUnidade
                                    key={index}
                                    unidade={u}
                                    tipos_unidade={tipos}
                                />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </section>

        </div>
    );
}
