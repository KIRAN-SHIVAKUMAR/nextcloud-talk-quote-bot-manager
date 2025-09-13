
import React, { useState } from 'react';
import type { Quote } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CustomQuotesManagerProps {
    quotes: Quote[];
    onAddQuote: (quote: Quote) => void;
    onDeleteQuote: (index: number) => void;
    onSelectQuote: (quote: Quote) => void;
}

const CustomQuotesManager: React.FC<CustomQuotesManagerProps> = ({ quotes, onAddQuote, onDeleteQuote, onSelectQuote }) => {
    const [newQuote, setNewQuote] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    const handleAdd = () => {
        if (newQuote.trim() && newAuthor.trim()) {
            onAddQuote({ quote: newQuote, author: newAuthor });
            setNewQuote('');
            setNewAuthor('');
        }
    };

    return (
        <Card>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Custom Quotes</h2>
            <div className="space-y-3 mb-4">
                <Input
                    label="Quote"
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="The best way to predict the future is to invent it."
                />
                <Input
                    label="Author"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Alan Kay"
                />
                <Button onClick={handleAdd} disabled={!newQuote.trim() || !newAuthor.trim()} className="w-full">
                    <PlusIcon />
                    Add Custom Quote
                </Button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {quotes.length === 0 ? (
                     <p className="text-slate-500 text-center py-4">No custom quotes yet.</p>
                ) : (
                    quotes.map((q, index) => (
                        <div key={index} className="group flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                            <div className="flex-grow cursor-pointer" onClick={() => onSelectQuote(q)}>
                                <p className="text-slate-200 italic">"{q.quote}"</p>
                                <p className="text-sm text-slate-400 mt-1">- {q.author}</p>
                            </div>
                            <button
                                onClick={() => onDeleteQuote(index)}
                                className="ml-4 p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-red-900/50"
                                aria-label="Delete quote"
                            >
                               <TrashIcon />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default CustomQuotesManager;
