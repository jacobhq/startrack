import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp