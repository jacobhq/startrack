import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Badge } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import SupaIcon from '../public/supabase-logo-icon.png'
import Nav from '../components/nav'
import { useState } from 'react'

export default function Home() {
  let [loading, setLoading] = useState(false)

  function startLoading() {
    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>Startrack | Embed github stars into your next app</title>
        <meta name='description' content='Create visual feedback in your app, based on wether your github repo is starred.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Nav />
        <Center width='100vw' height='100vh'>
          <VStack spacing='24px' padding='10%'>
            <Heading size='3xl'>Embed github stars into your next app</Heading>
            <Text>Create visual feedback in your app, based on wether your github repo is starred.</Text>
            <Divider />
            <ButtonGroup>
              <Link href="/add-app">
                <Button size='lg' colorScheme='red' rightIcon={<ArrowForwardIcon />} isLoading={loading} onClick={startLoading}>Add your app</Button>
              </Link>
              <Button size='lg'>Sign up</Button>
            </ButtonGroup>
            <HStack>
              <Image src={SupaIcon} width='15px' height='15px' />
              <Text paddingTop="2.5px">App powerd by supabase</Text>
            </HStack>
          </VStack>
        </Center>
        <Center width='100vw' height='100vh' hidden>
          <HStack padding="10%">
            <VStack spacing="24px">
              <Heading>Star a repo right from your app</Heading>
              <Text>Deliver a frictionless starring experience, right from your app. Gone are the days of clicking more than once to star a repo ;).</Text>
            </VStack>
          </HStack>
        </Center>
      </main>
    </div>
  )
}
