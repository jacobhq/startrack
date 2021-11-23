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
} from "@chakra-ui/react"
import useSWR from 'swr'
import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';

const octokit = new Octokit();
const fetcher = (...args) => fetch(...args).then(res => res.json())

function Repo(query) {
  const { data, error } = useSWR('https://api.github.com/repos/' + query.query[0] + '/' + query.query[1], fetcher)

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

async function star(query) {
  console.log(query)
  const { data } = await axios.get('/api/' + query[0] + '/' + query[1], {
    withCredentials: true,
  });
  console.log(data)
}

const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug || []
  const { isOpen, onOpen, onClose } = useDisclosure({ 'defaultIsOpen': true })
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  let [token, setToken] = useState()
  axios.get('/api/getToken').then(function (res) {
    setToken(res)
  })
  console.log(token)

  return (
    <>
      <h1>Slug: {slug.join('/')}</h1>
      <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Star {slug.join('/')}</ModalHeader>
            <ModalBody>
              You are about to star <Link href={`https://github.com/` + slug.join('/')} isExternal><Code>{slug.join('/')}</Code></Link>.
              <br />
              <br />
              <Repo query={slug} />
            </ModalBody>

            <ModalFooter>
              <ButtonGroup>
                <Button variant="ghost">Back</Button>
                <Button colorScheme="yellow" onClick={() => star(slug)}>
                  Star
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  )
}

export default Comment