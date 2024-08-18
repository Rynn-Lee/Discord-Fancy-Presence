import Sidebar from "@/components/sidebar/sidebar";

export default function AppLayout({ children }: {children: React.ReactNode}) {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  ) 
}