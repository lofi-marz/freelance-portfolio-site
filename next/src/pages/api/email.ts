import type { NextApiRequest, NextApiResponse } from 'next';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405);
    const email = req.query.email;
    if (!email || typeof email !== 'string') return res.status(422);
    const { data, error } = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
    });

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json(data);
}

export default handler;
