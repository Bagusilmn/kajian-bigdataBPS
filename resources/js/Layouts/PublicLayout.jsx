import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}