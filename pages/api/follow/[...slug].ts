import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';
import { getToken } from "next-auth/jwt"
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const secret = process.env.SECRET

export default async (req, res) => {
  const { slug } = req.query
  const session = await getSession({ req })
  if (!session) return res.status(401).send("Need authentication")
  if (!slug[0] || req.method !== "POST") return res.status(400).send("Bad request")

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email
    }
  })

  const account = await prisma.account.findFirst({
    where: {
      userId: user.id,
      provider: "github"
    }
  })

  if (!account) return res.status(401).text("Need gh account")

  const octokit = new Octokit({
    auth: account.access_token,
  })

  await octokit.request('PUT /user/following/{username}', {
    username: slug[0],
  })

  res.status(201).send("Done")
};