import Nav from "@/components/nav";
import "@radix-ui/themes/styles.css";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <Nav />
            </header>
            {children}
        </>
    )
}