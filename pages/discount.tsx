import Image from "next/image";
import { useEffect, useState } from "react";
import { colors, convertTime, convertTimeIntl } from "@libs/client/utils";
import Layout from "@components/layout";
import NoImage from "../public/no-image.jpeg";
import { NextPage, NextPageContext } from "next";
import { Coupon, Enter } from "@prisma/client";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { ParkingLotHeader } from "@components/parkingLotHeader";

interface DiscountProps {
  carInfo: Enter;
  coupons: Coupon[];
}

const Discount: NextPage<DiscountProps> = ({ carInfo, coupons }) => {
  const router = useRouter();

  console.log(carInfo, "carInfo");
  return (
    <>
      <Layout commonBar>
        <div className={`flex flex-col items-center gap-3`}>
          <ParkingLotHeader />
          <div className="my-1 flex w-full gap-3 ">
            <div className="relative w-full">
              <Image
                src={carInfo.imageUrl ? carInfo.imageUrl : NoImage}
                className="h-44 w-56 rounded-xl"
                width={400}
                height={300}
                alt="image loading error"
                priority
              />
              <p className="absolute bottom-0 w-56 rounded-br-xl rounded-bl-xl bg-gray-700 bg-opacity-30 py-2 text-center text-white">
                {carInfo.carNumber}
              </p>
            </div>
            <div className="flex w-full flex-col items-start justify-center ">
              <div className="text-md flex flex-col gap-1 text-center text-lg font-semibold">
                <div className="flex flex-col items-start text-sm ">
                  <p className="text-center text-gray-400">주차시간</p>
                  <p className={`text-${colors.primaryColor} text-lg`}>
                    {convertTime(carInfo.createdAt.toString())}
                  </p>
                </div>
                <div className="flex flex-col items-start text-sm">
                  <p className="text-center text-gray-400">입차일시</p>
                  <p className="text-[16px]">
                    {convertTimeIntl(carInfo.createdAt.toString())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-28 mt-2 h-auto w-full">
          <div className="">
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">보유 할인권</h3>
            </div>
            <div className="flex h-auto w-full flex-col items-center p-3">
              {coupons && coupons.length > 0
                ? coupons.map((coupon, index) => (
                    <div key={index} className="my-2 flex w-full items-center">
                      <div className="w-1/2">
                        <p>{coupon.name}</p>
                      </div>
                      <div className="flex w-1/2 items-center justify-between">
                        <p>
                          <span className={`text-${colors.primaryColor}`}>
                            무제한
                          </span>{" "}
                          / 무제한
                        </p>
                        <button
                          className={`bg-${colors.primaryColor} text-md rounded-md px-4 py-1.5 text-white`}
                        >
                          적용
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div>
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">우리 매장 할인 내역</h3>
            </div>
            <div className="flex justify-center p-14">
              <p>
                <span className={`text-${colors.primaryColor}`}>할인 내역</span>
                이 없습니다.
              </p>
            </div>
          </div>
          <div>
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">총 할인 내역 및 적용 수량</h3>
            </div>
            <div className="flex justify-center p-14">
              <p className="font-semibold">
                <span className={`text-${colors.primaryColor}`}>
                  총 할인 내역
                </span>
                이 없습니다.
              </p>
            </div>
          </div>
        </div>
      </Layout>

      <div className="fixed bottom-0 w-full">
        <p className="mb-3 bg-white text-center text-sm text-gray-500">
          ※ 추가 요금 발생 시 할인 금액이 달라질 수 있습니다.
          <br /> 최종 할인 내역은{" "}
          <span className={`text-${colors.primaryColor}`}>
            {" "}
            주차비 할인
          </span>{" "}
          내역에서 확인해주세요.
        </p>
        <button
          onClick={() => {
            router.push("/");
          }}
          className={`w-full py-4  bg-${colors.primaryColor} cursor-pointer
          text-lg font-semibold text-white`}
        >
          홈으로
        </button>
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const {
    query: { id },
  } = context;

  const carInfo = await client.enter.findFirst({
    where: {
      id: Number(id),
    },
  });

  const coupons = await client.coupon.findMany({});

  console.log(coupons, "coupons");

  return {
    props: {
      carInfo: JSON.parse(JSON.stringify(carInfo)),
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}

export default Discount;
