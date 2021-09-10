import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, List, ListItem, ListIcon } from '@chakra-ui/react'
import Nav from '../components/nav'
import { useState } from 'react'
import { CheckCircleIcon, CheckIcon, InfoOutlineIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { supabase } from '../utils/supabaseClient'

async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github'
    }, {
        scopes: 'public_repo'
    });
  }

  export const oAuthToken = session.provider_token // use to access provider API

export default function Signup() {

    let [email, setEmail] = useState('')
    let [passoword, setPassoword] = useState('')

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
                        <Heading size='xl'>Signup</Heading>
                        <Divider />
                        <VStack>
                            <ButtonGroup>
                                <Button colorScheme="red" rightIcon={<ArrowForwardIcon />} onClick={signInWithGithub}>Continue with GitHub</Button>
                            </ButtonGroup>
                        </VStack>
                    </VStack>
                </Center>
            </main>
        </div>
    )
}
