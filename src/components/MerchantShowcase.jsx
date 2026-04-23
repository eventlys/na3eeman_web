import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';
import barberImg from '../assets/images/man.png';
import stylistImg from '../assets/images/girl.png';

export const MerchantShowcase = () => {
    const { t, isRTL } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="py-20 bg-cream dark:bg-almost-black transition-colors duration-300 overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Men's Barbersalons */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center gap-8 bg-blue-600/5 dark:bg-blue-400/5 p-8 rounded-[3rem] border border-blue-600/10"
                    >
                        <div className="w-full md:w-1/2">
                            <img src={barberImg} alt="Barber" className="w-full drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                {isRTL ? 'صالونات الحلاقة الرجالية' : "Men's Barbersalons"}
                            </h3>
                            <p className="text-almost-black/70 dark:text-cream/70 text-lg leading-relaxed">
                                {isRTL
                                    ? 'نعيما يدعم أيضاً الرجال الذين يبحثون عن حجز سريع ومريح لخدمات العناية الشخصية، بما في ذلك قص الشعر وتصفيف اللحية.'
                                    : 'Naeema also supports men who want quick and convenient booking for grooming services, including haircuts, beard styling, and personal care.'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Women's Salons */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col md:flex-row-reverse items-center gap-8 bg-pink-500/5 dark:bg-pink-400/5 p-8 rounded-[3rem] border border-pink-500/10"
                    >
                        <div className="w-full md:w-1/2">
                            <img src={stylistImg} alt="Stylist" className="w-full drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold text-pink-500 dark:text-pink-400 mb-4 text-right">
                                {isRTL ? 'الصالونات النسائية' : "Women's Salons"}
                            </h3>
                            <p className="text-almost-black/70 dark:text-cream/70 text-lg leading-relaxed text-right font-arabic">
                                {isRTL
                                    ? 'نعيما تخدم النساء اللواتي يبحثن عن وسيلة سهلة وموثوقة لحجز خدمات التجميل مثل تصفيف الشعر والمكياج والعناية بالبشرة.'
                                    : 'Naeema serves women looking for an easy and reliable way to book beauty services such as hair styling, makeup, skincare, and more.'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
