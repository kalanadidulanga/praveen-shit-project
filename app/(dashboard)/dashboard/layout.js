import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SimpleFooter } from "@/components/layout/SimpleFooter";

export default function DashboardLayout({ children }) {
  return (
    <>
      <SimpleHeader />
      <main className="min-h-screen bg-gradient-to-b from-white to-primary/5 pb-20 pt-10">
        {children}
      </main>
      <SimpleFooter />
    </>
  );
} 