import TTNController, { mockUplink, Uplink } from './ttn.controller';
import Container from '../models/container.model';
import Stat from '../models/stat.model';

const responseMock: Uplink[] = [
    {
        device_id: 'bin-0001',
        distance: 132,
        time: '2020-04-08T19:26:16.246814367Z'
    },
    {
        device_id: 'bin-0001',
        distance: 382,
        time: '2020-04-08T19:26:39.780780849Z'
    },
    {
        device_id: 'bin-0001',
        distance: 26,
        time: '2020-04-08T19:38:45.538021588Z'
    },
    {
        device_id: 'bin-0001',
        distance: 400,
        time: '2020-04-08T19:38:57.526825842Z'
    },
    {
        device_id: 'bin-0002',
        distance: 100,
        time: '2020-04-08T19:39:13.939130154Z'
    },
    {
        device_id: 'bin-0002',
        distance: 174,
        time: '2020-04-08T19:39:23.950944319Z'
    }
];
beforeEach(() => {
    Container.prototype.save = jest.fn();
    Stat.prototype.create = jest.fn();
    Stat.prototype.save = jest.fn();
});

afterEach(() => jest.restoreAllMocks());

describe('TTN data controller', () => {

    it('should properly parse latest uplinks from each device', () => {
        const uniqueUplinks = TTNController.parseLatestUplinks(responseMock);

        expect(uniqueUplinks.length).toBe(2);
        expect(uniqueUplinks).toStrictEqual([
            {
                device_id: 'bin-0002',
                distance: 174,
                time: '2020-04-08T19:39:23.950944319Z'
            },
            {
                device_id: 'bin-0001',
                distance: 400,
                time: '2020-04-08T19:38:57.526825842Z'
            }
        ]);
    });

    describe('updateContainer', () => {

        it('should reject promise if container was not found', async done => {
            const uplinkMock = mockUplink();
            Container.findOne = jest.fn().mockReturnValue(undefined);
            Stat.updateOne = jest.fn().mockReturnValue(undefined);

            try {
                await TTNController.updateContainer(uplinkMock);
            } catch (e) {
                done();
            }
        });

        it('should reject promise if new distance is too big', async done => {
            const uplinkMock = mockUplink({ distance: 401 });
            Container.findOne = jest.fn().mockReturnValue(new Container());

            try {
                await TTNController.updateContainer(uplinkMock);
            } catch (e) {
                done();
            }
        });

        it('should reject promise if new distance is too small', async done => {
            const uplinkMock = mockUplink({ distance: -1 });
            Container.findOne = jest.fn().mockReturnValue(new Container());

            try {
                await TTNController.updateContainer(uplinkMock);
            } catch (e) {
                done();
            }
        });

        it('should update container height if not set yet', async () => {
            const uplinkMock = mockUplink({ distance: 250 });
            Container.findOne = jest.fn().mockReturnValue(new Container({ height: 0 }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.height).toBe(250);
        });

        it('should update container height its smaller then new distance', async () => {
            const uplinkMock = mockUplink({ distance: 250 });
            Container.findOne = jest.fn().mockReturnValue(new Container({ height: 2 }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.height).toBe(250);
        });

        it('should increment times serviced count', async () => {
            const uplinkMock = mockUplink({ distance: 181 });
            Container.findOne = jest.fn().mockReturnValue(new Container({
                height: 200,
                level: 40,
                timesServiced: 5
            }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.timesServiced).toBe(6);
        });

        it('should NOT increment times serviced count', async () => {
            const uplinkMock = mockUplink({ distance: 139 });
            Container.findOne = jest.fn().mockReturnValue(new Container({
                height: 200,
                level: 40,
                timesServiced: 5
            }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.timesServiced).toBe(5);
        });

        it('should set new container level', async () => {
            const uplinkMock = mockUplink({ distance: 150 });
            Container.findOne = jest.fn().mockReturnValue(new Container({
                height: 200
            }));

            const container = await TTNController.updateContainer(uplinkMock);

            expect(container.level).toBe(25);
        });
    });

});
