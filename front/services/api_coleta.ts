import { Coleta } from "@/lib/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL

// 1. GET (Listar todas as coletas)
export async function getColetas(): Promise<Coleta[]> {

    const res = await fetch(`${API_URL}/coletas/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar coletas");
    }

    const data = await res.json() as Coleta[]

    return data
}

// 2. POST (Criar nova coleta)
export async function createColeta(data: Coleta): Promise<Coleta> {

    const payload = {
        descricao: data.descricao,
        quantidade_kg: data.quantidade_kg,
        categoria: data.categoria,
        id_bairro: data.id_bairro,
        id_unidade_tratamento: data.id_unidade_tratamento,
    };

    const res = await fetch(`${API_URL}/coletas/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Falha ao criar coleta");
    }

    return res.json();
}

// 3. PUT (Atualizar coleta existente)
export async function updateColeta(id: number, data: Coleta): Promise<Coleta> {
    
    const payload = {
        descricao: data.descricao,
        quantidade_kg: data.quantidade_kg,
        categoria: data.categoria,
        id_bairro: data.id_bairro,
        id_unidade_tratamento: data.id_unidade_tratamento,
    };

    const res = await fetch(`${API_URL}/coletas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Falha ao atualizar coleta");
    }

    return res.json();
}

// 4. DELETE (Remover coleta)
export async function deleteColeta(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/coletas/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Falha ao excluir coleta");
    }
}