import mongoose from "mongoose";

export const comment = {
  comment_id: Number,
  game_id: Number,
  user_id: Number,
  comment: String,
  replays: Array<String>,
  likes: Number,
};

export const game = {
  game_id: Number,
  price: Number,
  rating: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  how_many_bought: Number,
};

export const user = {
  user_id: String,
  game_library: [{ type: mongoose.Schema.Types.ObjectId, ref: "game" }],
  wish_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "game" }],
  in_cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  comments: Array<{ type: mongoose.Schema.Types.ObjectId; ref: "comment" }>,
  ratings: Number,
  profile_name: String,
  profile_description: String,
  isOnline: Boolean,
};

export const adminInfo = {
  current_users: Number,
  earning: Number,
};
