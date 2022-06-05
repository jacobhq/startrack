import Head from 'next/head'
import Link from 'next/link'
import router, { Router, useRouter, withRouter } from 'next/router'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, useColorMode } from '@chakra-ui/react'
import { ArrowBackIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { signIn } from "next-auth/react"
import { Fade } from './fade'

type NavProps = {
    animate?: boolean
    delay?: number
}

function Nav({ animate, delay }: NavProps) {
    const { colorMode, toggleColorMode } = useColorMode()
    let [loading, setLoading] = useState(false)
    const router = useRouter()

    delay ??= 0
    animate ??= false

    function Back() {
        setLoading(true)
        router.push('/')
        setLoading(false)
    }

    return (
        <>
            {animate ? <Fade delay={delay}>
                <HStack position="fixed" padding="25px" justify="space-between" width="100vw">
                    {router.pathname != '/' ? <Link href="/">
                        <IconButton aria-label='Back' isRound variant="ghost" size="lg" icon={<ArrowBackIcon />} isLoading={loading} />
                    </Link> : <div></div>}
                    {router.pathname === '/' ? <ButtonGroup>
                        <Button variant="ghost">Startrack</Button>
                        <Button variant="ghost" onClick={() => signIn('github')}>Sign in</Button>
                        <Button variant="ghost" onClick={() => router.push('/add-app')}>Add your app</Button>
                    </ButtonGroup> : <div></div>}
                    <IconButton aria-label='Toggle theme' isRound variant="ghost" size="lg" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} />
                </HStack>
            </Fade> :
                <HStack position="fixed" padding="25px" justify="space-between" width="100vw">
                    {router.pathname != '/' ? <Link href="/">
                        <IconButton aria-label='Back' isRound variant="ghost" size="lg" icon={<ArrowBackIcon />} isLoading={loading} />
                    </Link> : <div></div>}
                    {router.pathname === '/' ? <ButtonGroup>
                        <Button variant="ghost">Startrack</Button>
                        <Button variant="ghost" onClick={() => signIn('github')}>Sign in</Button>
                        <Button variant="ghost" onClick={() => router.push('/add-app')}>Add your app</Button>
                    </ButtonGroup> : <div></div>}
                    <IconButton aria-label='Toggle theme' isRound variant="ghost" size="lg" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} />
                </HStack>
            }
        </>
    )
}

export default Nav