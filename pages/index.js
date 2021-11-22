import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Avatar } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import profilePhoto from '../public/profile.png'
import Nav from '../components/nav'
import { useState, useEffect } from 'react'
import { useFetchUser } from '../lib/user'

export default function Home() {
  const { user, loadingUser } = useFetchUser()
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
                <Button size='lg' colorScheme='yellow' rightIcon={<ArrowForwardIcon />} isLoading={loading} onClick={startLoading}>Add your app</Button>
              </Link>
              {!user ? <a href="/api/login">
                <Button size='lg'>Sign up</Button>
              </a> : <a href="/api/logout">
                <Button size='lg'>Logout</Button>
              </a>}
            </ButtonGroup>
            <HStack>
              <Avatar src="./profile.png" width='25px' height='25px'/>
              <Text paddingTop="2.5px">App by JacobHQ</Text>
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
