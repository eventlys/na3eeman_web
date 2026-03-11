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
        <section id="download" className="py-24 bg-cream dark:bg-almost-black relative overflow-hidden transition-colors duration-300" ref={ref}>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title">{t.download.title}</h2>
                        <p className="section-subtitle">{t.download.subtitle}</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* QR Code with Scan Effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="qr-scan-effect inline-block p-4 bg-white/50 dark:bg-white/5 rounded-[2rem] backdrop-blur-md">
                                <div className="relative w-72 h-72 mx-auto bg-white rounded-[1.5rem] shadow-2xl p-8 group overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-pink-500 rounded-xl flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                        <div className="text-white text-center">
                                            <div className="text-7xl mb-4">✨</div>
                                            <div className="text-lg font-bold">Na3eeman App</div>
                                            <div className="text-sm opacity-75 mt-1">Scan to Download</div>
                                        </div>
                                    </div>
                                    {/* Scan Line Animation */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-pink-400 shadow-[0_0_15px_rgba(208,151,174,0.8)] animate-bounce" style={{ top: '50%' }}></div>
                                </div>
                            </div>
                            <p className="mt-8 text-almost-black/60 dark:text-cream/60 font-medium text-lg">{t.download.scanQR}</p>
                        </motion.div>

                        {/* Download Options */}
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* App Store Badges */}
                            <div className="grid grid-cols-1 gap-4">
                                {/* Google Play */}
                                <a
                                    href="#"
                                    className="group relative overflow-hidden bg-blue-600 dark:bg-blue-500 text-white rounded-2xl p-6 transition-all duration-300 hover:scale-105 shadow-xl"
                                >
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="p-3 bg-white/20 rounded-xl">
                                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                            </svg>
                                        </div>
                                        <div className={isRTL ? 'text-right' : 'text-left'}>
                                            <div className="text-sm opacity-80">{isRTL ? 'احصل عليه على' : 'Get it on'}</div>
                                            <div className="text-2xl font-bold">Google Play</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                                </a>

                                {/* App Store */}
                                <a
                                    href="#"
                                    className="group relative overflow-hidden bg-pink-500 dark:bg-pink-600 text-white rounded-2xl p-6 transition-all duration-300 hover:scale-105 shadow-xl"
                                >
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="p-3 bg-white/20 rounded-xl">
                                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                            </svg>
                                        </div>
                                        <div className={isRTL ? 'text-right' : 'text-left'}>
                                            <div className="text-sm opacity-80">{isRTL ? 'حمّل من' : 'Download on the'}</div>
                                            <div className="text-2xl font-bold">App Store</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                                </a>
                            </div>

                            {/* WhatsApp Direct Link */}
                            <a
                                href="https://wa.me/962000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-6 bg-opal-500 hover:bg-opal-600 text-almost-black font-bold rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span className="text-xl">{t.download.whatsappLink}</span>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
