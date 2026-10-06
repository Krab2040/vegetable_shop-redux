import {createSlice, type PayloadAction,} from '@reduxjs/toolkit'

interface UiState {
    isCartOpened: boolean
}

const initialState: UiState = {
    isCartOpened: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCartOpened: (
            state,
            action: PayloadAction<boolean>,
        ) => {
            state.isCartOpened = action.payload
        },

        toggleCart: (state) => {
            state.isCartOpened = !state.isCartOpened
        },
    },
})

export const {
    setCartOpened,
    toggleCart,
} = uiSlice.actions

export const selectIsCartOpened = (
    state: { ui: UiState },
) => state.ui.isCartOpened

export default uiSlice.reducer