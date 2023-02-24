import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import '../styles/globals.css'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react";
import splitbee from '@splitbee/web';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "react-hot-toast";

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
      <Toaster />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp