import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export const DynamicLegalPage = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Get the slug from the URL, e.g. /privacy-policy -> privacy-policy
                const slug = window.location.pathname.replace(/^\/|\/$/g, '');
                
                if (!slug) {
                    setContent('Welcome to Na3eeman Legal Documents. Please select a document.');
                    setTitle('Legal Documents');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://api.n3eemn.com/api/v1/content/legal-documents/${slug}/`);
                if (!response.ok) {
                    throw new Error('Document not found');
                }
                const data = await response.json();
                setContent(data.content);
                setTitle(data.title);
                document.title = `${data.title} - Na3eeman`;
            } catch (err) {
                setError('We could not load this legal document or it does not exist.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] flex justify-center">
                <div className="w-full max-w-4xl p-8 md:p-12 rounded-3xl shadow-xl bg-white/70 dark:bg-[#111111]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-12">
                            <h2 className="text-2xl font-bold mb-4">Error</h2>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-white/10">{title}</h1>
                            <div className="prose prose-lg max-w-none prose-violet dark:prose-invert">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
