import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

// Pre-import all necessary assets to ensure they are available in Vite build
import logoLight from '../assets/images/LOGO_light.png';
import logoDark from '../assets/images/LOGO_dark.png';
import enLight from '../assets/images/EN_light.png';
import enDark from '../assets/images/EN_dark.png';
import arLight from '../assets/images/AR_light.png';
import arDark from '../assets/images/AR_dark.png';

const assetMap = {
    logo: {
        light: logoLight,
        dark: logoDark,
    },
    appName: {
        en: {
            light: enLight,
            dark: enDark,
        },
        ar: {
            light: arLight,
            dark: arDark,
        }
    }
};

export const ThemeImage = ({ type, className, alt, ...props }) => {
    const { theme } = useTheme();
    const { language } = useLanguage();

    let imageSrc = '';

    if (type === 'logo') {
        imageSrc = assetMap.logo[theme] || assetMap.logo.light;
    } else if (type === 'appName') {
        imageSrc = assetMap.appName[language]?.[theme] || assetMap.appName.en.light;
    }

    if (!imageSrc) return null;

    return (
        <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            src={imageSrc}
            className={className}
            alt={alt || type}
            {...props}
        />
    );
};
