import { Request, Response, NextFunction } from 'express';
 
export function logger(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} --> ${request.path}`);
    next();
}