
import React from 'react';
import type { NextcloudConfig } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';

interface ConfigFormProps {
    config: NextcloudConfig;
    setConfig: React.Dispatch<React.SetStateAction<NextcloudConfig>>;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, setConfig }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prevConfig => ({
            ...prevConfig,
            [name]: value,
        }));
    };

    return (
        <Card>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Nextcloud Configuration</h2>
            <div className="space-y-4">
                <Input
                    label="Nextcloud URL"
                    name="url"
                    type="url"
                    placeholder="https://cloud.example.com"
                    value={config.url}
                    onChange={handleChange}
                />
                <Input
                    label="Talk Room Token"
                    name="roomToken"
                    type="text"
                    placeholder="abcdef123"
                    value={config.roomToken}
                    onChange={handleChange}
                />
                <Input
                    label="Bot Username"
                    name="botUser"
                    type="text"
                    placeholder="quote-bot"
                    value={config.botUser}
                    onChange={handleChange}
                />
                <Input
                    label="Bot Password / App Password"
                    name="botPassword"
                    type="password"
                    placeholder="••••••••••••"
                    value={config.botPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                <strong>CORS Warning:</strong> Browser-based requests may be blocked by your Nextcloud server's CORS policy. For this to work, your server must be configured to allow requests from this web app's origin.
            </div>
        </Card>
    );
};

export default ConfigForm;
