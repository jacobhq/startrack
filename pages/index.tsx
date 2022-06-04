import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Avatar } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Nav from 'components/nav'
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
              <Link href="/star/jacobhq/startrack">
                <Button size='lg' colorScheme='yellow' rightIcon={<ArrowForwardIcon />} isLoading={loading} onClick={startLoading}>Try it</Button>
              </Link>
              <Link href="/add-app">
                <Button size="lg">Add your app</Button>
              </Link>
            </ButtonGroup>
            <HStack>
              <Avatar src="./profile.png" width='25px' height='25px' />
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
