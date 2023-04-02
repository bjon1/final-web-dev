import { fetchData } from "./fetcher";
import type { DataListEnvelope } from "./fetcher";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export function getProducts(): Promise<DataListEnvelope<Product>> { //A promise object that will resolve in the form of DataListEnvelope, where T = Product[]
    return fetchData('products'); 
}