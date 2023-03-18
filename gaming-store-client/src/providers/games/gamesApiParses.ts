import {
    GetGameFromDB,
    getGameScreemShots,
    getGameAchievements,
    getGameById,
    GetCommentFromDB,
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
        user: user,
    };
}

export async function parseToFullGame(game: any) {
    const updatedGame: any = await parseToGameWithPrice(game);
    const screenShots = await getGameScreemShots(game.id);
    const achievements = await getGameAchievements(game.id);

    const comments = [];
    for (let index = 0; index < updatedGame.comments.length; index++) {
        console.log(updatedGame.comments[index]);

        const comment: any = await GetCommentFromDB(updatedGame.comments[index]._id, '_id');
        if (comment.length !== 0) {
            const commentFromAPI: any = await parseComment(comment);
            comments.push(commentFromAPI);
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
    const gamesInCart = [];
    if (user && user.in_cart) {
        for (let index = 0; index < user.in_cart.length; index++) {
            const game: any = await GetGameFromDB(user.in_cart[index], '_id');
            if (game.length !== 0) {
                const gameFromAPI = await parseToFullGame(await getGameById(game[0].game_id));
                gamesInCart.push(gameFromAPI);
            }
        }
    }
    const gamesInLibrary = [];
    if (user && user.game_library) {
        for (let index = 0; index < user.game_library.length; index++) {
            const game: any = await GetGameFromDB(user.game_library[index], '_id');
            if (game.length !== 0) {
                const gameFromAPI = await parseToFullGame(await getGameById(game[0].game_id));
                gamesInLibrary.push(gameFromAPI);
            }
        }
    }

    return {
        userID: user.user_id,
        inCart: gamesInCart,
        gameLibrary: gamesInLibrary,
        comments: user.Comments,
    };
}

export async function parseToGameWithPrice(game: any): Promise<BaseGame> {
    const info: any = await GetGameFromDB(game.id);
    if (info.length != 0) {
        const a = { ...game, price: info[0].price };
        const b = { ...a, idFromDB: info[0]._id };
        return parseToBaseGame({ ...b, comments: info[0].comments });
    } else {
        const a = { ...game, price: Math.floor(Math.random() * 301) };
        const b = { ...a, idFromDB: '0' };
        return parseToBaseGame({ ...b, comments: [] });
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
