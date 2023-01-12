import mongoose from "mongoose";
import { comment, game, user } from "../data/db-type";

export class dbController {

    static connection: mongoose.Connection;
    static commentModal: mongoose.Model<any, unknown, unknown, unknown, any>;
    static gameModal: mongoose.Model<any, unknown, unknown, unknown, any>;
    static userModal: mongoose.Model<any, unknown, unknown, unknown, any>;

    static connectToDB(dbHostname: string) {
        mongoose.set('strictQuery', false);
        // mongoose.set('debug', true);
        mongoose.connect(dbHostname);
        dbController.connection = mongoose.connection;

        const commentSchema = new mongoose.Schema(comment);
        const gameSchema = new mongoose.Schema(game);
        const userSchema = new mongoose.Schema(user);
        
        dbController.commentModal = mongoose.model('comments', commentSchema);
        dbController.gameModal = mongoose.model('games', gameSchema);
        dbController.userModal = mongoose.model('users', userSchema);
    }

    static async insertComment(commentId: number, gameID: number, userID: Number, comment: String, replays: String[], likes: Number) {
        const newComment = new dbController.commentModal({ 
            id: commentId,
            game_id: gameID,
            user_id: userID,
            comment: comment,
            replays: replays,
            likes: likes });
        await newComment.save();
    }

    static async insertUser(userID: Number, profileName: String, profileDescription: String) {
        const newUser = new dbController.userModal({  
            id: userID,
            game_library: [],
            wish_list: [],
            in_cart: [],
            comments: [],
            ratings: Number,
            profile_name: profileName,
            profile_description: profileDescription });
        await newUser.save();
    }

    static async insertGame(gameID: Number, price: Number) {
        const newGame = new dbController.gameModal({ 
            id: gameID,
            price: price,
            rating: 0,
            comments: [],
            how_many_bought: 0});
        await newGame.save();
    }

    static updateComment(commentID: number, update: any ) {
        dbController.commentModal.updateOne({id: commentID}, update);
    }

    static updateUser(userID: number, update: any ) {
        dbController.userModal.updateOne({id: userID}, update);
    }

    static updateGame(gameID: number, update: any ) {
        dbController.gameModal.updateOne({id: gameID}, update);
    }

    static getCommandInFormat(com: any) {
        return {
            id: com.id,
            game_id: com.game_id,
            user_id: com.user_id,
            comment: com.comment,
            replays: com.replays,
            likes: com.likes
        }
    }

    static async getAllComments() {
        const commentsRaw = await dbController.commentModal.find({}).exec().then();
        let comments: any[] = [];
        commentsRaw.forEach(function(doc: any) {
            comments.push(dbController.getCommandInFormat(doc))
        })
        return comments;
    }

    static async getAllUsers() {
        const usersRaw = await dbController.userModal.find({}).exec().then();
        let users: any[] = [];
        usersRaw.forEach(function(doc: any) {
            let usersComments: any[] = [];
            doc.comments.forEach(function(c: any) {
                usersComments.push(dbController.getCommandInFormat(c))
            })
            users.push({
                id: doc.id,
                game_library: doc.game_library,
                wish_list: doc.wish_list,
                in_cart: doc.in_cart,
                comments: usersComments,
                ratings: doc.ratings,
                profile_name: doc.profile_name,
                profile_description: doc.profile_description
            })
        })
        return users;
    }

    static async getAllGames() {
        const gamesRaw = await dbController.gameModal.find({}).exec().then();
        let games: any[] = [];
        gamesRaw.forEach(function(doc: any) {
            let gamesComments: any[] = [];
            doc.comments.forEach(function(c: any) {
                gamesComments.push(dbController.getCommandInFormat(c))
            })
            games.push({
                id: doc.id,
                price: doc.price,
                rating: doc.rating,
                comments: gamesComments,
                how_many_bought: doc.how_many_bought
            })
        })
        return games;
    }

    static findComment(condition: {}) {
        return dbController.commentModal.find(condition);
    }

    static findUser(condition: {}) {
        return dbController.userModal.find(condition);
    }

    static findGame(condition: {}) {
        return dbController.gameModal.find(condition);
    }

    static deleteGame(gameId: number) {
        dbController.gameModal.deleteOne({id: gameId});
    }

    static deleteComment(commentId: number) {
        dbController.commentModal.deleteOne({id: commentId});
    }

    static deleteUser(userId: number) {
        dbController.userModal.deleteOne({id: userId});
    }
}


