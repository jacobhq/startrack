import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import '../styles/globals.css'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react";
import splitbee from '@splitbee/web';

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    })
  }, [])
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp