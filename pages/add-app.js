import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, List, ListItem, ListIcon } from '@chakra-ui/react'
import Nav from '../components/nav'
import { useState } from 'react'
import { CheckCircleIcon, CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons'

export default function Home() {

    let [ghUser, setUser] = useState('')
    let [ghRepo, setRepo] = useState('')

    let ghProcUser = ghUser !== '' ? ghUser : '[github username]'
    let ghProcRepo = ghRepo !== '' ? ghRepo : '[github repo]'
    
    return (
        <div>
            <Head>
                <title>Signup | Startrack</title>
                <meta name='description' content='Create visual feedback in your app, based on wether your github repo is starred.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main>
                <Nav />
                <Center width='100vw' height='100vh' padding='0'>
                    <VStack spacing='24px' padding='10%'>
                        <Heading size='xl'>Ready to go?</Heading>
                        <Text>Here&apos;s how to get started.</Text>
                        <Divider />
                        <VStack>
                            <Input placeholder="Github username" value={ghUser} onChange={e => setUser(e.target.value)} />
                            <Input placeholder="Github repo name" value={ghRepo} onChange={e => setRepo(e.target.value)} />
                            <Textarea placeholder="Here is a sample placeholder" backgroundColor="blackAlpha.800" resize="none" border="none" color="white" focusBorderColor="transparent" readOnly value={'github.com/' + ghProcUser + '/' + ghProcRepo} />
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

export const getServerSideProps = async (context) => {
    const result = await fetch('https://3000-lavender-horse-riyet74h.ws-eu18.gitpod.io/api/a/b', {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         cookie: context.req.headers.cookie,
       },
     })
     console.log(result)
     return {props: {result: result.toString()}}
   }
   
