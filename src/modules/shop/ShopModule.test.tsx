import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ShopModule } from './ShopModule'
import { fetchProducts } from './api/productsApi'
import type { Product } from './model/product'


vi.mock('./api/productsApi', () => ({
    fetchProducts: vi.fn(),
}))

const product: Product = {
    id: 1,
    name: 'Brocolli - 1 Kg',
    price: 120,
    image: 'https://example.com/broccoli.jpg',
    category: 'vegetables',
}

describe('ShopModule', () => {
    beforeEach(() => {
        vi.mocked(fetchProducts).mockResolvedValue([product])
    })

    it('объединяет количество одинакового товара в корзине', async () => {
        const user = userEvent.setup()

        render(
            <MantineProvider>
                <ShopModule />
            </MantineProvider>,
        )

        const addButton = await screen.findByRole('button', {
            name: 'Add to cart',
        })

        await user.click(addButton)
        await user.click(addButton)

        await user.click(
            screen.getByRole('button', {
                name: 'Открыть корзину',
            }),
        )

        expect(
            await screen.findByText('Brocolli'),
        ).toBeTruthy()

        expect(
            await screen.findByLabelText('Количество: 2'),
        ).toBeTruthy()
    })
    it('показывает loader во время загрузки', () => {
        vi.mocked(fetchProducts).mockReturnValue(
            new Promise(() => {}),
        )

        render(
            <MantineProvider>
                <ShopModule />
            </MantineProvider>,
        )

        expect(
            document.querySelector('.mantine-Loader-root'),
        ).toBeTruthy()
    })
    it('показывает сообщение при ошибке загрузки', async () => {
        vi.mocked(fetchProducts).mockRejectedValue(
            new Error('Network error'),
        )

        render(
            <MantineProvider>
                <ShopModule />
            </MantineProvider>,
        )

        expect(
            await screen.findByText('Не удалось загрузить товары'),
        ).toBeTruthy()
    })
})