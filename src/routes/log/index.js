import express from 'express';
import LogService from '../../services/log/index.js';

const logRouter = express.Router();

// получение списка пользователей
logRouter.get('/:id', async (request, response) => {
  try {
    const data = await LogService.search(request.params.id, request.query);

    response.json(data);
  } catch (e) {
    response.json({ result: 'error', error: String(e) });
  }
});

export default logRouter;
