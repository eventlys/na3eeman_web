import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

export const HowItWorks = () => {
    const { t, isRTL } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const steps = [
        {
            number: 1,
            title: t.howItWorks.step1.title,
            description: t.howItWorks.step1.description,
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            ),
            color: 'from-blue-600 to-blue-700',
        },
        {
            number: 2,
            title: t.howItWorks.step2.title,
            description: t.howItWorks.step2.description,
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            color: 'from-pink-500 to-pink-600',
        },
        {
            number: 3,
            title: t.howItWorks.step3.title,
            description: t.howItWorks.step3.description,
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z" />
                </svg>
            ),
            color: 'from-opal-500 to-opal-600',
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gray-50 pattern-dots" ref={ref}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t.howItWorks.title}</h2>
                    <p className="section-subtitle">{t.howItWorks.subtitle}</p>
                </motion.div>

                {/* Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-pink-200 to-opal-200 dark:from-blue-900 dark:via-pink-900 dark:to-opal-900 transform -translate-y-1/2"
                        style={{ zIndex: 0 }} />

                    <div className="grid md:grid-cols-3 gap-8 relative" style={{ zIndex: 1 }}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                onMouseEnter={() => setActiveStep(index)}
                                className="relative"
                            >
                                {/* Step Card */}
                                <div className={`card text-center ${activeStep === index ? 'ring-4 ring-primary-300' : ''}`}>
                                    {/* Step Number */}
                                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white shadow-xl ${activeStep === index ? 'animate-pulse-ring' : ''}`}>
                                        <div className="w-12 h-12">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="mb-4">
                                        <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold mb-4`}>
                                            {isRTL ? `الخطوة ${step.number}` : `Step ${step.number}`}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow (desktop only) */}
                                {index < steps.length - 1 && (
                                    <div className={`hidden md:block absolute top-1/2 ${isRTL ? 'right-0' : 'left-full'} transform -translate-y-1/2 ${isRTL ? '-translate-x-1/2' : 'translate-x-1/2'}`}>
                                        <svg
                                            className={`w-8 h-8 text-primary-400 ${isRTL ? 'rotate-180' : ''}`}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <a href="#download" className="btn-primary text-lg">
                        {t.hero.ctaDownload}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
