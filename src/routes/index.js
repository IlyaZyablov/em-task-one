import express from 'express';
import usersRouter from './users/index.js';
import logRouter from './log/index.js';

const indexRouter = express.Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/log', logRouter);

export default indexRouter;
