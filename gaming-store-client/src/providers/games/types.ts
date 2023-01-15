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

export const beep = 8;
