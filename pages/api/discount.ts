// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { DisocuntHistory } from "@prisma/client";

type Data = {
  ok: boolean;
  data: DisocuntHistory[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { count, memo, enterId } = req.body;

  await client.disocuntHistory.create({
    data: {
      userId: 1,
      couponId: 1,
      memo,
      enterId,
    },
  });

  const disocuntHistory = await client.disocuntHistory.findMany({
    where: {
      enterId,
    },
  });

  res.status(200).json({ ok: true, data: disocuntHistory });
}
