import passport from 'passport';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], }));

router.get('/google/callback', passport.authenticate('google'), (_: Request, res: Response) => res.redirect('/dashboard'));

router.get('/logout', (req: Request, res: Response) => {
    req.logout();
    res.redirect('/');
});

router.get('/current_user', (req: Request, res: Response) => { res.send(req.user); });

export default router;
