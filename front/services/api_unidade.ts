import { Unidade } from "@/lib/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL

// 1. GET (Listar todas as unidades)
export async function getUnidades(): Promise<Unidade[]> {

    const res = await fetch(`${API_URL}/unidades/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar unidades");
    }

    const data = await res.json() as Unidade[]

    return data
}

// 2. POST (Criar nova unidade)
export async function createUnidade(data: Unidade): Promise<Unidade> {

    const payload = {
        nome:data.nome,
        id_tipo_unidade:data.id_tipo_unidade,
        endereco:data.endereco,
        estado:data.estado,
        cidade:data.cidade,
        rua:data.rua
    };

    console.log(payload)

    const res = await fetch(`${API_URL}/unidades/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Falha ao criar unidade");
    }

    return res.json();
}

// 3. PUT (Atualizar unidade existente)
export async function updateUnidade(id: number, data: Unidade): Promise<Unidade> {
    
    const payload = {
        nome:data.nome,
        id_tipo_unidade:data.id_tipo_unidade,
        endereco:data.endereco,
        estado:data.estado,
        cidade:data.cidade,
        rua:data.rua
    };

    const res = await fetch(`${API_URL}/unidades/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Falha ao atualizar unidade");
    }

    return res.json();
}

// 4. DELETE (Remover unidade)
export async function deleteUnidade(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/unidades/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Falha ao excluir unidade");
    }
}