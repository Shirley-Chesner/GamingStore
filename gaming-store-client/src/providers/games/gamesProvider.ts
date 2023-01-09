import { parseToBaseGame } from './gamesApiParses';

// TODO: move this to secure place
const API_KEY = 'd4687bc2b72c4bd281670ceae4e8c209';
const API_URL = 'https://api.rawg.io/api/';

const LIMIT = 10;

export async function getGames() {
    const res = await _fetch('games', {
        page_size: LIMIT,
        ordering: '-added',
        metacritic: '80,100',
    });

    return res?.results ? res.results.map(parseToBaseGame) : [];
}

type Ordering = 'name' | 'released' | 'added' | 'created' | 'updated' | 'rating' | 'metacritic';

interface Query {
    page_size?: number;
    search?: string;
    search_exact?: string;
    metacritic?: string;
    ordering?: Ordering | `-${Ordering}`;
}

interface ApiReturnType<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export async function _fetch<T>(prefix: string, query: Query): Promise<ApiReturnType<T> | null> {
    try {
        const response = await fetch(`${API_URL}${prefix}?key=${API_KEY}${_queryToString(query)}`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw `not ok!! ${response.status}`;

        const json = await response.json();
        console.log('🚀 ~ file: gamesProvider.ts:38 ~ json', json);
        return json;
    } catch (e) {
        console.log('🚀 ~ file: gamesProvider.ts:15 ~ _fetch ~ e', e);
        return null;
    }
}

function _queryToString(query: Query): string {
    return Object.entries(query).reduce((prev, [key, value]) => `${prev}&${key}=${value}`, '');
}
