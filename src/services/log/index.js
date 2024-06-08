import databasePool from '../../database/index.js';

export default class LogService {
  static async create(userId, action) {
    try {
      await databasePool.query(
        'INSERT INTO logs (userid, action, createdAt) VALUES ($1, $2, NOW())',
        [userId, action],
      );
    } catch (error) {
      console.error(error);
    }
  }

  static async search(userId, searchData) {
    const { limit, offset } = searchData;

    try {
      const sqlData = await databasePool.query('SELECT * FROM "logs" WHERE userId = $1 LIMIT $2 OFFSET $3', [userId, limit ?? 5, offset ?? 0]);

      if (sqlData.rowCount === 0) {
        return { result: 'success', data: [] };
      }

      return { result: 'success', data: sqlData.rows };
    } catch (error) {
      console.error(error);
      return { result: 'error', data: 'Произошла ошибка! Попробуйте снова.' };
    }
  }
}
