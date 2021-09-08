import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, useColorMode } from '@chakra-ui/react'
import Nav from '../components/nav'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Signup | Startrack</title>
        <meta name='description' content='Create visual feedback in your app, based on wether your github repo is starred.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Nav />
        <Center width='100vw' height='100vh'>
          <VStack spacing='24px' padding='10%'>
            <Heading size='xl'>Ready to go?</Heading>
            <Text>Here&apos;s how to get started.</Text>
            <Divider />
            <VStack>
                <Input placeholder="Github username" />
                <Input placeholder="Github repo name" />
                <Textarea placeholder="Here is a sample placeholder" backgroundColor="blackAlpha.800" resize="none" border="none" color="white" focusBorderColor="transparent" readOnly />
                <ButtonGroup>
                    <Button>Copy to clipboard</Button>
                </ButtonGroup>
            </VStack>
          </VStack>
        </Center>
      </main>
    </div>
  )
}
