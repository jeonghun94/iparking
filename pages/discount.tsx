import Image from "next/image";
import { useEffect, useState } from "react";
import {
  calculateEnterTime,
  colors,
  convertTime,
  convertTimeIntl,
} from "@libs/client/utils";
import Layout from "@components/layout";
import NoImage from "../public/no-image.jpeg";
import { NextPage, NextPageContext } from "next";
import { Coupon, DiscountHistory, Enter } from "@prisma/client";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { ParkingLotHeader } from "@components/parkingLotHeader";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useSWR, { SWRConfig } from "swr";
import css from "styled-jsx/css";
interface DiscountProps {
  carInfo: Enter;
  coupons: Coupon[];
  history: {
    ok: boolean;
    data: countWithCoupon[];
  };
}

interface countWithCoupon {
  count: number;
  name: string;
  userId: number;
}

interface DiscountResponse {
  ok: boolean;
  data: countWithCoupon[];
}

const Discount: NextPage<DiscountProps> = ({ carInfo, coupons, history }) => {
  const router = useRouter();
  const [discounts, setDiscounts] = useState<countWithCoupon[]>([]);

  useEffect(() => setDiscounts(history.data), []);

  // get object name in discounts
  const getDiscountName = (name: string) => {
    const discountName = discounts.find((discount) => discount.name === name);
    return discountName ? discountName.count : 0;
  };

  console.log(discounts);

  const [discount, { data: tData, loading }] =
    useMutation<DiscountResponse>("/api/discount");

  const [coupon, setCoupon] = useState({ id: 0, name: "" });

  const { register, handleSubmit, reset } = useForm();
  const [popup, setPopup] = useState(false);
  const t = (coupon: Coupon) => {
    setPopup(true);
    setCoupon({ id: coupon.id, name: coupon.name });
  };

  const closePopup = () => {
    setPopup(false);
    reset();
  };

  const onVaild = (data: any) => {
    discount({ ...data, enterId: carInfo.id, couponId: coupon.id });
    if (tData) {
      setPopup(false);
      reset();
    }
    return;
  };

  return (
    <>
      <Layout commonBar>
        <div className={`flex flex-col items-center gap-3`}>
          <ParkingLotHeader />
          <div className="my-1 flex w-full gap-3 ">
            <div className="relative w-full">
              <Image
                src={carInfo.imageUrl ? carInfo.imageUrl : NoImage}
                className="h-40 w-56 rounded-md"
                width={400}
                height={100}
                alt="image loading error"
                priority
              />
              <p className="absolute bottom-0 w-56 rounded-br-md rounded-bl-xl bg-gray-700 bg-opacity-10 py-2 text-center font-semibold text-white">
                {carInfo.carNumber}
              </p>
            </div>
            <div className="flex w-full flex-col items-start justify-center ">
              <div className="text-md flex flex-col gap-1 text-center text-lg font-semibold">
                <div className="flex flex-col items-start text-sm ">
                  <p className="text-center text-gray-400">????????????</p>
                  <p className={`text-${colors.primaryColor} text-lg`}>
                    {calculateEnterTime(carInfo.createdAt.toString())}
                  </p>
                </div>
                <div className="flex flex-col items-start text-sm">
                  <p className="text-center text-gray-400">????????????</p>
                  <p className="text-[16px]">
                    {convertTimeIntl(carInfo.createdAt.toString())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-28 mt-2 h-auto w-full">
          <div>
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">?????? ?????????</h3>
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
                            ?????????
                          </span>{" "}
                          / ?????????
                        </p>
                        <button
                          className={`bg-${colors.primaryColor} text-md rounded-md px-4 py-1.5 text-white`}
                          onClick={() => t(coupon)}
                        >
                          ??????
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div>
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">?????? ?????? ?????? ??????</h3>
            </div>
            <div className="flex flex-col justify-center gap-3 p-3">
              {discounts && discounts.length > 0 ? (
                discounts
                  .filter((x) => x.userId === 1)
                  .map((x, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <p>{x.name}</p>
                      <div className="flex items-center gap-10">
                        <p>{x.count}???</p>
                        <button
                          className={`border border-${colors.primaryColor} text-${colors.primaryColor} rounded-sm px-3 py-0.5`}
                        >
                          ??????
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex justify-center p-8">
                  <p>
                    <span className={`text-${colors.primaryColor}`}>
                      ?????? ??????
                    </span>
                    ??? ????????????.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">??? ?????? ?????? ??? ?????? ??????</h3>
            </div>
            <div className="flex flex-col justify-center gap-3 p-3">
              {/* {tdd && tdd.length > 0 ? (
                tdd.map((x, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between font-bold"
                  >
                    <p>{x.name}</p>
                    <p>{x.count}???</p>
                  </div>
                ))
              ) : (
                <div className="flex justify-center p-8">
                  <p className="font-semibold">
                    <span className={`text-${colors.primaryColor}`}>
                      ??? ?????? ??????
                    </span>
                    ??? ????????????.
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </Layout>

      <div className="fixed bottom-0 w-full">
        <p className="bg-white py-3 text-center text-sm text-gray-500">
          ??? ?????? ?????? ?????? ??? ?????? ????????? ????????? ??? ????????????.
          <br /> ?????? ?????? ?????????{" "}
          <span className={`text-${colors.primaryColor}`}>
            {" "}
            ????????? ??????
          </span>{" "}
          ???????????? ??????????????????.
        </p>
        <button
          onClick={() => {
            router.push("/");
          }}
          className={`w-full py-4  bg-${colors.primaryColor} cursor-pointer
          text-lg font-semibold text-white`}
        >
          ?????????
        </button>
      </div>

      <div
        className={`${
          popup ? "block " : "hidden "
        } fixed top-0 z-auto flex h-screen w-full flex-col items-center justify-center bg-gray-500 bg-opacity-20`}
      >
        <form onSubmit={handleSubmit(onVaild)}>
          <div className="flex h-auto w-96 flex-col  items-center justify-center rounded-lg   border bg-white ">
            <div className="w-full p-6">
              <div className="flex w-full flex-col items-center justify-center border-b border-b-black ">
                <svg
                  fill="currentColor"
                  className="h-16 w-16 text-red-500"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  />
                </svg>
                <p>
                  <span className={`text-${colors.primaryColor} font-semibold`}>
                    {coupon.name}
                  </span>
                  ???(???)
                </p>
                <p>?????????????????????????</p>
                <p className="my-2 text-sm font-normal text-gray-400">
                  ?????? ??????:{" "}
                  {tData?.data.map(
                    (x, index) =>
                      `${x.name} / ${x.count}???${
                        index === tData.data.length - 1 ? "" : ", "
                      }`
                  )}{" "}
                </p>
              </div>
              <div className="h-auto w-full p-4">
                <div className="mb-3 flex w-full items-center ">
                  <div className="w-1/5">
                    <h3>??????</h3>
                  </div>
                  <div className="flex w-4/5 gap-2">
                    <input
                      className="w-12 rounded-sm border text-center"
                      defaultValue={1}
                      type="text"
                      {...register("count", {
                        pattern: /^[0-9]*$/,
                        required: true,
                        min: 1,
                        max: 10,
                      })}
                    />
                    <h3>???</h3>
                  </div>
                </div>
                <div className="flex w-full items-center ">
                  <div className="w-1/5">
                    <h3>??????</h3>
                  </div>
                  <div className="flex w-4/5 gap-2">
                    <textarea
                      className="h-20 w-full resize-none rounded-sm border p-3 outline-none"
                      {...register("memo", {
                        maxLength: 100,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center border-t">
              <button
                type="button"
                className="w-full border-r py-3 text-center"
                onClick={closePopup}
              >
                ??????
              </button>
              <button className="w-full  py-3 text-center">??????</button>
            </div>
          </div>
        </form>
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

  const coupons = await client.coupon.findMany();

  const history = await fetch("http://localhost:3000/api/discount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enterId: Number(id),
    }),
  }).then((res) => res.json().then((data) => data));

  console.log(history, "dsdsd");

  return {
    props: {
      carInfo: JSON.parse(JSON.stringify(carInfo)),
      coupons: JSON.parse(JSON.stringify(coupons)),
      history: JSON.parse(JSON.stringify(history)),
    },
  };
}

export default Discount;
