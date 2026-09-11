import { Image, Text } from '@mantine/core'
import type { CartItem } from '../../modules/shop/model/cartItem'
import { QuantityControl } from '../../ui/QuantityControl/QuantityControl'
import emptyCartImage from '../../assets/empty-cart.svg'
import styles from './CartPopup.module.sass'

interface CartPopupProps {
    items: CartItem[]
    totalPrice: number
    onQuantityChange: (
        productId: number,
        quantity: number,
    ) => void
}

export function CartPopup({
                              items,
                              totalPrice,
                              onQuantityChange,
                          }: CartPopupProps) {
    if (items.length === 0) {
        return (
            <div className={styles.emptyState}>
                <img
                    className={styles.emptyImage}
                    src={emptyCartImage}
                    alt=""
                />

                <Text className={styles.emptyText}>
                    You cart is empty!
                </Text>
            </div>
        )
    }

    return (
        <div className={styles.filledState}>
            <div className={styles.items}>
                {items.map((item) => {
                    const separatorIndex =
                        item.product.name.lastIndexOf(' - ')

                    const productTitle =
                        separatorIndex === -1
                            ? item.product.name
                            : item.product.name.slice(0, separatorIndex)

                    const productWeight =
                        separatorIndex === -1
                            ? ''
                            : item.product.name
                                .slice(separatorIndex + 3)
                                .toLowerCase()

                    return (
                        <div
                            className={styles.item}
                            key={item.product.id}
                        >
                            <Image
                                className={styles.itemImage}
                                src={item.product.image}
                                width={64}
                                height={64}
                                fit="contain"
                                alt={item.product.name}
                            />

                            <div className={styles.itemInfo}>
                                <div className={styles.itemTitle}>
                                    <Text className={styles.itemName}>
                                        {productTitle}
                                    </Text>

                                    {productWeight && (
                                        <Text className={styles.itemWeight}>
                                            {productWeight}
                                        </Text>
                                    )}
                                </div>

                                <Text className={styles.itemPrice}>
                                    $ {item.product.price * item.quantity}
                                </Text>
                            </div>

                            <div className={styles.itemQuantity}>
                                <QuantityControl
                                    value={item.quantity}
                                    onChange={(quantity) =>
                                        onQuantityChange(item.product.id, quantity)
                                    }
                                    onRemove={() =>
                                        onQuantityChange(item.product.id, 0)
                                    }
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={styles.total}>
                <Text className={styles.totalLabel}>Total</Text>
                <Text className={styles.totalPrice}>
                    $ {totalPrice}
                </Text>
            </div>
        </div>
    )
}