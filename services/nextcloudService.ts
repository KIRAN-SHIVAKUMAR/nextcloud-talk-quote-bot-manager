
import type { NextcloudConfig } from '../types';

export const postToNextcloud = async (config: NextcloudConfig, message: string): Promise<void> => {
    const { url, roomToken, botUser, botPassword } = config;
    
    // Normalize URL to ensure it doesn't have a trailing slash
    const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;

    const endpoint = `${normalizedUrl}/ocs/v2.php/apps/spreed/api/v1/chat/${roomToken}`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('OCS-APIRequest', 'true');
    
    // Create Basic Auth header
    const credentials = btoa(`${botUser}:${botPassword}`);
    headers.append('Authorization', `Basic ${credentials}`);
    
    const body = JSON.stringify({
        message: message,
    });

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            let errorDetails = `HTTP error! status: ${response.status}`;
            try {
                const errorJson = await response.json();
                errorDetails += ` - ${errorJson?.ocs?.meta?.message || 'No details provided.'}`;
            } catch (e) {
                // Could not parse error JSON
            }
            throw new Error(errorDetails);
        }
    } catch (error) {
        console.error('Nextcloud API request failed:', error);
        if (error instanceof TypeError) { // Likely a CORS or network error
             throw new Error("Network request failed. This might be a CORS issue. Please ensure your Nextcloud server is configured to accept requests from this origin.");
        }
        throw error; // Re-throw other errors
    }
};
