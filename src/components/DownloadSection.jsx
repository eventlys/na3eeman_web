import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

export const DownloadSection = () => {
    const { t, isRTL } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="download" className="py-32 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-300" ref={ref}>
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Left Column: Text & QR */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start"
                    >
                        {/* Available on badges */}
                        <div className="flex items-center gap-4 mb-8 text-gray-900 dark:text-white font-bold text-lg">
                            <span>{isRTL ? 'متوفر على' : 'Available on'}</span>
                            <div className="flex items-center gap-4">
                                <AppleIcon />
                                <GoogleIcon />
                            </div>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                            {t.download.title}
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-xl mb-12 leading-relaxed font-medium">
                            {t.download.subtitle}
                        </p>

                        {/* QR Code */}
                        <div className="p-4 bg-white rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 inline-block transition-transform duration-300 hover:scale-105">
                            <div className="w-40 h-40 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 relative group">
                                <img src="/assets/qr-code.png" alt="Scan to download" className="w-full h-full object-cover z-10 relative" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                {/* Placeholder if image is missing */}
                                <div className="absolute inset-0 hidden flex-col items-center justify-center p-4 text-center z-0">
                                    <div className="text-3xl mb-2">📱</div>
                                    <span className="text-gray-400 font-bold text-xs">qr-code.png<br />in public/assets/</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Mockups */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 relative w-full h-[600px] flex justify-center items-center"
                    >
                        {/* Background glowing circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-pink-500/10 blur-[80px] rounded-full pointer-events-none" />

                        {/* Secondary Screenshot (Back) */}
                        <div className="absolute right-[5%] lg:right-[15%] top-[5%] w-[250px] h-[520px] rounded-[3rem] border-[8px] border-white dark:border-[#111] bg-white dark:bg-[#111] overflow-hidden shadow-2xl z-10 transform translate-x-8 translate-y-8 rotate-[8deg] hover:rotate-[12deg] transition-transform duration-500">
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center relative">
                                <img src="/assets/app-mockup-back.png" alt="App Explore Screen" className="w-full h-full object-cover z-10 relative" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                {/* Placeholder */}
                                <div className="absolute inset-0 hidden flex-col items-center justify-center p-4 text-center z-0">
                                    <span className="text-gray-400 font-bold text-sm">app-mockup-back.png<br />(public/assets/)</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Screenshot (Front) */}
                        <div className="absolute left-[5%] lg:left-[15%] top-[10%] w-[280px] h-[580px] rounded-[3.5rem] border-[10px] border-white dark:border-[#111] bg-white dark:bg-[#111] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 hover:-translate-y-4 transition-transform duration-500">
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center relative">
                                <img src="/assets/app-mockup-front.png" alt="App Profile Screen" className="w-full h-full object-cover z-10 relative" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                {/* Placeholder */}
                                <div className="absolute inset-0 hidden flex-col items-center justify-center p-4 text-center z-0">
                                    <span className="text-gray-400 font-bold text-sm">app-mockup-front.png<br />(public/assets/)</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const AppleIcon = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.365 10.364c-.024-1.916 1.637-2.83 1.716-2.877-1.004-1.416-2.464-1.615-3.028-1.635-1.229-.117-2.433.68-3.064.68-.614 0-1.579-.661-2.589-.644-1.332.016-2.551.729-3.238 1.86-1.385 2.278-.354 5.656 1.01 7.458.653.868 1.444 1.859 2.449 1.82 1.003-.041 1.341-.624 2.508-.624 1.155 0 1.503.624 2.518.604 1.054-.02 1.713-.883 2.378-1.745.86-1.196 1.182-2.35 1.195-2.408-.023-.012-2.227-.816-2.203-3.136l.348.647zm-1.853-4.704c.548-.636.906-1.503.794-2.384-.794.032-1.722.508-2.285 1.139-.462.515-.892 1.41-.762 2.274.887.067 1.74-.413 2.253-1.029z" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
    </svg>
);
