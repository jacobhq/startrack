import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react";
import splitbee from '@splitbee/web';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "react-hot-toast";

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
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  )
}

export default MyApp