import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Avatar, Spacer, Container } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Nav from 'components/nav'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { FadeAndSlide } from 'components/fade-and-slide'
import { Fade } from 'components/fade'
import Hero from 'components/Hero'

export default function Home() {
  let [loading, setLoading] = useState(false)

  function startLoading() {
    setLoading(false)
  }

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
        <Hero />
      </main>
    </div>
  )
}
