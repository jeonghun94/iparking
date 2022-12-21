import React from "react";
import Link from "next/link";
import { cls, colors } from "../libs/client/utils";
import { useRouter } from "next/router";
import Head from "next/head";

interface LayoutProps {
  commonBar: boolean;
  children: React.ReactNode;
  seoTitle?: string;
}

export default function Layout({ commonBar, children, seoTitle }: LayoutProps) {
  const headTitle = `${
    seoTitle ? `${seoTitle} | Carrot Market` : "Carrot Market"
  }`;
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      {commonBar ? (
        <header
          className={`fixed top-0 z-10 flex h-14 w-full max-w-full  items-center justify-between
            border-b bg-white px-3 text-lg font-medium text-gray-800`}
        >
          <div className="flex space-x-3">
            <button onClick={onClick}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <p className="text-lg font-bold">주차비 할인</p>
          </div>
          <div>
            <button onClick={() => router.push("/")}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </div>
        </header>
      ) : null}
      <main className="relative top-14 h-full border-b p-3">{children}</main>
      {/* {bottomBar ? (
        <button
          className={`fixed bottom-0 w-full py-4 bg-${colors.primaryColor} text-lg font-semibold text-white`}
        >
          차량 선택
        </button>
      ) : null} */}
    </>
  );
}
