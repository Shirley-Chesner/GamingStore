export interface BaseGame {
    id: number;
    name: string;
    imageUrl: string;
    rating: number;
    added: number;
    metacritic?: number;
}

// TODO: add more fields
export interface Game extends BaseGame {
    ratingsCount: number;
}

export interface Genre {
    id: number;
    name: string;
    imageUrl: string;
    gamesCount: number;
}

export const beep = 8;
