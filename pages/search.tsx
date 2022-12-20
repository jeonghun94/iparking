import Image from "next/image";
import { useState } from "react";
import { colors } from "@libs/client/utils";
import HeaderLogo from "../public/header-logo.jpeg";

export default function Search() {
  const initTime = new Intl.DateTimeFormat("ko-kr", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  const [currentTime, setCurrentTime] = useState(initTime);

  const refreshTime = () => {
    setCurrentTime(initTime);
  };

  return (
    <div className="w-full h-screen bg-slate-50">
      <header className="h4 flex justify-between items-center px-5 border-b bg-white">
        <p></p>
        <Image src={HeaderLogo} alt="header-logo" height={50} />
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </header>

      <div className="p-3 bg-white">
        <select className="w-full h-auto p-2 rounded-md border">
          <option>CGV1</option>
        </select>
      </div>

      <div className="flex flex-col gap-5 items-center px-10 py-5  bg-gray-100 shadow-gray-300 shadow-inner">
        <p className="text-lg font-semibold">차량번호 4자리를 입력하세요.</p>
        <div className="flex gap-3">
          <input
            className="p-2 placeholder:text-gray-300 text-center text-2xl tracking-widest font-bold  border rounded-3xl bg-white"
            type="text"
            placeholder="1234"
          />
          <button
            className={`px-6 py-2 rounded-3xl text-white bg-${colors.primaryColor}`}
          >
            검색
          </button>
        </div>
        <div>
          <p className={`text-${colors.primaryColor} text-sm text-center`}>
            ※ 입차 시에 차량번호가 잘못 인식된 경우,
            <br />
            검색 결과가 나오지 않을 수 있습니다.
          </p>
        </div>
      </div>

      <div className="p-3 bg-white shadow-md ">
        <div className="w-full flex justify-between items-center">
          <span className=" font-semibold">할인권 잔여 수량</span>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-500">{currentTime}</span>
            <svg
              onClick={refreshTime}
              className="w-5 h-5 p-1 bg-gray-400 rounded-full text-white cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>
        <select className="w-full h-auto my-3 p-2 rounded-md border">
          <option>타임스퀘어[영등포점]</option>
        </select>
      </div>

      <div className="mt-8 mx-5 p-3 rounded-sm bg-white shadow-md">
        <div className="flex justify-between items-center">
          <p className={`flex text-${colors.primaryColor} font-semibold`}>
            3시간할인
            <span
              className={`ml-3 px-2 py-1 rounded-2xl bg-${colors.primaryColor} text-white text-xs font-normal items-center`}
            >
              현재기준
            </span>
          </p>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>

        <div className="flex items-center w-full my-3">
          <div className="flex justify-between items-center w-1/2">
            <p className="text-sm text-gray-500">잔여</p>
            <p className="text-2xl font-semibold">무제한</p>
          </div>
          <p className="mx-3 text-gray-200">&#124;</p>
          <div className="flex justify-between items-center w-1/2">
            <p className="text-sm text-gray-500">금일 사용</p>
            <p className="text-2xl font-semibold">111</p>
          </div>
        </div>
        <select className="w-full h-auto my-0 p-2 rounded-md border text-center text-sm text-gray-600">
          <option>사용시간 : 00:00 ~ 23:59</option>
        </select>
      </div>
    </div>
  );
}
