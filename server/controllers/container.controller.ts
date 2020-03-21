import { Request, Response } from 'express';
export const getContainers = (_: Request, res: Response) => {
    res.send([
        {
            id: 'S-001',
            latitude: 54.906646,
            longitude: 23.955046,
            level: 25
        },
        {
            id: 'S-002',
            latitude: 54.914361,
            longitude: 23.944826,
            level: 80
        },
        {
            id: 'S-003',
            latitude: 54.900076,
            longitude: 23.927305,
            level: 60
        }
    ]);
};
