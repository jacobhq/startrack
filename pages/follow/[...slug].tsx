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
  Tooltip,
  Avatar,
  Flex,
  Image
} from "@chakra-ui/react"
import useSWR from 'swr'
import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { CheckIcon } from '@chakra-ui/icons';
import Head from 'next/head';

const octokit = new Octokit();
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

function UserCard(query) {
  const { data, error } = useSWR(query.query[0] ? 'https://api.github.com/users/' + query.query[0] : null, fetcher)
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
  return <Flex alignItems="center" direction="column" mb={2} textAlign="center">
    <Image
      h={'120px'}
      w={'full'}
      src={
        '/banner.png'
      }
      objectFit={'cover'}
      borderTopRadius={10}
    />
    <Avatar
      size={'xl'}
      src={data.avatar_url}
      alt={'Author'}
      mt={-12}
      css={{
        boxShadow: '0 0 0 5px white',
      }}
    />
    <Heading size="md" mb="10px" mt={4}>{data.name}</Heading>
    <Text mb="20px">{data.bio ? data.bio : 'No bio provided'}</Text>
    <Text as="i">{data.followers} followers • {data.public_repos} public repos</Text>
  </Flex>
}

async function star(query, setLoading, setDone) {
  setLoading(true)
  const data = await axios.post('/api/star/' + query[0] + '/' + query[1]).then(() => {
    setDone(true)
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
  const { data, error } = useSWR(slug[0] ? 'https://api.github.com/users/' + slug[0] : null, fetcher)

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
        <title>Follow {slug[0]}</title>
      </Head>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay />
        {status === "authenticated" && <ModalContent>
          <ModalHeader>Follow {slug[0]}</ModalHeader>
          <ModalBody>
            You are about to follow <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>.
            <br />
            <br />
            <UserCard query={slug} />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button variant="ghost" onClick={() => router.back()}>Back</Button>
              <Button colorScheme={done ? "green" : "yellow"} isDisabled={done || data && data.message === 'Not Found'} isLoading={loading} onClick={() => star(slug, setLoading, setDone)}>
                {done ? <CheckIcon mx={2} /> : "Follow"}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>}
        {status === "unauthenticated" && <ModalContent>
          <ModalHeader>Unauthenticated</ModalHeader>
          <ModalBody>
            To continue to follow <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>, please signin with GitHub. You&apos;ll only need to do this once.
            <br />
            <br />
            <UserCard query={slug} />
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
              Follow {slug.join('/')}
            </Skeleton>
          </ModalHeader>
          <ModalBody>
            <Skeleton>
              You are about to follow <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>.
            </Skeleton>
            <br />
            <br />
            <Skeleton>
              <UserCard query={slug} />
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