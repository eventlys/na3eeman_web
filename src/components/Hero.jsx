import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import naeemaImg from '../assets/images/mobile girl.png';
import naeemImg from '../assets/images/mobile man.png';

export const Hero = () => {
    const { t, isRTL } = useLanguage();

    // Floating particles for background
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 30 + 20,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
    }));

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pattern-dots transition-colors duration-300">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute opacity-10 dark:opacity-20"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 8 + particle.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600 dark:text-pink-400">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`${isRTL ? 'md:order-1 text-right' : 'md:order-1 text-left'}`}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-blue-600 dark:text-pink-400"
                        >
                            {t.hero.title}
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl md:text-4xl font-bold mb-6 text-pink-500 dark:text-blue-400"
                        >
                            {t.hero.subtitle}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl md:text-2xl mb-8 text-almost-black/80 dark:text-cream/80"
                        >
                            {t.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}
                        >
                            <a href="#download" className="btn-primary">
                                {t.hero.ctaDownload}
                            </a>
                            <a href="#how-it-works" className="btn-outline">
                                {t.hero.ctaBook}
                            </a>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="mt-12 grid grid-cols-3 gap-6"
                        >
                            {[
                                { val: '100+', label: isRTL ? 'محلات' : 'Shops' },
                                { val: '5K+', label: isRTL ? 'حجز شهرياً' : 'Monthly Bookings' },
                                { val: '98%', label: isRTL ? 'رضا' : 'Satisfaction' }
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-2xl backdrop-blur-sm shadow-sm">
                                    <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-pink-400">{stat.val}</div>
                                    <div className="text-xs md:text-sm text-almost-black/60 dark:text-cream/60 mt-1 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Character Visuals */}
                    <div className="relative h-[500px] md:h-[700px] flex items-center justify-center">
                        {/* Naeema (Pink) */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, rotate: 10 }}
                            animate={{ opacity: 1, x: isRTL ? -120 : 120, rotate: 5 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute z-20 w-3/4 md:w-full max-w-[400px]"
                        >
                            <img
                                src={naeemaImg}
                                alt="Naeema"
                                className="w-full drop-shadow-2xl animate-float-slow"
                            />
                        </motion.div>

                        {/* Naeem (Blue) */}
                        <motion.div
                            initial={{ opacity: 0, x: -100, rotate: -10 }}
                            animate={{ opacity: 1, x: isRTL ? 80 : -80, rotate: -5 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="absolute z-10 w-2/3 md:w-full max-w-[350px] opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                            <img
                                src={naeemImg}
                                alt="Naeem"
                                className="w-full drop-shadow-2xl"
                                style={{ animation: 'float-slow 8s ease-in-out infinite reverse' }}
                            />
                        </motion.div>

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-pink-500/10 to-transparent blur-3xl opacity-50 dark:opacity-30 -z-10"></div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-8 h-12 border-2 border-blue-600/50 dark:border-pink-400/50 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-blue-600 dark:bg-pink-400 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};
