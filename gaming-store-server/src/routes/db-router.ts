import { Request, Response, Router } from "express";
import { dbController } from "./../controllers/db-controller";
import { StatusCodes } from "http-status-codes";

export const dbRoute = Router();

dbRoute.get("/", (req: Request, res: Response) => {
  res.send("What's up doc ?!");
});

// Get info

dbRoute.get("/comments", (req: Request, res: Response) => {
  const param = req.query ? req.query : {};
  dbController.getComments(param).then((a) => {
    res.status(StatusCodes.OK);
    res.send(a);
  });
});

dbRoute.get("/games", (req: Request, res: Response) => {
  const param = req.query ? req.query : {};
  dbController.getGames(param).then((a) => {
    res.status(StatusCodes.OK);
    res.send(a);
  });
});

dbRoute.get("/users", (req: Request, res: Response) => {
  const param = req.query ? req.query : {};
  dbController.getUsers(param).then((a) => {
    res.status(StatusCodes.OK);
    res.send(a);
  });
});

// Add info

dbRoute.post("/comments", (req: Request, res: Response) => {
  const newComment = req.body;
  dbController
    .insertComment(
      newComment.commentId,
      newComment.gameID,
      newComment.userID,
      newComment.comment
    )
    .then(() => {
      res.status(StatusCodes.OK);
      res.send("A new comment was added!");
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error that comment was not added - ${e}`);
    });
});

dbRoute.post("/games", (req: Request, res: Response) => {
  const newGame = req.body;
  dbController
    .insertGame(newGame.gameID, newGame.price, newGame.rating)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send("A new game was added!");
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error that game was not added - ${e}`);
    });
});

dbRoute.post("/users", (req: Request, res: Response) => {
  const newUser = req.body;
  dbController
    .insertUser(newUser.userID, newUser.profileName, newUser.profileDescription)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send("A new user was added!");
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error that user was not added - ${e}`);
    });
});

// Delete info

dbRoute.delete("/comments/:id", (req: Request, res: Response) => {
  dbController
    .deleteComment(+req.params.id)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send(`The comment ${req.params.id} was deleted`);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error the comment was not deleted - ${e}`);
    });
});

dbRoute.delete("/users/:id", (req: Request, res: Response) => {
  dbController
    .deleteUser(+req.params.id)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send(`The user ${req.params.id} was deleted`);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error the user was not deleted - ${e}`);
    });
});

dbRoute.delete("/games/:id", (req: Request, res: Response) => {
  dbController
    .deleteGame(+req.params.id)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send(`The game ${req.params.id} was deleted`);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error the game was not deleted - ${e}`);
    });
});

// Update info

dbRoute.put("/comments/:id", (req: Request, res: Response) => {
  dbController
    .updateComment(+req.params.id, req.body.update, req.body.isArray)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send(`The comment ${req.params.id} was updated`);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error the comment was not updated - ${e}`);
    });
});

dbRoute.put("/games/:id", (req: Request, res: Response) => {
  dbController
    .updateGame(+req.params.id, req.body.update, req.body.isArray)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send(`The game ${req.params.id} was updated`);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error the game was not updated - ${e}`);
    });
});

dbRoute.put("/users/:id", (req: Request, res: Response) => {
  dbController
    .updateUser(+req.params.id, req.body.update, req.body.isArray)
    .then(() => {
      res.status(StatusCodes.OK);
      res.send(`The user ${req.params.id} was updated`);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(`Error! Due to an error the user was not updated - ${e}`);
    });
});
