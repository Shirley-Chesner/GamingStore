import mongoose from "mongoose";

export const comment = {
  game_id: Number,
  user_id: String,
  comment: String,
  replays: Array<String>,
  likes: Array<String>,
};

export const game = {
  game_id: Number,
  price: Number,
  rating: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  how_many_bought: Number,
};

export const user = {
  user_id: String,
  game_library: [{ type: mongoose.Schema.Types.ObjectId, ref: "games" }],
  wish_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "games" }],
  in_cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  comments: Array<{ type: mongoose.Schema.Types.ObjectId; ref: "comments" }>,
  ratings: Number,
  profile_name: String,
  profile_description: String,
  isOnline: Boolean,
};

export const adminInfo = {
  current_users: Number,
  earning: Number,
};
