import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { HOSTNAME, PORT } from './config';
import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(json());
app.use(routes);

app.listen(PORT, () => console.log(`Running at ${HOSTNAME}:${PORT}`));
