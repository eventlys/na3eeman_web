import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

export const Testimonials = () => {
    const { t, isRTL } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const testimonials = [
        {
            name: t.testimonials.testimonial1.name,
            shop: t.testimonials.testimonial1.shop,
            location: t.testimonials.testimonial1.location,
            quote: t.testimonials.testimonial1.quote,
            avatar: '👨‍💼',
        },
        {
            name: t.testimonials.testimonial2.name,
            shop: t.testimonials.testimonial2.shop,
            location: t.testimonials.testimonial2.location,
            quote: t.testimonials.testimonial2.quote,
            avatar: '👨‍🦱',
        },
        {
            name: t.testimonials.testimonial3.name,
            shop: t.testimonials.testimonial3.shop,
            location: t.testimonials.testimonial3.location,
            quote: t.testimonials.testimonial3.quote,
            avatar: '👨‍🦳',
        },
    ];

    const stats = [
        { value: '100+', label: t.stats.shops },
        { value: '5,000+', label: t.stats.bookings },
        { value: '98%', label: t.stats.satisfaction },
    ];

    return (
        <section className="py-20 bg-white" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Stats Counter */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="stat-number mb-2">{stat.value}</div>
                                <div className="text-gray-600 text-lg font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t.testimonials.title}</h2>
                    <p className="section-subtitle">{t.testimonials.subtitle}</p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="testimonial-card hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="text-6xl text-gold-400 opacity-20 mb-4">
                                {isRTL ? '«' : '"'}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                                {testimonial.quote}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 border-t pt-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600">
                                        {testimonial.shop} • {testimonial.location}
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
