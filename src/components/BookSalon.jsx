import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Per-salon public booking page — WAJ parity
 * Route: /book/:salonSlug (passed as prop by parent router logic)
 * 
 * For the current SPA (no router), this is rendered as a demo
 * when #book is in the URL hash. Add React Router for full routing.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const BookSalon = ({ salonSlug }) => {
    const { isRTL } = useLanguage();
    const [salon, setSalon] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [step, setStep] = useState(1); // 1: service, 2: datetime, 3: confirm, 4: success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Available time slots (generated UI-side for demo)
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
        '16:30', '17:00', '17:30', '18:00',
    ];

    // Get min date (today)
    const minDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (!salonSlug) return;
        setLoading(true);
        Promise.all([
            fetch(`${API_BASE}/salons/?search=${salonSlug}`).then(r => r.json()).catch(() => null),
            fetch(`${API_BASE}/salons/options/?salon_slug=${salonSlug}`).then(r => r.json()).catch(() => null),
        ]).then(([salonData, servicesData]) => {
            if (salonData?.results?.[0]) setSalon(salonData.results[0]);
            if (servicesData?.results) setServices(servicesData.results);
            else if (Array.isArray(servicesData)) setServices(servicesData);
        }).finally(() => setLoading(false));
    }, [salonSlug]);

    const handleBook = async () => {
        if (!selectedService || !selectedDate || !selectedTime || !customerName || !customerPhone) {
            setError(isRTL ? 'يرجى تعبئة جميع الحقول' : 'Please fill all fields');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/salons/public-booking/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    salon_slug: salonSlug,
                    service_id: selectedService.id,
                    date: selectedDate,
                    time: selectedTime,
                    customer_name: customerName,
                    customer_phone: customerPhone,
                }),
            });
            if (res.ok) {
                setStep(4);
            } else {
                const data = await res.json();
                setError(data.detail || (isRTL ? 'حدث خطأ' : 'An error occurred'));
            }
        } catch {
            setError(isRTL ? 'تعذّر الاتصال بالخادم' : 'Could not connect to server');
        } finally {
            setLoading(false);
        }
    };

    // ── Demo fallback when no slug provided ──────────────────────────────────
    if (!salonSlug) {
        return (
            <section className="py-24 bg-cream dark:bg-[#0a0a0a] text-center">
                <p className="text-gray-500 font-medium">{isRTL ? 'اختر صالوناً للحجز' : 'Select a salon to book'}</p>
            </section>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-[#0a0a0a] transition-colors duration-300 pb-20 relative">
            {/* Soft background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />

            {/* Salon Header */}
            <div className="relative pt-24 pb-16 px-4 text-center z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-300">
                        <svg className="w-10 h-10 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight">
                        {salon?.salon_name || salonSlug}
                    </h1>
                    {salon?.location && (
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{salon.location}</p>
                    )}
                    {salon?.salon_rating && (
                        <div className="flex items-center justify-center gap-1.5 mt-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-full px-4 py-1.5 w-max mx-auto shadow-sm">
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-white">{parseFloat(salon.salon_rating).toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Steps */}
            {step < 4 && (
                <div className="max-w-2xl mx-auto px-4 pt-4 relative z-10">
                    <div className="flex items-center gap-2 mb-10">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-3 flex-1">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm ${
                                    step >= s ? 'bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-violet-500/30' : 'bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-400 backdrop-blur-md'
                                }`}>{s}</div>
                                {s < 3 && (
                                    <div className="flex-1 h-1 rounded-full overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-sm relative">
                                         <div className={`absolute top-0 left-0 bottom-0 transition-all duration-500 bg-gradient-to-r from-violet-600 to-blue-600 ${step > s ? 'w-full' : 'w-0'}`} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto px-4 relative z-10">
                {/* Step 1: Choose Service */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {isRTL ? 'اختر الخدمة' : 'Choose a Service'}
                        </h2>
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto drop-shadow-md" />
                            </div>
                        ) : services.length === 0 ? (
                            // Fallback demo services
                            <div className="grid gap-4">
                                {[
                                    { id: 1, name: 'Haircut', price: '8.00', duration: 30 },
                                    { id: 2, name: 'Beard Trim', price: '5.00', duration: 20 },
                                    { id: 3, name: 'Fade', price: '12.00', duration: 45 },
                                    { id: 4, name: 'Full Package', price: '18.00', duration: 60 },
                                ].map((s) => (
                                    <ServiceCard
                                        key={s.id}
                                        service={{ ...s, option_name: s.name, option_price: s.price }}
                                        selected={selectedService?.id === s.id}
                                        onSelect={() => setSelectedService({ ...s, option_name: s.name, option_price: s.price })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {services.map((s) => (
                                    <ServiceCard
                                        key={s.id}
                                        service={s}
                                        selected={selectedService?.id === s.id}
                                        onSelect={() => setSelectedService(s)}
                                    />
                                ))}
                            </div>
                        )}
                        <button
                            disabled={!selectedService}
                            onClick={() => setStep(2)}
                            className="btn-primary w-full py-4 text-lg mt-8 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                            {isRTL ? 'التالي — اختر الموعد' : 'Next — Pick Date & Time'}
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {isRTL ? 'اختر التاريخ والوقت' : 'Pick Date & Time'}
                        </h2>
                        <div className="card backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/20 p-6 shadow-xl">
                            <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                                {isRTL ? 'التاريخ' : 'Date'}
                            </label>
                            <input
                                type="date"
                                min={minDate}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="input-premium w-full bg-white/50 dark:bg-white/5"
                            />
                        </div>
                        <div className="card backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/20 p-6 shadow-xl">
                            <label className="block text-sm font-bold mb-4 text-gray-700 dark:text-gray-300">
                                {isRTL ? 'الوقت' : 'Time'}
                            </label>
                            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                                {timeSlots.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTime(t)}
                                        className={`py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                                            selectedTime === t
                                                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 scale-105'
                                                : 'bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-md'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 py-4 rounded-2xl font-bold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
                            >
                                {isRTL ? 'رجوع' : 'Back'}
                            </button>
                            <button
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setStep(3)}
                                className="flex-2 w-full py-4 btn-primary disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
                            >
                                {isRTL ? 'التالي — تأكيد' : 'Next — Confirm'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {isRTL ? 'بياناتك' : 'Your Details'}
                        </h2>
                        <div className="card backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/20 p-6 shadow-xl">
                            <BookingSummary
                                service={selectedService}
                                date={selectedDate}
                                time={selectedTime}
                                isRTL={isRTL}
                            />
                        </div>
                        <div className="card backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/20 p-6 shadow-xl space-y-5">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder={isRTL ? 'محمد أحمد' : 'John Doe'}
                                    className="input-premium w-full bg-white/50 dark:bg-white/5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                                </label>
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="+962 7X XXX XXXX"
                                    className="input-premium w-full bg-white/50 dark:bg-white/5"
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 font-medium text-sm mb-3 text-center bg-red-50 dark:bg-red-900/20 py-3 rounded-xl border border-red-100 dark:border-red-900/50">{error}</p>
                        )}
                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setStep(2)}
                                className="flex-1 py-4 rounded-2xl font-bold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
                            >
                                {isRTL ? 'رجوع' : 'Back'}
                            </button>
                            <button
                                disabled={loading}
                                onClick={handleBook}
                                className="flex-2 w-full py-4 btn-primary disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none"
                            >
                                {loading ? (isRTL ? 'جارٍ الحجز...' : 'Booking...') : (isRTL ? 'تأكيد الحجز' : 'Confirm Booking')}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-center py-20 px-6 card backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/20 shadow-2xl"
                    >
                        <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                            <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                            {isRTL ? 'تم الحجز بنجاح!' : 'Booking Confirmed!'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                            {isRTL
                                ? `موعدك في ${salon?.salon_name || salonSlug} تم تأكيده.`
                                : `Your appointment at ${salon?.salon_name || salonSlug} is confirmed.`}
                        </p>
                        
                        {selectedDate && selectedTime && (
                            <div className="inline-block bg-white/60 dark:bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-black/5 dark:border-white/5 shadow-sm mb-6">
                                <p className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                    {selectedDate} • {selectedTime}
                                </p>
                            </div>
                        )}
                        
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2 font-medium">
                            {isRTL
                                ? 'ستصلك رسالة تأكيد على هاتفك قريباً.'
                                : 'A confirmation message will be sent to your phone shortly.'}
                        </p>
                        
                        <button
                            onClick={() => { setStep(1); setSelectedService(null); setSelectedDate(''); setSelectedTime(''); setCustomerName(''); setCustomerPhone(''); }}
                            className="mt-12 w-full py-4 btn-primary text-lg"
                        >
                            {isRTL ? 'حجز موعد آخر' : 'Book Another Appointment'}
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const ServiceCard = ({ service, selected, onSelect }) => (
    <button
        onClick={onSelect}
        className={`w-full text-start p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
            selected
                ? 'border-violet-400/50 shadow-lg shadow-violet-500/20 bg-white dark:bg-black/50'
                : 'border-white/20 dark:border-white/5 bg-white/50 dark:bg-black/30 backdrop-blur-md hover:shadow-md hover:-translate-y-1'
        }`}
    >
        {selected && (
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 pointer-events-none" />
        )}
        <div className="flex items-center justify-between relative z-10">
            <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {service.option_name}
                </p>
                {service.option_timing && (
                    <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.option_timing} min
                    </p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xl font-black bg-gradient-to-br from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    {parseFloat(service.option_price || 0).toFixed(0)} <span className="text-sm font-bold text-gray-400">JOD</span>
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    selected ? 'border-violet-600 bg-violet-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-violet-400'
                }`}>
                    {selected && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />}
                </div>
            </div>
        </div>
    </button>
);

const BookingSummary = ({ service, date, time, isRTL }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <p className="font-bold text-gray-900 dark:text-white tracking-wide">
                {isRTL ? 'ملخص الحجز' : 'Booking Summary'}
            </p>
        </div>
        
        <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{isRTL ? 'الخدمة' : 'Service'}</span>
                <span className="font-bold text-gray-900 dark:text-white">{service?.option_name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{isRTL ? 'التاريخ' : 'Date'}</span>
                <span className="font-bold text-gray-900 dark:text-white">{date}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{isRTL ? 'الوقت' : 'Time'}</span>
                <span className="font-bold text-gray-900 dark:text-white">{time}</span>
            </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 dark:border-white/10 pt-4 mt-2">
            <span className="font-bold text-gray-900 dark:text-white">{isRTL ? 'الإجمالي' : 'Total'}</span>
            <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                {parseFloat(service?.option_price || 0).toFixed(2)} <span className="text-sm font-bold text-gray-400 ml-1">JOD</span>
            </span>
        </div>
    </div>
);
