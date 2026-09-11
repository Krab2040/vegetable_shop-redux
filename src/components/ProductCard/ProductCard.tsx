import { useState } from 'react'
import { Button, Card, Group, Image, Text, Title } from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react'
import type { Product } from '../../modules/shop/model/product'
import { QuantityControl } from '../../ui/QuantityControl/QuantityControl'
import styles from './ProductCard.module.sass'

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product, quantity: number) => void
}

export function ProductCard({
                                product,
                                onAddToCart,
                            }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1)

    const separatorIndex = product.name.lastIndexOf(' - ')
    const productTitle =
        separatorIndex === -1
            ? product.name
            : product.name.slice(0, separatorIndex)

    const productWeight =
        separatorIndex === -1
            ? ''
            : product.name.slice(separatorIndex + 3).toLowerCase()

    return (
        <Card
            className={styles.card}
            shadow="sm"
            padding={16}
            radius="lg"

        >
            <Card.Section className={styles.imageSection}>
                <Image
                    className={styles.image}
                    src={product.image}
                    width={276}
                    height={276}
                    fit="contain"
                    alt={product.name}
                />
            </Card.Section>

            <Group
                className={styles.middle}
                justify="space-between"
                align="center"
                wrap="nowrap"
            >
                <Group
                    gap="xs"
                    wrap="nowrap"
                >
                    <Title
                        order={4}
                        className={styles.title}
                    >
                        {productTitle}
                    </Title>

                    {productWeight && (
                        <Text
                            size="xs"
                            c="dimmed"
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {productWeight}
                        </Text>
                    )}
                </Group>

                <QuantityControl
                    value={quantity}
                    onChange={setQuantity}
                />
            </Group>

            <Group
                className={styles.footer}
                justify="space-between"
                align="center"
                wrap="nowrap"
            >
                <Title
                    order={3}
                    className={styles.price}
                >
                    $ {product.price}
                </Title>

                <Button
                    className={styles.addButton}
                    rightSection={<IconShoppingCart size={16} />}
                    onClick={() => onAddToCart(product, quantity)}
                >
                    Add to cart
                </Button>
            </Group>
        </Card>
    )
}