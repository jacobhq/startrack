import { useRouter } from 'next/router'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react"
import useSWR from 'swr'
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
import { GetServerSideProps } from 'next';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

async function star(repo, setLoading, setDone) {
  setLoading(true)
  await axios.post('/api/internal-star/' + repo).then(() => {
    setDone(true)
    splitbee.track("clientside-star-success", {
      repo: repo
    })
  }).catch((err) => {
    setTimeout(() => { }, 1000)
    throw err
  }).finally(() => {
    setLoading(false)
  })
}

export default function StarPage({ serverData }) {
  let [loading, setLoading] = useState(false)
  let [done, setDone] = useState(false)
  const { data: session, status } = useSession()
  let [isOpen, setIsOpen] = useState(true)
  const { data, error } = useSWR('https://api.github.com/repos/' + serverData.full_name, fetcher, { fallbackData: serverData })
  const title = `Star ${data.full_name}`

  function submit() {
    setLoading(true)
    if (status !== "authenticated") return signIn("github", { callbackUrl: `/star/${data.full_name}` })
    toast.promise(
      star(data.full_name, setLoading, setDone),
      {
        loading: 'Starring...',
        success: <b>Starred successfully!</b>,
        error: <b>Could not star.</b>,
      }
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
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
                    Continue to star {data.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-6">
                      You are about to star the repo {serverData.full_name}.
                    </p>
                    <div className='p-5 border rounded-md'>
                      <h1 className='text-lg font-bold w-3/4 truncate mb-2'>{data.name}</h1>
                      <p className='mb-4'>{data.description ? data.description : 'No description provided'}</p>
                      <div className="flex overflow-hidden">
                        <div className="block">
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:gray-yellow-300">{data.stargazers_count} stars</span>
                        </div>
                        <div className="block">
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{data.language}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button
                      variant='ghost'
                    >
                      Back
                    </Button>
                    <Button
                      onClick={submit}
                      loading={loading || status === "loading"}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug
  if (!slug[0] || !slug[1]) return { notFound: true }

  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/' + slug[0] + '/' + slug[1])
  if (res.status === 404) return { notFound: true }
  const data = await res.json()

  // Pass data to the page via props
  return { props: { serverData: data } }
}

