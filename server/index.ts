import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import './config';
import routes from './routes';
import { logger } from './middlewares/logger';
import './controllers/passport.controller';

mongoose.connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = process.env.PORT || 5000;

const app = express();
app.use(logger)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY as string]
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors())
    .use('/api', routes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', process.env.MONGO_URI)
});
// TODO - Company - add ttnAppName, lastUpdateDate
