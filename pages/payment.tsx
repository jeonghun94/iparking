import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function Payment() {
  const ediDate = dayjs().format("YYYYMMDDHHmmss");
  const merchantID = "nicepay00m";
  const amt = "1004";
  const merchantKey =
    "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";

  function getSignData(str: string) {
    var encrypted = CryptoJS.SHA256(str);
    return encrypted;
  }

  function nicepayStart() {
    if (typeof window === "object") {
      const form = document.getElementsByName("payForm")[0] as HTMLFormElement;
      if (checkPlatform(window.navigator.userAgent) == "mobile") {
        form.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
        form.acceptCharset = "euc-kr";
        form.submit();
      } else {
        // @ts-ignore
        goPay(form);
      }
    }
  }

  //[PC Only]When pc payment window is closed, nicepay-3.0.js call back nicepaySubmit() function <<'nicepaySubmit()' DO NOT CHANGE>>
  function nicepaySubmit() {
    // document.payForm.submit();
  }

  //[PC Only]payment window close function <<'nicepayClose()' DO NOT CHANGE>>
  function nicepayClose() {
    alert("결제가 취소 되었습니다");
  }

  //pc, mobile chack script (sample code)
  function checkPlatform(ua: any) {
    if (ua === undefined) {
      ua = window.navigator.userAgent;
    }

    ua = ua.toLowerCase();
    var platform: any = {};
    var matched: any = {};
    var userPlatform = "pc";
    var platform_match =
      /(ipad)/.exec(ua) ||
      /(ipod)/.exec(ua) ||
      /(windows phone)/.exec(ua) ||
      /(iphone)/.exec(ua) ||
      /(kindle)/.exec(ua) ||
      /(silk)/.exec(ua) ||
      /(android)/.exec(ua) ||
      /(win)/.exec(ua) ||
      /(mac)/.exec(ua) ||
      /(linux)/.exec(ua) ||
      /(cros)/.exec(ua) ||
      /(playbook)/.exec(ua) ||
      /(bb)/.exec(ua) ||
      /(blackberry)/.exec(ua) ||
      [];

    matched.platform = platform_match[0] || "";

    if (matched.platform) {
      platform[matched.platform] = true;
    }

    if (
      platform.android ||
      platform.bb ||
      platform.blackberry ||
      platform.ipad ||
      platform.iphone ||
      platform.ipod ||
      platform.kindle ||
      platform.playbook ||
      platform.silk ||
      platform["windows phone"]
    ) {
      userPlatform = "mobile";
    }

    if (platform.cros || platform.mac || platform.linux || platform.win) {
      userPlatform = "pc";
    }

    return userPlatform;
  }
  return (
    <>
      <form
        name="payForm"
        method="post"
        action="/api/test"
        acceptCharset="euc-kr"
        className="flex flex-col"
      >
        <input type="text" name="PayMethod" defaultValue="" />
        <input type="text" name="GoodsName" defaultValue="나이스상품" />
        <input type="text" name="Amt" defaultValue="1004" />
        <input type="text" name="MID" defaultValue="nicepay00m" />
        <input type="text" name="Moid" defaultValue="nice_api_test_3.0" />
        <input type="text" name="BuyerName" defaultValue="구매자" />
        <input type="text" name="BuyerEmail" defaultValue="happy@day.com" />
        <input type="text" name="BuyerTel" defaultValue="00000000000" />
        <input
          type="text"
          name="ReturnURL"
          defaultValue="http://localhost:3000/authReq"
        />
        <input type="text" name="VbankExpDate" defaultValue="" />

        <input type="hidden" name="NpLang" defaultValue="KO" />
        <input type="hidden" name="GoodsCl" defaultValue="1" />
        <input type="hidden" name="TransType" defaultValue="0" />
        <input type="hidden" name="CharSet" defaultValue="utf-8" />
        <input type="hidden" name="ReqReserved" defaultValue="" />

        <input
          type="text"
          name="EdiDate"
          defaultValue={dayjs().format("YYYYMMDDHHmmss")}
        />
        <input
          type="text"
          name="SignData"
          defaultValue={getSignData(
            ediDate + merchantID + amt + merchantKey
          ).toString()}
        />
        <button
          className="h-10 w-full bg-slate-400 text-white"
          // @ts-ignore
          //   onClick={goPay()}
        >
          REQUEST
        </button>
      </form>
    </>
  );
}
