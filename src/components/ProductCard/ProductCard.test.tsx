import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductCard } from './ProductCard'
import type { Product } from '../../modules/shop/model/product'

const product: Product = {
    id: 1,
    name: 'Brocolli - 1 Kg',
    price: 120,
    image: 'https://example.com/broccoli.jpg',
    category: 'vegetables',
}

describe('ProductCard', () => {
    it('передаёт товар и выбранное количество при добавлении в корзину', async () => {
        const user = userEvent.setup()
        const onAddToCart = vi.fn()

        render(
            <MantineProvider>
                <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                />
            </MantineProvider>,
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Увеличить количество',
            }),
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Add to cart',
            }),
        )

        expect(onAddToCart).toHaveBeenCalledWith(product, 2)
    })
})