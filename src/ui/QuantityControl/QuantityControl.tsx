import {ActionIcon, Group, Text} from '@mantine/core'
import {IconMinus, IconPlus} from '@tabler/icons-react'

interface QuantityControlProps {
    value: number
    onChange: (value: number) => void
    onRemove?: () => void
}

export function QuantityControl({value, onChange, onRemove,}: QuantityControlProps) {
    const handleDecrease = () => {
        if (value === 1 && onRemove) {
            onRemove()
            return
        }

        onChange(Math.max(1, value - 1))
    }
    return (
        <Group gap="xs">
            <ActionIcon
                variant="default"
                aria-label="Уменьшить количество"
                onClick={handleDecrease}
            >
                <IconMinus size={16}/>
            </ActionIcon>

            <Text
                component="span"
                w={24}
                ta="center"
                fw={500}
                aria-label={`Количество: ${value}`}
            >
                {value}
            </Text>

            <ActionIcon
                variant="default"
                aria-label="Увеличить количество"
                onClick={() => onChange(value + 1)}
            >
                <IconPlus size={16}/>
            </ActionIcon>
        </Group>
    )
}