import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, useColorMode } from '@chakra-ui/react'
import Nav from '../components/nav'
import { useState } from 'react'

export default function Home() {

  let [ghUser, setUser] = useState('')
  let [ghRepo, setRepo] = useState('')
  let [final, setFinal] = useState('')

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
          <HStack>
            <VStack spacing='24px' padding='10%' width="50vw" height="100vh">
              <Heading size='xl'>Ready to go?</Heading>
              <Text>Here&apos;s how to get started.</Text>
              <Divider />
            </VStack>
            <VStack spacing='24px' padding='10%'>
              <VStack>
                <Input placeholder="Github username" value={ghUser} onChange={e => setUser(e.target.value)} />
                <Input placeholder="Github repo name" value={ghRepo} onChange={e => setRepo(e.target.value)} />
                <Textarea placeholder="Here is a sample placeholder" backgroundColor="blackAlpha.800" resize="none" border="none" color="white" focusBorderColor="transparent" readOnly value={'github.com/' + ghUser + '/' + ghRepo} />
                <ButtonGroup>
                  <Button>Copy to clipboard</Button>
                </ButtonGroup>
              </VStack>
            </VStack>
          </HStack>
        </Center>
      </main>
    </div>
  )
}
