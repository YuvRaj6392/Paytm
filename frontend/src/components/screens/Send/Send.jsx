import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { transferToAtom } from "../../../store/atoms/transferToAtom";
import { balanceAtom } from "../../../store/atoms/balanceAtom";
import { TransferFundsApi } from "../../../Api/TransferFunds";
import { tokenError } from "../../../functions/tokenError";

export default function Send() {
  const to = useRecoilValue(transferToAtom);
  const [input, setInput] = useState(0);
  const [loading, setLoading] = useState(false);
  const setBalance = useSetRecoilState(balanceAtom);
  const [success, setSuccess] = useState(false);
  const redirect = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const inititateTransfer = async () => {
    if(parseInt(input)<=0){
      alert('Amount should be greater than 0')
    }else{
      setLoading(true);
      const json = await TransferFundsApi(to, input);
      if (tokenError(json)) {
        localStorage.removeItem("token");
        setLoading(false);
        window.location.reload();
      } else if (!json.success) {
        alert(json.message);
        setLoading(false);
      } else {
        setBalance(json.senderBalance);
        setSuccess(true);
        setInput("");
        redirect();
      }
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-[400px] h-auto border border-green-300 flex justify-center flex-col items-center shadow-md space-y-7 p-4">
        <p className="text-2xl font-extrabold">SEND MONEY</p>
        <p className="text-l font-light">Amount (in Rs)</p>
        <input
          className="w-[50%] border border-green-900"
          onInput={(e) => {
            setInput(e.target.value);
          }}
          type="text"
        />

        <div
          onClick={() => {
            inititateTransfer();
          }}
          className={`bg-green-500 text-white p-2 w-[50%] flex justify-center items-center rounded-md cursor-pointer ${
            success ? "pointer-events-none" : ""
          }`}
        >
          {loading ? "Initiating Transfer" : "Initiate Transfer"}
        </div>

        {success && (
          <span className="text-green-500">Successfully Transferred</span>
        )}
      </div>
    </div>
  );
}
