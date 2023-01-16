import { BaseGame, Genre } from './types';

export function parseToBaseGame(game: any): BaseGame {
    return {
        id: game.id,
        added: game.added,
        imageUrl: game.background_image,
        name: game.name,
        rating: game.rating,
        metacritic: game.metacritic,
    };
}

export function parseToGenre(genre: any): Genre {
    return {
        id: genre.id,
        imageUrl: genre.image_background,
        name: genre.name,
        gamesCount: genre.games_count,
    };
}
