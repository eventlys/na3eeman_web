import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Pricing section — mirrors Na3eeman backend Owner.subscription_tier tiers:
 * ARTISAN → STUDIO → ELITE → EMPIRE
 */
export const Pricing = () => {
    const { isRTL } = useLanguage();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const tiers = [
        {
            id: 'artisan',
            name: isRTL ? 'حِرَفي' : 'Artisan',
            subtitle: isRTL ? 'للعمل المستقل' : 'For solo practitioners',
            price: isRTL ? 'مجاني' : 'Free',
            period: '',
            color: 'from-teal-400 to-teal-600',
            badge: null,
            features: [
                isRTL ? '١ موظف قابل للحجز' : '1 bookable staff member',
                isRTL ? 'تقويم أساسي' : 'Basic calendar',
                isRTL ? 'قبول مدفوعات كاش' : 'Cash payment acceptance',
                isRTL ? 'ملفات عملاء' : 'Customer profiles',
                isRTL ? '٢٠ رسالة مجانية/شهر' : '20 free messages/month',
                isRTL ? 'دعم عبر البريد' : 'Email support',
            ],
            cta: isRTL ? 'ابدأ مجاناً' : 'Start Free',
        },
        {
            id: 'studio',
            name: isRTL ? 'ستوديو' : 'Studio',
            subtitle: isRTL ? 'لفرق صغيرة' : 'For small teams',
            price: isRTL ? '٢٩' : '29',
            period: isRTL ? 'JOD/شهر' : 'JOD/mo',
            color: 'from-blue-500 to-indigo-600',
            badge: null,
            features: [
                isRTL ? 'حتى ٦ موظفين' : 'Up to 6 staff members',
                isRTL ? 'تقويم متعدد الأعمدة' : 'Multi-column calendar',
                isRTL ? 'جميع طرق الدفع' : 'All payment methods',
                isRTL ? 'برنامج Loyalty' : 'Loyalty programme',
                isRTL ? 'حملات تسويقية' : 'Marketing campaigns',
                isRTL ? 'تصدير واستيراد البيانات' : 'Data export & import',
                isRTL ? 'دعم عبر الدردشة' : 'Chat support',
            ],
            cta: isRTL ? 'جرّب مجاناً ١٤ يوم' : '14-day Free Trial',
        },
        {
            id: 'elite',
            name: isRTL ? 'إليت' : 'Elite',
            subtitle: isRTL ? 'للمراكز الكبيرة' : 'For large wellness centres',
            price: isRTL ? '٥٩' : '59',
            period: isRTL ? 'JOD/شهر' : 'JOD/mo',
            color: 'from-violet-500 to-purple-700',
            badge: isRTL ? 'الأكثر شعبية' : 'Most Popular',
            features: [
                isRTL ? 'موظفون غير محدودين' : 'Unlimited staff',
                isRTL ? 'غرف وموارد متعددة' : 'Multiple rooms & resources',
                isRTL ? 'تحليلات متقدمة' : 'Advanced analytics',
                isRTL ? 'كشوف رواتب آلية' : 'Automated payroll',
                isRTL ? 'إدارة مخزون + تنبيهات' : 'Inventory + low-stock alerts',
                isRTL ? 'مساعد ذكاء اصطناعي' : 'AI Smart Insights',
                isRTL ? 'دعم هاتفي وبريد' : 'Phone & email support',
            ],
            cta: isRTL ? 'جرّب مجاناً ١٤ يوم' : '14-day Free Trial',
        },
        {
            id: 'empire',
            name: isRTL ? 'إمبراطورية' : 'Empire',
            subtitle: isRTL ? 'مؤسسات متعددة الفروع' : 'Multi-branch enterprises',
            price: isRTL ? 'تواصل معنا' : 'Contact Us',
            period: '',
            color: 'from-amber-500 to-orange-600',
            badge: null,
            features: [
                isRTL ? 'فروع غير محدودة' : 'Unlimited branches',
                isRTL ? 'لوحة تحكم مركزية' : 'Centralised HQ dashboard',
                isRTL ? 'تقارير مقارنة بين الفروع' : 'Cross-branch comparative reports',
                isRTL ? 'أتمنة واتساب متكاملة' : 'Full WhatsApp automation',
                isRTL ? 'API مخصص للتكامل' : 'Custom API integration',
                isRTL ? 'مدير حساب مخصص' : 'Dedicated account manager',
                isRTL ? 'SLA مضمون' : 'Guaranteed SLA',
            ],
            cta: isRTL ? 'تواصل مع المبيعات' : 'Contact Sales',
        },
    ];

    return (
        <section id="pricing" className="py-24 bg-white dark:bg-gray-950" ref={ref}>
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        {isRTL ? 'خطط تناسب كل محل' : 'Plans for Every Business'}
                    </h2>
                    <p className="section-subtitle max-w-2xl mx-auto">
                        {isRTL
                            ? 'ابدأ مجاناً وطوّر خطتك متى نمى محلك. بدون عمولة على أي حجز.'
                            : 'Start free and upgrade as your business grows. Zero commission on every booking.'}
                    </p>
                </motion.div>

                {/* Tier Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative rounded-3xl border ${
                                tier.badge
                                    ? 'border-violet-400 shadow-2xl shadow-violet-200 dark:shadow-violet-900/20 scale-105'
                                    : 'border-gray-200 dark:border-gray-700 shadow-md'
                            } bg-white dark:bg-gray-900 overflow-hidden`}
                        >
                            {/* Popular badge */}
                            {tier.badge && (
                                <div className={`absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-bold text-white bg-gradient-to-r ${tier.color}`}>
                                    {tier.badge}
                                </div>
                            )}

                            <div className={`p-6 ${tier.badge ? 'pt-10' : ''}`}>
                                {/* Tier Header */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${tier.color} mb-4`}>
                                    {tier.name}
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{tier.subtitle}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className={`text-4xl font-black bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                                        {tier.price}
                                    </span>
                                    {tier.period && (
                                        <span className="text-gray-400 text-sm ms-1">{tier.period}</span>
                                    )}
                                </div>

                                {/* CTA */}
                                <a
                                    href="#download"
                                    className={`block w-full py-3 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r ${tier.color} hover:opacity-90 transition-opacity mb-6 shadow-md`}
                                >
                                    {tier.cta}
                                </a>

                                {/* Features List */}
                                <ul className="space-y-3">
                                    {tier.features.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <svg className="w-4 h-4 mt-0.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="text-center text-sm text-gray-400 mt-10"
                >
                    {isRTL
                        ? '✦ جميع الأسعار حصرية لضريبة المبيعات المحلية. لا عمولة على الحجوزات.'
                        : '✦ All prices exclusive of local sales tax. Zero commission on bookings.'}
                </motion.p>
            </div>
        </section>
    );
};
