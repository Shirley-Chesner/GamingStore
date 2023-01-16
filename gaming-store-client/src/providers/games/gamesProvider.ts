import { parseToBaseGame, parseToGenre, parseToGenreDetails } from './gamesApiParses';

// TODO: move this to secure place
const API_KEY = 'd4687bc2b72c4bd281670ceae4e8c209';
const API_URL = 'https://api.rawg.io/api/';

const LIMIT = 30;

export function getGamesUrl(query: GameQuery = {}) {
    return getUrl('games', {
        page_size: LIMIT,
        ...query,
    });
}

export async function searchGames(tags = '', genres = '') {
    return getGames({
        page_size: LIMIT,
        ordering: '-added',
        tags,
        genres,
    });
}

export async function getGames(query: GameQuery = {}) {
    const res = await fetchFromUrl(getGamesUrl(query));
    return res.results ? res.results.map(parseToBaseGame) : [];
}

export async function getGenres(tags = false) {
    const res = await _fetch(tags ? 'tags' : 'genres', tags ? { page_size: 80 } : undefined);

    return res?.results ? res.results.map(parseToGenre) : [];
}

export async function getGenreDetails(id: number | string, isTag = false) {
    const res = await _fetch(`${isTag ? 'tags' : 'genres'}/${id}`);
    return res ? parseToGenreDetails(res) : undefined;
}

type Ordering = 'name' | 'released' | 'added' | 'created' | 'updated' | 'rating' | 'metacritic';

interface GameQuery {
    page?: number;
    page_size?: number;
    search?: string;
    search_exact?: string;
    metacritic?: string;
    ordering?: Ordering | `-${Ordering}`;
    tags?: string;
    genres?: string;
}

export interface ApiReturnType<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

type Prefix = 'games' | 'genres' | 'tags' | string;

async function _fetch<T>(prefix: Prefix, query?: GameQuery) {
    return await fetchFromUrl<T>(getUrl(prefix, query));
}

export function getUrl(prefix: Prefix, query?: GameQuery) {
    return `${API_URL}${prefix}?key=${API_KEY}${_queryToString(query)}`;
}

export async function fetchFromUrl<T>(url: string): Promise<ApiReturnType<T>> {
    try {
        const response = await fetch(url, {
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
        throw e;
    }
}

function _queryToString(query?: GameQuery): string {
    if (!query) return '';

    return Object.entries(query).reduce(
        (prev, [key, value]) => (value ? `${prev}&${key}=${value}` : prev),
        '',
    );
}
