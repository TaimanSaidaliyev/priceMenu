import { useState } from 'react';

type FetchingCallback = () => Promise<void>;

export const useFetching = (callback: FetchingCallback): [FetchingCallback, boolean, string] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching: FetchingCallback = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};