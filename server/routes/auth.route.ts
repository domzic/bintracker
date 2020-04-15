import passport from 'passport';
import express, { Request, Response } from 'express';
import { VerifyCallback } from 'passport-google-oauth20';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, callback => {
    console.log('callback', callback);
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin?authorized=false' }),
    (_: Request, res: Response) => res.redirect('/dashboard'));

router.get('/logout', (req: Request, res: Response) => {
    req.logout();
    res.redirect('/');
});

router.get('/current_user', (req: Request, res: Response) => { res.send(req.user); });

export default router;
