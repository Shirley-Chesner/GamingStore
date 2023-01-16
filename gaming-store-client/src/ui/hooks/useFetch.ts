import { useCallback, useEffect, useRef, useState } from 'react';

export function useFetch<T>(getValue: () => Promise<T>, defaultValue: T) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [value, setValue] = useState(defaultValue);

    const isDataFetched = useRef(false);

    const loadResult = useCallback(async () => {
        try {
            setIsLoading(true);
            const result = await getValue();
            setIsLoading(false);

            setValue(result);
            setError(undefined);
        } catch (e) {
            console.error(e);
            setError('error when getting data');
        }
    }, [getValue]);

    useEffect(() => {
        if (!isDataFetched.current) loadResult();
        isDataFetched.current = true;
    }, []);

    return { value, setValue, refetch: loadResult, error, isLoading };
}
