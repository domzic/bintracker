import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import TTNData from '../models/ttn-data.model';
import { ICompany } from '../models/company.model';
import Container, { IContainer } from '../models/container.model';
import Stat, { Action, StatType } from '../models/stat.model';

const fetch = async (requestUrl: string): Promise<Uplink[] | undefined> => {
    let data: Uplink[];

    try {
        ({ data } = await axios.get<Uplink[]>(requestUrl, {
            headers: {
                Authorization: 'key ttn-account-v2.W8o285nAVPRyoxnE_dhPzpGyXHIffYpSca0TxLEDLrk'
            },
            responseType: 'json',
            timeout: 5000
        }));

        return data;

    } catch (error) {
        console.log(`Error fetching data from TTN: ${error}`);
        return undefined;
    }

};

const parseLatestUplinks = (response: Uplink[]): Uplink[] => _(response)
    .orderBy(['time'], ['desc'])
    .uniqBy('device_id')
    .value();

const newStatus = (current: number, next: number): string | undefined => {
    if (current < 50) {
        if (next < 50) {
            return undefined;
        }
        if (next < 80) {
            return 'medium';
        }
        return 'full';
    }

    if (current < 80) {
        if (next < 80) {
            return undefined;
        }
        return 'full';
    }

    return undefined;
};

const updateContainer = async (uplink: Uplink): Promise<IContainer> => {
    const container = await Container.findOne({ ttnDeviceId: uplink.device_id });

    if (!container) {
        await Stat.updateOne(
            { key: StatType.notRegisteredDevices },
            { $push: { devices: uplink.device_id } }
        );
        return Promise.reject(`Container with ttnDeviceId: ${uplink.device_id} was not found.`);
    }

    const newDistance = uplink.distance;

    if (newDistance > 400 || newDistance <= 0) {
        return Promise.reject(undefined);
    }

    if (!container.height || container.height < newDistance) {
        container.height = newDistance;
    }

    const newLevel = 100 - Math.round(newDistance / container.height * 100);
    if (container.level - newLevel > 10) {
        container.timesServiced++;
        await Stat.create({
            key: StatType.Action,
            value: `Container ${container.ttnDeviceId} was serviced`,
            company: container.company,
            action: Action.Serviced,
            date: moment()
        });
    }

    const changedStatus = newStatus(container.level, newLevel);
    if (changedStatus) {
        await Stat.create({
            key: StatType.Action,
            value: `Container ${container.ttnDeviceId} changed status to ${changedStatus}`,
            company: container.company,
            action: Action.StatusChange,
            date: moment()
        });
    }

    container.level = newLevel;

    await container.save();

    return Promise.resolve(container);
};

const update = async (company: ICompany): Promise<void> => {
    const requestUrl = `https://${company.ttnAppName}.data.thethingsnetwork.org/api/v2/query`;
    const response = await fetch(requestUrl);

    if (!response) {
        return Promise.reject(`Seems like TTN application: ${company.ttnAppName} does not exist...`);
    }
    console.log('ok');
    console.log(response);

    const uniqueUplinks = parseLatestUplinks(response);
    await TTNData.create({ date: moment(), responseBody: JSON.stringify(uniqueUplinks), company });

    const results = await Promise.allSettled(uniqueUplinks.map(updateContainer));
    results.forEach(result => {
        if (result.status === 'rejected') {
            console.log((result as PromiseRejectedResult).reason);

        }
    });

    console.log('Successfully updated data from TTN.');
    return Promise.resolve();
};

const TTNController = {
    fetch,
    parseLatestUplinks,
    updateContainer,
    update
};

export default TTNController;

export interface Uplink {
    device_id: string;
    distance: number;
    time: string;
}

const defaultUplinkMock: Uplink = {
    device_id: 'mockedDeviceId',
    distance: 230,
    time: '2020-04-05'
};

export const mockUplink = (partial?: Partial<Uplink>): Uplink => ({
    ...defaultUplinkMock,
    ...partial
}) as Uplink;
