import mongoose from "mongoose";
import { comment, game, user, adminInfo } from "../data/db-type";

export class dbController {
  static connection: mongoose.Connection;
  static commentModal: mongoose.Model<any, unknown, unknown, unknown, any>;
  static gameModal: mongoose.Model<any, unknown, unknown, unknown, any>;
  static userModal: mongoose.Model<any, unknown, unknown, unknown, any>;
  static adminInfoModal: mongoose.Model<any, unknown, unknown, unknown, any>;

  static connectToDB(dbHostname: string) {
    // Connecting to db
    mongoose.set("strictQuery", false);
    // mongoose.set('debug', true);
    mongoose.connect(dbHostname);
    dbController.connection = mongoose.connection;

    // Setting up the schemas and models
    const commentSchema = new mongoose.Schema(comment);
    const gameSchema = new mongoose.Schema(game);
    const userSchema = new mongoose.Schema(user);
    const adminInfoSchema = new mongoose.Schema(adminInfo);

    dbController.commentModal = mongoose.model("comments", commentSchema);
    dbController.gameModal = mongoose.model("games", gameSchema);
    dbController.userModal = mongoose.model("users", userSchema);
    dbController.adminInfoModal = mongoose.model("adminInfo", adminInfoSchema);

    // Initalize the admin info
    // dbController.initalizeAdminInfo().then();
  }

  static async initalizeAdminInfo() {
    const newInfo = new dbController.adminInfoModal({
      current_users: 0,
      earning: 0,
    });
    await newInfo.save();
  }

  static async insertComment(
    commentId: number,
    gameID: number,
    userID: Number,
    comment: String
  ) {
    const newComment = new dbController.commentModal({
      comment_id: commentId,
      game_id: gameID,
      user_id: userID,
      comment: comment,
      replays: [],
      likes: 0,
    });
    await newComment.save();
  }

  static async insertUser(
    userID: Number,
    profileName: String,
    profileDescription: String
  ) {
    const newUser = new dbController.userModal({
      user_id: userID,
      game_library: [],
      wish_list: [],
      in_cart: [],
      comments: [],
      ratings: 0,
      profile_name: profileName,
      profile_description: profileDescription,
    });
    await newUser.save();
  }

  static async insertGame(gameID: Number, price: Number, rating: Number) {
    const newGame = new dbController.gameModal({
      game_id: gameID,
      price: price,
      rating: rating,
      comments: [],
      how_many_bought: 0,
    });
    await newGame.save();
  }

  static async addCurrentUsers() {
    const currentInfo = await dbController.getAdminInfo();
    await dbController.commentModal.updateOne({
      current_users: currentInfo.current_users + 1,
    });
  }

  static async removeCurrentUsers() {
    const currentInfo = await dbController.getAdminInfo();
    let newCount;
    if (currentInfo.current_users <= 0) {
      newCount = 0;
    } else {
      newCount = currentInfo.current_users - 1;
    }
    await dbController.commentModal.updateOne({ current_users: newCount });
  }

  static async updateComment(
    commentID: number,
    update: any,
    isUpdateArray: boolean = false
  ) {
    if (isUpdateArray) {
      update = { $push: update };
    }
    await dbController.commentModal.updateOne(
      { comment_id: commentID },
      update
    );
  }

  static async updateUser(
    userID: number,
    update: any,
    isUpdateArray: boolean = false
  ) {
    if (isUpdateArray) {
      update = { $push: update };
    }
    await dbController.userModal.updateOne({ uesr_id: userID }, update);
  }

  static async updateGame(
    gameID: number,
    update: any,
    isUpdateArray: boolean = false
  ) {
    if (isUpdateArray) {
      update = { $push: update };
    }
    await dbController.gameModal.updateOne({ game_id: gameID }, update);
  }

  static getCommandInFormat(com: any) {
    return {
      _id: com._id,
      comment_id: com.comment_id,
      game_id: com.game_id,
      user_id: com.user_id,
      comment: com.comment,
      replays: com.replays,
      likes: com.likes,
    };
  }

  static getUserInFormat(us: any) {
    let usersComments: any[] = [];
    us.comments.forEach(function (c: any) {
      usersComments.push(dbController.getCommandInFormat(c));
    });
    return {
      _id: us._id,
      user_id: us.user_id,
      game_library: us.game_library,
      wish_list: us.wish_list,
      in_cart: us.in_cart,
      comments: usersComments,
      ratings: us.ratings,
      profile_name: us.profile_name,
      profile_description: us.profile_description,
    };
  }

  static getGameInFormat(gm: any) {
    let gamesComments: any[] = [];
    gm.comments.forEach(function (c: any) {
      gamesComments.push(dbController.getCommandInFormat(c));
    });
    return {
      _id: gm._id,
      game_id: gm.game_id,
      price: gm.price,
      rating: gm.rating,
      comments: gamesComments,
      how_many_bought: gm.how_many_bought,
    };
  }

  static async getAdminInfo(condition: {} = {}) {
    const adminInfoRaw = await dbController.adminInfoModal
      .find(condition)
      .exec()
      .then();
    return {
      current_users: adminInfoRaw[0].current_users,
      earning: adminInfoRaw[0].earning,
    };
  }

  static async getComments(condition: {} = {}) {
    const commentsRaw = await dbController.commentModal
      .find(condition)
      .exec()
      .then();
    let comments: any[] = [];
    commentsRaw.forEach(function (doc: any) {
      comments.push(dbController.getCommandInFormat(doc));
    });
    return comments;
  }

  static async getUsers(condition: {} = {}) {
    const usersRaw = await dbController.userModal.find(condition).exec().then();
    let users: any[] = [];
    usersRaw.forEach(function (doc: any) {
      users.push(dbController.getUserInFormat(doc));
    });
    return users;
  }

  static async getGames(condition: {} = {}) {
    const gamesRaw = await dbController.gameModal.find(condition).exec().then();
    let games: any[] = [];
    gamesRaw.forEach(function (doc: any) {
      games.push(dbController.getGameInFormat(doc));
    });
    return games;
  }

  static async deleteGame(gameId: number) {
    await dbController.gameModal.deleteOne({ game_id: gameId });
  }

  static async deleteComment(commentId: number) {
    await dbController.commentModal.deleteOne({ comment_id: commentId });
  }

  static async deleteUser(userId: number) {
    await dbController.userModal.deleteOne({ user_id: userId });
  }

  static async getHighestOfGames(condition: {}, limit: number = 1) {
    const gamesRaw = await dbController.gameModal
      .find()
      .sort(condition)
      .limit(limit);
    let games: any[] = [];
    gamesRaw.forEach(function (doc: any) {
      games.push(dbController.getGameInFormat(doc));
    });
    return games;
  }

  static async getHighestOfComments(condition: {}, limit: number = 1) {
    const commentsRaw = await dbController.commentModal
      .find()
      .sort(condition)
      .limit(limit);
    let comments: any[] = [];
    commentsRaw.forEach(function (doc: any) {
      comments.push(dbController.getCommandInFormat(doc));
    });
    return comments;
  }
}
