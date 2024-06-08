import pkg from 'bcryptjs';
import databasePool from '../../database/index.js';
import ValidatorService from '../validator/index.js';
import LogService from '../log/index.js';

const { hashSync, genSaltSync } = pkg;

export default class UserService {
  static async create(data) {
    const validateData = ValidatorService.check(data);

    if (validateData.result === 'error') {
      return validateData;
    }

    const {
      login, email, password, age,
    } = data;

    try {
      const sqlData = await databasePool.query('SELECT login FROM "users" WHERE (login = $1) OR (email = $2) LIMIT 1', [login, email]);

      if (sqlData.rowCount !== 0) {
        return { result: 'error', data: 'Пользователь с указанными логином или email уже существует!' };
      }

      const newUser = await databasePool.query(
        'INSERT INTO users (login, email, password, age) VALUES ($1, $2, $3, $4) RETURNING id',
        [String(login), String(email), hashSync(password, genSaltSync(3)), parseInt(age, 10)],
      );

      if (newUser.rowCount !== 0) {
        await LogService.create(newUser.rows[0].id, 'создание пользователя');
      }

      return { result: 'success', data: `Пользователь с логином ${login} успешно создан!` };
    } catch (error) {
      console.error(error);
      return { result: 'error', data: 'Произошла ошибка! Попробуйте снова.' };
    }
  }

  static async edit(userId, data) {
    const validateData = ValidatorService.check(data);

    if (validateData.result === 'error') {
      return validateData;
    }

    const {
      login, email, password, age,
    } = data;

    try {
      const sqlData = await databasePool.query('SELECT login FROM "users" WHERE id = $1 LIMIT 1', [String(userId)]);

      if (sqlData.rowCount === 0) {
        return { result: 'error', data: 'Пользователь не найден!' };
      }

      const existingUser = await databasePool.query('SELECT login FROM "users" WHERE (login = $1) OR (email = $2) LIMIT 1', [login, email]);

      if (existingUser.rowCount !== 0) {
        return { result: 'error', data: 'Пользователь с указанными логином или email уже существует!' };
      }

      const sqlUpdate = await databasePool.query(
        'UPDATE "users" SET login = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING id',
        [String(login), String(email), hashSync(password, genSaltSync(3)), parseInt(age, 10), String(userId)],
      );

      if (sqlUpdate.rowCount !== 0) {
        await LogService.create(sqlUpdate.rows[0].id, 'обновление пользователя');
      }

      return { result: 'success', data: 'Данные пользователя успешно обновлены!' };
    } catch (error) {
      console.error(error);
      return { result: 'error', data: 'Произошла ошибка! Попробуйте снова.' };
    }
  }

  static async search(searchData) {
    const { limit, offset } = searchData;

    try {
      const sqlData = await databasePool.query('SELECT login, email, age FROM "users" LIMIT $1 OFFSET $2', [limit ?? 5, offset ?? 0]);

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
