import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Avatar, Spacer, Container, Box, Image, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Nav from 'components/nav'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { FadeAndSlide } from 'components/fade-and-slide'
import { Fade } from 'components/fade'

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
        <Nav animate delay={1.2} />
        <Box py={{ base: 36, md: 64 }}>
          <Stack direction={['column-reverse', 'row']} justifyContent="center" alignItems="center">
            <Container maxW="3xl" textAlign="center">
              <VStack spacing='24px'>
                <Fade>
                  <Heading size='3xl'>Embed github stars into your next app</Heading>
                </Fade>
                <Fade delay={0.4}>
                  <Text>Create visual feedback in your app, based on wether your github repo is starred.</Text>
                </Fade>
                <Spacer h={6} />
                <Fade delay={0.8}>
                  <ButtonGroup>
                    <Link href="/star/jacobhq/startrack">
                      <Button rounded="full" colorScheme='yellow' rightIcon={<ArrowForwardIcon />} isLoading={loading} onClick={startLoading}>Try it</Button>
                    </Link>
                    <Link href="/add-app">
                      <Button rounded="full" variant="ghost">Add your app</Button>
                    </Link>
                  </ButtonGroup>
                </Fade>
              </VStack>
            </Container>
            <Container maxW="container.sm">
              <Container maxW={64} alignItems="center" justifyContent="center">
                <Image rounded="50px" transition="all 0.1s ease" _hover={{ transform: "translateY(-10px)" }} src="/logo.png" />
                <Fade delay={1.2}>
                  <Center w="full" h="full">
                    <Spacer />
                    <Box zIndex={-1} pos="relative" boxShadow="0 0 200px 200px yellow" />
                  </Center>
                </Fade>
              </Container>
            </Container>
          </Stack>
        </Box>
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
