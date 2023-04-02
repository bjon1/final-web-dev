const API_URL = 'http://localhost:3000/api/v1/';

export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & { 
    total: number
}

export async function fetchData(url: string){
    const res = await fetch(API_URL + url);
    return await (res.ok ? res.json() : res.json().then(x => { throw ({ ...x, message: x.error }); }));
}
