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

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

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
            <section className="py-24 bg-gray-50 dark:bg-gray-900 text-center">
                <p className="text-gray-400">{isRTL ? 'اختر صالوناً للحجز' : 'Select a salon to book'}</p>
            </section>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
            {/* Salon Header */}
            <div className="bg-gradient-to-br from-violet-600 to-blue-600 py-16 px-4 text-white text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black mb-2">
                        {salon?.salon_name || salonSlug}
                    </h1>
                    {salon?.location && (
                        <p className="text-white/70 text-sm">{salon.location}</p>
                    )}
                    {salon?.salon_rating && (
                        <div className="flex items-center justify-center gap-1 mt-2">
                            <span className="text-yellow-300">★</span>
                            <span className="text-sm font-semibold">{parseFloat(salon.salon_rating).toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Steps */}
            {step < 4 && (
                <div className="max-w-2xl mx-auto px-4 pt-8">
                    <div className="flex items-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-2 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    step >= s ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                }`}>{s}</div>
                                {s < 3 && (
                                    <div className={`h-0.5 flex-1 transition-all ${step > s ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto px-4">
                {/* Step 1: Choose Service */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'اختر الخدمة' : 'Choose a Service'}
                        </h2>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
                            </div>
                        ) : services.length === 0 ? (
                            // Fallback demo services
                            <div className="grid gap-3">
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
                            <div className="grid gap-3">
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
                            className="w-full mt-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 disabled:opacity-40 hover:opacity-90 transition-opacity shadow-lg"
                        >
                            {isRTL ? 'التالي — اختر الموعد' : 'Next — Pick Date & Time'}
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'اختر التاريخ والوقت' : 'Pick Date & Time'}
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {isRTL ? 'التاريخ' : 'Date'}
                            </label>
                            <input
                                type="date"
                                min={minDate}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
                            />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                {isRTL ? 'الوقت' : 'Time'}
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {timeSlots.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTime(t)}
                                        className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                                            selectedTime === t
                                                ? 'bg-violet-600 text-white shadow-md'
                                                : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 py-4 rounded-2xl font-bold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                            >
                                {isRTL ? 'رجوع' : 'Back'}
                            </button>
                            <button
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setStep(3)}
                                className="flex-2 w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 disabled:opacity-40"
                            >
                                {isRTL ? 'التالي — تأكيد' : 'Next — Confirm'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'بياناتك' : 'Your Details'}
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
                            <BookingSummary
                                service={selectedService}
                                date={selectedDate}
                                time={selectedTime}
                                isRTL={isRTL}
                            />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder={isRTL ? 'محمد أحمد' : 'John Doe'}
                                    className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                                </label>
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="+962 7X XXX XXXX"
                                    className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                        )}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(2)}
                                className="flex-1 py-4 rounded-2xl font-bold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                            >
                                {isRTL ? 'رجوع' : 'Back'}
                            </button>
                            <button
                                disabled={loading}
                                onClick={handleBook}
                                className="flex-2 w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 disabled:opacity-60"
                            >
                                {loading ? (isRTL ? 'جارٍ الحجز...' : 'Booking...') : (isRTL ? 'تأكيد الحجز' : 'Confirm Booking')}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                            {isRTL ? '✓ تم الحجز بنجاح!' : '✓ Booking Confirmed!'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                            {isRTL
                                ? `موعدك في ${salon?.salon_name || salonSlug} تم تأكيده.`
                                : `Your appointment at ${salon?.salon_name || salonSlug} is confirmed.`}
                        </p>
                        {selectedDate && selectedTime && (
                            <p className="text-violet-600 font-bold text-lg">
                                {selectedDate} at {selectedTime}
                            </p>
                        )}
                        <p className="text-gray-400 text-sm mt-4">
                            {isRTL
                                ? 'ستصلك رسالة تأكيد على هاتفك قريباً.'
                                : 'A confirmation message will be sent to your phone shortly.'}
                        </p>
                        <button
                            onClick={() => { setStep(1); setSelectedService(null); setSelectedDate(''); setSelectedTime(''); setCustomerName(''); setCustomerPhone(''); }}
                            className="mt-8 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600"
                        >
                            {isRTL ? 'حجز موعد آخر' : 'Book Another'}
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
        className={`w-full text-start p-4 rounded-2xl border-2 transition-all ${
            selected
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200'
        }`}
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="font-bold text-gray-900 dark:text-white">
                    {service.option_name}
                </p>
                {service.option_timing && (
                    <p className="text-xs text-gray-400 mt-0.5">~{service.option_timing} min</p>
                )}
            </div>
            <div className="flex items-center gap-3">
                <span className="font-black text-violet-600">{parseFloat(service.option_price || 0).toFixed(0)} JOD</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected ? 'border-violet-600 bg-violet-600' : 'border-gray-300'
                }`}>
                    {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
            </div>
        </div>
    </button>
);

const BookingSummary = ({ service, date, time, isRTL }) => (
    <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {isRTL ? 'ملخص الحجز' : 'Booking Summary'}
        </p>
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{isRTL ? 'الخدمة' : 'Service'}</span>
            <span className="font-bold">{service?.option_name}</span>
        </div>
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{isRTL ? 'التاريخ' : 'Date'}</span>
            <span className="font-bold">{date}</span>
        </div>
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{isRTL ? 'الوقت' : 'Time'}</span>
            <span className="font-bold">{time}</span>
        </div>
        <div className="flex justify-between text-sm border-t pt-3">
            <span className="font-bold">{isRTL ? 'الإجمالي' : 'Total'}</span>
            <span className="font-black text-violet-600">
                {parseFloat(service?.option_price || 0).toFixed(2)} JOD
            </span>
        </div>
    </div>
);
