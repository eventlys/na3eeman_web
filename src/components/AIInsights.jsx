import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';
import { SafeAnimatedCharacter } from './SafeAnimatedCharacter';

/**
 * AI Smart Insights section — WAJ parity
 * Showcases the AI assistant feature with animated demo insights.
 */
export const AIInsights = () => {
    const { isRTL } = useLanguage();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const insights = [
        {
            icon: '📈',
            priority: 'high',
            color: 'from-violet-500 to-purple-600',
            bg: 'bg-violet-50 dark:bg-violet-900/10',
            border: 'border-violet-200 dark:border-violet-800',
            titleEn: 'Peak Hours Spike',
            titleAr: 'ارتفاع ساعات الذروة',
            bodyEn: 'Thursdays between 5–7 PM generate 34% more revenue than Mondays. Consider adding an extra expert shift.',
            bodyAr: 'تولّد أيام الخميس من 5–7 مساءً إيرادات أعلى بنسبة 34٪ مقارنةً بالاثنين. فكّر في إضافة وردية حلاق إضافية.',
        },
        {
            icon: '✂️',
            priority: 'medium',
            color: 'from-blue-500 to-indigo-600',
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            border: 'border-blue-200 dark:border-blue-800',
            titleEn: 'Bundle Opportunity',
            titleAr: 'فرصة حزمة خدمات',
            bodyEn: '62% of customers who book a haircut add a beard trim. Create a "Classic Combo" bundle at a 10% discount.',
            bodyAr: '62٪ من العملاء الذين يحجزون قصة شعر يضيفون تشذيب اللحية. أنشئ حزمة "الكلاسيك كومبو" بخصم 10٪.',
        },
        {
            icon: '⭐',
            priority: 'low',
            color: 'from-amber-500 to-orange-600',
            bg: 'bg-amber-50 dark:bg-amber-900/10',
            border: 'border-amber-200 dark:border-amber-800',
            titleEn: 'Rating Alert',
            titleAr: 'تنبيه التقييم',
            bodyEn: 'Ahmad\'s average rating dropped from 4.8 to 4.3 this week. Reviewing recent feedback is recommended.',
            bodyAr: 'انخفض متوسط تقييم أحمد من 4.8 إلى 4.3 هذا الأسبوع. يُنصح بمراجعة التعليقات الأخيرة.',
        },
        {
            icon: '💡',
            priority: 'medium',
            color: 'from-emerald-500 to-teal-600',
            bg: 'bg-emerald-50 dark:bg-emerald-900/10',
            border: 'border-emerald-200 dark:border-emerald-800',
            titleEn: 'Loyalty Opportunity',
            titleAr: 'فرصة برنامج المكافآت',
            bodyEn: '18 customers are 1 appointment away from a free haircut. A push notification could convert them this week.',
            bodyAr: '18 عميلاً على بُعد موعد واحد من قصة شعر مجانية. إشعار سريع قد يحوّلهم هذا الأسبوع.',
        },
    ];

    const priorityLabel = (p) => {
        if (p === 'high') return { label: isRTL ? 'عالي' : 'High', cls: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
        if (p === 'medium') return { label: isRTL ? 'متوسط' : 'Medium', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' };
        return { label: isRTL ? 'منخفض' : 'Low', cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
    };

    return (
        <section id="ai" className="py-24 bg-white dark:bg-gray-950" ref={ref}>
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold mb-6">
                        <span>✦</span>
                        <span>{isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Insights'}</span>
                    </div>
                    <h2 className="section-title">
                        {isRTL ? 'مساعدك الذكي لتطوير أعمالك' : 'Your AI Business Intelligence Assistant'}
                    </h2>
                    <p className="section-subtitle max-w-2xl mx-auto">
                        {isRTL
                            ? 'Na3eeman يحلّل بيانات محلك كل أسبوع ويقترح توصيات قابلة للتنفيذ — مثل WAJ AI Assistant، لكن بفهم أعمق للسوق العربي.'
                            : 'Na3eeman analyses your salon data weekly and delivers actionable recommendations — like WAJ\'s AI Assistant, but built for the Arab market.'}
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center relative">
                    {/* Chat Character for AI insights */}
                    <SafeAnimatedCharacter type="chFemale" position="right" className="!bottom-auto top-0 -right-10 lg:-right-20 xl:-right-32 scale-75 lg:scale-100 opacity-50 xl:opacity-100 -z-10" />
                    {/* Left: Insight Cards */}
                    <div className="space-y-4">
                        {insights.map((insight, i) => {
                            const { label, cls } = priorityLabel(insight.priority);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`${insight.bg} ${insight.border} border rounded-2xl p-5 flex gap-4 items-start group hover:shadow-md transition-shadow`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center text-xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                                        {insight.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                                                {isRTL ? insight.titleAr : insight.titleEn}
                                            </h4>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {isRTL ? insight.bodyAr : insight.bodyEn}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Feature bullets */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-10 text-white shadow-2xl">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-3">
                                {isRTL ? 'AI يعمل 24/7 لك' : 'AI Working 24/7 For You'}
                            </h3>
                            <p className="text-white/80 mb-8 leading-relaxed">
                                {isRTL
                                    ? 'كل أسبوع تحصل على 3–5 توصيات ذكية مبنية على بيانات محلك الحقيقية — لا تقارير عامة.'
                                    : 'Every week you receive 3–5 smart recommendations built from your real salon data — not generic reports.'}
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { en: 'Revenue trend analysis', ar: 'تحليل اتجاهات الإيراد' },
                                    { en: 'Staff performance scoring', ar: 'تقييم أداء الموظفين' },
                                    { en: 'Peak hour detection', ar: 'رصد ساعات الذروة' },
                                    { en: 'Churn risk alerts', ar: 'تنبيهات خطر فقدان العملاء' },
                                    { en: 'Bundle & upsell opportunities', ar: 'فرص الحزم والبيع الإضافي' },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-white/90 text-sm font-medium">
                                            {isRTL ? item.ar : item.en}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
