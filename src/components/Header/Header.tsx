import type {ReactNode} from 'react'
import {Button, Group, Popover} from '@mantine/core'
import {IconShoppingCart} from '@tabler/icons-react'
import styles from './Header.module.sass'

interface HeaderProps {
    totalItems: number
    totalPrice: number
    cartOpened: boolean
    cartPopup: ReactNode
    onCartOpenedChange: (opened: boolean) => void
}

export function Header({totalItems, totalPrice, cartOpened, cartPopup,onCartOpenedChange }: HeaderProps) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(totalPrice)

    return (
        <header className={styles.header}>
            <Group
                className={styles.headerInner}
                justify="space-between"
                align="center"
                wrap="nowrap"
            >
                <div
                    className={styles.logo}
                    aria-label="Vegetable Shop"
                >
                    <span className={styles.logoName}>
                        Vegetable
                    </span>

                    <span className={styles.logoShop}>
                        SHOP
                    </span>
                </div>

                <Popover
                    opened={cartOpened}
                    onChange={onCartOpenedChange}
                    position="bottom-end"
                    offset={20}
                    shadow="md"
                    withArrow={false}
                >
                    <Popover.Target>
                        <Button
                            className={`${styles.cartButton} ${
                                totalItems > 0
                                    ? styles.cartButtonWithItems
                                    : styles.cartButtonEmpty
                            }`}
                            leftSection={
                                totalItems > 0 ? (
                                    <span className={styles.cartBadge}>
                                        {totalItems}
                                    </span>
                                ) : undefined
                            }
                            rightSection={<IconShoppingCart size={22}/>}
                            aria-label="Открыть корзину"
                            onClick={() => onCartOpenedChange(!cartOpened)}
                        >
                            Cart
                        </Button>
                    </Popover.Target>

                    <Popover.Dropdown
                        className={`${styles.cartDropdown} ${
                            totalItems === 0
                                ? styles.emptyCartDropdown
                                : ''
                        }`}
                    >
                        {cartPopup}
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </header>
    )
}