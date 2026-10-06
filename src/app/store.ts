import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../modules/shop/model/productsSlice'
import cartReducer from '../modules/shop/model/cartSlice'
import uiReducer from '../modules/shop/model/uiSlice'

const reducer = {
    products: productsReducer,
    cart: cartReducer,
    ui: uiReducer,
}

export const createAppStore = () =>
    configureStore({
        reducer,
    })

export const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch