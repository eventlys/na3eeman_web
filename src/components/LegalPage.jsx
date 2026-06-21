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
             // It's a directory without a main file directly inside (like Legal/Privacy_Policy)
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
            <div className="w-1/4 bg-gray-50 p-4 border-r overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">Legal & Information</h3>
                <ul>
                    {Object.keys(docsData).map((category) => (
                        <li key={category} className="mb-2">
                            <button
                                className={`text-left w-full p-2 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.replace(/_/g, ' ')}
                            </button>
                            {selectedCategory === category && typeof docsData[category] === 'object' && (
                                <ul className="pl-4 mt-2 border-l border-gray-300">
                                    {Object.keys(docsData[category]).map((pageKey) => {
                                         // Don't show 'main' in sublist if it's the only thing or if it represents the category itself
                                         if (pageKey === 'main') return null;
                                         
                                         return (
                                            <li key={pageKey} className="mb-1">
                                                <button
                                                    className={`text-left w-full p-1 text-sm rounded ${selectedPage === pageKey ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
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
                     // For nested objects like Legal -> Privacy_Policy -> introduction
                     // This simple viewer might just flatten it or show the first subpage
                     const firstSubKey = Object.keys(catData[selectedPage])[0];
                     content = catData[selectedPage][firstSubKey];
                 }
            } else {
                 // Try to render the first string we find
                 const firstStringKey = Object.keys(catData).find(k => typeof catData[k] === 'string');
                 if (firstStringKey) content = catData[firstStringKey];
            }
        }

        return (
            <div className="w-3/4 p-8 overflow-y-auto">
                <div className="prose max-w-none prose-blue">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto flex h-[80vh] mt-8 mb-8 border rounded shadow-sm bg-white">
            {renderMenu()}
            {renderContent()}
        </div>
    );
};

export default LegalPage;
