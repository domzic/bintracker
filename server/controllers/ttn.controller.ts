import axios from 'axios';
import TTNData, {ITTNData} from "../models/ttn-data.model";
import moment from "moment";
import _ from 'lodash';
import {ICompany} from "../models/company.model";

const fetch = async (requestUrl: string): Promise<TTNResponse | undefined> => {
    let data: TTNResponse;

    try {
        ({ data } = await axios.get<TTNResponse>(requestUrl, {
            headers: {
                Authorization: `key ${process.env.TTN_ACCESS_KEY}`
            },
            responseType: 'json',
            timeout: 5000
        }));
        console.log(data);
        return data;

    } catch (error) {
        console.log(`Error fetching data from TTN: ${error}`);
        return undefined;
    }

};

const parseLatestUplinks = (response: TTNResponse): DeviceData[] => {
    return _(response.uplinks)
        .orderBy(['time'], ['desc'])
        .uniqBy('device_id')
        .value();
};

const update = async(company: ICompany): Promise<void> => {
    const requestUrl = `https://${company.ttnAppName}.data.thethingsnetwork.org/api/v2/query`;
    console.log(requestUrl);
    const response = await fetch(requestUrl);

    if (!response) {
        return;
    }

    const uniqueUplinks = parseLatestUplinks(response);
    await TTNData.create({ date: moment(), responseBody: response, company });


};

const TTNController = {
    fetch,
    parseLatestUplinks,
    update
};

export default TTNController;

export interface TTNResponse {
    uplinks: DeviceData[]
}

export interface DeviceData {
    device_id: string;
    distance: string;
    time: string;
}
