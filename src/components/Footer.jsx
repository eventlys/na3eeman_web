import { useLanguage } from '../hooks/useLanguage';
import { ThemeImage } from './ThemeImage';
export const Footer = () => {
    const { t, isRTL } = useLanguage();

    const footerLinks = [
        { label: isRTL ? 'للأعمال' : 'For Business', href: '/for-business' },
    ];

    const legalLinks = [
        { label: isRTL ? 'الشروط والأحكام للعملاء' : 'Customer Terms', href: `https://legal.n3eemn.com/${isRTL ? 'ar' : 'en'}/customers/terms` },
        { label: isRTL ? 'الشروط والأحكام للبائعين' : 'Vendor Terms', href: `https://legal.n3eemn.com/${isRTL ? 'ar' : 'en'}/vendors/terms` },
        { label: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy', href: `https://legal.n3eemn.com/${isRTL ? 'ar' : 'en'}/privacy` },
        { label: isRTL ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy', href: `https://legal.n3eemn.com/${isRTL ? 'ar' : 'en'}/cookies` },
        { label: isRTL ? 'سياسة الاسترداد والإلغاء' : 'Refund & Cancellation', href: `https://legal.n3eemn.com/${isRTL ? 'ar' : 'en'}/refunds` },
        { label: isRTL ? 'سياسة الاستخدام المقبول' : 'Acceptable Use', href: `https://legal.n3eemn.com/${isRTL ? 'ar' : 'en'}/acceptable-use` },
    ];

    const socialLinks = [
        { name: 'Instagram', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>, href: '#' },
        { name: 'Facebook', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>, href: '#' },
    ];

    return (
        <footer id="contact" className="bg-gray-50 dark:bg-[#050505] text-gray-800 dark:text-white py-16 transition-colors duration-300 relative border-t border-gray-200 dark:border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-violet-100/50 dark:from-violet-900/10 to-transparent pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-5 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-6">
                            <ThemeImage type="appName" className="h-14 md:h-20 object-contain dark:brightness-100 brightness-0" />
                        </div>
                        <p className="text-gray-600 dark:text-white/60 mb-8 max-w-md leading-relaxed font-medium">
                            {isRTL
                                ? 'تطبيق أردني للحلاقة بدون انتظار. احجز موعدك، اقطع شعرك، وادفع.'
                                : 'Jordanian app for haircuts without waiting. Book your appointment, get your haircut, and pay.'}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-12 h-12 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-violet-500/50 hover:bg-violet-100 dark:hover:bg-violet-600/20 text-gray-500 dark:text-white/60 hover:text-violet-600 dark:hover:text-violet-400 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/20"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                            {isRTL ? 'روابط سريعة' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-gray-600 dark:text-white/60 hover:text-violet-600 dark:hover:text-white transition-colors duration-200 font-medium">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                            {isRTL ? 'قانوني' : 'Legal'}
                        </h4>
                        <ul className="space-y-4">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-gray-600 dark:text-white/60 hover:text-violet-600 dark:hover:text-white transition-colors duration-200 font-medium">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            {isRTL ? 'المساعدة والدعم' : 'Support & Help'}
                        </h4>
                        <ul className="space-y-4 text-gray-600 dark:text-white/60 font-medium">
                            <li>
                                <a href="#" className="hover:text-violet-600 dark:hover:text-white transition-colors duration-200">
                                    {isRTL ? 'مركز المساعدة' : 'Help Center'}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-violet-600 dark:hover:text-white transition-colors duration-200">
                                    {isRTL ? 'الأسئلة الشائعة' : 'FAQs'}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-violet-600 dark:hover:text-white transition-colors duration-200">
                                    {isRTL ? 'الدعم الفني' : 'Contact Support'}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-white/40 font-medium">
                    <div>{t.footer.copyright}</div>
                </div>
            </div>
        </footer>
    );
};
