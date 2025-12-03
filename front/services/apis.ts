// -------------------------------
// SOMENTE GETS
// -------------------------------

import { Frequencia } from "@/lib/interfaces";

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

