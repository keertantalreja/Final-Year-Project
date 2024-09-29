import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  useCreatePaymentIntentMutation,
  useCreatePaymentMutation,
  useEnrollStudentMutation,
} from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors } from "../../../constant/color";
import { StudentjwtDecodeFunction } from "../../../services/jwtDecoder";

const ParticiapatePopup = ({ setClosePop, hackthon, refetch }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [enrollStudent] = useEnrollStudentMutation();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      // card: elements.getElement(CardElement),
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        let result = await createPaymentIntent({
          data: { amount: hackthon?.fees },
        });
        console.log(result.data);
        const clientSecret = result.data.data.clientSecret;
        // const clientSecret = "pi_3POf2TIm76tKZYsv3p78h0bA_secret_DRhaaCGfwy4D6TDzhH9P40TGP";

        const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
          payment_method: id,
        });
        console.log("confirmPayment", confirmPayment);
        if (confirmPayment.paymentIntent?.status === "succeeded") {
          console.log("Payment Successful");
          onSubmit(event);
          setSuccess(true);
        }
      } catch (error) {
        setError(error);
        toast.error(error.message);
        console.log("Error", error);
        setLoading(false);
      }
    } else {
      toast.error(error.message);
      console.log("Error", error);
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentId = StudentjwtDecodeFunction()?.findUser?._id;

      let body = {
        hackthon: hackthon?._id,
        paymentType: "ONLINE",
        paymentDate: new Date(),
        studentId: studentId,
        amount: hackthon?.fees,
      };
      let result = await createPayment({
        data: body,
      });
      console.log(result.data);
      if (result.data) {
        toast.success(result.data.message);
        enrollStudentInHackthon(e);
        setLoading(false);
      } else {
        toast.error(result.error.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error", error);
      setLoading(false);
    }
  };

  const enrollStudentInHackthon = async (e) => {
    e.preventDefault();

    try {
      const studentId = StudentjwtDecodeFunction()?.findUser?._id;

      let body = {
        studentId: studentId,
      };
      let result = await enrollStudent({
        id: hackthon?._id,
        data: body,
      });
      console.log("data....", result.data);
      if (result.data.success) {
        toast.success(result.data.message);
        setLoading(false);
        refetch();
        setClosePop(false);
      } else {
        toast.error(result.error.data.message);
        setLoading(false);
      }
    } catch (error) {
      // toast.error(error.data.message);
      console.log("Error", error);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 bg-white font-roboto rounded-md  w-[30%]">
      <div className="flex justify-between items-center">
        <p className="text-[#1d90f4] font-serif text-xl">Pay</p>
        <ImCross
          className="cursor-pointer"
          onClick={() => setClosePop(false)}
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-4">
          <p>Card Number*</p>
          <div className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-full h-[2.2rem] flex items-center">
            <CardNumberElement
              className="w-full"
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mt-4">
          <div className="flex-1">
            <p className="mt-2">Expiration date*</p>
            <div className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-full h-[2.2rem] flex items-center">
              <CardExpiryElement
                className="w-full"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="mt-2">CVC*</p>
            <div className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-full h-[2.2rem] flex items-center">
              <CardCvcElement
                className="w-full"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setClosePop(false)}
            className={`w-[48%] h-[2.2rem] bg-[${colors.dark_blue}] shadow-otpShadow text-white rounded-md`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe}
            className={`w-[48%] h-[2.2rem] bg-[${colors.dark_blue}] shadow-otpShadow text-white rounded-md`}
            // className="w-full mt-4 h-9 bg-blue-500 shadow-md text-white rounded-md"
          >
            {loading ? "Loading..." : "Pay"}
          </button>
        </div>
      </form>

      {/* TOASTIFY CONTAINER  */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ParticiapatePopup;
