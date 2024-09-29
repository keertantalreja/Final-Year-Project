const uploadFiles = require("../../config/cloudinary.config");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Error");
const {
  HackathonModel,
  JudgeAccountModel,
  PaymentModel,
} = require("../../model/index");
const { statusCode, api_messages } = require("../../constant/api_response");
const { uploadSingleFile } = require("../../config/firebase.config");
const { send_email } = require("../../config/nodemailer.config");
const Stripe = require("stripe");

const createPaymentService = asyncErrorHandler(async (req, res) => {
  console.log("lk");
  let { studentId, hackthon, paymentType, paymentDate, amount } = req.body;
  if (req?.files?.paymentEvidenceImage) {
    let paymentEvidenceImage = req?.files?.paymentEvidenceImage[0];

    let paymentEvidenceImageUrl = await uploadSingleFile(paymentEvidenceImage);
    if (paymentEvidenceImageUrl) {
      let paymentInstance = await PaymentModel.create({
        student: studentId,
        hackthon,
        paymentType,
        paymentDate,
        paymentEvidence: paymentEvidenceImageUrl,
        amount,
      });
      res.status(statusCode?.success).json(paymentInstance);
    }
  } else {
    console.log("lkhi");
    let paymentInstance = await PaymentModel.create({
      student: studentId,
      hackthon,
      paymentType,
      paymentDate,
      amount,
      paymentEvidence: "",
    });
    res.status(statusCode?.success).json(paymentInstance);
  }
});

const getAllPayments = asyncErrorHandler(async (req, res) => {
  let FindAll = await PaymentModel.find({})
    .populate("hackthon", "title _id description")
    .populate("student", "firstname _id lastname email phone city")
    .sort({
      createdAt: -1,
    });
  if (FindAll?.length > 0) {
    res.status(statusCode.success).json(FindAll);
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

const updatePaymentService = asyncErrorHandler(async (req, res) => {
  let { isApproved } = req.body;

  let updatedPayment = await PaymentModel.findByIdAndUpdate(
    req.params.id,
    { isApproved: isApproved },
    { new: true }
  );
  res.status(200).json(updatedPayment);
});

const createStripePaymentIntent = asyncErrorHandler(async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body;

  let totalAmount = amount * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "PKR",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(200).json({
    message: "Card payment intent created!",
    statusCode: 200,
    success: true,
    data: {
      clientSecret: paymentIntent.client_secret,
      stripeAmount: totalAmount,
      actualAmount: amount,
      currency: paymentIntent.currency,
    },
  });
});

module.exports = {
  createPaymentService,
  getAllPayments,
  updatePaymentService,
  createStripePaymentIntent,
};
