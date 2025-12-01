import { Bell } from "lucide-react"
import Image from "next/image"

export function Topbar() {

    const user_data = {
        nome: "Usuário",
        email: "usuario@exemplo.com",
        foto: "/user.png"
    }

    return (
        <div className="flex justify-end items-center px-5 h-20 w-full border-b border-[#DAE0E7]">

            <div className="flex flex-col items-end mx-3">

                <h2 className="text-black font-bold">
                    {user_data.nome}
                </h2>

                <h3 className="text-gray-500">
                    {user_data.email}
                </h3>

            </div>
            
            <Image
                src={user_data.foto}
                alt="foto usuario"
                className="border border-gray-400 rounded-[25px] mr-5"
                height={50}
                width={50}
            />

            <Bell className="text-gray-600"/>

        </div>
    )
}