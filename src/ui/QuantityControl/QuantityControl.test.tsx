import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuantityControl } from './QuantityControl'
import { MantineProvider } from '@mantine/core'

describe('QuantityControl', () => {
    it('увеличивает количество при нажатии на плюс', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <MantineProvider>
                <QuantityControl
                    value={1}
                    onChange={onChange}
                />
            </MantineProvider>,
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Увеличить количество',
            }),
        )

        expect(onChange).toHaveBeenCalledWith(2)
    })

    it('не уменьшает количество ниже единицы', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <MantineProvider>
                <QuantityControl
                    value={1}
                    onChange={onChange}
                />
            </MantineProvider>,
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Уменьшить количество',
            }),
        )

        expect(onChange).toHaveBeenCalledWith(1)
    })
})