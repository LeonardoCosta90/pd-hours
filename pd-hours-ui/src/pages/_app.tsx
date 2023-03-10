import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
