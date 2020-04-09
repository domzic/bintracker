import TTNController, { mockUplink, Uplink } from './ttn.controller';
import Container from '../models/container.model';

const responseMock: Uplink[] = [
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
];
beforeEach(() => Container.prototype.save = jest.fn());

afterEach(() => jest.restoreAllMocks());

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
        ]);
    });

    describe('updateContainer', () => {

        it('should reject promise if container was not found', async done => {
            const uplinkMock = mockUplink();
            Container.findOne = jest.fn().mockReturnValue(undefined);

            try {
                await TTNController.updateContainer(uplinkMock);
            } catch (e) {
                done();
            }
        });

        it('should update container height if not set yet', async () => {
            const uplinkMock = mockUplink({ distance: '2.5' });
            Container.findOne = jest.fn().mockReturnValue(new Container({ height: 0 }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.height).toBe(2.5);
        });

        it('should update container height its smaller then new distance', async () => {
            const uplinkMock = mockUplink({ distance: '2.5' });
            Container.findOne = jest.fn().mockReturnValue(new Container({ height: 2 }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.height).toBe(2.5);
        });

        it('should increment times serviced count', async () => {
            const uplinkMock = mockUplink({ distance: '1.41' });
            Container.findOne = jest.fn().mockReturnValue(new Container({
                height: 2,
                level: 60,
                timesServiced: 5
            }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.timesServiced).toBe(6);
        });

        it('should NOT increment times serviced count', async () => {
            const uplinkMock = mockUplink({ distance: '1.39' });
            Container.findOne = jest.fn().mockReturnValue(new Container({
                height: 2,
                level: 60,
                timesServiced: 5
            }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.timesServiced).toBe(5);
        });

        it('should set new container level', async () => {
            const uplinkMock = mockUplink({ distance: '1.5' });
            Container.findOne = jest.fn().mockReturnValue(new Container({
                height: 2
            }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.level).toBe(75);
        });
    });

});
