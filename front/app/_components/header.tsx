interface Props {
    titulo: string,
    subtitulo: string,
}

export function Header({titulo, subtitulo}:Props) {
    return (
        <section>
            <h1 className="text-3xl font-semibold">
                {titulo}
            </h1>

            <p className="text-gray-500 text-lg mt-1">
                {subtitulo}
            </p>
        </section>
    )
}