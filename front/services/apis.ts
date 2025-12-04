// -------------------------------
// SOMENTE GETS
// -------------------------------

import { Frequencia, TipoUnidade } from "@/lib/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Frequencias
export async function getFrequencias(): Promise<Frequencia[]> {

    const res = await fetch(`${API_URL}/frequencias/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar frequências");
    }

    const data = await res.json() as Frequencia[]

    return data
}


// Tipos de Unidade
export async function getTiposUnidade(): Promise<TipoUnidade[]> {

    const res = await fetch(`${API_URL}/tipos-unidade/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Falha ao buscar tipos de unidade");
    }

    const data = await res.json() as TipoUnidade[]

    return data
}

