import { GetGameFromDB, getGameScreemShots, getGameAchievements } from './gamesProvider';
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

export async function parseToFullGame(game: any) {
    console.log(game);
    const updatedGame = await parseToGameWithPrice(game);
    const screenShots = await getGameScreemShots(game.id);
    const achievements = await getGameAchievements(game.id);
    return {
        id: game.id,
        name: game.name,
        price: updatedGame.price,
        imageUrl: game.background_image ? game.background_image : game.imageUrl,
        rating: game.rating,
        genres: game.genres,
        description: game.description,
        released: game.released,
        playtime: game.playtime,
        screenShots: screenShots,
        achievements: achievements,
    };
}

export function parseToAchievements(game: any) {
    return {
        name: game.name,
        description: game.description,
        image: game.image,
        percent: game.percent,
    };
}

export function parseToScreenShot(game: any) {
    return {
        imageUrl: game.image,
        imageWidth: game.width,
        imageHeight: game.height,
        id: game.id,
        name: '',
    };
}

export async function parseToGameWithPrice(game: any): Promise<BaseGame> {
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
