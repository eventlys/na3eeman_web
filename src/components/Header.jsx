import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { ThemeImage } from './ThemeImage';

export const Header = () => {
    const { t, isRTL, toggleLanguage, language } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: t.nav.features, href: '/#features' },
        { label: isRTL ? 'للأعمال' : 'For Business', href: '/for-business' },

        // { label: t.nav.download, href: '/#download' },
        { label: t.nav.contact, href: '#contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 z-50 transition-colors duration-300">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <a href="/" className="flex items-center group">
                            <ThemeImage type="appName" className="h-12 md:h-16 object-contain dark:brightness-100 brightness-0 transition-transform duration-300 group-hover:scale-105" />
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6 bg-gray-100/50 dark:bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-black/5 dark:border-white/5">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-bold text-sm tracking-wide transition-colors duration-200"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-300 border border-transparent dark:border-white/5"
                                title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            >
                                {theme === 'light' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </svg>
                                )}
                            </button>

                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full font-black text-violet-600 dark:text-violet-400 transition-all duration-300 border border-transparent dark:border-white/5"
                            >
                                {language === 'ar' ? 'EN' : 'ع'}
                            </button>

                            {/* CTA Button
                            <a href="#download" className="btn-primary py-2.5 px-6 ml-2">
                                {t.hero.ctaDownload}
                            </a> */}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full text-gray-700 dark:text-gray-300"
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="w-10 h-10 flex items-center justify-center bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 overflow-hidden"
                        >
                            <div className="flex flex-col gap-2 p-4 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl">
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-colors duration-200 py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />
                                <button
                                    onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                                    className="py-3 px-4 text-start font-bold text-violet-600 dark:text-violet-400"
                                >
                                    {language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                                </button>
                                {/* <a href="#download" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center mt-2">
                                    {t.hero.ctaDownload}
                                </a> */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};
