import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts as fetchProductsApi } from '../api/productsApi'
import type { Product } from './product'

type ProductsStatus =
    | 'idle'
    | 'loading'
    | 'succeeded'
    | 'failed'

export interface ProductsState {
    items: Product[]
    status: ProductsStatus
    error: string | null
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk<
    Product[],
    void,
    { rejectValue: string }
>(
    'products/fetchProducts',
    async (_, { signal, rejectWithValue }) => {
        try {
            return await fetchProductsApi(signal)
        } catch (error) {
            if (signal.aborted) {
                throw error
            }

            return rejectWithValue(
                'Не удалось загрузить товары',
            )
        }
    },
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error =
                    action.payload ??
                    'Не удалось загрузить товары'
            })
    },
})

export default productsSlice.reducer