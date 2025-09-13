
import React from 'react';
import type { Quote, QuoteCategory } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Select from './ui/Select';
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';

interface QuoteDisplayProps {
    quote: Quote | null;
    isLoading: boolean;
    isPosting: boolean;
    category: QuoteCategory;
    setCategory: (category: QuoteCategory) => void;
    onGenerate: () => void;
    onPost: () => void;
    categories: QuoteCategory[];
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
    quote,
    isLoading,
    isPosting,
    category,
    setCategory,
    onGenerate,
    onPost,
    categories
}) => {
    return (
        <Card>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Quote Generator & Poster</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as QuoteCategory)}
                    className="flex-grow"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Select>
                <Button onClick={onGenerate} disabled={isLoading} className="sm:w-auto w-full">
                    <SparklesIcon />
                    {isLoading ? 'Generating...' : 'Generate Quote'}
                </Button>
            </div>

            <div className="min-h-[150px] bg-slate-800/50 p-6 rounded-lg flex items-center justify-center text-center transition-all duration-300">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-2">
                         <div className="w-8 h-8 border-4 border-slate-500 border-t-indigo-400 rounded-full animate-spin"></div>
                         <span className="text-slate-400">Generating with Gemini...</span>
                    </div>
                ) : quote ? (
                    <blockquote className="space-y-4">
                        <p className="text-xl md:text-2xl font-medium text-white italic">"{quote.quote}"</p>
                        <footer className="text-slate-400">— {quote.author}</footer>
                    </blockquote>
                ) : (
                    <p className="text-slate-500">Your generated quote will appear here.</p>
                )}
            </div>

            <div className="mt-6">
                <Button
                    onClick={onPost}
                    disabled={!quote || isPosting}
                    className="w-full"
                    variant="primary"
                >
                    <SendIcon/>
                    {isPosting ? 'Posting...' : 'Post to Nextcloud Talk'}
                </Button>
            </div>
        </Card>
    );
};

export default QuoteDisplay;
