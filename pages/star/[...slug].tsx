import { useRouter } from 'next/router'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react"
import useSWR from 'swr'
import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { CheckIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import splitbee from '@splitbee/web';
import { starEvent } from 'lib/constants';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import toast from "react-hot-toast"

const octokit = new Octokit();
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

function Repo(query) {
  const { data, error } = useSWR(query.query[0] ? 'https://api.github.com/repos/' + query.query[0] + '/' + query.query[1] : null, fetcher)
  console.log(data)

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
  if (!data) return <div role="status" className='p-5 border rounded-md animate-pulse'>
    <div className="h-5 bg-gray-200 rounded-sm dark:bg-gray-700 w-3/4 mb-4"></div>
    <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-700 w-full mb-8"></div>
  </div>

  // render data
  return <div className='p-5 border rounded-md'>
    <h1 className='text-lg font-bold w-3/4 truncate mb-3'>{data.name}</h1>
    <p className='mb-2'>{data.description ? data.description : 'No description provided'}</p>
    <div className="flex overflow-hidden">
      <div className="block">
        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:gray-yellow-300">{data.stargazers_count} stars</span>
      </div>
      <div className="block">
        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{data.language}</span>
      </div>
    </div>
  </div>
}

async function star(query, setLoading, setDone) {
  setLoading(true)
  await axios.post('/api/internal-star/' + query[0] + '/' + query[1]).then(() => {
    setDone(true)
    splitbee.track("clientside-star-success", {
      repo: query[0] + '/' + query[1]
    })
  }).catch((err) => {
    setTimeout(() => { }, 1000)
    throw err
  }).finally(() => {
    setLoading(false)
  })
}

const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug as String[] || []
  let [loading, setLoading] = useState(false)
  let [done, setDone] = useState(false)
  const { data: session, status } = useSession()
  const { data, error } = useSWR(slug[0] ? 'https://api.github.com/repos/' + slug[0] + '/' + slug[1] : null, fetcher)
  let [isOpen, setIsOpen] = useState(true)

  function submit() {
    setLoading(true)
    if (status !== "authenticated") return signIn("github", { callbackUrl: `/star/${slug[0]}/${slug[1]}` })
    toast.promise(
      star(slug, setLoading, setDone),
      {
        loading: 'Starring...',
        success: <b>Starred successfully!</b>,
        error: <b>Could not star.</b>,
      }
    );
  }

  useEffect(() => {
    if (done === true) {
      toast("Starred successfully")
    }
  }, [done])

  return (
    <>
      <Head>
        <title>Star {slug.join('/')}</title>
      </Head>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => console.log("")}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Continue to star {slug[1]}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-6">
                      You are about to star the repo {slug.join('/')}.
                    </p>
                    <Repo query={slug} />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={submit}
                      loading={loading || status === "loading"}
                      disabled={data && data.message === 'Not Found'}
                    >
                      {status === "authenticated" ? "Star and return to site" : "Continue with github"}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Comment