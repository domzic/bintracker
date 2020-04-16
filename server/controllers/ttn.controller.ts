import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import TTNData from '../models/ttn-data.model';
import { ICompany } from '../models/company.model';
import Container, { IContainer } from '../models/container.model';
import Stat, { StatType } from '../models/stat.model';

const fetch = async (requestUrl: string): Promise<Uplink[] | undefined> => {
    let data: Uplink[];

    try {
        ({ data } = await axios.get<Uplink[]>(requestUrl, {
            headers: {
                Authorization: `key ${process.env.TTN_ACCESS_KEY}`
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

const updateContainer = async (uplink: Uplink): Promise<IContainer> => {
    const container = await Container.findOne({ ttnDeviceId: uplink.device_id });

    if (!container) {
        await Stat.updateOne(
            { key: StatType.notRegisteredDevices },
            { $push: { devices: uplink.device_id } }
        );
        return Promise.reject(`Container with ttnDeviceId: ${uplink.device_id} was not found.`);
    }

    const newDistance = +uplink.distance;

    if (!container.height || container.height < newDistance) {
        container.height = newDistance;
    }

    const newLevel = Math.round(newDistance / container.height * 100);
    if (container.level - newLevel > 10) {
        container.timesServiced++;
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

    const servicedContainersStat = await Stat.findOne({ company, key: StatType.servicedContainersCount });

    const uniqueUplinks = parseLatestUplinks(response);
    await TTNData.create({ date: moment(), responseBody: JSON.stringify(uniqueUplinks), company });

    const results = await Promise.allSettled(uniqueUplinks.map(updateContainer));
    let totalServiced = 0;
    results.forEach(result => {
        if (result.status === 'rejected') {
            console.log((result as PromiseRejectedResult).reason);
            return;
        }
        totalServiced++;
    });

    if (servicedContainersStat?.value) {
        servicedContainersStat.value += totalServiced;
        await servicedContainersStat.save();
    }

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
    distance: string;
    time: string;
}

const defaultUplinkMock: Uplink = {
    device_id: 'mockedDeviceId',
    distance: '2.3',
    time: '2020-04-05'
};

export const mockUplink = (partial?: Partial<Uplink>): Uplink => ({
    ...defaultUplinkMock,
    ...partial
}) as Uplink;
