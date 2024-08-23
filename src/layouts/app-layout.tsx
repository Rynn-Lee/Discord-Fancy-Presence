import Sidebar from "@/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex bg-fp-primary font-mono text-white">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
