import axios from 'axios';

export const fetchData = async (): Promise<void> => {
    let data: TTNResponse;

    try {
        ({ data } = await axios.get<TTNResponse>(`${process.env.TTN_REQUEST_URI}/query`, {
            headers: {
                Authorization: `key ${process.env.TTN_ACCESS_KEY}`
            },
            responseType: 'json',
            timeout: 5000
        }));
        console.log(data);
    } catch (error) {
        console.log(`Error fetching data from TTN: ${error}`);
    }
};

export interface TTNResponse {
    device_id: string;
    distance: number;
    time: Date;
}
