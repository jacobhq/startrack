import Head from 'next/head'
import Link from 'next/link'
import router, { withRouter } from 'next/router'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, useColorMode } from '@chakra-ui/react'
import { ArrowBackIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'

function Nav({ router }) {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <HStack position="fixed" padding="25px" justify="space-between" width="100vw">
            {router.pathname != '/' ? <Link href="/">
                <IconButton isRound variant="ghost" size="lg" icon={<ArrowBackIcon />} />
            </Link> : <div></div>}
            <ButtonGroup>
                <Button variant="ghost">Startrack</Button>
                <Button variant="ghost">GitHub</Button>
                <Button variant="ghost">Twitter</Button>
            </ButtonGroup>
            <IconButton isRound variant="ghost" size="lg" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} />
        </HStack>
    )
}

export default withRouter(Nav)