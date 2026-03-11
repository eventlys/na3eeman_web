import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
    const { t, isRTL, toggleLanguage, language } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: t.nav.features, href: '#features' },
        { label: t.nav.howItWorks, href: '#how-it-works' },
        { label: t.nav.download, href: '#download' },
        { label: t.nav.contact, href: '#contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-cream/95 dark:bg-almost-black/95 backdrop-blur-md shadow-md z-50 transition-colors duration-300">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-2xl font-bold">ن</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gradient">
                                {language === 'ar' ? 'نعيما' : 'Na3eeman'}
                            </h1>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-almost-black dark:text-cream hover:text-blue-600 dark:hover:text-pink-400 font-medium transition-colors duration-200"
                            >
                                {item.label}
                            </motion.a>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 bg-almost-black/5 dark:bg-cream/10 hover:bg-almost-black/10 dark:hover:bg-cream/20 rounded-lg transition-all duration-300"
                            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        >
                            {theme === 'light' ? (
                                <svg className="w-6 h-6 text-almost-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="px-4 py-2 bg-almost-black/5 dark:bg-cream/10 hover:bg-almost-black/10 dark:hover:bg-cream/20 rounded-lg font-bold text-blue-600 dark:text-pink-400 transition-all duration-300 flex items-center gap-2"
                        >
                            {language === 'ar' ? 'EN' : 'أ'}
                        </button>

                        {/* CTA Button */}
                        <a href="#download" className="btn-primary">
                            {t.hero.ctaDownload}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
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

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pb-4 mobile-menu-enter"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={toggleLanguage}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-primary-600 transition-all duration-300 text-center"
                            >
                                {language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                            </button>
                            <a href="#download" className="btn-primary text-center">
                                {t.hero.ctaDownload}
                            </a>
                        </div>
                    </motion.div>
                )}
            </nav>
        </header>
    );
};
