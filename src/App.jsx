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
import { DynamicLegalPage } from './components/DynamicLegalPage';
import { BookSalon } from './components/BookSalon';
import { DeleteAccount } from './components/DeleteAccount';
import { AuthCallback } from './components/AuthCallback';

import { useEffect } from 'react';

function RedirectToLegalHub() {
    useEffect(() => {
        window.location.replace('https://legal.na3eeman.com');
    }, []);
    return null;
}

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
    const isTermsDomain = window.location.hostname === 'terms.n3eemn.com';

    if (isTermsDomain) {
        return (
            <div className="min-h-screen transition-colors duration-300">
                <Header />
                <Routes>
                    <Route path="*" element={<DynamicLegalPage />} />
                </Routes>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen transition-colors duration-300">
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/legal/*" element={<RedirectToLegalHub />} />
                <Route path="/features" element={<Features />} />
                <Route path="/booking" element={<BookSalon />} />
                <Route path="/for-business" element={<ForBusiness />} />
                <Route path="/delete-account" element={<DeleteAccount />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

