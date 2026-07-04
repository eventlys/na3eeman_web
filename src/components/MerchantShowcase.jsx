import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';
import { useState } from 'react';

// Reusable Magnetic Hover Card Component
const MagneticCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth spring physics for the tilt
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    // Rotate up to 10 degrees based on mouse position
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`relative ${className}`}
        >
            {/* Subtle Glare Effect */}
            <motion.div 
                className="absolute inset-0 pointer-events-none rounded-3xl z-20 mix-blend-overlay"
                style={{
                    background: isHovered 
                        ? `radial-gradient(circle at ${x.get() * 200 + 50}% ${y.get() * 200 + 50}%, rgba(255,255,255,0.4) 0%, transparent 60%)` 
                        : 'transparent'
                }}
            />
            <div style={{ transform: "translateZ(30px)", height: "100%" }}>
                {children}
            </div>
        </motion.div>
    );
};

// Infinite Marquee Component
const InfiniteMarquee = ({ items }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div 
            className="w-full overflow-hidden marquee-container py-8 mt-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="flex whitespace-nowrap gap-12"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: isHovered ? 50 : 25, ease: "linear", repeat: Infinity }}
            >
                {/* Duplicate items for seamless looping */}
                {[...items, ...items].map((item, index) => (
                    <div 
                        key={index} 
                        className="inline-flex items-center justify-center px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-lg text-gray-700 dark:text-gray-300 font-bold text-xl uppercase tracking-widest hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
                    >
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};



export const MerchantShowcase = () => {
    const { isRTL } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const partnerBrands = [
        "L'Oréal Professionnel", "Kérastase", "Wella Professionals", 
        "Schwarzkopf", "Redken", "Olaplex", "Dyson Beauty"
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 overflow-hidden relative" ref={ref}>
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-sm font-bold tracking-wider uppercase mb-6 border border-violet-200 dark:border-violet-500/20">
                        {isRTL ? 'شركاء النجاح' : 'Our Partners'}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                        {isRTL ? 'شركاء الجمال والعناية' : 'Beauty & Grooming Partners'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                        {isRTL ? 'أفضل الصالونات والعلامات التجارية في مكان واحد لتقديم أروع تجربة' : 'The best salons and brands in one place to deliver an exceptional experience'}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch perspective-[1000px]">
                    {/* Men's Expertsalons Magnetic Card */}
                    <MagneticCard className="h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col h-full bg-white/70 dark:bg-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-gray-200/50 dark:border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            
                            <div className="mb-8 w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-3xl border border-blue-200 dark:border-blue-500/30 relative z-10">
                                ✂️
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 relative z-10">
                                {isRTL ? 'صالونات الحلاقة الرجالية' : "Men's Expertsalons"}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 flex-grow relative z-10 font-medium">
                                {isRTL
                                    ? 'نعيما يدعم أيضاً الرجال الذين يبحثون عن حجز سريع ومريح لخدمات العناية الشخصية، بما في ذلك قص الشعر وتصفيف اللحية بدقة احترافية.'
                                    : 'Naeema supports men who want quick and convenient booking for grooming services, including precision haircuts and premium beard styling.'}
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 relative z-10 self-start">
                                {isRTL ? 'استكشف الصالونات' : 'Explore Salons'}
                            </button>
                        </motion.div>
                    </MagneticCard>

                    {/* Women's Salons Magnetic Card */}
                    <MagneticCard className="h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col h-full bg-white/70 dark:bg-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-gray-200/50 dark:border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="mb-8 w-16 h-16 bg-pink-100 dark:bg-pink-500/20 rounded-2xl flex items-center justify-center text-3xl border border-pink-200 dark:border-pink-500/30 relative z-10">
                                🌸
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 relative z-10">
                                {isRTL ? 'الصالونات النسائية' : "Women's Salons"}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 flex-grow relative z-10 font-medium">
                                {isRTL
                                    ? 'نعيما تخدم النساء اللواتي يبحثن عن تجربة فاخرة لحجز خدمات التجميل مثل تصفيف الشعر، المكياج، والعناية المتكاملة بالبشرة.'
                                    : 'Naeema serves women looking for a luxurious experience to book beauty services such as hair styling, makeup, and comprehensive skincare.'}
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-1 relative z-10 self-start">
                                {isRTL ? 'استكشفي الخدمات' : 'Explore Services'}
                            </button>
                        </motion.div>
                    </MagneticCard>
                </div>



                {/* Infinite Brands Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <InfiniteMarquee items={partnerBrands} />
                </motion.div>
            </div>
        </section>
    );
};
