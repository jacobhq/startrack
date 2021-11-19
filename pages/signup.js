import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, List, ListItem, ListIcon } from '@chakra-ui/react'
import Nav from '../components/nav'
import { useState } from 'react'
import { CheckCircleIcon, CheckIcon, InfoOutlineIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { signIn } from "next-auth/react"

export default function Signup() {

    let [email, setEmail] = useState('')
    let [passoword, setPassoword] = useState('')
    let [loading, setLoading] = useState(false)

    function auth(e) {
        e.preventDefault()
        setLoading(true)
        signIn('github')
    }

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
                                <Button colorScheme="red" rightIcon={<ArrowForwardIcon />} onClick={(e) => auth(e)} as="a" href={`/api/auth/signin`}>Continue with GitHub</Button>
                            </ButtonGroup>
                        </VStack>
                    </VStack>
                </Center>
            </main>
        </div>
    )
}
