import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountPageStudent from "../pages/student/AccountPage";
import ForgetPageStudent from "../pages/student/ForgetPage";

import AccountPageAdmin from "../pages/admin/AccountPage";
import ForgetPageAdmin from "../pages/admin/ForgetPage";

import AccountPageJudge from "../pages/judge/AccountPage";
import ForgetPageJudge from "../pages/judge/ForgetPage";
import StudentHomePage from "../pages/student/HomePage";
import SingleHackathonPageUser from "../pages/student/SingleHackathonPage";

import HomePage from "../pages/admin/HomePage";
import JudgesPage from "../pages/admin/JudgesPage";
import HackathonsPage from "../pages/admin/HackathonsPage";
import RequestPage from "../pages/admin/RequestPage";
import SingleHackathonPageAdmin from "../pages/admin/SingleHackathonPage";
import AssignHackathonPage from "../pages/admin/AssignHackathonPage";

import JudgeHomePage from "../pages/judge/HomePage";
import SingleHackathonPage from "../pages/judge/SingleHackathonPage";
import PaymentPage from "../pages/student/payment/PaymentPage";
import PaymentsPage from "../pages/admin/PaymentsPage";
import ProfilePage from "../pages/student/Profile/ProfilePage";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UploadResult from "../components/judge/Home/UploadResult";
import AchievementsPage from "../pages/student/achievements/AchievementsPage";
import ProfileJudgePage from "../pages/judge/Profile/ProfilePage";

// const stripePromise = loadStripe("your_publishable_key");

// Use Stripe's test publishable key
const stripePromise = loadStripe(
  "pk_test_51PuWRX01afQDVO15CbaJgGqUTYNEvKPmKSPgLS5SmAxiYfX8KQLyObingkk6FY3kNNL7nN1cSDghaatkkfOcJolS00uuQjmheC"
);

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountPageStudent />} />
      <Route path="/forget/password" element={<ForgetPageStudent />} />
      <Route path="/admin" element={<AccountPageAdmin />} />
      <Route path="/admin/forget/password" element={<ForgetPageAdmin />} />
      <Route path="/judge" element={<AccountPageJudge />} />
      <Route path="/judge/forget/password" element={<ForgetPageJudge />} />
      <Route path="/student/home" element={<StudentHomePage />} />
      <Route path="/judge/profile" element={<ProfileJudgePage />} />
      <Route
        path="/student/hackathon/:id"
        element={
          <Elements stripe={stripePromise}>
            <SingleHackathonPageUser />
          </Elements>
        }
      />
      <Route path="/admin/dashboard/users" element={<HomePage />} />
      <Route path="/admin/dashboard/payments" element={<PaymentsPage />} />
      <Route path="/admin/dashboard/judges" element={<JudgesPage />} />
      <Route path="/admin/dashboard/judges/request" element={<RequestPage />} />
      <Route path="/admin/dashboard/hackathons" element={<HackathonsPage />} />
      <Route
        path="/admin/dashboard/hackathons/single/:id"
        element={<SingleHackathonPageAdmin />}
      />
      <Route
        path="/admin/dashboard/hackathons/assisgn/:id"
        element={<AssignHackathonPage />}
      />

      <Route path="/judge/home" element={<JudgeHomePage />} />
      <Route path="/judge/hackathon/:id" element={<SingleHackathonPage />} />
      <Route path="/judge/upload-result/:id" element={<UploadResult />} />
      <Route path="/student/payment" element={<PaymentPage />} />
      <Route path="/student/achievements" element={<AchievementsPage />} />
      <Route path="/student/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default Routers;
