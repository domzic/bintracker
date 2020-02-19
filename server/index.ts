import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import companyRoutes from './routes/companyRoutes';

dotenv.config();
import "./config/passport";
import { logger } from './middlewares/logger';

mongoose.connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(logger);

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY as string]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

authRoutes(app);
companyRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.listen(port, () => {
    console.log('Server running on port ' + port);
});