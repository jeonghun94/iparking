import Image from "next/image";
import { useEffect, useState } from "react";
import { colors } from "@libs/client/utils";
import Layout from "@components/layout";

interface CarInfo {
  inSeqNo?: number;
  carNo?: string;
  inTime?: string;
  imageUrl?: string;
}

export default function SearchResult() {
  const [focusCarInfo, setFocusCarInfo] = useState<CarInfo>({});
  const fakeData = [
    {
      inSeqNo: 1,
      carNo: "11가1111",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver1.com",
    },
    {
      inSeqNo: 2,
      carNo: "11가2222",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver2.com",
    },
    {
      inSeqNo: 3,
      carNo: "11가3333",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver3.com",
    },
    {
      inSeqNo: 4,
      carNo: "11가4444",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver4.com",
    },
    {
      inSeqNo: 5,
      carNo: "11가5555",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver5.com",
    },
    {
      inSeqNo: 6,
      carNo: "11가6666",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver6.com",
    },
    {
      inSeqNo: 7,
      carNo: "11가7777",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver7.com",
    },
    {
      inSeqNo: 8,
      carNo: "11가8888",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver8.com",
    },
    {
      inSeqNo: 9,
      carNo: "11가9999",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver9.com",
    },
    {
      inSeqNo: 10,
      carNo: "11가0000",
      inTime: "22.12.21 12:00",
      imageUrl: "http:naver10.com",
    },
  ];

  return (
    <>
      <Layout commonBar>
        <div className={`flex flex-col items-center gap-3`}>
          <div className={`w-full bg-gray-50 p-4 `}>
            <p className="text-center text-lg font-semibold">
              <span
                className={`mr-1 px-1 bg-${colors.primaryColor} text-md text-white`}
              >
                P
              </span>
              타임스퀘어[영등포점]
            </p>
          </div>
          <div className={`my-3`}>
            <div className="h-52 w-96 rounded-xl bg-slate-400">
              {focusCarInfo.imageUrl ? (
                // <Image
                //   src={focusCarInfo.imageUrl}
                //   alt="Picture of the author"
                //   className={`rounded-xl`}
                // />
                <p>{focusCarInfo.imageUrl}</p>
              ) : null}
            </div>
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
        {fakeData.map((data, index) => (
          <button
            key={index}
            onClick={() => setFocusCarInfo(data)}
            className={`mt-2 grid w-full grid-cols-9 gap-0 py-3 text-center text-lg focus:border-[1.5px] focus:border-red-500`}
          >
            <div className={`place-self-center`}>
              {focusCarInfo.inSeqNo === data.inSeqNo ? (
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
                focusCarInfo.inSeqNo === data.inSeqNo
                  ? `text-${colors.primaryColor}`
                  : ""
              }`}
            >
              {data.carNo}
            </div>
            <div
              className={`col-span-4 ${
                focusCarInfo.inSeqNo === data.inSeqNo
                  ? `text-${colors.primaryColor}`
                  : ""
              }`}
            >
              {data.inTime}
            </div>
          </button>
        ))}
      </Layout>
      <button
        onClick={() => {
          console.log(focusCarInfo);
        }}
        disabled={focusCarInfo.inSeqNo ? false : true}
        className={`fixed bottom-0 w-full py-4  ${
          focusCarInfo.inSeqNo
            ? `bg-${colors.primaryColor} cursor-pointer`
            : `cursor-not-allowed bg-gray-300`
        }  text-lg font-semibold text-white`}
      >
        차량 선택
      </button>
    </>
  );
}
