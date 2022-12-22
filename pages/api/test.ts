import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fakeData = [
    {
      inSeqNo: 1,
      carNo: "314로1091",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver1.com",
    },
    {
      inSeqNo: 2,
      carNo: "27소7218",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver2.com",
    },
    {
      inSeqNo: 3,
      carNo: "33오7511",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver3.com",
    },
    {
      inSeqNo: 4,
      carNo: "35러1051",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver4.com",
    },
    {
      inSeqNo: 5,
      carNo: "경기95자1921",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver5.com",
    },
    {
      inSeqNo: 6,
      carNo: "359더1561",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver6.com",
    },
    {
      inSeqNo: 7,
      carNo: "62무1601",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver7.com",
    },
    {
      inSeqNo: 8,
      carNo: "경기91아9011",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver8.com",
    },
    {
      inSeqNo: 9,
      carNo: "157호9281",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver9.com",
    },
    {
      inSeqNo: 10,
      carNo: "143무7011",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver10.com",
    },
  ];

  // for (const data of fakeData) {
  //   await client.enter.createMany({
  //     data: {
  //       carNumber: data.carNo,
  //       imageUrl: data.imageUrl,
  //       parkingLotId: 1,
  //     },
  //   });
  // }

  res.json({
    ok: true,
  });
}
