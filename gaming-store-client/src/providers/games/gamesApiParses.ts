import { BaseGame } from './types';

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
