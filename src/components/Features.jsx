import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Full feature grid covering all Na3eeman capabilities —
 * expanded to match Fresha, Bodrah, and WAJ feature sets.
 */
export const Features = () => {
    const { t, isRTL } = useLanguage();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    const categories = [
        {
            label: isRTL ? 'الحجوزات والجدولة' : 'Bookings & Scheduling',
            color: 'from-blue-500 to-indigo-600',
            features: [
                {
                    icon: <CalendarIcon />,
                    title: isRTL ? 'تقويم ذكي' : 'Smart Calendar',
                    description: isRTL
                        ? 'عرض متعدد الأعمدة للموظفين وإدارة المواعيد لحظة بلحظة.'
                        : 'Multi-staff column calendar with real-time appointment management.',
                },
                {
                    icon: <BookIcon />,
                    title: isRTL ? 'حجز أونلاين 24/7' : 'Online Booking 24/7',
                    description: isRTL
                        ? 'يحجز عملاؤك في أي وقت بدون اتصال هاتفي.'
                        : 'Customers book at any time without a phone call.',
                },
                {
                    icon: <ClockIcon />,
                    title: isRTL ? 'ساعة العمل للموظفين' : 'Staff Time Clock',
                    description: isRTL
                        ? 'تتبع حضور الموظفين وساعات العمل تلقائياً.'
                        : 'Automatically track staff check-in and shift hours.',
                },
                {
                    icon: <RepeatIcon />,
                    title: isRTL ? 'مواعيد متكررة' : 'Recurring Appointments',
                    description: isRTL
                        ? 'اضبط مواعيد أسبوعية أو شهرية مع تذكيرات تلقائية.'
                        : 'Set weekly or monthly recurring bookings with auto-reminders.',
                },
                {
                    icon: <BranchIcon />,
                    title: isRTL ? 'إدارة فروع متعددة' : 'Multi-Branch Management',
                    description: isRTL
                        ? 'أدر جميع فروعك من لوحة تحكم واحدة.'
                        : 'Manage all branches from a single unified dashboard.',
                },
                {
                    icon: <PayIcon />,
                    title: isRTL ? 'إدارة المدفوعات' : 'Payments & POS',
                    description: isRTL
                        ? 'كاش، كليك، بطاقة، قسيمة — كل طرق الدفع في مكان واحد.'
                        : 'Cash, CliQ, card, voucher — all payment methods in one place.',
                },
            ],
        },
        {
            label: isRTL ? 'إدارة العملاء (CRM)' : 'Client Management (CRM)',
            color: 'from-pink-500 to-rose-600',
            features: [
                {
                    icon: <PersonIcon />,
                    title: isRTL ? 'ملفات العملاء' : 'Customer Profiles',
                    description: isRTL
                        ? 'تاريخ الزيارات والملاحظات والتفضيلات لكل عميل.'
                        : 'Visit history, notes, and preferences for each customer.',
                },
                {
                    icon: <StarIcon />,
                    title: isRTL ? 'برنامج Loyalty' : 'Loyalty Programme',
                    description: isRTL
                        ? 'نقاط مكافآت، قسائم مجانية ورسائل ترحيبية تلقائية.'
                        : 'Reward points, free vouchers and automated welcome messages.',
                },
                {
                    icon: <ReferralIcon />,
                    title: isRTL ? 'برنامج الإحالة' : 'Referral Programme',
                    description: isRTL
                        ? 'أكسب عملاء جدد عبر كود الإحالة لكل عميل.'
                        : 'Earn new customers through each client\'s referral code.',
                },
                {
                    icon: <MemberIcon />,
                    title: isRTL ? 'اشتراكات العملاء' : 'Customer Memberships',
                    description: isRTL
                        ? 'خطط شهرية أو نصف شهرية بمزايا حصرية.'
                        : 'Monthly or bi-weekly plans with exclusive member benefits.',
                },
                {
                    icon: <GiftIcon />,
                    title: isRTL ? 'بطاقات هدايا' : 'Gift Cards & Vouchers',
                    description: isRTL
                        ? 'أرسل تجربة حلاقة كهدية رقمية لأصدقائك.'
                        : 'Send a grooming experience as a digital gift to friends.',
                },
                {
                    icon: <FormIcon />,
                    title: isRTL ? 'استمارات العملاء' : 'Customer Intake Forms',
                    description: isRTL
                        ? 'جمع بيانات ما قبل الزيارة (حساسيات، تفضيلات…).'
                        : 'Collect pre-visit data (allergies, style preferences, etc.)',
                },
            ],
        },
        {
            label: isRTL ? 'عمليات الأعمال' : 'Business Operations',
            color: 'from-emerald-500 to-teal-600',
            features: [
                {
                    icon: <StaffIcon />,
                    title: isRTL ? 'إدارة الموظفين' : 'Staff Management',
                    description: isRTL
                        ? 'أداء الموظفين، التقييمات، المهام والجداول.'
                        : 'Staff performance, ratings, tasks and schedules.',
                },
                {
                    icon: <SalaryIcon />,
                    title: isRTL ? 'كشوف الرواتب' : 'Payroll Processing',
                    description: isRTL
                        ? 'احسب رواتب الموظفين والعمولات تلقائياً كل فترة.'
                        : 'Automatically compute salaries and commissions each period.',
                },
                {
                    icon: <InventoryIcon />,
                    title: isRTL ? 'إدارة المخزون' : 'Inventory Tracking',
                    description: isRTL
                        ? 'تتبع المنتجات والمواد مع تنبيهات النفاد.'
                        : 'Track products and supplies with low-stock alerts.',
                },
                {
                    icon: <ExpenseIcon />,
                    title: isRTL ? 'إدارة المصروفات' : 'Expense Management',
                    description: isRTL
                        ? 'سجل المصاريف اليومية وتتبع الربح الصافي.'
                        : 'Log daily expenses and track net profit over time.',
                },
                {
                    icon: <ExportIcon />,
                    title: isRTL ? 'تصدير واستيراد البيانات' : 'Data Export & Import',
                    description: isRTL
                        ? 'نسّخ احتياطية لبياناتك أو استعدها بنقرة واحدة (للمالك والمشارك فقط).'
                        : 'Back up or restore your data in one click (Owner & Co-Founder only).',
                },
                {
                    icon: <DisputeIcon />,
                    title: isRTL ? 'إدارة النزاعات' : 'Dispute Management',
                    description: isRTL
                        ? 'تتبع ومعالجة الشكاوى بين العملاء والمحل بشفافية.'
                        : 'Track and resolve customer-shop disputes transparently.',
                },
            ],
        },
        {
            label: isRTL ? 'التسويق والتحليل' : 'Marketing & Analytics',
            color: 'from-violet-500 to-purple-600',
            features: [
                {
                    icon: <ChartIcon />,
                    title: isRTL ? 'تحليلات فورية' : 'Real-Time Analytics',
                    description: isRTL
                        ? 'إيراداتك، خدماتك الأكثر طلباً، وأوقات الذروة بشكل بصري.'
                        : 'Revenue, top services, and peak hours visualised in real time.',
                },
                {
                    icon: <CampaignIcon />,
                    title: isRTL ? 'حملات التسويق' : 'Marketing Campaigns',
                    description: isRTL
                        ? 'أنشئ حملاتك الترويجية مع إشعارات تلقائية للعملاء.'
                        : 'Create promotional campaigns with automatic customer notifications.',
                },
                {
                    icon: <WhatsAppIcon />,
                    title: isRTL ? 'أتمنة واتساب' : 'WhatsApp Automation',
                    description: isRTL
                        ? 'تذكيرات وتأكيدات تلقائية عبر واتساب.'
                        : 'Automated reminders and confirmations via WhatsApp.',
                },
                {
                    icon: <AiIcon />,
                    title: isRTL ? 'مساعد ذكاء اصطناعي' : 'AI Smart Insights',
                    description: isRTL
                        ? 'توصيات أسبوعية لتحسين إيراداتك مشغولة بالذكاء الاصطناعي.'
                        : 'Weekly AI-powered tips to improve your business performance.',
                },
                {
                    icon: <OfferIcon />,
                    title: isRTL ? 'عروض وحزم الخدمات' : 'Offers & Service Packages',
                    description: isRTL
                        ? 'اجمع خدمات بسعر مخفوض وروّج لها بسرعة.'
                        : 'Bundle services at a discounted price and promote instantly.',
                },
                {
                    icon: <LangIcon />,
                    title: isRTL ? 'دعم ثنائي اللغة' : 'Arabic + English UI',
                    description: isRTL
                        ? 'واجهة كاملة بالعربي والإنجليزي مع دعم RTL.'
                        : 'Full Arabic and English interface with proper RTL support.',
                },
            ],
        },
    ];

    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900" ref={ref}>
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="section-title">
                        {isRTL ? 'كل ما تحتاجه لإدارة محلك' : 'Everything You Need to Run Your Business'}
                    </h2>
                    <p className="section-subtitle max-w-2xl mx-auto">
                        {isRTL
                            ? 'منصة متكاملة تضاهي Fresha و WAJ وتفوقها بميزات مصممة للسوق العربي.'
                            : 'An all-in-one platform that rivals Fresha & WAJ — with features built for the Arab market.'}
                    </p>
                </motion.div>

                {/* Category Sections */}
                {categories.map((cat, ci) => (
                    <div key={ci} className="mb-20">
                        {/* Category Label */}
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: ci * 0.1 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${cat.color}`} />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{cat.label}</h3>
                        </motion.div>

                        {/* Feature Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cat.features.map((feat, fi) => (
                                <motion.div
                                    key={fi}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: ci * 0.08 + fi * 0.07 }}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent hover:-translate-y-1"
                                >
                                    <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        {feat.icon}
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">{feat.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ─── Icon components (inline SVG, keeps bundle light) ────────────────────────
const ico = (path) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        {path}
    </svg>
);

const CalendarIcon  = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></>);
const BookIcon      = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></>);
const ClockIcon     = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></>);
const RepeatIcon    = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></>);
const BranchIcon    = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></>);
const PayIcon       = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></>);
const PersonIcon    = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></>);
const StarIcon      = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></>);
const ReferralIcon  = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></>);
const MemberIcon    = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></>);
const GiftIcon      = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></>);
const FormIcon      = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></>);
const StaffIcon     = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></>);
const SalaryIcon    = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></>);
const InventoryIcon = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></>);
const ExpenseIcon   = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></>);
const ExportIcon    = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></>);
const DisputeIcon   = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></>);
const ChartIcon     = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></>);
const CampaignIcon  = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></>);
const WhatsAppIcon  = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);
const AiIcon        = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></>);
const OfferIcon     = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></>);
const LangIcon      = () => ico(<><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></>);
