import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

export const Apis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["hackathon", "judge", "student", "admin", "payment"],
  endpoints: (builder) => ({
    registerStudent: builder.mutation({
      query: (userData) => ({
        url: "/student/register",
        method: "POST",
        body: userData,
      }),
    }),
    registerJudge: builder.mutation({
      query: (userData) => ({
        url: "/judge/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["judge"],
    }),
    registerAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/register",
        method: "POST",
        body: userData,
      }),
    }),
    registerJudgeByAdmin: builder.mutation({
      query: (userData) => ({
        url: "/judge/admin/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["judge"],
    }),

    loginStudent: builder.mutation({
      query: (userData) => ({
        url: "/student/login",
        method: "POST",
        body: userData,
      }),
    }),
    uploadPayment: builder.mutation({
      query: (userData) => ({
        url: "/payment/create",
        method: "POST",
        body: userData,
      }),
    }),
    loginJudge: builder.mutation({
      query: (userData) => ({
        url: "/judge/login",
        method: "POST",
        body: userData,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/login",
        method: "POST",
        body: userData,
      }),
    }),
    getSingleAdmin: builder.query({
      query: (id) => `/admin/single/${id}`,
      providesTags: ["admin"],
    }),

    sendOtpToStudent: builder.mutation({
      query: (userData) => ({
        url: "/student/forget/password/send/otp",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtpForStudent: builder.mutation({
      query: (userData) => ({
        url: "/student/forget/password/verify/otp",
        method: "POST",
        body: userData,
      }),
    }),
    changePasswordForStudent: builder.mutation({
      query: (userData) => ({
        url: "/student/forget/password/change/password",
        method: "POST",
        body: userData,
      }),
    }),
    sendOtpToJudge: builder.mutation({
      query: (userData) => ({
        url: "/judge/forget/password/send/otp",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtpForJudge: builder.mutation({
      query: (userData) => ({
        url: "/judge/forget/password/verify/otp",
        method: "POST",
        body: userData,
      }),
    }),
    changePasswordForJudge: builder.mutation({
      query: (userData) => ({
        url: "/judge/forget/password/change/password",
        method: "POST",
        body: userData,
      }),
    }),
    sendOtpToAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/forget/password/send/otp",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtpForAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/forget/password/verify/otp",
        method: "POST",
        body: userData,
      }),
    }),
    changePasswordForAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/forget/password/change/password",
        method: "POST",
        body: userData,
      }),
    }),

    // HACKATHON
    createHackathon: builder.mutation({
      query: (userData) => ({
        url: "/hackathon/create",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["hackathon"],
    }),
    getAllHackathon: builder.query({
      query: () => "/hackathon/get/all",
      providesTags: ["hackathon"],
    }),
    getSingleHackathon: builder.query({
      query: (id) => `/hackathon/get/single/${id}`,
      providesTags: ["hackathon"],
    }),
    deleteHackathon: builder.mutation({
      query: (id) => ({
        url: `/hackathon/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hackathon"],
    }),
    updateHackathon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hackathon/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["hackathon"],
    }),
    assignHackathon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hackathon/assign/judge/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["hackathon", "judge"],
    }),
    getJudgeHackthons: builder.query({
      query: (id) => `/hackathons/judge/${id}`,
      providesTags: ["hackathon"],
    }),

    // JUDGE APIS
    getAllJudge: builder.query({
      query: () => "/judge/all",
      providesTags: ["judge"],
    }),
    deleteJudge: builder.mutation({
      query: (id) => ({
        url: `/judge/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["judge"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["judge"],
    }),
    getApproval: builder.query({
      query: () => "/judge/approval/request",
      providesTags: ["judge"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/judge/account/approval/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["judge"],
    }),
    availableJudge: builder.query({
      query: () => `/judge/available`,
      providesTags: ["judge"],
    }),
    getSingleJudge: builder.query({
      query: (judgeId) => `/judge/single/${judgeId}`,
      providesTags: ["judge"],
    }),

    // STUDENTS
    getAllStudent: builder.query({
      query: () => "/student/all",
      invalidatesTags: ["student"],
    }),
    // Payments
    getAllPayments: builder.query({
      query: () => "/payment/all",
      // invalidatesTags: ['payment']
    }),
    getSingleStudentProfile: builder.query({
      query: (studentId) => `/student/single/${studentId}`,
      // invalidatesTags: ['payment']
    }),

    validatePassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/student/validate-current-password/${id}`,
        method: "POST",
        body: data,
      }),

      // invalidatesTags: ["hackathon"],
    }),

    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: `/student/reset-password`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: ["hackathon"],
    }),

    resetJudgePassword: builder.mutation({
      query: ({ data }) => ({
        url: `/judge/reset-password`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: ["hackathon"],
    }),

    approvePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payment/approve/${id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),

    createPaymentIntent: builder.mutation({
      query: ({ data }) => ({
        url: `/payment/create-stripe-payment-intent`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),

    createPayment: builder.mutation({
      query: ({ data }) => ({
        url: `/payment/create`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),

    enrollStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hackathon/enroll-student/${id}`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),
    updateStudentProfile: builder.mutation({
      query: ({ data }) => ({
        url: `/student/profile/update`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),
    updateJudgeProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/judge/update/${id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),

    uploadResult: builder.mutation({
      query: ({ data }) => ({
        url: `/judge/upload-hackathon-result`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),
    uploadFileSubmission: builder.mutation({
      query: ({ data, id }) => ({
        url: `/hackathon/create-submission/${id}`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['judge']
    }),
    getAllAchievements: builder.query({
      query: (id) => `/student/get-all-acheivements/${id}`,
      // invalidatesTags: ['payment']
    }),
    validateJudgePassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/judge/validate-current-password/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useRegisterAdminMutation,
  useRegisterJudgeMutation,
  useRegisterJudgeByAdminMutation,

  useLoginStudentMutation,
  useUploadPaymentMutation,
  useLoginJudgeMutation,
  useLoginAdminMutation,

  useGetSingleAdminQuery,
  useGetAllAchievementsQuery,

  useSendOtpToStudentMutation,
  useVerifyOtpForStudentMutation,
  useChangePasswordForStudentMutation,

  useSendOtpToJudgeMutation,
  useVerifyOtpForJudgeMutation,
  useChangePasswordForJudgeMutation,
  useGetSingleJudgeQuery,
  useGetSingleStudentProfileQuery,
  useValidatePasswordMutation,
  useValidateJudgePasswordMutation,

  useResetPasswordMutation,
  useResetJudgePasswordMutation,

  useCreatePaymentIntentMutation,
  useCreatePaymentMutation,
  useEnrollStudentMutation,
  useUpdateStudentProfileMutation,
  useUploadResultMutation,
  useUploadFileSubmissionMutation,
  useUpdateJudgeProfileMutation,
  useDeleteStudentMutation,

  useSendOtpToAdminMutation,
  useVerifyOtpForAdminMutation,
  useChangePasswordForAdminMutation,

  useCreateHackathonMutation,
  useGetAllHackathonQuery,
  useGetSingleHackathonQuery,
  useDeleteHackathonMutation,
  useUpdateHackathonMutation,
  useAssignHackathonMutation,
  useGetJudgeHackthonsQuery,
  useGetAllJudgeQuery,
  useDeleteJudgeMutation,
  useGetApprovalQuery,
  useUpdateStatusMutation,
  useAvailableJudgeQuery,
  useGetAllStudentQuery,
  useGetAllPaymentsQuery,
  useApprovePaymentMutation,
} = Apis;
