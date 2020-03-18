import { Request, Response } from 'express';
export const getContainers = (_: Request, res: Response) => {
    res.send([
        {
            id: 'S-001',
            lat: 54.906646,
            lng: 23.955046,
            level: 25
        },
        {
            id: 'S-002',
            lat: 54.914361,
            lng: 23.944826,
            level: 80
        },
        {
            id: 'S-003',
            lat: 54.900076,
            lng: 23.927305,
            level: 60
        }
    ]);
};
