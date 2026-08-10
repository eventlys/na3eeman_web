import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Here you would typically parse the URL for tokens or wait for the mobile app to intercept.
        // If this page is reached in a desktop browser, you can handle the web login flow here.
        // For now, we will just show a success message or redirect.
        
        // Example: setTimeout(() => navigate('/'), 3000);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Successful</h2>
                <p className="text-gray-600 mb-4">You have successfully authenticated.</p>
                <p className="text-sm text-gray-500">If you are on a mobile device, this should open the app automatically.</p>
            </div>
        </div>
    );
}
