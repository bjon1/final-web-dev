import { api } from "./fetcher";
import type { DataListEnvelope, DataEnvelope } from "./fetcher";

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
    _id: number;
}

export function addProduct(product: Product): Promise<DataEnvelope<Product>> {
    return api("products", "POST", product); 
}

export function updateProduct(id: number, product: Product): Promise<DataEnvelope<Product>> {
    return api(`products/${id}`, "PATCH", product);
}

export function deleteProduct(id: number): Promise<DataEnvelope<Product>> {
    return api(`products/${id}`, "DELETE")
}

export function getProducts(): Promise<DataListEnvelope<Product>> { 
    return api('products', "GET"); 
}

export function getProduct(id: number): Promise<DataEnvelope<Product>>{
    return api(`products/${id}`, "GET");
}