import {createSlice, type PayloadAction,} from '@reduxjs/toolkit'
import type { CartItem } from './cartItem'
import type { Product } from './product'

export interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{
                product: Product
                quantity: number
            }>,
        ) => {
            const { product, quantity } = action.payload

            const existingItem = state.items.find(
                (item) => item.product.id === product.id,
            )

            if (existingItem) {
                existingItem.quantity += quantity
                return
            }

            state.items.push({
                product,
                quantity,
            })
        },

        setItemQuantity: (
            state,
            action: PayloadAction<{
                productId: number
                quantity: number
            }>,
        ) => {
            const { productId, quantity } = action.payload

            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) => item.product.id !== productId,
                )
                return
            }

            const item = state.items.find(
                (currentItem) =>
                    currentItem.product.id === productId,
            )

            if (item) {
                item.quantity = quantity
            }
        },
    },
})

export const {
    addToCart,
    setItemQuantity,
} = cartSlice.actions

export const selectCartItems = (
    state: { cart: CartState },
) => state.cart.items

export const selectTotalItems = (
    state: { cart: CartState },
) =>
    state.cart.items.reduce(
        (total, item) => total + item.quantity,
        0,
    )

export const selectTotalPrice = (
    state: { cart: CartState },
) =>
    state.cart.items.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0,
    )

export default cartSlice.reducer