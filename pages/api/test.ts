import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import CryptoJS from "crypto-js";
import request from "request";
import iconv from "iconv-lite";

function getSignData(str: string) {
  var encrypted = CryptoJS.SHA256(str);
  return encrypted;
}

function authRequest(options: any) {
  console.log(options, "options");
  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var strContents = new Buffer(body);
      var returnObj = JSON.parse(
        iconv.decode(strContents, "EUC-KR").toString()
      );
      //var Signature = JSON.parse(strContents).Signature.toString()
      console.log(returnObj, "dsds");
      //가맹점은 승인응답으로 전달된 TID, Amt 값을 활용하여 위변조 대조 해쉬값을 생성하여 전달받은 Signature 값과 대조를 진행합니다. 대조가 일치할 경우 정상승인을 진행합니다.
      /*if (options.url === "https://webapi.nicepay.co.kr/webapi/pay_process.jsp"){
				var paySignature = getSignData(JSON.parse(strContents).TID.toString() + JSON.parse(strContents).MID.toString() + JSON.parse(strContents).Amt.toString() + merchantKey).toString();
				console.log(returnObj)
				if (Signature === paySignature) {
					console.log("Signature : " + Signature)
				}
				else {
					console.log("Signature : " + Signature)
					console.log("paySignature : " + paySignature)
				}
			}
			else { //취소 응답 시 위변조 대조 해쉬값을 생성하여 전달받은 Signature 값과 대조를 진행합니다. 대조가 일치할 경우 취소를 진행합니다.
				var cancelSignature = getSignData(JSON.parse(strContents).TID.toString() + JSON.parse(strContents).MID.toString() + JSON.parse(strContents).CancelAmt.toString() + merchantKey).toString();
				console.log(returnObj)
				if (Signature === cancelSignature) {
					console.log("Signature : " + Signature)
				}
				else {
					console.log("Signature : " + Signature)
					console.log("cancelSignature : " + cancelSignature)
				}
			}*/
    }
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const merchantKey =
    "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";
  const ediDate = req.body.EdiDate;
  var authResultCode = req.body.AuthResultCode;
  var authResultMsg = req.body.AuthResultMsg;
  var txTid = req.body.TxTid;
  var authToken = req.body.AuthToken;
  var payMethod = req.body.PayMethod;
  var mid = req.body.MID;
  var moid = req.body.Moid;
  var amt = req.body.Amt;
  var reqReserved = req.body.ReqReserved;
  var nextAppURL = req.body.NextAppURL; //승인 API URL
  var netCancelURL = req.body.NetCancelURL; //API 응답이 없는 경우 망취소 API 호출
  //var authSignature = req.body.Signature; //Nicepay에서 내려준 응답값의 무결성 검증 Data
  //인증 응답 Signature = hex(sha256(AuthToken + MID + Amt + MerchantKey)
  //var authComparisonSignature = getSignData(req.body.AuthToken + req.body.MID + req.body.Amt + merchantKey).toString();
  var signData = getSignData(
    authToken + mid + amt + ediDate + merchantKey
  ).toString();

  /*
   ****************************************************************************************
   * Signature : 요청 데이터에 대한 무결성 검증을 위해 전달하는 파라미터로 허위 결제 요청 등 결제 및 보안 관련 이슈가 발생할 만한 요소를 방지하기 위해 연동 시 사용하시기 바라며
   * 위변조 검증 미사용으로 인해 발생하는 이슈는 당사의 책임이 없음 참고하시기 바랍니다.
   ****************************************************************************************
   */

  // Configure the request
  var options = {
    url: nextAppURL,
    method: "POST",
    headers: {
      "User-Agent": "Super Agent/0.0.1",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    encoding: null,
    form: {
      TID: txTid,
      AuthToken: authToken,
      Amt: amt,
      MID: mid,
      SignData: signData,
      EdiDate: ediDate,
    },
  };

  //인증 응답으로 받은 Signature 검증을 통해 무결성 검증을 진행하여야 합니다.
  /*if(authSignature === authComparisonSignature){
		authRequest(options); //authResultCode가 0000인 경우만 승인 API 호출 합니다.
	}
	else{
		console.log("authSignature : " + authSignature)
		console.log("authComparisonSignature : " + authComparisonSignature)
	}*/
  authRequest(options); //authResultCode가 0000인 경우만 승인 API 호출 합니다.
  res.send("Result data is in Terminal");
  console.log(req.body);
  // for (const data of fakeData) {
  //   await client.enter.createMany({
  //     data: {
  //       carNumber: data.carNo,
  //       imageUrl: data.imageUrl,
  //       parkingLotId: 1,
  //     },
  //   });
  // }
}
