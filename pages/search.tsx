import Image from "next/image";
import { useState } from "react";
import { colors } from "@libs/client/utils";
import HeaderLogo from "../public/header-logo.png";
import Banner from "@components/banner";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface EnterForm {
  carNumber: string;
}

export default function Search() {
  const router = useRouter();

  const initTime = new Intl.DateTimeFormat("ko-kr", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  const [currentTime, setCurrentTime] = useState(initTime);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterForm>();

  const refreshTime = () => {
    setCurrentTime(initTime);
  };

  const onVaild = (data: EnterForm) => {
    const { carNumber } = data;
    router.push({
      pathname: "/search-result",
      query: { carNumber },
    });
  };

  return (
    <div className="h-screen w-full bg-slate-50">
      <header className="h4 flex items-center justify-between border-b bg-white px-5">
        <p></p>
        <Image
          className="py-2"
          src={HeaderLogo}
          alt="header-logo"
          width={300}
        />
        <svg
          className="h-6 w-6"
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

      <div
        className={`flex items-center justify-between px-3 py-6 bg-${colors.primaryColor} text-white`}
      >
        <p
          className={`rounded-2xl bg-white  px-2.5 py-0.5 text-sm text-red-500`}
        >
          긴급공지
        </p>
        <p className="font-semibold">
          [공지] i PARKING 멤버스 고객센터 운영시간 변경 안내
        </p>
        <p>21.01.27</p>
      </div>

      <div className="bg-white px-3 py-4">
        <select className="h-auto w-full rounded-md border p-2">
          <option>CGV1</option>
        </select>
      </div>

      <form onSubmit={handleSubmit(onVaild)}>
        <div className="flex flex-col items-center gap-5 bg-gray-100 px-10  py-8 shadow-inner shadow-gray-300">
          {errors.carNumber && (
            <p className={`text-center text-sm text-red-500`}>
              {errors.carNumber.message}
            </p>
          )}
          <p className="text-xl font-semibold">차량번호 4자리를 입력하세요.</p>
          <div className="flex gap-3">
            <input
              type={"number"}
              defaultValue={""}
              className={`rounded-3xl border bg-white p-2 text-center text-2xl  font-bold tracking-widest placeholder:text-gray-300 focus:border focus:border-${colors.primaryColor}`}
              placeholder="1234"
              {...register("carNumber", {
                required: {
                  value: true,
                  message: "차량번호를 입력해주세요.",
                },
                minLength: {
                  value: 4,
                  message: "4자리를 입력해주세요.",
                },
              })}
              onChange={(e) => {
                if (e.target.value.length > 4) {
                  e.target.value = e.target.value.substring(0, 4);
                }
              }}
            />
            <button
              className={`rounded-3xl px-6 py-2 text-lg text-white bg-${colors.primaryColor}`}
            >
              검색
            </button>
          </div>

          <div>
            <p className={`text-${colors.primaryColor} text-center text-sm`}>
              ※ 입차 시에 차량번호가 잘못 인식된 경우,
              <br />
              검색 결과가 나오지 않을 수 있습니다.
            </p>
          </div>
        </div>
      </form>

      <div className="bg-white p-3 shadow-md ">
        <div className="flex w-full items-center justify-between">
          <span className="py-1.5 text-lg font-semibold">할인권 잔여 수량</span>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-500">{currentTime}</span>
            <svg
              onClick={refreshTime}
              className="h-5 w-5 cursor-pointer rounded-full bg-gray-400 p-1 text-white"
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
        <select className="my-3 h-auto w-full rounded-md border p-2">
          <option>타임스퀘어[영등포점]</option>
        </select>
      </div>

      <div className="mx-5 mt-8 rounded-sm bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <p
            className={`flex text-xl text-${colors.primaryColor} font-semibold`}
          >
            3시간할인
            <span
              className={`ml-3 rounded-2xl px-3 py-1 bg-${colors.primaryColor} items-center text-sm font-normal text-white`}
            >
              현재기준
            </span>
          </p>
          <svg
            className="h-4 w-4 text-gray-400"
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

        <div className="my-4 flex w-full items-center">
          <div className="flex w-1/2 items-center justify-between">
            <p className="text-lg font-semibold">잔여</p>
            <p className="text-2xl font-semibold">무제한</p>
          </div>
          <p className="mx-3 text-gray-200">&#124;</p>
          <div className="flex w-1/2 items-center justify-between">
            <p className="text-lg font-semibold">금일 사용</p>
            <p className="text-2xl font-semibold">111</p>
          </div>
        </div>

        <select className="mt-1 h-auto w-full rounded-md border p-2 text-center text-sm text-gray-600">
          <option>사용시간 : 00:00 ~ 23:59</option>
        </select>
      </div>
      <div className="flex justify-center">
        <Banner />
      </div>
    </div>
  );
}
