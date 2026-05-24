import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

// Asset Imports
import mobMale from '../assets/images/MOB_male.png';
import mobMaleFlip from '../assets/images/MOB_male_flip.png';
import mobFemale from '../assets/images/MOB_female.png';
import chMale from '../assets/images/CH_male.png';
import chFemale from '../assets/images/CH_female.png';

const characters = {
    mobMale,
    mobMaleFlip,
    mobFemale,
    chMale,
    chFemale,
};

export const SafeAnimatedCharacter = ({ 
    type = 'mobMale', 
    position = 'right', 
    className = '',
    delay = 0,
    inline = false
}) => {
    const { isRTL } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    const imgSrc = characters[type];
    const isChat = type.startsWith('ch');

    if (!imgSrc) return null;

    // Define animation variants
    const floatVariants = {
        hidden: { opacity: 0, y: 30 },
        idle: {
            opacity: 1,
            y: shouldReduceMotion ? 0 : [0, -20, 0],
            transition: {
                opacity: { duration: 0.8, delay: delay },
                y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }
            }
        },
        hover: {
            scale: 1.08,
            rotate: position === 'left' ? -3 : 3,
            transition: { duration: 0.3 }
        }
    };

    const chatVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        idle: {
            opacity: 1,
            scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
            y: shouldReduceMotion ? 0 : [0, -10, 0],
            transition: {
                opacity: { duration: 0.6, delay: delay },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay }
            }
        },
        hover: {
            scale: 1.15,
            y: -15,
            transition: { duration: 0.2, type: "spring", stiffness: 300 }
        }
    };

    // Determine actual position based on RTL layout
    let actualPosition = position;
    if (isRTL) {
        actualPosition = position === 'right' ? 'left' : 'right';
    }

    // Base positioning classes
    const basePositionClass = inline ? 'relative' : `hidden md:block absolute bottom-0 z-10 pointer-events-none ${actualPosition === 'right' ? 'right-[2vw] xl:right-[5vw]' : 'left-[2vw] xl:left-[5vw]'}`;

    return (
        <div className={`${basePositionClass} ${className}`}>
            <motion.div
                className="pointer-events-auto"
                variants={isChat ? chatVariants : floatVariants}
                initial="hidden"
                animate="idle"
                whileHover="hover"
            >
                <img 
                    src={imgSrc} 
                    alt={`Animated character ${type}`}
                    className={`
                        w-auto h-auto max-h-[350px] lg:max-h-[450px] max-w-[300px] lg:max-w-[400px] object-contain drop-shadow-2xl
                        ${isChat ? 'filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]' : ''}
                    `}
                    loading="lazy"
                />
            </motion.div>
        </div>
    );
};
