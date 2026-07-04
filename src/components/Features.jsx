import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

export const Features = () => {
    const { isRTL } = useLanguage();
    const [ref, inView] = useInView({ threshold: 0.2 });

    return (
        <section id="features" className="py-32 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-300" ref={ref}>
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <div className="inline-block mb-6 px-6 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-bold text-sm tracking-widest uppercase">
                        {isRTL ? 'أفضل منصة للعناية' : 'The Premier Platform'}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
                        {isRTL 
                            ? 'الوجهة الأولى للعناية الشخصية.' 
                            : 'The top-rated destination for selfcare.'}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {isRTL
                            ? 'حل واحد، برنامج واحد. موثوق من قبل أفضل صالونات التجميل والعناية في المنطقة، مصمم لتقديم تجربة استثنائية لك ولعملائك.'
                            : 'One solution, one software. Trusted by the best in the selfcare industry to deliver an exceptional experience for both you and your clients.'}
                    </p>
                </motion.div>
            </div>
            
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
};
