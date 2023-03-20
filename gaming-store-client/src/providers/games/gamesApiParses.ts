import {
    GetGameFromDB,
    getGameScreemShots,
    getGameAchievements,
    getUserFromDB,
} from './gamesProvider';
import { BaseGame, Genre, GenreDetails } from './types';

export function parseToBaseGame(game: any): BaseGame {
    return {
        idFromDB: game.idFromDB ? game.idFromDB : 0,
        comments: game.comments ? game.comments : [],
        id: game.id,
        added: game.added,
        imageUrl: game.background_image ? game.background_image : game.imageUrl,
        name: game.name,
        rating: game.rating,
        price: game.price,
        metacritic: game.metacritic,
    };
}

export async function parseComment(comment: any) {
    const user = await getUserFromDB(comment.user_id);

    return {
        commentID: comment._id,
        content: comment.comment,
        replays: comment.replays,
        likes: comment.likes,
        userName: user.profile_name,
        userID: comment.user_id,
    };
}

export async function parseToFullGame(game: any) {
    const updatedGame: any = await parseToGameWithPrice(game);
    const screenShots = await getGameScreemShots(game.id);
    const achievements = await getGameAchievements(game.id);

    const comments = [];
    for (let index = 0; index < updatedGame.comments.length; index++) {
        if (updatedGame.comments[index].length != 0) {
            const parsedComment = await parseComment(updatedGame.comments[index]);
            comments.push(parsedComment);
        }
    }

    return {
        idFromDB: updatedGame.idFromDB,
        comments: comments,
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

export async function parseToUser(user: any) {
    return {
        userID: user.user_id,
        inCart: user.in_cart,
        gameLibrary: user.game_library,
        comments: user.comments,
    };
}

export async function parseToGameWithPrice(game: any): Promise<BaseGame> {
    const info: any = await GetGameFromDB(game.id);
    if (info.length != 0) {
        return parseToBaseGame({
            ...game,
            comments: info[0].comments,
            price: info[0].price,
            idFromDB: info[0]._id,
        });
    } else {
        return parseToBaseGame({
            ...game,
            comments: [],
            price: Math.floor(Math.random() * 301),
            idFromDB: 0,
        });
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
