import { useRouter } from 'next/router'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Code
  } from "@chakra-ui/react"

const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug || []
  const { onOpen, onClose } = useDisclosure()
  const { isOpen } = useDisclosure(true)

  return (
    <>
      <h1>Slug: {slug.join('/')}</h1>
      <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Star {slug.join('/')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You are about to star <Code>{slug.join('/')}</Code>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    </>
  )
}

export default Comment