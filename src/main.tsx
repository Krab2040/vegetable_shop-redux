import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import App from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/store'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element was not found')
}

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <App />
            </MantineProvider>
        </Provider>
    </StrictMode>,
)
