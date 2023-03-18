export interface BaseGame {
    idFromDB: number;
    id: number;
    name: string;
    imageUrl: string;
    rating: number;
    added: number;
    metacritic?: number;
    price: number;
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

export interface GenreDetails extends Genre {
    description: string;
}

export const beep = 8;
