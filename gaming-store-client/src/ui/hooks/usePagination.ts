import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchFromUrl } from '../../providers';

const DISTANCE_FROM_BOTTOM = 100;

export function usePageination<T>(
    url: string,
    parseResult?: (value: any) => T,
    filterResult?: (result: T) => boolean,
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [results, setResults] = useState<T[]>([]);

    const nextUrl = useRef<string>('');
    const isDataFetched = useRef(false);

    const loadResults = useCallback(
        async (firstTime = false) => {
            if (!firstTime && !nextUrl.current) return;

            try {
                setIsLoading(true);
                const res = await fetchFromUrl<T>(firstTime ? url : nextUrl.current);
                setIsLoading(false);

                nextUrl.current = res.next;

                const parsedResults = parseResult ? res.results?.map(parseResult) : res.results;
                const filteredResults = filterResult
                    ? parsedResults?.filter(filterResult)
                    : parsedResults;

                setResults((prev) => [...prev, ...filteredResults]);
                setError(undefined);
            } catch (e) {
                console.error(e);
                setError('error has happend');
            }
        },
        [url, parseResult],
    );

    const onScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            const element = event.currentTarget;
            const isBottom =
                element.scrollHeight - element.scrollTop <=
                element.clientHeight + DISTANCE_FROM_BOTTOM;

            if (isBottom && !isLoading) loadResults();
        },
        [loadResults, isLoading],
    );

    useEffect(() => {
        if (!isDataFetched.current) loadResults(true);
        isDataFetched.current = true;
    }, []);

    return { isLoading, error, results, onScroll, loadMore: () => loadResults() };
}
