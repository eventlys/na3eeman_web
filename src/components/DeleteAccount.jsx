import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const DeleteAccount = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Request, 2: Confirm OTP
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    
    // Check for Magic Link Token in URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            handleMagicLink(token);
        }
    }, [location]);

    const handleMagicLink = async (token) => {
        setIsLoading(true);
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.n3eemn.com/api/v1';
            const response = await fetch(`${baseUrl}/users/profile/delete/confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            
            if (response.ok) {
                setStatus({ type: 'success', message: 'Your account has been successfully deleted.' });
                setStep(3); // Success Screen
            } else {
                setStatus({ type: 'error', message: data.error || 'Invalid or expired magic link.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please try again later.' });
        }
        setIsLoading(false);
    };

    const handleRequest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.n3eemn.com/api/v1';
            const response = await fetch(`${baseUrl}/users/profile/delete/request/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Deletion request sent. Please check your email for the OTP.' });
                setStep(2);
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please try again later.' });
        }
        setIsLoading(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.n3eemn.com/api/v1';
            const response = await fetch(`${baseUrl}/users/profile/delete/confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Your account and associated data have been successfully deleted.' });
                setStep(3);
            } else {
                setStatus({ type: 'error', message: data.error || 'Invalid OTP. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please try again later.' });
        }
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-gray-900 transition-colors duration-300 pt-32 pb-24">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Account Deletion Request
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Na3eeman App (نعيمـاً) Data Privacy
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
                    
                    {/* Information Notice */}
                    <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                            What happens when you delete your account?
                        </h3>
                        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc pl-5 space-y-1">
                            <li>Your personal profile data will be permanently deleted.</li>
                            <li>Your active sessions will be terminated immediately.</li>
                            <li>Financial records and past booking history are anonymized and retained for 3 years to comply with local tax laws.</li>
                            <li>You will no longer be able to log in to the Na3eeman App.</li>
                        </ul>
                    </div>

                    {status.message && (
                        <div className={`mb-4 p-4 rounded-md text-sm ${status.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}>
                            {status.message}
                        </div>
                    )}

                    {step === 1 && (
                        <motion.form 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleRequest} 
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter your registered email"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'Processing...' : 'Request Deletion'}
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {step === 2 && (
                        <motion.form 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleConfirm} 
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirmation OTP
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter the 4-digit code sent to your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'Verifying...' : 'Permanently Delete Account'}
                                </button>
                            </div>
                            
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    Use a different email
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {step === 3 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Your account deletion request has been processed successfully. You may safely close this page.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
                            >
                                Return to Homepage
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    );
};
