import "@radix-ui/themes/styles.css";
import DefaultLayout from "@/templates/default-layout"
export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  return (
    <DefaultLayout children={children}/>
  );
}