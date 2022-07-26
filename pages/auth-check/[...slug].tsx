import {
  Button,
  Center,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthCheck() {
  const router = useRouter();
  const { data: session, status } = useSession()
  let [redirect, setRedirect] = useState(true)
  let slug = (router.query.slug as String[]) || [];
  let url = router.query.returnTo as string

  useEffect(() => {
    setTimeout(() => {
      if (redirect) {
        if (status !== "unauthenticated") {
          router.push(`/api/internal-star/${slug.join('/')}?returnTo=${url}`)
        } else {
          signIn("github", { callbackUrl: `/auth-check/${slug.join('/')}?returnTo=${url}` })
        }
      }
    }, 5000)
  })

  return (
    <>
      <Head>
        <title>About to star {slug.join("/")}</title>
      </Head>
      <Center h="100vh">
        <VStack spacing={6}>
          <Spinner size="xl" />
          <VStack>
            <Heading size="md">About to star {slug.join("/")}</Heading>
            <Text>Continuing in 5 seconds</Text>
          </VStack>
          <Button onClick={() => {setRedirect(false); router.push(url)}}>Cancel and return to website</Button>
        </VStack>
      </Center>
    </>
  );
}
