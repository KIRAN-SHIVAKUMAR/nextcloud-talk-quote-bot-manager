
export interface NextcloudConfig {
    url: string;
    roomToken: string;
    botUser: string;
    botPassword: string;
}

export interface Quote {
    quote: string;
    author: string;
}

export interface ToastMessage {
    message: string;
    type: 'success' | 'error';
}

export enum QuoteCategory {
    MOTIVATIONAL = 'Motivational',
    FUNNY = 'Funny',
    INSPIRATIONAL = 'Inspirational',
    ZEN = 'Zen',
    TECH = 'Tech',
}
