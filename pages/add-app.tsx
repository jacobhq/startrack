import Head from 'next/head'
import { Center, Heading, VStack, Text, Button, ButtonGroup, Divider, Input, Textarea, Flex, Radio, RadioGroup, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Container, Code } from '@chakra-ui/react'
import Nav from '../components/nav'
import { useEffect, useState } from 'react'
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { Code as CodeIcon, Server as ServerIcon, Hash as HashIcon } from 'react-feather'

export default function Home() {
    let [ghUser, setUser] = useState('')
    let [ghRepo, setRepo] = useState('')

    return (
        <div>
            <Head>
                <title>Signup | Startrack</title>
                <meta name='description' content='Create visual feedback in your app, based on wether your github repo is starred.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main>
                <Nav />
                <Container minH="100vh">
                    <Center flexDirection="column" minH="100vh" style={{ gap: "var(--chakra-sizes-4)" }}>
                        <Heading size='xl'>Ready to go?</Heading>
                        <Text>Here&apos;s how to get started.</Text>
                        <Divider />
                        <Box>
                            <Heading size="md" mb={4}>Enter details</Heading>
                            <Input value={ghUser} onChange={e => setUser(e.target.value)} placeholder='Github username' mb={3} />
                            <Input value={ghRepo} onChange={e => setRepo(e.target.value)} placeholder='Github repo' />
                        </Box>
                        <Box w="full">
                            <Heading size="md" mb={4}>Get snippet</Heading>
                            <Tabs colorScheme="yellow">
                                <TabList>
                                    <Tab>HTML</Tab>
                                    <Tab>Markdown</Tab>
                                    <Tab>URL</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Code w="full" p={4} borderRadius={6}>{'<a href="https://startrack.vercel.app/star/' + ghUser + '/' + ghRepo + '>Star</a>'}</Code>
                                    </TabPanel>
                                    <TabPanel>
                                        <Code w="full" p={4} borderRadius={6}>[Star]({'https://startrack.vercel.app/star/' + ghUser + '/' + ghRepo})</Code>
                                    </TabPanel>
                                    <TabPanel>
                                        <Code w="full" p={4} borderRadius={6}>{'https://startrack.vercel.app/star/' + ghUser + '/' + ghRepo}</Code>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Center>
                </Container>
            </main>
        </div>
    )
}
