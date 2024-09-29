import React from "react";
import PaymentListing from "../../../components/payment/PaymentsEvidenceList/Listing";
import Navbar from "../../../components/dynamic/navbar/Navbar";
const PaymentPage = () => {
  return (
    <div>
      <Navbar />
      <PaymentListing />
    </div>
  );
};

export default PaymentPage;
