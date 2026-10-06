import {Loader} from "../../ui/Loader/Loader";
import type {Product} from "./model/product";
import {ProductCard} from '../../components/ProductCard/ProductCard'
import { Header } from '../../components/Header/Header'
import { CartPopup } from '../../components/CartPopup/CartPopup'
import { ProductGrid } from '../../components/ProductGrid/ProductGrid'
import { Title } from '@mantine/core'
import styles from './ShopModule.module.sass'
import { useEffect } from 'react'
import {useAppDispatch, useAppSelector,} from '../../app/hooks'
import {fetchProducts,} from './model/productsSlice'
import {addToCart, selectCartItems, selectTotalItems, selectTotalPrice, setItemQuantity,} from './model/cartSlice'
import {selectIsCartOpened, setCartOpened,} from './model/uiSlice'



export function ShopModule() {
    const dispatch = useAppDispatch()

    const products = useAppSelector(
        (state) => state.products.items,
    )

    const productsStatus = useAppSelector(
        (state) => state.products.status,
    )

    const productsError = useAppSelector(
        (state) => state.products.error,
    )

    const cartItems = useAppSelector(selectCartItems)
    const totalItems = useAppSelector(selectTotalItems)
    const totalPrice = useAppSelector(selectTotalPrice)
    const isCartOpened = useAppSelector(selectIsCartOpened)

    const handleAddToCart = (
        product: Product,
        quantity: number,
    ) => {
        dispatch(addToCart({ product, quantity }))
    }

    const handleCartItemQuantityChange = (
        productId: number,
        quantity: number,
    ) => {
        dispatch(
            setItemQuantity({
                productId,
                quantity,
            }),
        )
    }

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProducts())
        }
    }, [dispatch, productsStatus])

    if (
        productsStatus === 'idle' ||
        productsStatus === 'loading'
    ) {
        return <Loader size="lg" />
    }

    if (productsError) {
        return <p>{productsError}</p>
    }

    return (
        <div className={styles.page}>
            <Header
                totalItems={totalItems}
                totalPrice={totalPrice}
                cartOpened={isCartOpened}
                onCartOpenedChange={(opened) =>
                    dispatch(setCartOpened(opened))
                }
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