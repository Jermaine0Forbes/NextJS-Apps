import Nav from "@/components/nav";
import "@radix-ui/themes/styles.css";
export default function LoginLayout({ children }: { children: React.ReactNode}) {
  return (
    <>
     <header>
        <Nav/>
     </header>
          {children}
    </>
  );
}