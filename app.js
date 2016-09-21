import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import authorization from './auth.js';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);

app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
