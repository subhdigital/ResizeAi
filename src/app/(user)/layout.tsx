import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
