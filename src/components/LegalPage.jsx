import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import docsData from '../assets/docs_data.json';

const LegalPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(docsData)[0]);
    const [selectedPage, setSelectedPage] = useState(
        docsData[selectedCategory] && typeof docsData[selectedCategory] === 'object' && !docsData[selectedCategory].main
            ? Object.keys(docsData[selectedCategory])[0]
            : 'main'
    );

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const categoryData = docsData[category];
        if (typeof categoryData === 'object' && !categoryData.main) {
             const firstKey = Object.keys(categoryData)[0];
             setSelectedPage(firstKey);
        } else {
             setSelectedPage('main');
        }
    };

    const handlePageClick = (page) => {
        setSelectedPage(page);
    };

    const renderMenu = () => {
        return (
            <div className="w-full md:w-1/4 bg-gray-50/50 dark:bg-white/5 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 overflow-y-auto backdrop-blur-md">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Legal & Information</h3>
                <ul className="space-y-2">
                    {Object.keys(docsData).map((category) => (
                        <li key={category} className="mb-2">
                            <button
                                className={`text-left w-full p-3 rounded-xl transition-all duration-200 font-medium ${selectedCategory === category ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10'}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.replace(/_/g, ' ')}
                            </button>
                            {selectedCategory === category && typeof docsData[category] === 'object' && (
                                <ul className="pl-4 mt-2 border-l-2 border-violet-200 dark:border-violet-900/30 ml-3 space-y-1">
                                    {Object.keys(docsData[category]).map((pageKey) => {
                                         if (pageKey === 'main') return null;
                                         
                                         return (
                                            <li key={pageKey} className="mb-1">
                                                <button
                                                    className={`text-left w-full p-2 text-sm rounded-lg transition-colors ${selectedPage === pageKey ? 'text-violet-600 dark:text-violet-400 font-bold bg-violet-50 dark:bg-violet-900/20' : 'text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-300 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                                                    onClick={() => handlePageClick(pageKey)}
                                                >
                                                    {pageKey.replace(/__/g, ' ').replace(/_/g, ' ')}
                                                </button>
                                            </li>
                                         );
                                    })}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderContent = () => {
        let content = '';
        const catData = docsData[selectedCategory];
        
        if (typeof catData === 'string') {
            content = catData;
        } else if (catData && typeof catData === 'object') {
            if (selectedPage === 'main' && catData['main']) {
                content = catData['main'];
            } else if (catData[selectedPage]) {
                 if (typeof catData[selectedPage] === 'string') {
                     content = catData[selectedPage];
                 } else if (catData[selectedPage]['main']) {
                     content = catData[selectedPage]['main'];
                 } else {
                     const firstSubKey = Object.keys(catData[selectedPage])[0];
                     content = catData[selectedPage][firstSubKey];
                 }
            } else {
                 const firstStringKey = Object.keys(catData).find(k => typeof catData[k] === 'string');
                 if (firstStringKey) content = catData[firstStringKey];
            }
        }

        return (
            <div className="w-full md:w-3/4 p-8 md:p-12 overflow-y-auto">
                <div className="prose prose-lg max-w-4xl prose-violet dark:prose-invert">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            <div className="container mx-auto px-4 h-[calc(100vh-8rem)]">
                <div className="flex flex-col md:flex-row h-full rounded-3xl shadow-xl bg-white/70 dark:bg-[#111111]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden">
                    {renderMenu()}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
