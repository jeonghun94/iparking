import Logo from "../public/iparking-logo.png";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { colors } from "@libs/client/utils";
import Banner from "@components/banner";

export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col justify-center items-center p-3">
      <Head>
        <title>i PARKING - MEMBERS</title>
        <meta name="description" content="i PARKING - MEMBERS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../public/favicon.png" />
      </Head>
      <Image
        className="-mt-20 mb-8 object-cover flex place-self-start"
        src={Logo}
        width={360}
        alt={"Next.js Logo"}
        priority
      />

      <input
        className="w-full px-4 py-3 text-lg rounded-t-md border border-gray-400"
        placeholder="아이디"
      />
      <input
        className="w-full px-4 py-3 text-lg rounded-b-md border border-t-0 border-gray-400"
        placeholder="비밀번호"
      />
      <div className="w-full flex items-center my-4">
        <input
          id="checkbox"
          type="checkbox"
          value=""
          className={`w-4 h-4 accent-${colors.primaryColor} rounded-none bg-gray-100 border-gray-200`}
        />
        <label
          htmlFor="checkbox"
          className="ml-2 text-lg accent- font-medium text-gray-500"
        >
          자동 로그인
        </label>
      </div>
      <Link
        className={`w-full  my-5 p-4 rounded-md bg-${colors.primaryColor} text-white text-xl text-center font-semibold`}
        href={"/search"}
      >
        로그인
      </Link>
      <div className="flex flex-col justify-center items-center mt-8 space-y-3 text-lg">
        <p>
          아이파킹 고객센터{" "}
          <strong className={`text-${colors.primaryColor} font-semibold`}>
            070-5039-1402
          </strong>
        </p>
        <p className="text-gray-800">&#169;PARKING CLOUD.</p>
      </div>

      <Banner />
    </div>
  );
}
