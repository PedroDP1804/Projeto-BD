import { Pesquisador } from "@/lib/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Pesquisador0 {
    id?: number,
    nome: string,
    email: string,
    cpf: string,
    data_nascimento: string,
    telefones: string[],
    status: "Ativo" | "Inativo",
}

// 1. GET (Listar todos os pesquisadores)
export async function getPesquisadores(): Promise<Pesquisador[]> {
    const res = await fetch(`${API_URL}/pesquisadores/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar pesquisadores");
    }

    const data = await res.json() as Pesquisador0[]
    
    const ret:Pesquisador[] = data.map((p: Pesquisador0) => ({
        ...p,
        data_nascimento: new Date(p.data_nascimento + "T00:00:00.000-03:00")
    }))

    console.log(ret)
    return ret
}

// 2. POST (Criar novo pesquisador)
export async function createPesquisador(data: Pesquisador): Promise<Pesquisador> {

    const payload = {
        nome: data.nome,
        foto_base64: data.foto_base64,
        email: data.email,
        cpf: data.cpf,
        data_nascimento: data.data_nascimento.toISOString().split('T')[0],
        status: data.status,
        telefones: data.telefones,
    };
    console.log(payload)
    const res = await fetch(`${API_URL}/pesquisadores/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Falha ao criar pesquisador");
    }

    return res.json();
}

// 3. PUT (Atualizar pesquisador existente)
export async function updatePesquisador(id: number, data: Pesquisador): Promise<Pesquisador> {
    const payload = {
        nome: data.nome,
        foto_base64: data.foto_base64,
        email: data.email,
        cpf: data.cpf,
        data_nascimento: data.data_nascimento.toISOString().split('T')[0],
        status: data.status,
        telefones: data.telefones,
    };

    const res = await fetch(`${API_URL}/pesquisadores/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Falha ao atualizar pesquisador");
    }

    return res.json();
}

// 4. DELETE (Remover pesquisador)
export async function deletePesquisador(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/pesquisadores/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Falha ao excluir pesquisador");
    }
}