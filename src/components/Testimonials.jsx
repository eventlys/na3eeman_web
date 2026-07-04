import { motion, useAnimation, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useEffect, useRef } from 'react';

// Odometer Component
const Odometer = ({ target, duration = 2 }) => {
    const nodeRef = useRef();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
    
    useEffect(() => {
        if (inView && nodeRef.current) {
            const controls = animate(0, target, {
                duration: duration,
                ease: [0.2, 0.8, 0.2, 1],
                onUpdate: (value) => {
                    if (nodeRef.current) {
                        nodeRef.current.textContent = Math.round(value).toLocaleString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, target, duration]);

    return <span ref={(node) => { nodeRef.current = node; ref(node); }}>0</span>;
};

// Animated Stars Component
const StarStagger = ({ rating, inView }) => {
    return (
        <div className="flex gap-1 mt-4">
            {[...Array(rating)].map((_, i) => (
                <motion.svg 
                    key={i} 
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15,
                        delay: i * 0.1 
                    }}
                    className="w-5 h-5 text-yellow-400 drop-shadow-sm" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
            ))}
        </div>
    );
};

export const Testimonials = () => {
    const { t, isRTL } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    
    // Testimonials Carousel State
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: t.testimonials.testimonial1.name,
            salon: t.testimonials.testimonial1.salon,
            location: t.testimonials.testimonial1.location,
            quote: t.testimonials.testimonial1.quote,
            avatar: '👨‍💼',
        },
        {
            name: t.testimonials.testimonial2.name,
            salon: t.testimonials.testimonial2.salon,
            location: t.testimonials.testimonial2.location,
            quote: t.testimonials.testimonial2.quote,
            avatar: '👩‍🦱',
        },
        {
            name: t.testimonials.testimonial3.name,
            salon: t.testimonials.testimonial3.salon,
            location: t.testimonials.testimonial3.location,
            quote: t.testimonials.testimonial3.quote,
            avatar: '👨‍🦳',
        },
    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    // const stats = [
    //     { value: 100, suffix: '+', label: t.stats.salons },
    //     { value: 5000, suffix: '+', label: t.stats.bookings },
    //     { value: 98, suffix: '%', label: t.stats.satisfaction },
    // ];

    return (
        <section className="py-24 bg-white dark:bg-[#050505] overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4">
                
                {/* Stats Counter with Odometer
                <div className="mb-24 relative">
                    <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 rounded-[3rem] -z-10 transform -skew-y-2"></div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto py-12 px-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 mb-2">
                                    <Odometer target={stat.value} duration={2.5} />
                                    {stat.suffix}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-lg font-bold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left rtl:md:text-right"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-almost-black dark:text-white mb-6 leading-tight">
                            {t.testimonials.title}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                            {t.testimonials.subtitle}
                        </p>
                        <button 
                            onClick={handleNext}
                            className="btn-outline hidden md:inline-flex items-center gap-2 group"
                        >
                            {isRTL ? 'التالي' : 'Next Review'}
                            <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                                {isRTL ? '←' : '→'}
                            </span>
                        </button>
                    </motion.div>

                    {/* Stacking Card Carousel */}
                    <div className="relative h-[400px] w-full flex items-center justify-center perspective-[1000px]">
                        {testimonials.map((testimonial, index) => {
                            // Calculate position relative to active index
                            let offset = index - activeIndex;
                            if (offset < 0) offset += testimonials.length;
                            
                            const isTop = offset === 0;
                            const isSecond = offset === 1;
                            const isThird = offset === 2;

                            return (
                                <motion.div
                                    key={index}
                                    layout
                                    className={`absolute w-full max-w-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md cursor-pointer ${isTop ? 'z-30' : isSecond ? 'z-20' : 'z-10'}`}
                                    onClick={isTop ? handleNext : undefined}
                                    initial={false}
                                    animate={{
                                        y: isTop ? 0 : isSecond ? 30 : 60,
                                        scale: isTop ? 1 : isSecond ? 0.9 : 0.8,
                                        opacity: isTop ? 1 : isSecond ? 0.6 : 0.3,
                                        rotateX: isTop ? 0 : isSecond ? 5 : 10,
                                        filter: isTop ? "blur(0px)" : isSecond ? "blur(2px)" : "blur(4px)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                >
                                    <div className="text-6xl text-pink-500/20 mb-4 absolute top-6 right-8 font-serif">
                                        "
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed mb-8 relative z-10 font-medium">
                                        {testimonial.quote}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {testimonial.salon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Star Pop-in Stagger (Only plays when it becomes top card) */}
                                    <StarStagger rating={5} inView={isTop} />
                                </motion.div>
                            );
                        })}
                    </div>
                    
                    {/* Mobile Next Button */}
                    <button 
                        onClick={handleNext}
                        className="btn-outline w-full md:hidden mt-8"
                    >
                        {isRTL ? 'التالي' : 'Next Review'}
                    </button>
                </div>
            </div>
        </section>
    );
};
