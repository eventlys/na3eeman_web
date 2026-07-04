import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ForBusiness } from './components/ForBusiness';
import { MerchantShowcase } from './components/MerchantShowcase';

import { Testimonials } from './components/Testimonials';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import LegalPage from './components/LegalPage';
import { BookSalon } from './components/BookSalon';

function LandingPage() {
    return (
        <main>
            <Hero />
            <Features />
            <MerchantShowcase />

            <Testimonials />
            <DownloadSection />
        </main>
    );
}

function App() {
    return (
        <div className="min-h-screen transition-colors duration-300">
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/legal/*" element={<LegalPage />} />
                <Route path="/features" element={<Features />} />
                <Route path="/booking" element={<BookSalon />} />
                <Route path="/for-business" element={<ForBusiness />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

