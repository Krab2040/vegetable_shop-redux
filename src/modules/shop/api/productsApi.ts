import type { Product } from '../model/product'
import ky from 'ky'

const PRODUCTS_URL = "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"

export async function fetchProducts(signal?: AbortSignal,): Promise<Product[]> {
    const data = await ky
        .get(PRODUCTS_URL, {signal})
        .json<unknown>()

    if(!Array.isArray(data)) {
        throw new Error('Products API returned an invalid response')
    }

    return data as Product[]
}