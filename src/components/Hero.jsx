import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { AuroraBackground } from './AuroraBackground';

export const Hero = () => {
    const { t, isRTL } = useLanguage();

    const titleVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500">
            {/* The new Soft Aurora Background */}
            <AuroraBackground />

            <div className="container mx-auto px-4 py-32 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <motion.h1
                        variants={titleVariants}
                        className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-pink-200 dark:from-blue-200 dark:via-white dark:to-pink-300 drop-shadow-sm tracking-tight"
                    >
                        {t.hero.title}
                    </motion.h1>

                    <motion.h2
                        variants={titleVariants}
                        className="text-2xl md:text-3xl font-medium mb-8 text-white/90 dark:text-white/80"
                    >
                        {t.hero.subtitle}
                    </motion.h2>

                    <motion.p
                        variants={titleVariants}
                        className="text-lg md:text-xl mb-12 text-white/70 max-w-2xl"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div
                        variants={titleVariants}
                        className="flex flex-wrap gap-6 justify-center items-center"
                    >
                        <a href="#download" className="relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full backdrop-blur-md transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-105">
                            {t.hero.ctaDownload}
                        </a>
                        <a href="#how-it-works" className="relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(20,78,160,0.4)] hover:shadow-[0_0_60px_rgba(20,78,160,0.6)] hover:scale-105">
                            {t.hero.ctaBook}
                        </a>
                    </motion.div>

                    {/* Premium Stats Row */}
                    <motion.div
                        variants={titleVariants}
                        className="mt-20 grid grid-cols-3 gap-4 md:gap-12 w-full max-w-3xl"
                    >
                        {[
                            { val: '100+', label: isRTL ? 'محلات' : 'Salons' },
                            { val: '5K+', label: isRTL ? 'حجز شهرياً' : 'Monthly Bookings' },
                            { val: '98%', label: isRTL ? 'رضا' : 'Satisfaction' }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.val}</div>
                                <div className="text-xs md:text-sm text-white/60 uppercase tracking-widest font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-white/50 text-xs uppercase tracking-widest">{isRTL ? 'مرر للأسفل' : 'Scroll'}</span>
                <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent">
                    <motion.div 
                        animate={{ y: [0, 64, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] -ml-[1.5px]"
                    />
                </div>
            </motion.div>
        </section>
    );
};
