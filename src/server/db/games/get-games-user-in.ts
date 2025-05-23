import db from "../connection";

const SQL = `
SELECT games.* 
FROM games, game_users
WHERE games.id = game_users.game_id 
  AND game_users.user_id = $1
  AND games.game_has_ended = false
`;

export const getCurrentGames = async (userId: number) => {
  return db.any(SQL, [userId]);
};
