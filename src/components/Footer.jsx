import { useLanguage } from '../hooks/useLanguage';
import logoImg from '../assets/images/logo icon paig metal.png';

export const Footer = () => {
    const { t, isRTL } = useLanguage();

    const footerLinks = [
        { label: t.footer.about, href: '#about' },
        { label: t.footer.shopFeatures, href: '#features' },
        { label: t.footer.downloadApp, href: '#download' },
        { label: t.footer.contactUs, href: '#contact' },
    ];

    const socialLinks = [
        { name: 'Instagram', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>, href: '#' },
        { name: 'Facebook', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>, href: '#' },
    ];

    return (
        <footer id="contact" className="bg-almost-black text-cream py-16 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src={logoImg} alt="Na3eeman" className="w-12 h-12 object-contain" />
                            <h3 className="text-2xl font-bold text-gradient">
                                {isRTL ? 'نعيما' : 'Na3eeman'}
                            </h3>
                        </div>
                        <p className="text-cream/60 mb-8 max-w-md leading-relaxed">
                            {isRTL
                                ? 'تطبيق أردني للحلاقة بدون انتظار. احجز موعدك، اقطع شعرك، وادفع كاش.'
                                : 'Jordanian app for haircuts without waiting. Book your appointment, get your haircut, and pay cash.'}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-12 h-12 bg-cream/10 hover:bg-pink-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-pink-400">
                            {isRTL ? 'روابط سريعة' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-cream/60 hover:text-blue-400 transition-colors duration-200">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-blue-400">
                            {isRTL ? 'تواصل معنا' : 'Contact Us'}
                        </h4>
                        <ul className="space-y-4 text-cream/60">
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                <span dir="ltr">info@na3eeman.jo</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                <span dir="ltr">+962 6 XXX XXXX</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/40">
                    <div>{t.footer.copyright}</div>
                    <div className="flex items-center gap-2">
                        <span>Made with</span>
                        <span className="text-pink-500">❤️</span>
                        <span>in Jordan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
