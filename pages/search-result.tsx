import Image from "next/image";
import { useEffect, useState } from "react";
import { colors } from "@libs/client/utils";
import Layout from "@components/layout";
import NoImage from "../public/no-image.jpeg";
import { NextPage, NextPageContext } from "next";
import { Enter } from "@prisma/client";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { ParkingLotHeader } from "@components/parkingLotHeader";

interface CarInfo {
  id?: number;
  carNo?: string;
  inTime?: string;
  imageUrl?: string;
}

interface PageResponse extends Enter {
  enter: boolean;
  enters: Enter[];
}

const SearchResult: NextPage<PageResponse> = ({ enter, enters }) => {
  const router = useRouter();
  const [focusCarInfo, setFocusCarInfo] = useState<CarInfo>({});
  const [imageUrl, setImageUrl] = useState<string>(
    enter ? enters[0].imageUrl : ""
  );

  useEffect(() => {
    enter ? setFocusCarInfo(enters[0]) : null;
  }, [enter]);

  return (
    <>
      <Layout commonBar>
        <div className={`flex flex-col items-center gap-3`}>
          <ParkingLotHeader />
          <div className={`my-3`}>
            <Image
              className={`h-52 w-96 rounded-xl`}
              src={
                !enter
                  ? imageUrl === ""
                    ? NoImage
                    : imageUrl
                  : imageUrl === ""
                  ? NoImage
                  : imageUrl
              }
              width={400}
              height={300}
              alt="image loading error"
              priority
            />
          </div>
          <div className={`text-center text-lg `}>
            주차비 할인을 적용할 차량을 선택하세요.
            <br />
            검색한 차량과 유사한 번호의 차량 목록입니다.
          </div>
        </div>

        <div className="mt-2 grid w-full grid-cols-9 gap-4 border-b py-3 text-center text-lg font-semibold">
          <div className=""></div>
          <div className="col-span-4">차량번호</div>
          <div className="col-span-4">입차일시</div>
        </div>

        <div className="mb-16">
          {enters.map((data, index) => (
            <button
              key={index}
              onClick={() => {
                setFocusCarInfo(data);
                setImageUrl(data.imageUrl);
              }}
              className={`text-md  grid w-full grid-cols-9 gap-0 py-4 text-center ${
                focusCarInfo.id === data.id
                  ? `border-[1.5px] border-red-500`
                  : null
              }`}
            >
              <div className={`place-self-center`}>
                {focusCarInfo.id === data.id ? (
                  <svg
                    className={`h-6 w-6 text-${colors.primaryColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </div>
              <div
                className={`col-span-4 ${
                  focusCarInfo.id === data.id
                    ? `text-${colors.primaryColor}`
                    : ""
                }`}
              >
                {data.carNumber}
              </div>
              <div
                className={`col-span-4 ${
                  focusCarInfo.id === data.id
                    ? `text-${colors.primaryColor}`
                    : ""
                }`}
              >
                {new Intl.DateTimeFormat("ko-kr", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Seoul",
                }).format(new Date(data.createdAt))}
              </div>
            </button>
          ))}
        </div>
      </Layout>
      <button
        onClick={() => {
          router.push(
            {
              pathname: "/discount",
              query: {
                id: focusCarInfo.id,
              },
            }
            // "/discount"
          );
        }}
        disabled={focusCarInfo.id ? false : true}
        className={`fixed bottom-0 w-full py-4  ${
          focusCarInfo.id
            ? `bg-${colors.primaryColor} cursor-pointer`
            : `cursor-not-allowed bg-gray-300`
        }  text-lg font-semibold text-white`}
      >
        차량 선택
      </button>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const {
    query: { carNumber },
  } = context;

  let enter = true;
  let enters = await client.enter.findMany({
    where: {
      carNumber: {
        contains: carNumber as string,
      },
    },
    take: 10,
  });

  if (enters?.length === 0) {
    enter = false;
    enters = await client?.enter.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return {
    props: {
      enter,
      enters: JSON.parse(JSON.stringify(enters)),
    },
  };
}

export default SearchResult;
