import { Request, Response, NextFunction } from 'express';
 
export function authenticated(request: Request, response: Response, next: NextFunction) {
    if (!request.user) {
        return response.status(401).send({ error: 'You must log in! '});
    }

    next();
}