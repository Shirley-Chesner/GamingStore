import { GetGameFromDB } from './gamesProvider';
import { BaseGame, Genre, GenreDetails } from './types';

export function parseToBaseGame(game: any): BaseGame {
    return {
        id: game.id,
        added: game.added,
        imageUrl: game.background_image ? game.background_image : game.imageUrl,
        name: game.name,
        rating: game.rating,
        price: game.price,
        metacritic: game.metacritic,
    };
}

export async function parseToFullGame(game: any): Promise<BaseGame> {
    const info: any = await GetGameFromDB(game.id);
    if (info.length != 0) {
        return parseToBaseGame({ ...game, price: info[0].price });
    } else {
        return parseToBaseGame({ ...game, price: Math.floor(Math.random() * 301) });
    }
}

export function parseToGenre(genre: any): Genre {
    return {
        id: genre.id,
        imageUrl: genre.image_background,
        name: genre.name,
        gamesCount: genre.games_count,
    };
}

export function parseToGenreDetails(genre: any): GenreDetails {
    return {
        ...parseToGenre(genre),
        description: genre.description,
    };
}
