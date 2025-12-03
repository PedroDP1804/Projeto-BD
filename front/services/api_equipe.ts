import { Equipe } from "@/lib/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL

// 1. GET (Listar todas as equipes)
export async function getEquipes(): Promise<Equipe[]> {

    const res = await fetch(`${API_URL}/equipes/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar equipes");
    }

    const data = await res.json() as Equipe[]

    return data
}

// 2. POST (Criar nova equipe)
export async function createEquipe(data: Equipe): Promise<Equipe> {

    const payload = {
        nome: data.nome,
        id_pesquisador: data.id_pesquisador,
    };

    console.log(payload)

    const res = await fetch(`${API_URL}/equipes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Falha ao criar equipe");
    }

    return res.json();
}

// 3. PUT (Atualizar equipe existente)
export async function updateEquipe(id: number, data: Equipe): Promise<Equipe> {
    
    const payload = {
        nome: data.nome,
        id_pesquisador: data.id_pesquisador,
    };

    const res = await fetch(`${API_URL}/equipes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Falha ao atualizar equipe");
    }

    return res.json();
}

// 4. DELETE (Remover equipe)
export async function deleteEquipe(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/equipes/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Falha ao excluir equipe");
    }
}