import Head from 'next/head'
import Link from 'next/link'
import { Center, Heading, VStack, HStack, Text, Button, ButtonGroup, Divider, Input, Textarea, IconButton, List, ListItem, ListIcon, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Radio, RadioGroup, } from '@chakra-ui/react'
import Nav from '../components/nav'
import { useState } from 'react'
import { CheckCircleIcon, CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { Code as CodeIcon, Server as ServerIcon, Hash as HashIcon } from 'react-feather'

function StepContent(i) {
    let [ghUser, setUser] = useState('')
    let [ghRepo, setRepo] = useState('')
    let [method, setMethod] = useState('link')

    let ghProcUser = ghUser !== '' ? ghUser : '[github username]'
    let ghProcRepo = ghRepo !== '' ? ghRepo : '[github repo]'

    if (i.i === 0) return <VStack width="100%">
        <Input colorScheme='yellow' placeholder="Github username" value={ghUser} onChange={e => setUser(e.target.value)} />
        <Input colorScheme='yellow' placeholder="Github repo name" value={ghRepo} onChange={e => setRepo(e.target.value)} />
    </VStack>

    if (i.i === 1) return <RadioGroup onChange={setMethod} value={method} colorScheme='yellow'>
        <VStack>
            <Radio value='link'>Link</Radio>
            <Radio value='api'>API</Radio>
        </VStack>
    </RadioGroup>

    if (i.i === 2) return <VStack>
        <Textarea placeholder="Here is a sample placeholder" backgroundColor="blackAlpha.800" resize="none" border="none" color="white" focusBorderColor="transparent" readOnly value={'<a href="https://startrack.vercel.app/star/' + ghProcUser + '/' + ghProcRepo + '>Star</a>'} />
        <ButtonGroup>
            <Button>Copy to clipboard</Button>
        </ButtonGroup>
    </VStack>

    else return null
}

const Chooser = () => {
    const steps = [{ label: "Define variables", icon: HashIcon }, { label: "Choose method", icon: ServerIcon }, { label: "Copy code", icon: CodeIcon }]
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    return (
        <> 
            {activeStep <= steps.length - 1 ? <Steps orientation="vertical" activeStep={activeStep} colorScheme='yellow'>
                {steps.map(({ label, icon }, index) => (
                    <Step width="100%" label={label} key={label} icon={icon}>
                        <StepContent i={index} />
                    </Step>
                ))}
            </Steps> : null}
            {activeStep === 3 ? (
                <Center p={4} flexDir="column">
                    <Heading fontSize="xl">Woohoo! Your app now works with startrack!</Heading>
                    <Button mt={6} size="sm" onClick={reset}>
                        Reset
                    </Button>
                </Center>
            ) : (
                <Flex width="100%" justify="flex-end">
                    <Button
                        mr={4}
                        size="sm"
                        variant="ghost"
                        onClick={prevStep}
                        isDisabled={activeStep === 0}
                    >
                        Prev
                    </Button>
                    <Button size="sm" onClick={nextStep} colorScheme={activeStep === steps.length - 1 ? "yellow" : null}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Flex>
            )}
        </>
    )
}

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
                <Center width='100vw' height='100vh' padding='0'>
                    <VStack spacing='24px' padding='0%' minWidth="25%">
                        <Heading size='xl'>Ready to go?</Heading>
                        <Text>Here&apos;s how to get started.</Text>
                        <Divider />
                        <Chooser />
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
    return { props: { result: result.toString() } }
}

