import { GetCommentFromDB } from '../../providers';

export const AddNewCommentToDB = async (content: string, gameID: number, userID: string) => {
    console.log('hey', content, gameID, userID);

    await fetch(`http://localhost:1234/comment`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameID: gameID, userID: userID, comment: content }),
    });
};

export const connectCommentToGameAndUser = async (gameID: number, userID: string) => {
    const res: any = await GetCommentFromDB(gameID, 'game_id');
    console.log(res);

    const allCommentsIDs: any = [];
    res.forEach((element: any) => {
        allCommentsIDs.push(element._id);
    });
    await fetch(`http://localhost:1234/game/${gameID}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            update: { comments: allCommentsIDs },
            isArray: true,
        }),
    });
    await fetch(`http://localhost:1234/user/${userID}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            update: { comments: allCommentsIDs },
            isArray: true,
        }),
    });
};
