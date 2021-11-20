import { getToken } from 'next-auth/jwt';
import { Octokit } from "@octokit/rest";
import { useRouter } from 'next/router'

const secret = process.env.SECRET;
let accessToken;

export default async (req, res) => {
  const token = await getToken({ req, secret });
  const id = req.query
  const octokit = new Octokit();
  console.log(token)
  accessToken = token.accessToken;

  const data = await octokit.request('PUT /user/starred/{owner}/{repo}', {
    owner: id[0],
    repo: id[1]
  })

  res.status(200).json(data);
};