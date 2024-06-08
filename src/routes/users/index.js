import express from 'express';
import UserService from '../../services/users/index.js';

const usersRouter = express.Router();

// создание пользователя
usersRouter.post('/signup', async (request, response) => {
  try {
    const data = await UserService.create(request.body);

    response.json(data);
  } catch (e) {
    response.json({ result: 'error', error: String(e) });
  }
});

// изменение пользователя
usersRouter.post('/edit/:id', async (request, response) => {
  try {
    const data = await UserService.edit(request.params.id, request.body);

    response.json(data);
  } catch (e) {
    response.json({ result: 'error', error: String(e) });
  }
});

// получение списка пользователей
usersRouter.get('/', async (request, response) => {
  try {
    const data = await UserService.search(request.query);

    response.json(data);
  } catch (e) {
    response.json({ result: 'error', error: String(e) });
  }
});

export default usersRouter;
