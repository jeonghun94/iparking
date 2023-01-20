import Logo from "../public/iparking-logo.png";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { cls, colors } from "@libs/client/utils";
import Banner from "@components/banner";

export default function Home() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col items-center justify-center p-3">
      <Head>
        <title>i PARKING - MEMBERS</title>
        <meta name="description" content="i PARKING - MEMBERS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../public/favicon.png" />
      </Head>
      <Image
        className="-mt-20 mb-8 flex place-self-start object-cover"
        src={Logo}
        width={360}
        alt={"Next.js Logo"}
        priority
      />

      <input
        className="w-full rounded-t-md border border-gray-400 px-4 py-3 text-lg"
        placeholder="아이디"
      />
      <input
        className="w-full rounded-b-md border border-t-0 border-gray-400 px-4 py-3 text-lg"
        placeholder="비밀번호"
      />
      <div className="my-4 flex w-full items-center">
        <input
          id="checkbox"
          type="checkbox"
          value=""
          className={`h-4 w-4 accent-${colors.primaryColor} rounded-none border-gray-200 bg-gray-100`}
        />
        <label
          htmlFor="checkbox"
          className="accent- ml-2 text-lg font-medium text-gray-500"
        >
          자동 로그인
        </label>
      </div>
      <Link
        className={cls(
          `my-5  w-full rounded-md bg-red-500  p-4 text-center text-xl font-semibold text-white hover:bg-red-600`
        )}
        href={"/search"}
      >
        로그인
      </Link>
      <div className="mt-8 flex flex-col items-center justify-center space-y-3 text-lg">
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
