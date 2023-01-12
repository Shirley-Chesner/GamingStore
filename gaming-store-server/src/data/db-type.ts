export const comment ={
    id: Number,
    game_id: Number,
    user_id: Number,
    comment: String,
    replays: Array<String>,
    likes: Number
  };

export const game = {
    id: Number,
    price: Number,
    rating: Number,
    comments: {
        type: Array,
        ref: 'comment'
    },
    how_many_bought: Number
  };

export const user = {
    id: Number,
    game_library: Array<Number>,
    wish_list: Array<Number>,
    in_cart: Array<Number>,
    comments: {
        type: Array,
        ref: 'comment'
    },
    ratings: Number,
    profile_name: String,
    profile_description: String
}