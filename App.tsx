
import React, { useState, useCallback, useEffect } from 'react';
import { generateQuote } from './services/geminiService';
import { postToNextcloud } from './services/nextcloudService';
import type { NextcloudConfig, Quote, ToastMessage } from './types';
import { QuoteCategory } from './types';
import ConfigForm from './components/ConfigForm';
import QuoteDisplay from './components/QuoteDisplay';
import CustomQuotesManager from './components/CustomQuotesManager';
import { QUOTE_CATEGORIES } from './constants';

const App: React.FC = () => {
    const [config, setConfig] = useState<NextcloudConfig>({
        url: '',
        roomToken: '',
        botUser: '',
        botPassword: '',
    });
    const [customQuotes, setCustomQuotes] = useState<Quote[]>([]);
    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [toast, setToast] = useState<ToastMessage | null>(null);
    const [category, setCategory] = useState<QuoteCategory>(QuoteCategory.MOTIVATIONAL);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);
    
    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
    };

    const handleGenerateQuote = useCallback(async () => {
        setIsLoading(true);
        setCurrentQuote(null);
        try {
            const quote = await generateQuote(category);
            setCurrentQuote(quote);
        } catch (error) {
            console.error('Failed to generate quote:', error);
            showToast(error instanceof Error ? error.message : 'Failed to generate quote. Check console for details.', 'error');
        } finally {
            setIsLoading(false);
        }
    }, [category]);

    const handlePostQuote = useCallback(async () => {
        if (!currentQuote) {
            showToast('No quote selected or generated to post.', 'error');
            return;
        }
        if (!config.url || !config.roomToken || !config.botUser || !config.botPassword) {
            showToast('Nextcloud configuration is incomplete.', 'error');
            return;
        }

        setIsPosting(true);
        try {
            const message = `"${currentQuote.quote}" - ${currentQuote.author}`;
            await postToNextcloud(config, message);
            showToast('Quote posted successfully to Nextcloud Talk!', 'success');
        } catch (error) {
            console.error('Failed to post to Nextcloud:', error);
            showToast(error instanceof Error ? error.message : 'Failed to post quote. Check console for details.', 'error');
        } finally {
            setIsPosting(false);
        }
    }, [currentQuote, config]);

    const addCustomQuote = (quote: Quote) => {
        setCustomQuotes(prev => [...prev, quote]);
        showToast('Custom quote added!', 'success');
    };

    const deleteCustomQuote = (index: number) => {
        setCustomQuotes(prev => prev.filter((_, i) => i !== index));
        showToast('Custom quote deleted.', 'success');
    };
    
    const selectCustomQuote = (quote: Quote) => {
        setCurrentQuote(quote);
        showToast('Custom quote selected.', 'success');
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Nextcloud Talk <span className="text-indigo-400">Quote Bot</span> Manager
                    </h1>
                    <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                        Generate AI-powered quotes or use your own, then post them directly to your Talk room.
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <ConfigForm config={config} setConfig={setConfig} />
                        <CustomQuotesManager
                            quotes={customQuotes}
                            onAddQuote={addCustomQuote}
                            onDeleteQuote={deleteCustomQuote}
                            onSelectQuote={selectCustomQuote}
                        />
                    </div>
                    <div className="lg:col-span-3">
                         <QuoteDisplay
                            quote={currentQuote}
                            isLoading={isLoading}
                            isPosting={isPosting}
                            category={category}
                            setCategory={setCategory}
                            onGenerate={handleGenerateQuote}
                            onPost={handlePostQuote}
                            categories={QUOTE_CATEGORIES}
                        />
                    </div>
                </main>
            </div>
            
            {toast && (
                <div 
                    className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl text-white font-semibold transition-transform transform ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                    role="alert"
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default App;
