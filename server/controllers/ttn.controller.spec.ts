import TTNController, {TTNResponse} from "./ttn.controller";

const responseMock: TTNResponse = {
    uplinks: [
        {
            device_id: 'bin-0001',
            distance: '1.32',
            time: '2020-04-08T19:26:16.246814367Z'
        },
        {
            device_id: 'bin-0001',
            distance: '3.82',
            time: '2020-04-08T19:26:39.780780849Z'
        },
        {
            device_id: 'bin-0001',
            distance: '0.26',
            time: '2020-04-08T19:38:45.538021588Z'
        },
        {
            device_id: 'bin-0001',
            distance: '4.00',
            time: '2020-04-08T19:38:57.526825842Z'
        },
        {
            device_id: 'bin-0002',
            distance: '1.00',
            time: '2020-04-08T19:39:13.939130154Z'
        },
        {
            device_id: 'bin-0002',
            distance: '1.74',
            time: '2020-04-08T19:39:23.950944319Z'
        }
    ]
};


describe('TTN data controller', () => {

    it('should properly parse latest uplinks from each device', () => {
        const uniqueUplinks = TTNController.parseLatestUplinks(responseMock);

        expect(uniqueUplinks.length).toBe(2);
        expect(uniqueUplinks).toStrictEqual([
            {
                device_id: 'bin-0002',
                distance: '1.74',
                time: '2020-04-08T19:39:23.950944319Z'
            },
            {
                device_id: 'bin-0001',
                distance: '4.00',
                time: '2020-04-08T19:38:57.526825842Z'
            }
        ])
    });
});
