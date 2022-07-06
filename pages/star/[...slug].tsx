import { useRouter } from 'next/router'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Link,
  Button,
  useDisclosure,
  Code,
  ButtonGroup,
  Box,
  Heading,
  Text,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react"
import useSWR from 'swr'
import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { CheckIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import splitbee from '@splitbee/web';
import { starEvent } from 'lib/constants';

const octokit = new Octokit();
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

function Repo(query) {
  const { data, error } = useSWR(query.query[0] ? 'https://api.github.com/repos/' + query.query[0] + '/' + query.query[1] : null, fetcher)
  const toast = useToast()

  if (data && data.message === 'Not Found') return <Alert status="error" rounded="md">
    <AlertIcon />
    <AlertTitle mr={2}>Repo not found</AlertTitle>
    <AlertDescription>Please check your URL...</AlertDescription>
  </Alert>

  if (error) return <Alert status="error" rounded="md">
    <AlertIcon />
    <AlertTitle mr={2}>Failed to load repo card</AlertTitle>
    <AlertDescription>Try again later...</AlertDescription>
  </Alert>
  if (!data) return <Box p="5" borderWidth="1px" rounded="md">
    <Skeleton>
      <Heading size="md" mb="10px">repoName</Heading>
    </Skeleton>
    <Skeleton>
      <Text mb="20px">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
    </Skeleton>
    <Skeleton>
      <Text as="i">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
    </Skeleton>
  </Box>

  // render data
  return <Box p="5" borderWidth="1px" rounded="md">
    <Heading size="md" mb="10px">{data.name}</Heading>
    <Text mb="20px">{data.description ? data.description : 'No description provided'}</Text>
    <Text as="i">This repo was created by {data.owner.login}</Text>
  </Box>
}

async function star(query, setLoading, setDone) {
  setLoading(true)
  await axios.post('/api/internal-star/' + query[0] + '/' + query[1]).then(() => {
    setDone(true)
    splitbee.track("clientside-star-success", {
      repo: query[0] + '/' + query[1]
    })
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    setLoading(false)
  })
}

const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug as String[] || []
  const { isOpen, onOpen, onClose } = useDisclosure({ 'defaultIsOpen': true })
  let [loading, setLoading] = useState(false)
  let [done, setDone] = useState(false)
  const toast = useToast()
  const { data: session, status } = useSession()
  const { data, error } = useSWR(slug[0] ? 'https://api.github.com/repos/' + slug[0] + '/' + slug[1] : null, fetcher)

  useEffect(() => {
    if (done === true) {
      toast({
        status: "success",
        title: "Starred successfully"
      })
    }
  }, [done])

  return (
    <>
      <Head>
        <title>Star {slug.join('/')}</title>
      </Head>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay />
        {status === "authenticated" && <ModalContent>
          <ModalHeader>Star {slug.join('/')}</ModalHeader>
          <ModalBody>
            You are about to star <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>.
            <br />
            <br />
            <Repo query={slug} />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button variant="ghost" onClick={() => router.back()}>Back</Button>
              <Button colorScheme={done ? "green" : "yellow"} isDisabled={done || data && data.message === 'Not Found'} isLoading={loading} onClick={() => star(slug, setLoading, setDone)}>
                {done ? <CheckIcon mx={2} /> : "Star"}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>}
        {status === "unauthenticated" && <ModalContent>
          <ModalHeader>Unauthenticated</ModalHeader>
          <ModalBody>
            To continue to star <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>, please signin with GitHub. You&apos;ll only need to do this once.
            <br />
            <br />
            <Repo query={slug} />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button variant="ghost" onClick={() => router.back()}>Back</Button>
              <Button isDisabled={data && data.message === 'Not Found'} colorScheme={"yellow"} onClick={() => signIn("github", { callbackUrl: `/star/${slug[0]}/${slug[1]}` })}>
                {"Sign in"}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>}
        {status === "loading" && <ModalContent>
          <ModalHeader>
            <Skeleton>
              Star {slug.join('/')}
            </Skeleton>
          </ModalHeader>
          <ModalBody>
            <Skeleton>
              You are about to star <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>.
            </Skeleton>
            <br />
            <br />
            <Skeleton>
              <Repo query={slug} />
            </Skeleton>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Skeleton>
                <Button variant="ghost">Back</Button>
              </Skeleton>
              <Skeleton>
                <Button colorScheme={done ? "green" : "yellow"} isDisabled={done} isLoading={loading} onClick={() => star(slug, setLoading, setDone)}>
                  {done ? <CheckIcon mx={2} /> : "Star"}
                </Button>
              </Skeleton>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>}
      </Modal>
    </>
  )
}

export default Comment