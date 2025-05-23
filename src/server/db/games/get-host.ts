import db from "../connection";


const SQL = `
  SELECT user_id 
  FROM game_users 
  WHERE game_id = $1 
    AND user_id != 0
  ORDER BY turn_order ASC 
  LIMIT 1
`;



export const getHost = async (gameId: number) => {
    const { user_id } = await db.one<{ user_id: number }>(SQL, [gameId]);

    return user_id;
}
