import client from "@libs/server/client";
import { NextPage, NextPageContext } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Coupon, Enter } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import Image from "next/image";
import NoImage from "../public/no-image.jpeg";
import {
  calculateEnterTime,
  convertTimeIntl,
  colors,
} from "@libs/client/utils";
import { ParkingLotHeader } from "@components/parkingLotHeader";

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
  userId?: number;
}

interface DiscountResponse {
  ok: boolean;
  data: countWithCoupon[];
}

const Discount: NextPage<DiscountProps> = ({
  carInfo,
  coupons,
  history: { data: discountHistory },
}) => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const totalDiscountsCount: countWithCoupon[] = [];
  const [coupon, setCoupon] = useState({ id: 0, name: "" });
  const [popup, setPopup] = useState(false);
  const [discount, { data: tData, loading }] =
    useMutation<DiscountResponse>("/api/discount");

  discountHistory.map((item) => {
    if (totalDiscountsCount.find((i) => i.name === item.name)) {
      const a = totalDiscountsCount.find((i) => i.name === item.name);
      if (a) a.count += item.count;
    }
    if (!totalDiscountsCount.find((i) => i.name === item.name)) {
      totalDiscountsCount.push({ name: item.name, count: item.count });
    }
  });

  const handleCouponFoucs = (coupon: Coupon) => {
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
                  <p className="text-center text-gray-400">주차시간</p>
                  <p className={`text-${colors.primaryColor} text-lg`}>
                    {calculateEnterTime(carInfo.createdAt.toString())}
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
          <div>
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
                          onClick={() => handleCouponFoucs(coupon)}
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
            <div className="flex flex-col justify-center gap-3 p-3">
              {discountHistory && discountHistory.length > 0 ? (
                discountHistory
                  .filter((x) => x.userId === 1)
                  .map((x, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <p>{x.name}</p>
                      <div className="flex items-center gap-10">
                        <p>{x.count}회</p>
                        <button
                          className={`border border-${colors.primaryColor} text-${colors.primaryColor} rounded-sm px-3 py-0.5`}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex justify-center p-8">
                  <p>
                    <span className={`text-${colors.primaryColor}`}>
                      할인 내역
                    </span>
                    이 없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="border-b border-b-black p-3">
              <h3 className="text-md font-bold">총 할인 내역 및 적용 수량</h3>
            </div>
            <div className="flex flex-col justify-center gap-3 p-3">
              {totalDiscountsCount && totalDiscountsCount.length > 0 ? (
                totalDiscountsCount.map((x, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between font-bold"
                  >
                    <p>{x.name}</p>
                    <p>{x.count}회</p>
                  </div>
                ))
              ) : (
                <div className="flex justify-center p-8">
                  <p className="font-semibold">
                    <span className={`text-${colors.primaryColor}`}>
                      총 할인 내역
                    </span>
                    이 없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>

      <div className="fixed bottom-0 w-full">
        <p className="bg-white py-3 text-center text-sm text-gray-500">
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
                  를(을)
                </p>
                <p>적용하시겠습니까?</p>
                <p className="my-2 text-sm font-normal text-gray-400">
                  현재 적용:{" "}
                  {tData?.data.map(
                    (x, index) =>
                      `${x.name} / ${x.count}회${
                        index === tData.data.length - 1 ? "" : ", "
                      }`
                  )}{" "}
                </p>
              </div>
              <div className="h-auto w-full p-4">
                <div className="mb-3 flex w-full items-center ">
                  <div className="w-1/5">
                    <h3>횟수</h3>
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
                    <h3>회</h3>
                  </div>
                </div>
                <div className="flex w-full items-center ">
                  <div className="w-1/5">
                    <h3>메모</h3>
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
                취소
              </button>
              <button className="w-full  py-3 text-center">확인</button>
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

  return {
    props: {
      carInfo: JSON.parse(JSON.stringify(carInfo)),
      coupons: JSON.parse(JSON.stringify(coupons)),
      history: JSON.parse(JSON.stringify(history)),
    },
  };
}

export default Discount;
