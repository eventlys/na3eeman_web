import { useState, useEffect } from 'react';

const translations = {
    ar: {
        // Header
        nav: {
            features: 'المزايا',
            howItWorks: 'كيف يعمل',
            download: 'تحميل',
            contact: 'اتصل بنا',
        },
        // Hero Section
        hero: {
            title: 'نعيما',
            subtitle: 'حجز الحلاقة صار أسهل',
            description: 'تطبيق أردني للحلاقة بدون انتظار. احجز، اقطع، ادفع كاش.',
            ctaDownload: 'حمل التطبيق',
            ctaBook: 'احجز الآن',
        },
        // Features
        features: {
            title: 'لماذا نعيما?',
            subtitle: 'مزايا مصممة خصيصاً للسوق الأردني',
            whatsapp: {
                title: 'تسجيل دخول بالواتساب',
                description: 'لا كلمات سر، لا رسائل بريد. فقط رقمك على الواتساب.',
            },
            cash: {
                title: 'الدفع كاش',
                description: 'لا بطاقات، لا محافظ إلكترونية. ادفع كاش بعد الخدمة.',
            },
            branches: {
                title: 'إدارة فروع متعددة',
                description: 'أدر جميع فروعك من تطبيق واحد بسهولة تامة.',
            },
            commission: {
                title: 'تتبع عمولات الموظفين',
                description: 'نظام عمولات تلقائي لكل حلاق حسب حجوزاته.',
            },
            ramadan: {
                title: 'ساعات رمضان',
                description: 'جدولة خاصة لساعات العمل في شهر رمضان المبارك.',
            },
            arabic: {
                title: 'واجهة عربية أولاً',
                description: 'مصمم بالعربي للأردنيين، ليس مترجم عن الإنجليزي.',
            },
        },
        // How It Works
        howItWorks: {
            title: 'كيف يعمل التطبيق؟',
            subtitle: 'ثلاث خطوات بسيطة للحجز',
            step1: {
                title: 'اختر المحل',
                description: 'ابحث عن صالونك المفضل في منطقتك',
            },
            step2: {
                title: 'احجز بالواتساب',
                description: 'أرسل طلب حجز مباشرة عبر الواتساب',
            },
            step3: {
                title: 'اقطع وادفع كاش',
                description: 'احضر للموعد وادفع نقداً بعد الخدمة',
            },
        },
        // Stats
        stats: {
            salons: 'محل',
            bookings: 'حجز شهرياً',
            satisfaction: 'رضا الزبائن',
        },
        // Testimonials
        testimonials: {
            title: 'آراء أصحاب المحلات',
            subtitle: 'اسمع من الحلاقين الأردنيين',
            testimonial1: {
                name: 'أبو محمد',
                salon: 'صالون الرجال',
                location: 'جبل الحسين',
                quote: 'زبائني زادوا 40% من أول أسبوع. التطبيق سهل والدعم ممتاز.',
            },
            testimonial2: {
                name: 'خالد العمري',
                salon: 'صالون النخبة',
                location: 'عبدون',
                quote: 'نظام العمولات وفر عليّ وقت كثير. كل شي واضح ومنظم.',
            },
            testimonial3: {
                name: 'محمود الشريف',
                salon: 'حلاقة الأصالة',
                location: 'وسط البلد',
                quote: 'الزبائن بحجزوا من خلال الواتساب وأنا بستقبلهم. راحة بال!',
            },
        },
        // Download Section
        download: {
            title: 'حمل التطبيق الآن',
            subtitle: 'متوفر على iOS و Android',
            scanQR: 'امسح رمز QR للتحميل',
            or: 'أو',
            whatsappLink: 'اضغط هنا للتحميل المباشر عبر الواتساب',
        },
        // Footer
        footer: {
            about: 'عن التطبيق',
            salonFeatures: 'مزايا المحلات',
            downloadApp: 'تحميل',
            contactUs: 'اتصل بنا',
            copyright: 'نعيما © 2026 — منصة أردنية 100%',
            tagline: 'صنع بحب في عمّان 🇯🇴',
        },
    },
    en: {
        // Header
        nav: {
            features: 'Features',
            howItWorks: 'How It Works',
            download: 'Download',
            contact: 'Contact Us',
        },
        // Hero Section
        hero: {
            title: 'Na3eeman',
            subtitle: 'Barber booking made simple',
            description: 'Jordanian app for haircuts without waiting. Book, cut, pay cash.',
            ctaDownload: 'Download App',
            ctaBook: 'Book Now',
        },
        // Features
        features: {
            title: 'Why Na3eeman?',
            subtitle: 'Features designed for the Jordanian market',
            whatsapp: {
                title: 'WhatsApp Login',
                description: 'No passwords, no emails. Just your WhatsApp number.',
            },
            cash: {
                title: 'Cash Payments',
                description: 'No cards, no e-wallets. Pay cash after service.',
            },
            branches: {
                title: 'Multi-Branch Management',
                description: 'Manage all your branches from one simple app.',
            },
            commission: {
                title: 'Staff Commission Tracking',
                description: 'Automatic commission system for each barber by bookings.',
            },
            ramadan: {
                title: 'Ramadan Hours',
                description: 'Special scheduling for Ramadan working hours.',
            },
            arabic: {
                title: 'Arabic-First UX',
                description: 'Designed in Arabic for Jordanians, not translated from English.',
            },
        },
        // How It Works
        howItWorks: {
            title: 'How It Works',
            subtitle: 'Three simple steps to book',
            step1: {
                title: 'Choose Salon',
                description: 'Find your favorite salon in your area',
            },
            step2: {
                title: 'Book via WhatsApp',
                description: 'Send booking request directly via WhatsApp',
            },
            step3: {
                title: 'Cut & Pay Cash',
                description: 'Attend your appointment and pay cash after service',
            },
        },
        // Stats
        stats: {
            salons: 'Salons',
            bookings: 'Monthly Bookings',
            satisfaction: 'Satisfaction',
        },
        // Testimonials
        testimonials: {
            title: 'Salon Owner Reviews',
            subtitle: 'Hear from Jordanian barbers',
            testimonial1: {
                name: 'Abu Mohammad',
                salon: "Men's Salon",
                location: 'Jabal Al-Hussein',
                quote: 'My customers increased 40% from the first week. Easy app, excellent support.',
            },
            testimonial2: {
                name: 'Khaled Al-Omari',
                salon: 'Elite Salon',
                location: 'Abdoun',
                quote: 'The commission system saved me a lot of time. Everything is clear and organized.',
            },
            testimonial3: {
                name: 'Mahmoud Al-Shareef',
                salon: 'Authenticity Barber',
                location: 'Downtown',
                quote: 'Customers book through WhatsApp and I receive them. Peace of mind!',
            },
        },
        // Download Section
        download: {
            title: 'Download Now',
            subtitle: 'Available on iOS & Android',
            scanQR: 'Scan QR code to download',
            or: 'Or',
            whatsappLink: 'Click here for direct WhatsApp download',
        },
        // Footer
        footer: {
            about: 'About',
            salonFeatures: 'Salon Features',
            downloadApp: 'Download',
            contactUs: 'Contact Us',
            copyright: 'Na3eeman © 2026 — 100% Jordanian Platform',
            tagline: 'Made with love in Amman 🇯🇴',
        },
    },
};

export const useLanguage = () => {
    const [language, setLanguage] = useState(() => {
        // Check localStorage first
        const savedLang = localStorage.getItem('language');
        if (savedLang) return savedLang;

        // Default to Arabic for Jordan market
        return 'ar';
    });

    useEffect(() => {
        // Update document direction and lang attribute
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('lang', language);
        htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

        // Save to localStorage
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const t = translations[language];
    const isRTL = language === 'ar';

    return { language, toggleLanguage, t, isRTL };
};
