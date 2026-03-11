import './index.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { MerchantShowcase } from './components/MerchantShowcase';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="min-h-screen transition-colors duration-300">
            <Header />
            <main>
                <Hero />
                <Features />
                <MerchantShowcase />
                <HowItWorks />
                <Testimonials />
                <DownloadSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
