import {useEffect, useState} from "react";
import {Loader} from "../../ui/Loader/Loader";
import {fetchProducts} from "./api/productsApi";
import type {Product} from "./model/product";
import {ProductCard} from '../../components/ProductCard/ProductCard'
import type {CartItem} from './model/cartItem'
import { Header } from '../../components/Header/Header'
import { CartPopup } from '../../components/CartPopup/CartPopup'
import { ProductGrid } from '../../components/ProductGrid/ProductGrid'
import { Title } from '@mantine/core'
import styles from './ShopModule.module.sass'


export function ShopModule() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isCartOpened, setIsCartOpened] = useState(false)

    const handleAddToCart = (product: Product, quantity: number) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id,
            )

            if (existingItem) {
                return currentItems.map((item) => {
                    if (item.product.id !== product.id) {
                        return item
                    }

                    return {
                        ...item,
                        quantity: item.quantity + quantity,
                    }
                })
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity,
                },
            ]
        })
    }

    const handleCartItemQuantityChange = (
        productId: number,
        quantity: number,
    ) => {
        setCartItems((currentItems) => {
            if (quantity <= 0) {
                return currentItems.filter(
                    (item) => item.product.id !== productId,
                )
            }

            return currentItems.map((item) => {
                if (item.product.id !== productId) {
                    return item
                }

                return {
                    ...item,
                    quantity,
                }
            })
        })
    }

    useEffect(() => {
        const controller = new AbortController();

        fetchProducts(controller.signal)
            .then(setProducts)
            .catch((requestError: unknown) => {
                if (
                    requestError instanceof DOMException &&
                    requestError.name === "AbortError"
                ) {
                    return
                }

                setError("Не удалось загрузить товары");
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();

    }, [])

    if (isLoading) {
        return <Loader size="lg"/>
    }

    if (error) {
        return <p>{error}</p>
    }

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    )

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
    )

    return (
        <div className={styles.page}>
            <Header
                totalItems={totalItems}
                totalPrice={totalPrice}
                cartOpened={isCartOpened}
                onCartOpenedChange={setIsCartOpened}
                cartPopup={
                    <CartPopup
                        items={cartItems}
                        totalPrice={totalPrice}
                        onQuantityChange={handleCartItemQuantityChange}
                    />
                }
            />

            <main className={styles.main}>
                <div className={styles.catalogContent}>
                    <Title
                        order={2}
                        className={styles.catalogTitle}
                    >
                        Catalog
                    </Title>

                    <ProductGrid>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </ProductGrid>
                </div>
            </main>
        </div>
    )
}