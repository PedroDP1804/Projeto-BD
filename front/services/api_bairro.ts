import { Bairro } from "@/lib/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL

// 1. GET (Listar todos os bairros)
export async function getBairros(): Promise<Bairro[]> {

    const res = await fetch(`${API_URL}/bairros/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar bairros");
    }

    const data = await res.json() as Bairro[]

    return data
}

// 2. POST (Criar novo bairro)
export async function createBairro(data: Bairro): Promise<Bairro> {

    const payload = {
        nome: data.nome,
        id_frequencia: data.id_frequencia,
    };

    console.log(payload)

    const res = await fetch(`${API_URL}/bairros/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Falha ao criar bairro");
    }

    return res.json();
}

// 3. PUT (Atualizar bairro existente)
export async function updateBairro(id: number, data: Bairro): Promise<Bairro> {
    
    const payload = {
        nome: data.nome,
        id_frequencia: data.id_frequencia,
    };

    const res = await fetch(`${API_URL}/bairros/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Falha ao atualizar bairro");
    }

    return res.json();
}

// 4. DELETE (Remover bairro)
export async function deleteBairro(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/bairros/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Falha ao excluir bairro");
    }
}