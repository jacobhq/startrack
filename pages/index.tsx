import Head from 'next/head'
import Hero from 'components/Hero'
import { kv } from '@vercel/kv'
import { GetServerSideProps } from 'next'

export default function Home({ stars }) {

  return (
    <div>
      <Head>
        <title>Embed github stars into your next app - Startrack</title>
        <meta name='description' content='Create visual feedback in your app, based on wether your github repo is starred.' />
        <link rel='icon' href='/favicon.ico' />
        <meta name="keywords" content="Startrack, stars, github, github stars" />
        <meta name="twitter:site" content="@jhqstartrack" />
        <meta name="twitter:title" content="Embed github stars into your next app - Startrack" />
        <meta name="twitter:description" content="Create visual feedback in your app, based on wether your github repo is starred." />
        <meta name="twitter:image" content="https://startrack.vercel.app/social.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:title" content="Embed github stars into your next app - Startrack" />
        <meta property="og:type" content="website" />
        <meta name="og:description" content="Create visual feedback in your app, based on wether your github repo is starred." />
        <meta name="og:image" content="https://startrack.vercel.app/social.png" />
      </Head>

      <main>
        <Hero stars={stars} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const stars = await kv.get("stars")
  return { props: { stars } };
};
