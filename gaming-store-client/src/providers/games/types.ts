export interface BaseGame {
    idFromDB: number;
    comments: [];
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
    released: string;
    website: string;
    playtime: number;
    description: string;
    genres: Array<any>; // later
    tags: Array<any>;
    platforms: Array<any>;
    developers: Array<any>;
    publishers: Array<any>;
    esrbRating: string;
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
