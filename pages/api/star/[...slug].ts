import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    let slug = (req.query.slug as String[]) || [];
    let url = req.query.returnTo
    
    res.redirect(`/auth-check/${slug.join('/')}?returnTo=${url}`)
}