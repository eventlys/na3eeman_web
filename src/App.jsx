import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AIInsights } from './components/AIInsights';
import { Pricing } from './components/Pricing';
import { MerchantShowcase } from './components/MerchantShowcase';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import LegalPage from './components/LegalPage';

function LandingPage() {
    return (
        <main>
            <Hero />
            <Features />
            <AIInsights />
            <Pricing />
            <MerchantShowcase />
            <HowItWorks />
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
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

