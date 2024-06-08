import express from 'express';
import bodyParser from 'body-parser';
import indexRouter from './routes/index.js';
import databasePool from './database/index.js';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api', indexRouter);

const PORT = process.env.HTTP_PORT || 3000;

databasePool.query('SELECT NOW()', err => {
  if (err) {
    console.error('Ошибка подключение к базе данных!', err);
  } else {
    console.log('Подключение к базе данных успешно завершено!');

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  }
});
