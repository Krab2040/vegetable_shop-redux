import type { ReactNode } from 'react'
import styles from './ProductGrid.module.sass'

interface ProductGridProps {
    children: ReactNode
}

export function ProductGrid({ children }: ProductGridProps) {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    )
}