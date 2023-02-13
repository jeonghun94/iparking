// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { DiscountHistory } from "@prisma/client";

type Data = {
  ok: boolean;
  data: DiscountHistory[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { count, memo, enterId, couponId } = req.body;

  if (count && memo && enterId && couponId) {
    await client.discountHistory.create({
      data: {
        userId: 1,
        couponId,
        memo,
        enterId,
      },
    });

    console.log("create생성함");
  }

  const result: any = new Array();

  const discountHistory = await client.discountHistory.groupBy({
    by: ["couponId", "userId"],
    where: {
      enterId,
    },
    _count: {
      id: true,
    },
  });

  for await (const history of discountHistory) {
    const coupon = await client.coupon.findFirst({
      where: {
        id: history.couponId,
        AND: {
          DisocuntHistory: {
            some: {
              userId: history.userId,
            },
          },
        },
      },
      select: {
        name: true,
        DisocuntHistory: {
          where: {
            userId: history.userId,
          },
          select: {
            userId: true,
          },
        },
      },
    });

    result.push({
      count: history._count.id,
      name: coupon?.name,
      userId: coupon?.DisocuntHistory[0].userId,
    });
  }

  res.status(200).json({ ok: true, data: result });
}
