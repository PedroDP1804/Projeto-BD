import { Sidebar } from "../_components/sidebar";
import { Topbar } from "../_components/topbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">

        <Sidebar/>
        
        <main className="bg-[#F9FAFB] w-full">

            <Topbar/> 
            {children}
            
        </main>
        
    </div>
  );
}
